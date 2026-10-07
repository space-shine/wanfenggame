/* ============================================================
   GameState · 状态中心
   - 唯一临时变量源（UI 显示、逻辑判断都读这里）
   - 加字段只需改 freshState()，存档自动带上（save.js 深拷贝）
   ============================================================ */
(function () {
  "use strict";
  const WF = window.WF || (window.WF = {});

  const SAVE_VERSION = 2;

  /* ============================================================
     章节触发配置
     key: 章节号（触发哪一章）
     day: 最少天数
     affinity: 苏挽月最少好感
     name: 章节名
     ============================================================ */
  const CHAPTER_CONFIG = {
    2:  { day: 45,  name: "十月二十二，无声生辰" },
    3:  { day: 75,  name: "深秋寒夜，一只小猫" },
    4:  { day: 100, name: "长夜相伴，心动落地" },
    5:  { day: 130, name: "朝夕自习，固定偏爱" },
    6:  { day: 185, name: "春日将至，心意难藏" },
    7:  { day: 225, name: "四月十九，晚风告白" },
    8:  { day: 330, name: "大二 · 并肩同行" },
    9:  { day: 360, name: "大二 · 秋日研学" },
    10: { day: 420, name: "大二 · 泰山之行" },
    11: { day: 480, name: "大二 · 人间安稳" },
    12: { day: 540, name: "大三 · 步入实验室" },
    13: { day: 570, name: "大三 · 噩梦初生" },
    14: { day: 590, name: "大三 · 风雨夹击" },
    15: { day: 610, name: "大三 · 风的馈赠" },
    16: { day: 630, name: "大三 · 背叛！？" },
    17: { day: 650, name: "大三 · 口罩遮容" },
    18: { day: 680, name: "终章 · 药成，人未归" },
    19: { day: 690, name: "终章 · 愧疚坦白" },
    20: { day: 695, name: "终章 · 旧物回溯" }
  };

  function freshState() {
    return {
      version: SAVE_VERSION,

      /* ---- 时间与地点 ---- */
      day: 1,
      period: "morning",                // morning / afternoon / evening / night
      location: "train",
      weekday: 1,

      /* ---- 章节与剧情状态 ---- */
      chapter: 1,
      currentNode: null,
      currentState: 2,                  // 1=剧情中 / 2=主界面
      currentSlot: null,                // 当前存档槽
      currentBg: "",                    // 读档恢复用：当前背景
      saveName: "",                     // 当前存档名
      chapterCompleted: {},             // {1:true, 2:true, ...}
      chapter1Completed: false,

      /* ---- 下一章触发条件 ---- */
      nextChapterDay: 0,
      nextChapterAffinity: 0,
      nextChapterName: "",
      nextChapterNum: 0,
      needNextChapter: false,

      /* ---- 属性衰减计数（距离上次运动/社交/学习的"天"） ---- */
      lastSportDay: 1,
      lastSocialDay: 1,
      lastStudyDay: 1,

      /* ---- 功能按钮解锁/打开状态 ---- */
      phoneUnlocked: false,
      pcUnlocked: false,
      peopleUnlocked: false,
      mapUnlocked: false,
      phoneOpened: false,
      pcOpened: false,
      peopleOpened: false,

      /* ---- 核心属性 ---- */
      stamina: 60,                      // 体力
      staminaMax: 60,
      mood: 80,                         // 心情 0-100
      health: 100,                      // 健康 0-100
      iq: 50,                           // 智商 0-100
      eq: 50,                           // 情商 0-100
      money: 10000000,                  // 金钱

      /* ---- 学习 / 研究 ---- */
      graduated: false,                 // 是否已进入"研发阶段"（大三以后 true，剧本控制）
      researchProgress: 0,              // 实验/研发进度（大三以后用）
      research: { stage: 1, progress: 0 },
      researchNotes: [],                // 研究笔记
      codex: [],                        // 图鉴条目

      /* ---- 选课 / 学期 ---- */
      courses: [],                      // 已选课程 id 列表（按顺序）
      courseProgress: {},               // {courseId: 0-100}
      courseTerm: {},                   // {courseId: "大一上"}
      courseGrade: {},                  // {courseId: 分数}
      failedCourses: [],                // 挂科课程 id
      studyCountToday: 0,               // 今天已上课次数
      studyCountDay: 0,                 // 记录 studyCountToday 是哪天的
      extraStudy: 0,                    // 课程满 100% 后的额外学习点数
      term: "大一上",
      termEnded: {},                    // 已考试的学期
      credits: 0,
      gpa: 0,

      /* ---- 人际 ---- */
      people: {},                       // {charId:{met,intimacy,memories,unread}}
      chatRecords: {},                  // {charId:[{from,text}]}
      friendAdded: {},                  // {charId:true}
      chatStep: {},                     // {charId:n} 选项式聊天进度
      dailyGreet: {},                   // {charId: 上次问候的天数}

      /* ---- 支线 ---- */
      sideQuestProgress: {},
      appointments: [],                 // 支线约定 [{id,charId,day,location,eventId,title,done}]

      /* ---- 偶遇 ---- */
      encounterToday: null,             // {id,charId,location,title,done}
      lastEncounterDay: 0,
      recentEncounters: [],             // 最近偶遇 id（避免连续重复）

      /* ---- 背包 ---- */
      items: [],
      itemCounts: {},
      inventory: {},

      /* ---- 剧情 flag / 分支 ---- */
      flags: {},
      keyChoices: [],
      seenNodes: [],
      achievements: [],
      branch: "main",
      ifLine: null,
      ending: null,

      /* ---- 邮箱 ---- */
      enabledMails: [],
      readMails: [],
      ownedEmails: [],

      /* ---- 诗集 ---- */
      poemsUnlocked: false,

      /* ---- 交通 ---- */
      hasBike: false,
      bikeEquipped: false,
      unlockedLocations: [],

      /* ---- 小游戏记录 ---- */
      minigameBest: {},
      minigamePlayCount: 0,
      minigameFailCount: 0,
      minigameSkipCount: 0,

      /* ---- 简单行为统计 ---- */
      stats: { study: 0, work: 0, stayup: 0, meals: 0, selfStudy: 0 }
    };
  }

  let data = freshState();

  WF.State = {
    SAVE_VERSION,
    get data() { return data; },

    reset() { data = freshState(); return data; },

    /* 读档：以默认状态为底，浅合并存档数据；嵌套字段单独兜底 */
    load(obj) {
      const base = freshState();
      const src = obj || {};
      data = Object.assign(base, src);

      // 嵌套字段兜底（避免旧存档缺字段）
      const nestedDefaults = {
        flags: {},
        people: {},
        chatRecords: {},
        friendAdded: {},
        chatStep: {},
        dailyGreet: {},
        sideQuestProgress: {},
        appointments: [],
        recentEncounters: [],
        itemCounts: {},
        inventory: {},
        courseProgress: {},
        courseTerm: {},
        courseGrade: {},
        failedCourses: [],
        termEnded: {},
        chapterCompleted: {},
        researchNotes: [],
        codex: [],
        courses: [],
        achievements: [],
        seenNodes: [],
        keyChoices: [],
        enabledMails: [],
        readMails: [],
        ownedEmails: [],
        unlockedLocations: [],
        items: [],
        minigameBest: {}
      };
      Object.keys(nestedDefaults).forEach(k => {
        if (data[k] === undefined || data[k] === null) {
          data[k] = JSON.parse(JSON.stringify(nestedDefaults[k]));
        }
      });
      data.research = Object.assign({ stage: 1, progress: 0 }, src.research || {});
      data.stats = Object.assign(freshState().stats, src.stats || {});

      // v1 旧存档兼容：favor → people.intimacy
      if (src.favor) {
        Object.entries(src.favor).forEach(([k, v]) => {
          if (v > 0) {
            const p = this.peopleOf(k);
            p.intimacy = Math.max(p.intimacy, v);
          }
        });
      }
            // v1 旧存档兼容：ch1_done → 章节完成
      if (src.flags && src.flags.ch1_done) this.markChapterComplete(1);

      // ============================================================
      // 读档后校正 nextChapter：以 chapterCompleted 为准
      // 防止存档里 nextChapter 字段陈旧导致待办 UI 显示错误的章节
      // ============================================================
      const completed = Object.keys(data.chapterCompleted || {})
        .filter(k => data.chapterCompleted[k])
        .map(Number);
      if (completed.length > 0) {
        const maxCh = Math.max.apply(null, completed);
        const next = CHAPTER_CONFIG[maxCh + 1];
        if (next) {
          data.nextChapterNum = maxCh + 1;
          data.nextChapterDay = next.day;
          data.nextChapterName = next.name;
          data.needNextChapter = false;
        } else {
          // 没有下一章
          data.nextChapterNum = 0;
          data.nextChapterDay = 0;
          data.nextChapterName = "";
          data.needNextChapter = false;
        }
      }

      return data;
    },

    /* ========== 剧情 flag ========== */
    flag(key, val) { data.flags[key] = (val === undefined ? true : val); },
    getFlag(key) { return data.flags[key]; },
    has(key) { return !!data.flags[key]; },

    /* ========== 章节完成 ========== */
    markChapterComplete(n) {
      data.chapterCompleted[n] = true;
      // 第一章完成 → 解锁功能
      if (n === 1) {
        data.chapter1Completed = true;
        data.phoneUnlocked = true;
        data.pcUnlocked = true;
        data.peopleUnlocked = true;
        data.mapUnlocked = true;
      }
      // 自动设置下一章触发条件
      const next = CHAPTER_CONFIG[n + 1];
      if (next) {
        this.setNextChapter(n + 1, next.day, next.name);
      } else {
        // 没有下一章，清空触发条件
        data.nextChapterDay = 0;
        data.nextChapterName = "";
        data.nextChapterNum = 0;
      }
    },
    isChapterComplete(n) { return !!data.chapterCompleted[n]; },

    /* ========== 下一章触发条件 ========== */
    setNextChapter(chapterNum, minDay, chapterName) {
      data.nextChapterDay = minDay;
      data.nextChapterName = chapterName;
      data.nextChapterNum = chapterNum;
      data.needNextChapter = false;
    },

    checkNextChapter() {
      if (!data.nextChapterDay) return false;
      // 下一章已经完成 → 不再触发
      if (data.nextChapterNum && data.chapterCompleted[data.nextChapterNum]) {
        return false;
      }
      if (data.needNextChapter) return true;
      // 只按天数解锁，不绑亲密度
      const dayOk = data.day >= data.nextChapterDay;
      if (dayOk) {
        data.needNextChapter = true;
        WF.eventbus.emit("next-chapter-ready");
        return true;
      }
      return false;
    },

    /* ========== 人际 / 亲密度 ========== */
    peopleOf(id) {
      if (!data.people[id]) data.people[id] = { met: false, intimacy: 0, memories: [], unread: false };
      return data.people[id];
    },
    meet(id) {
      const p = this.peopleOf(id);
      const first = !p.met;
      p.met = true;
      if (first) WF.eventbus.emit("people-met", { id });
      return first;
    },
    intimacyOf(id) {
      return data.people[id] ? data.people[id].intimacy : 0;
    },
    addIntimacy(id, n) {
      const p = this.peopleOf(id);
      const cap = id === "su" ? 999 : 99;   // 女主可突破 100（影响 IF 线），其他封顶 99
      const oldLevel = this.intimacyLevel(p.intimacy);
      p.intimacy = Math.max(0, Math.min(cap, p.intimacy + n));
      const newLevel = this.intimacyLevel(p.intimacy);
      WF.eventbus.emit("people-intimacy", { id, value: p.intimacy });
      // 等级突破提示
      if (oldLevel !== newLevel) {
        const c = WF.Characters && WF.Characters.get(id);
        if (c) WF.Toast.show(`解锁关系：${c.name} · ${newLevel}`, "favor", 4200);
      }
      return p.intimacy;
    },
    addMemory(id, text) {
      const p = this.peopleOf(id);
      if (text && !p.memories.includes(text)) p.memories.push(text);
    },
    setUnread(id, val) {
      const p = this.peopleOf(id);
      p.unread = (val === undefined ? true : val);
    },

    intimacyLevel(intimacy) {
      if (intimacy >= 200) return "命中注定";   // 预留：IF 线门槛
      if (intimacy >= 150) return "灵魂相依";   // 预留：IF 线门槛
      if (intimacy >= 100) return "恋人";
      if (intimacy >= 80) return "亲如亲人";
      if (intimacy >= 60) return "真心朋友";
      if (intimacy >= 40) return "亲密朋友";
      if (intimacy >= 20) return "好朋友";
      if (intimacy > 0) return "认识";
      return "陌生";
    },

    /* ========== 研究进度 ========== */
    addProgress(n) {
      data.research.progress = Math.max(0, data.research.progress + n);
      WF.eventbus.emit("progress", { n, value: data.research.progress });
      return data.research.progress;
    },

    /* ========== 金钱 / 物品 ========== */
    addMoney(n) { data.money = Math.max(0, data.money + n); return data.money; },
    addItem(item, count) {
      if (!data.items.includes(item)) data.items.push(item);
      data.itemCounts[item] = (data.itemCounts[item] || 0) + (count || 1);
      if (!data.inventory) data.inventory = {};
      data.inventory[item] = true;
    },
    removeItem(item, count) {
      const c = data.itemCounts[item] || 0;
      const n = Math.max(0, c - (count || 1));
      data.itemCounts[item] = n;
      if (n === 0) {
        data.items = data.items.filter(x => x !== item);
        if (data.inventory) delete data.inventory[item];
      }
    },
    bump(stat, n) { data.stats[stat] = (data.stats[stat] || 0) + (n || 1); },

    /* ========== 成就 ========== */
    unlockAchievement(id) {
      if (data.achievements.includes(id)) return false;
      data.achievements.push(id);
      // 同步到全局存档（持久化，刷新不丢）
      if (WF.Save && WF.Save.unlockGlobalAchievement) {
        WF.Save.unlockGlobalAchievement(id);
      }
      return true;
    },
    hasAchievement(id) { return data.achievements.includes(id); },

    markSeen(nodeId) {
      if (nodeId && !data.seenNodes.includes(nodeId)) data.seenNodes.push(nodeId);
    },

    /* ========== 属性衰减检查（每天结算时调用） ========== */
    checkDecay() {
      const decayMsgs = [];
      if (data.day - data.lastSportDay >= 2) {
        data.health = Math.max(0, data.health - 3);
        decayMsgs.push("健康 -3（太久没运动）");
      }
      if (data.day - data.lastSocialDay >= 3) {
        data.eq = Math.max(0, data.eq - 3);
        decayMsgs.push("情商 -3（太久没社交）");
      }
      if (data.day - data.lastStudyDay >= 3) {
        data.iq = Math.max(0, data.iq - 3);
        decayMsgs.push("智商 -3（太久没学习）");
      }
      return decayMsgs;
    }
  };
})();