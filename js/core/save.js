/* ============================================================
   SaveSystem · 存档系统 V2
   架构：全局存档 + 单存档
   单存档 = 深拷贝整个 State.data（自动化，不缺字段）
   ============================================================ */
(function () {
  "use strict";
  const WF = window.WF || (window.WF = {});

  const GAME_VERSION = (window.WF && window.WF.VERSION) || "1.0.0";
  const SAVE_VERSION = 2;
  const MAX_MANUAL_SLOTS = 10;

  const KEYS = {
    global: "wf_global_v2",
    slot: "wf_slot_v2_",
    auto: "wf_auto_v2",
    quick: "wf_quick_v2",
    legacyAuto: "wf_slot_auto",
    legacySettings: "wf_settings_v1"
  };

  /* ============================================================
     全局存档
     ============================================================ */
  function freshGlobal() {
    return {
      version: SAVE_VERSION,
      gameVersion: GAME_VERSION,
      anyEndingCompleted: false,
      anyChapter1Completed: false,
      achievements: { unlocked: [], unlockedAt: {}, showDetail: {} },
      stats: {
        playCount: 0,
        totalPlayTime: 0,
        firstPlayTime: null,
        lastPlayTime: null,
        clearCount: 0,
        sideQuestsUnlocked: 0,
        ifClearCount: {}
      },
      saveManager: { saveCount: 0, lastLoadedSlot: null },
      settings: {
        masterVolume: 80, bgmVolume: 70, sfxVolume: 80,
        textSpeed: "normal", autoPlay: false, skipRead: true,
        displayMode: "window", brightness: 100
      },
      unlocks: { endings: [], poems: false, gallery: [], bgm: [], scenes: [], minigames: [] }
    };
  }

  let globalData = loadGlobal();

  function loadGlobal() {
    try {
      const raw = localStorage.getItem(KEYS.global);
      if (!raw) return freshGlobal();
      return Object.assign(freshGlobal(), JSON.parse(raw));
    } catch (e) {
      console.warn("[save] loadGlobal failed", e);
      return freshGlobal();
    }
  }

  function saveGlobal() {
    try {
      globalData.stats.lastPlayTime = Date.now();
      localStorage.setItem(KEYS.global, JSON.stringify(globalData));
      return true;
    } catch (e) {
      console.warn("[save] saveGlobal failed", e);
      return false;
    }
  }

  /* ============================================================
     单存档构建（自动深拷贝全部 State.data）
     ============================================================ */
  function buildSaveData() {
    const d = WF.State.data;
    const copy = {};
    Object.keys(d).forEach(k => {
      const v = d[k];
      if (v === null || typeof v !== "object") {
        copy[k] = v;
      } else if (Array.isArray(v)) {
        copy[k] = v.slice();
      } else {
        try {
          copy[k] = JSON.parse(JSON.stringify(v));
        } catch (e) {
          copy[k] = v;
        }
      }
    });
    copy.version = SAVE_VERSION;
    copy.gameVersion = GAME_VERSION;
    copy.updatedAt = Date.now();
    if (!copy.createdAt) copy.createdAt = Date.now();
    if (!copy.saveName && copy.currentSlot) copy.saveName = "存档 " + copy.currentSlot;
    copy.name = copy.saveName || "存档";
    return copy;
  }

  function restoreSaveData(save) {
    WF.State.load(save);
    return WF.State.data;
  }

  function validateSave(save) {
    if (!save || typeof save !== "object") return { valid: false, reason: "存档为空" };
    if (!save.version) return { valid: false, reason: "存档版本缺失" };
    if (save.version > SAVE_VERSION) return { valid: false, reason: "存档版本过高，不兼容" };
    if (!save.day) return { valid: false, reason: "存档数据不完整" };
    return { valid: true };
  }

  function slotKey(slot) {
    if (slot === "auto") return KEYS.auto;
    if (slot === "quick") return KEYS.quick;
    return KEYS.slot + slot;
  }

  function saveToSlot(slot, name, note) {
    try {
      // 存档前做一致性修复：如果章节已完成，清空剧情状态
      const d = WF.State.data;
      const ch = d.chapter || 1;
      if (d.chapterCompleted && d.chapterCompleted[ch]) {
        d.currentState = 2;
        d.currentNode = null;
        d.currentBg = "";
      }

      const data = buildSaveData();
      if (name) { data.name = name; data.saveName = name; }
      if (note) data.note = note;
      const exist = readRaw(slot);
      if (exist && exist.createdAt) data.createdAt = exist.createdAt;
      localStorage.setItem(slotKey(slot), JSON.stringify(data));
      globalData.saveManager.saveCount++;
      if (data.chapter1Completed) globalData.anyChapter1Completed = true;
      if (data.ending) { globalData.anyEndingCompleted = true; unlockEnding(data.ending); }
      saveGlobal();
      return { success: true, slot, data };
    } catch (e) {
      WF.warn("[save] saveToSlot failed", e);
      return { success: false, error: e.message };
    }
  }

  function readRaw(slot) {
    try {
      const raw = localStorage.getItem(slotKey(slot));
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  function loadFromSlot(slot) {
    try {
      const raw = localStorage.getItem(slotKey(slot));
      if (!raw) return { success: false, error: "存档不存在" };
      const save = JSON.parse(raw);
      const validation = validateSave(save);
      if (!validation.valid) return { success: false, error: validation.reason };

      // 读档前先停掉当前引擎，避免旧剧情残留
      if (WF.Engine && WF.Engine.running) {
        WF.Engine.stop();
      }

      restoreSaveData(save);

      // ============================================================
      // 一致性修复：读档后校正剧情状态
      // 存档里可能存在"章节已完成，但 currentState 还是 1"的脏数据
      // 读档时统一修复，防止回到剧情
      // ============================================================
      const d = WF.State.data;
      const ch = d.chapter || 1;
      if (d.chapterCompleted && d.chapterCompleted[ch]) {
        d.currentState = 2;
        d.currentNode = null;
        d.currentBg = "";
      }

      globalData.saveManager.lastLoadedSlot = slot;
      saveGlobal();
      return { success: true, slot, data: save };
    } catch (e) {
      WF.warn("[save] loadFromSlot failed", e);
      return { success: false, error: "存档损坏" };
    }
  }

  function hasSlot(slot) { return !!localStorage.getItem(slotKey(slot)); }

  function deleteSlot(slot) {
    try {
      localStorage.removeItem(slotKey(slot));
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  function listSlots() {
    const out = [];
    for (let i = 1; i <= MAX_MANUAL_SLOTS; i++) {
      const raw = localStorage.getItem(KEYS.slot + i);
      if (raw) {
        try {
          const s = JSON.parse(raw);
          out.push({
            slot: i, empty: false,
            name: s.name || `存档 ${i}`,
            note: s.note || "",
            day: s.day, chapter: s.chapter,
            location: s.location,
            updatedAt: s.updatedAt, playTime: s.playTime || 0
          });
        } catch (e) {
          out.push({ slot: i, empty: true, corrupted: true });
        }
      } else {
        out.push({ slot: i, empty: true });
      }
    }
    return out;
  }

  function autoSave() { return saveToSlot("auto", "自动存档"); }
  function hasAuto() { return hasSlot("auto"); }
  function quickSave() { return saveToSlot("quick", "快速存档"); }
  function quickLoad() { return loadFromSlot("quick"); }
  function hasQuick() { return hasSlot("quick"); }

  /* ============================================================
     旧 v1 迁移
     ============================================================ */
  function hasLegacyAuto() { return !!localStorage.getItem(KEYS.legacyAuto); }

  function migrateLegacy() {
    try {
      const raw = localStorage.getItem(KEYS.legacyAuto);
      if (!raw) return { success: false, error: "无旧存档" };
      const legacy = JSON.parse(raw);
      WF.State.load(legacy);
      const d = WF.State.data;
      if (legacy.flags && legacy.flags.ch1_done) WF.State.markChapterComplete(1);
      const data = buildSaveData();
      data.name = "自动存档（迁移）";
      localStorage.setItem(KEYS.auto, JSON.stringify(data));
      if (data.chapter1Completed) globalData.anyChapter1Completed = true;
      saveGlobal();
      return { success: true, data };
    } catch (e) {
      console.warn("[save] migrateLegacy failed", e);
      return { success: false, error: e.message };
    }
  }

  function saveOnExit() {
    try {
      if (WF.Engine && WF.Engine.running) return false;
      const gameScreen = document.getElementById("screen-game");
      if (!gameScreen || !gameScreen.classList.contains("active")) return false;
      if (!WF.State.getFlag("at_campus")) return false;
      return saveToSlot("auto", "自动存档").success;
    } catch (e) { return false; }
  }

  /* ============================================================
     设置
     ============================================================ */
  function getSettings() { return globalData.settings; }
  function updateSettings(patch) {
    Object.assign(globalData.settings, patch || {});
    saveGlobal();
    return globalData.settings;
  }
  function loadSettings() {
    const s = globalData.settings;
    let legacy = {};
    try {
      legacy = JSON.parse(localStorage.getItem(KEYS.legacySettings) || "{}");
    } catch (e) {}
    return {
      volume: legacy.volume !== undefined ? legacy.volume : s.masterVolume,
      textSpeed: legacy.textSpeed !== undefined ? legacy.textSpeed : speedToRange(s.textSpeed),
      autoplay: legacy.autoplay !== undefined ? legacy.autoplay : s.autoPlay
    };
  }
  function speedToRange(ts) { return { slow: 30, normal: 60, fast: 90, instant: 100 }[ts] || 60; }
  function storeSettings(patch) {
    const s = {};
    if (patch.volume !== undefined) s.masterVolume = patch.volume;
    if (patch.textSpeed !== undefined) {
      s.textSpeed = patch.textSpeed < 45 ? "slow" : patch.textSpeed < 80 ? "normal" : "fast";
    }
    if (patch.autoplay !== undefined) s.autoPlay = patch.autoplay;
    Object.assign(globalData.settings, s);
    saveGlobal();
  }

  /* ============================================================
     全局成就 / 解锁记录
     ============================================================ */
  function unlockGlobalAchievement(id) {
    if (!globalData.achievements.unlocked.includes(id)) {
      globalData.achievements.unlocked.push(id);
      globalData.achievements.unlockedAt[id] = Date.now();
      saveGlobal();
      return true;
    }
    return false;
  }
  function hasGlobalAchievement(id) { return globalData.achievements.unlocked.includes(id); }

  function unlockPoems() { globalData.unlocks.poems = true; saveGlobal(); }
  function isPoemsUnlocked() { return globalData.unlocks.poems; }
  function unlockEnding(id) {
    if (id && !globalData.unlocks.endings.includes(id)) {
      globalData.unlocks.endings.push(id);
      globalData.stats.clearCount++;
      globalData.anyEndingCompleted = true;
      saveGlobal();
    }
  }
  function unlockGallery(id) {
    if (!globalData.unlocks.gallery.includes(id)) { globalData.unlocks.gallery.push(id); saveGlobal(); }
  }
  function unlockBGM(id) {
    if (!globalData.unlocks.bgm.includes(id)) { globalData.unlocks.bgm.push(id); saveGlobal(); }
  }
  function unlockScene(id) {
    if (!globalData.unlocks.scenes.includes(id)) { globalData.unlocks.scenes.push(id); saveGlobal(); }
  }
  function unlockMinigame(id) {
    if (!globalData.unlocks.minigames.includes(id)) { globalData.unlocks.minigames.push(id); saveGlobal(); }
  }

  /* ============================================================
     游玩统计
     ============================================================ */
  function recordPlayStart() {
    globalData.stats.playCount++;
    if (!globalData.stats.firstPlayTime) globalData.stats.firstPlayTime = Date.now();
    globalData.stats.lastPlayTime = Date.now();
    saveGlobal();
  }
  function addPlayTime(seconds) {
    globalData.stats.totalPlayTime += seconds || 0;
    saveGlobal();
  }
  function getGlobalStats() { return globalData.stats; }

  /* ============================================================
     导出
     ============================================================ */
  WF.Save = {
    SAVE_VERSION, GAME_VERSION, MAX_MANUAL_SLOTS,
    getGlobal: () => globalData,
    saveGlobal, getSettings, updateSettings,
    loadSettings, storeSettings,
    unlockGlobalAchievement, hasGlobalAchievement,
    unlockPoems, isPoemsUnlocked, unlockEnding,
    unlockGallery, unlockBGM, unlockScene, unlockMinigame,
    recordPlayStart, addPlayTime, getGlobalStats,
    saveToSlot, loadFromSlot, hasSlot, deleteSlot, listSlots,
    autoSave, hasAuto, quickSave, quickLoad, hasQuick,
    validateSave, buildSaveData, restoreSaveData, readRaw,
    hasLegacyAuto, migrateLegacy, saveOnExit
  };
})();