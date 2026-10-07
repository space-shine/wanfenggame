/* ============================================================
   游戏启动与全局交互绑定
   ============================================================ */
(function () {
  "use strict";
  const WF = window.WF;

  let libraryOrigin = "title";

  const screens = {
    title:   document.getElementById("screen-title"),
    game:    document.getElementById("screen-game"),
    library: document.getElementById("screen-library")
  };
  const modals = {
    settings: document.getElementById("modal-settings"),
    people:   document.getElementById("modal-people"),
    map:      document.getElementById("modal-map"),
    phone:    document.getElementById("modal-phone"),
    pc:       document.getElementById("modal-pc"),
    review:   document.getElementById("modal-review")
  };

  function showScreen(name) {
    Object.entries(screens).forEach(([k, el]) => {
      if (el) el.classList.toggle("active", k === name);
    });
  }
  function showModal(name, show) {
    const m = modals[name];
    if (m) m.classList.toggle("hidden", !show);
  }

  const LOC_BG = {
    dorm:       "url(assets/bg/dorm.jpg) center/cover no-repeat",
    teaching:   "url(assets/bg/teaching.jpg) center/cover no-repeat",
    library:    "url(assets/bg/library.jpg) center/cover no-repeat",
    canteen:    "url(assets/bg/canteen.jpg) center/cover no-repeat",
    lab:        "url(assets/bg/lab.jpg) center/cover no-repeat",
    playground: "url(assets/bg/playground.jpg) center/cover no-repeat",
    clubroom:   "url(assets/bg/clubroom.jpg) center/cover no-repeat",
    clinic:     "url(assets/bg/clinic.jpg) center/cover no-repeat",
    cafe:       "url(assets/bg/cafe.jpg) center/cover no-repeat"
  };

  /* ============================================================
     HUD 刷新
     ============================================================ */
  function refreshHud() {
    const d = WF.State.data;
    document.getElementById("hud-date").textContent =
      `第 ${d.day} 天 · ${WF.Locations.nameOf(d.location)}`;
    document.getElementById("hud-chapter").textContent = "挽风";

    updateTodoUI();

    if (!WF.Engine.running) {
      const bg = LOC_BG[d.location];
      if (bg) document.getElementById("bg-layer").style.background = bg;
    }
    updateButtons();
    if (WF.ActionPanel) WF.ActionPanel.render();

    // 只更新"下一章是否就绪"状态（不触发引擎）
    WF.State.checkNextChapter();
  }
  WF.eventbus.on("hud-update", refreshHud);
  WF.eventbus.on("node-change", refreshHud);
  WF.eventbus.on("ch-end", refreshHud);
  WF.eventbus.on("people-intimacy", refreshHud);
  WF.eventbus.on("people-met", refreshHud);

  /* ============================================================
     待办 UI
     ============================================================ */
  function updateTodoUI() {
    const el = document.getElementById("hud-todo");
    if (!el) return;

    // 剧情中隐藏待办 UI
    if (WF.Engine.running) {
      el.style.display = "none";
      return;
    }
    el.style.display = "";

    const d = WF.State.data;
    let html = "";

    /* 主线任务（只按天数） */
    if (d.nextChapterDay && d.nextChapterName) {
      const dayOk = d.day >= d.nextChapterDay;
      const chNum = d.nextChapterNum || "?";

      if (dayOk) {
        html += `<div class="todo-item main ready">
          <div class="todo-tag">主线 · 第 ${chNum} 章</div>
          <div class="todo-name">${d.nextChapterName}</div>
          <div class="todo-ready">✦ 到达任何地方均可触发主线</div>
        </div>`;
      } else {
        const dayColor = "#e7c458";
        html += `<div class="todo-item main">
          <div class="todo-tag">主线 · 第 ${chNum} 章</div>
          <div class="todo-name">${d.nextChapterName}</div>
          <div class="todo-req">
            触发条件：第 <span style="color:${dayColor}">${d.nextChapterDay}</span> 天
            （当前第 ${d.day} 天）
          </div>
        </div>`;
      }
    }

    /* 支线约定 */
    if (WF.SideQuest) {
      WF.SideQuest.listActive().forEach(a => {
        const info = WF.SideQuest.getDisplayInfo(a);
        html += `<div class="todo-item side">
          <div class="todo-tag side-tag">支线 · 约定</div>
          <div class="todo-name side-name">${a.title}</div>
          <div class="todo-req">
            <span style="color:${info.color}">${info.text}</span> · ${WF.Locations.nameOf(a.location)}
          </div>
        </div>`;
      });
    }

    /* 偶遇 */
    if (WF.Encounter) {
      const enc = WF.Encounter.getAvailableHere();
      if (enc) {
        html += `<div class="todo-item enc">
          <div class="todo-tag enc-tag">偶遇</div>
          <div class="todo-name enc-name">${enc.title}</div>
        </div>`;
      }
    }

    el.innerHTML = html;
  }

  /* ============================================================
     按钮启停
     ============================================================ */
  function updateButtons() {
    const running = WF.Engine.running;
    const d = WF.State.data;
    const hasMet = Object.values(d.people).some(p => p.met);
    const set = (act, enabled) => {
      const b = document.querySelector(`[data-action="${act}"]`);
      if (b) b.disabled = !enabled;
    };
    set("phone", d.phoneUnlocked && hasMet);
    set("people", d.peopleUnlocked && hasMet);
    set("map", d.mapUnlocked && !running);
    set("pc", d.pcUnlocked && !running);
    set("ach", true);
    const phoneBtn = document.querySelector('[data-action="phone"]');
    if (phoneBtn) {
      const hasUnread = Object.values(d.people).some(p => p.met && p.unread);
      phoneBtn.classList.toggle("has-dot", hasUnread);
    }
  }

  /* ============================================================
     进入自由模式（主界面）
     ============================================================ */
  function enterFreeMode() {
    WF.Engine.running = false;
    WF.State.data.currentState = 2;
    WF.State.data.currentNode = null;
    WF.State.data.currentBg = "";
    document.getElementById("dialogue-area").classList.add("hidden");
    document.getElementById("scene-end").classList.add("hidden");
    const d = WF.State.data;
    const bg = LOC_BG[d.location];
    if (bg) document.getElementById("bg-layer").style.background = bg;
    refreshHud();
    showScreen("game");
  }

  /* ============================================================
     读档后恢复
     ============================================================ */
    function afterLoad() {
    const d = WF.State.data;

    // 调试日志：读档时打印当前状态
    WF.log("[afterLoad] currentState=", d.currentState,
            "currentNode=", d.currentNode,
            "chapter=", d.chapter,
            "chapterCompleted=", JSON.stringify(d.chapterCompleted));

    /* ============================================================
       绝对保险的判断：
       1. 如果 currentState 不是 1 → 一定不在剧情中 → 进主界面
       2. 如果 currentNode 是空的 → 没有剧情节点 → 进主界面
       3. 如果当前章节已完成 → 进主界面
       4. 只有以上都不满足，才进剧情恢复
       ============================================================ */

    // 判断 1：状态不是剧情
    if (d.currentState !== 1) {
      enterFreeMode();
      return;
    }

    // 判断 2：没有节点
    if (!d.currentNode) {
      enterFreeMode();
      return;
    }

    // 判断 3：当前章节已完成
    if (d.chapterCompleted && d.chapterCompleted[d.chapter]) {
      d.currentState = 2;
      d.currentNode = null;
      d.currentBg = "";
      enterFreeMode();
      return;
    }

    // 判断 4：恢复剧情
    const chNum = d.chapter || 1;
    const scene = WF.Scenes["ch" + String(chNum).padStart(2, "0")] || WF.Scenes.ch01;
    if (!scene) {
      enterFreeMode();
      return;
    }

    const idx = scene.nodes.findIndex(n => (n.id || "") === d.currentNode);
    const node = idx >= 0 ? scene.nodes[idx] : null;

    // 判断 5：节点不存在或已是 end 节点 → 视为已完成
    if (!node || node.type === "end") {
      d.currentState = 2;
      d.currentNode = null;
      d.currentBg = "";
      enterFreeMode();
      return;
    }

    // 通过所有判断 → 恢复剧情
    showScreen("game");
    document.getElementById("dialogue-area").classList.remove("hidden");
    WF.Engine.startAt(scene, d.currentNode);
    refreshHud();
  }
  WF.afterLoad = afterLoad;

  /* ============================================================
     存档动画
     ============================================================ */
  function showSaveAnim(name) {
    const el = document.createElement("div");
    el.className = "save-anim";
    el.innerHTML = `<div class="spin"></div><span>已保存到 ${name}</span>`;
    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add("show"));
    setTimeout(() => {
      el.classList.remove("show");
      setTimeout(() => el.remove(), 400);
    }, 1600);
  }

  function doQuickSaveAnim() {
    const d = WF.State.data;
    if (!d.currentSlot) {
      WF.Toast.show("请先通过读取存档或开始游戏分配一个存档槽");
      return;
    }
    const name = d.saveName || ("存档 " + d.currentSlot);
    const r = WF.Save.saveToSlot(d.currentSlot, name);
    if (r.success) {
      showSaveAnim(name);
    } else {
      WF.Toast.show("保存失败：" + r.error);
    }
  }

  /* ============================================================
     开始 / 返回
     ============================================================ */
  function findNextFreeSlot() {
    const slots = WF.Save.listSlots();
    for (let i = 0; i < slots.length; i++) {
      if (slots[i].empty) return slots[i].slot;
    }
    return 1;
  }

  function startGame() {
    WF.State.reset();
    const newSlot = findNextFreeSlot();
    WF.State.data.currentSlot = newSlot;
    WF.State.data.saveName = "存档 " + newSlot;
    document.getElementById("scene-end").classList.add("hidden");
    refreshHud();
    showScreen("game");
    WF.Save.recordPlayStart();
    WF.Engine.start(WF.Scenes.ch01);
  }

  function backToTitle() {
    WF.Save.saveOnExit();
    WF.Engine.stop();
    document.getElementById("scene-end").classList.add("hidden");
    showScreen("title");
    updateTitleMenu();
  }

  function updateTitleMenu() {
    const hasSave = WF.Save.hasAuto() ||
      WF.Save.listSlots().some(s => !s.empty) ||
      WF.Save.hasLegacyAuto();
    const loadBtn = document.querySelector('[data-action="load"]');
    if (loadBtn) loadBtn.disabled = !hasSave;
  }

  /* ============================================================
     下一章执行（判断交给 State.checkNextChapter）
     ============================================================ */
  function checkNextChapter() {
    const d = WF.State.data;
    if (!d.needNextChapter) return false;
    const chNum = d.nextChapterNum;
    // 双保险：下一章已完成就不执行
    if (d.chapterCompleted && d.chapterCompleted[chNum]) {
      d.needNextChapter = false;
      return false;
    }
    const scene = WF.Scenes["ch" + String(chNum).padStart(2, "0")];
    if (!scene) {
      WF.warn("[checkNextChapter] 章节数据未找到: ch" + chNum);
      return false;
    }
    d.needNextChapter = false;
    d.chapter = chNum;
    showScreen("game");
    const ap = document.getElementById("action-panel");
    if (ap) ap.classList.add("hidden");
    WF.Engine.start(scene);
    return true;
  }
  WF.checkNextChapter = checkNextChapter;

  /* ============================================================
     成就 / 收集 / 游玩信息
     ============================================================ */
  function openAch(useGlobal, from) {
    libraryOrigin = from || "title";
    showScreen("library");
    document.getElementById("library-title").textContent =
      useGlobal ? "成就系统 · 全部存档" : "成就系统 · 本周目";
    const { A: aList, B: bList } = WF.Achievements.listAll(useGlobal);

    const list = document.getElementById("library-list");
    let html = `<div class="lib-cat">日常成就</div>`;
    aList.forEach(a => {
      const cls = a.unlocked ? "" : " locked";
      const icon = a.unlocked ? "🏆" : "🔒";
      html += `<div class="lib-item${cls}" data-type="A" data-id="${a.id}">
        <span class="lib-icon">${icon}</span>
        <span class="lib-name">${a.name}</span>
      </div>`;
    });
    html += `<div class="lib-cat" style="margin-top:14px">伏笔成就</div>`;
    bList.forEach(b => {
      let cls = " locked", icon = "❓", name = `「${b.poem}」？？？`;
      if (b.revealed) { cls = " revealed"; icon = "✨"; name = `「${b.poem}」`; }
      else if (b.unlocked) { cls = ""; icon = "✦"; name = `「${b.poem}」`; }
      html += `<div class="lib-item${cls}" data-type="B" data-id="${b.id}">
        <span class="lib-icon">${icon}</span>
        <span class="lib-name">${name}</span>
      </div>`;
    });
    list.innerHTML = html;

    document.getElementById("library-detail").innerHTML =
      `<div class="library-empty">左侧选择一项查看详情</div>`;

    list.querySelectorAll(".lib-item").forEach(item => {
      item.onclick = () => {
        list.querySelectorAll(".lib-item").forEach(i => i.classList.remove("on"));
        item.classList.add("on");
        showAchDetail(item.dataset.type, item.dataset.id, aList, bList);
      };
    });
  }

  function showAchDetail(type, id, aList, bList) {
    const detail = document.getElementById("library-detail");
    if (type === "A") {
      const a = aList.find(x => x.id === id);
      if (!a) return;
      if (a.unlocked) {
        detail.innerHTML = `
          <div class="detail-icon">🏆</div>
          <div class="detail-name">${a.name}</div>
          <div class="detail-sub">日常成就 · 已达成</div>
          <div class="detail-desc">${a.desc}</div>`;
      } else {
        detail.innerHTML = `
          <div class="detail-icon">🔒</div>
          <div class="detail-name">${a.name}</div>
          <div class="detail-sub">日常成就</div>
          <div class="detail-desc detail-locked">尚未达成</div>`;
      }
    } else {
      const b = bList.find(x => x.id === id);
      if (!b) return;
      if (b.revealed) {
        detail.innerHTML = `
          <div class="detail-icon">✨</div>
          <div class="detail-name">「${b.poem}」</div>
          <div class="detail-sub">伏笔成就 · 详情已揭晓</div>
          <div class="detail-desc">${b.answer}</div>`;
      } else if (b.unlocked) {
        detail.innerHTML = `
          <div class="detail-icon">✦</div>
          <div class="detail-name">「${b.poem}」？？？</div>
          <div class="detail-sub">伏笔成就 · 已留下印记</div>
          <div class="detail-desc detail-locked">具体内容待终章揭晓</div>`;
      } else {
        detail.innerHTML = `
          <div class="detail-icon">❓</div>
          <div class="detail-name">「${b.poem}」？？？</div>
          <div class="detail-sub">伏笔成就</div>
          <div class="detail-desc detail-locked">未知</div>`;
      }
    }
  }

  function openGallery() {
    libraryOrigin = "title";
    showScreen("library");
    document.getElementById("library-title").textContent = "收集";
    const g = WF.Save.getGlobal().unlocks;

    const categories = [
      { key:"endings",   label:"结局",   icon:"🎬", empty:"尚未解锁任何结局" },
      { key:"scenes",    label:"场景",   icon:"🏞", empty:"尚未发现特殊场景" },
      { key:"bgm",       label:"BGM",    icon:"🎵", empty:"尚未收集音乐" },
      { key:"gallery",   label:"图鉴",   icon:"📖", empty:"图鉴还是空的" },
      { key:"minigames", label:"小游戏", icon:"🎮", empty:"尚未完成小游戏" }
    ];

    const list = document.getElementById("library-list");
    let html = "";
    categories.forEach(cat => {
      const arr = g[cat.key] || [];
      html += `<div class="lib-cat">${cat.label}</div>`;
      if (!arr.length) {
        html += `<div class="lib-item locked" data-cat="${cat.key}" data-empty="1">
          <span class="lib-icon">${cat.icon}</span>
          <span class="lib-name">暂无</span>
        </div>`;
      } else {
        arr.forEach((x, i) => {
          html += `<div class="lib-item" data-cat="${cat.key}" data-idx="${i}">
            <span class="lib-icon">${cat.icon}</span>
            <span class="lib-name">${x}</span>
          </div>`;
        });
      }
    });
    list.innerHTML = html;

    document.getElementById("library-detail").innerHTML =
      `<div class="library-empty">左侧选择一项查看详情</div>`;

    list.querySelectorAll(".lib-item").forEach(item => {
      item.onclick = () => {
        if (item.dataset.empty) {
          const cat = categories.find(c => c.key === item.dataset.cat);
          document.getElementById("library-detail").innerHTML =
            `<div class="library-empty">${cat.empty}</div>`;
          return;
        }
        list.querySelectorAll(".lib-item").forEach(i => i.classList.remove("on"));
        item.classList.add("on");
        const cat = categories.find(c => c.key === item.dataset.cat);
        const idx = parseInt(item.dataset.idx);
        const name = g[cat.key][idx];
        document.getElementById("library-detail").innerHTML = `
          <div class="detail-icon">${cat.icon}</div>
          <div class="detail-name">${name}</div>
          <div class="detail-sub">${cat.label} · 收集品</div>
          <div class="detail-desc">${name}</div>`;
      };
    });
  }

  function openPlayInfo() {
    const list = document.getElementById("review-list");
    document.getElementById("review-title").textContent = "游玩信息";
    const s = WF.Save.getGlobalStats();
    const fmt = ts => ts ? new Date(ts).toLocaleString("zh-CN") : "—";
    const mins = Math.round(s.totalPlayTime / 60);
    list.innerHTML = `
      <div class="playinfo">
        <div class="pi-row"><span>游玩次数</span><b>${s.playCount}</b></div>
        <div class="pi-row"><span>总游戏时长</span><b>${mins} 分钟</b></div>
        <div class="pi-row"><span>通关次数</span><b>${s.clearCount}</b></div>
        <div class="pi-row"><span>解锁支线</span><b>${s.sideQuestsUnlocked || 0}</b></div>
        <div class="pi-row"><span>首次游玩</span><b>${fmt(s.firstPlayTime)}</b></div>
        <div class="pi-row"><span>最近游玩</span><b>${fmt(s.lastPlayTime)}</b></div>
      </div>`;
    showModal("review", true);
  }

  /* ============================================================
     终章开锁动画
     ============================================================ */
  window.showUnlockDemo = function () {
    ["modal-pc","modal-phone","modal-people","modal-save","modal-settings","modal-review"]
      .forEach(id => { const m = document.getElementById(id); if (m) m.classList.add("hidden"); });

    let audioCtx = null;
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === "suspended") audioCtx.resume();
    } catch (e) {}

    const ROW = 36, VISIBLE = 7, WIN_H = ROW * VISIBLE;
    const poems = ["铁轨尽头的风","十月的第二十二页","糖糖的第七个夜晚","四月十九，晚风告白","风儿吹过老槐树","十年之约，泰山日出","风的馈赠","口罩下的下颌线","药成，人未归","她写的诗，他终于读懂了","希望治好我的病","风停之前"];

    const overlay = document.createElement("div");
    overlay.style.cssText =
      "position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;" +
      "background:radial-gradient(circle at 50% 35%,rgba(28,38,32,.82),rgba(8,12,10,.94));" +
      "opacity:0;transition:opacity .8s ease;cursor:pointer;";
    overlay.innerHTML =
      "<div style='width:min(560px,92vw);text-align:center;color:#fff;display:flex;flex-direction:column;align-items:center'>" +
        "<div id='ul-lock' style='font-size:68px;height:92px;line-height:92px;transition:transform .9s ease,opacity .9s ease;transform:scale(.4);opacity:0'>🔒</div>" +
        "<div id='ul-title' style='height:38px;line-height:38px;font-size:23px;font-weight:bold;color:#e7c458;letter-spacing:5px;opacity:0;transition:opacity .8s ease'>成就解释 · 解锁</div>" +
        "<div style='height:" + WIN_H + "px;width:100%;overflow:hidden;margin:6px 0'>" +
          "<div id='ul-list' style='display:flex;flex-direction:column;transition:transform .55s ease'></div>" +
        "</div>" +
        "<div id='ul-hint' style='height:34px;line-height:34px;font-size:19px;color:#e7c458;letter-spacing:2px;opacity:0;transition:opacity .9s ease'>具体内容请看成就系统</div>" +
      "</div>";
    document.body.appendChild(overlay);
    requestAnimationFrame(() => { overlay.style.opacity = "1"; });

    function clickSound() {
      try {
        const ctx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator(), gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.type = "square";
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + .12);
        gain.gain.setValueAtTime(.22, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .2);
        osc.start(ctx.currentTime); osc.stop(ctx.currentTime + .2);
      } catch (e) {}
    }

    const lock = overlay.querySelector("#ul-lock");
    const title = overlay.querySelector("#ul-title");
    const list = overlay.querySelector("#ul-list");
    const hint = overlay.querySelector("#ul-hint");

    setTimeout(() => { lock.style.transform = "scale(1)"; lock.style.opacity = "1"; }, 450);
    setTimeout(() => { lock.textContent = "🔓"; clickSound(); }, 1400);
    setTimeout(() => {
      lock.style.transform = "translateY(-160px) scale(1)";
      lock.style.opacity = "0";
    }, 2250);
    setTimeout(() => { title.style.opacity = "1"; }, 2500);

    const STEP = 620;
    poems.forEach((p, i) => {
      setTimeout(() => {
        const el = document.createElement("div");
        el.style.cssText = "height:" + ROW + "px;line-height:" + ROW + "px;font-size:17px;color:#f2efe8;opacity:0;transform:translateY(16px);transition:all .5s ease;";
        el.innerHTML = "「" + p + "」 <span class='qm' style='color:#e7c458;font-weight:bold'>？？？</span>";
        list.appendChild(el);
        requestAnimationFrame(() => { el.style.opacity = "1"; el.style.transform = "translateY(0)"; });
        setTimeout(() => { const q = el.querySelector(".qm"); if (q) q.textContent = ""; }, 560);
        const shown = i + 1;
        if (shown > VISIBLE) list.style.transform = "translateY(-" + ((shown - VISIBLE) * ROW) + "px)";
      }, 3300 + i * STEP);
    });
    setTimeout(() => { hint.style.opacity = "1"; }, 3300 + poems.length * STEP + 400);
    setTimeout(() => { overlay.style.opacity = "0"; setTimeout(() => overlay.remove(), 900); },
      3300 + poems.length * STEP + 2600);
    overlay.onclick = () => { overlay.style.opacity = "0"; setTimeout(() => overlay.remove(), 500); };
  };

  /* ============================================================
     全局按钮
     ============================================================ */
  document.addEventListener("click", e => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    switch (btn.dataset.action) {
      case "start": startGame(); break;
      case "load": WF.SaveView.open(); break;
      case "settings": showModal("settings", true); break;
      case "settings-close": showModal("settings", false); break;
      case "save": doQuickSaveAnim(); break;
      case "save-close": WF.SaveView.close(); break;
      case "people": WF.PeopleView.open(); break;
      case "people-close": WF.PeopleView.close(); break;
      case "map": WF.MapView.open(); break;
      case "map-close": WF.MapView.close(); break;
      case "phone": WF.PhoneView.open(); break;
      case "phone-close": WF.PhoneView.close(); break;
      case "pc": WF.PCView.openMain(); break;
      case "profile": WF.ProfileView.open(); break;
      case "ach": openAch(false, "game"); break;
      case "ach-page": openAch(true, "title"); break;
      case "gallery": openGallery(); break;
      case "playinfo": openPlayInfo(); break;
      case "review-close": showModal("review", false); break;
      case "title": backToTitle(); break;
      case "unlock-demo": showUnlockDemo(); break;
      default: break;
    }
  });

  /* 单开页面返回 */
  const libBack = document.getElementById("library-back");
  if (libBack) {
    libBack.addEventListener("click", () => {
      if (libraryOrigin === "game") {
        showScreen("game");
        refreshHud();
      } else {
        showScreen("title");
        updateTitleMenu();
      }
    });
  }

  /* ============================================================
     剧情推进
     ============================================================ */
  document.getElementById("stage").addEventListener("click", () => WF.Engine.advance());
  document.getElementById("dialogue-area").addEventListener("click", e => {
    if (e.target.closest("#choice-box")) return;
    WF.Engine.advance();
  });

  document.addEventListener("keydown", e => {
    if (screens.game.classList.contains("active")) {
      if (e.code === "Space" || e.code === "Enter") { e.preventDefault(); WF.Engine.advance(); }
      if (e.code === "Escape") backToTitle();
    }
  });

  /* ============================================================
     设置项
     ============================================================ */
  const volume = document.getElementById("set-volume");
  const speed = document.getElementById("set-textspeed");
  const autoplay = document.getElementById("set-autoplay");

  function persistSettings() {
    WF.Save.storeSettings({ volume:+volume.value, textSpeed:+speed.value, autoplay:autoplay.checked });
  }
  volume.addEventListener("input", () => { WF.Audio.setVolume(volume.value / 100); persistSettings(); });
  speed.addEventListener("input", () => { WF.DialogueView.setTextSpeed(+speed.value); persistSettings(); });
  autoplay.addEventListener("change", persistSettings);

  /* ============================================================
     启动初始化
     ============================================================ */
  (function init() {
    if (WF.Save.hasLegacyAuto() && !WF.Save.hasAuto()) {
      WF.Save.migrateLegacy();
    }
    const s = WF.Save.loadSettings();
    if (s.volume !== undefined) { volume.value = s.volume; WF.Audio.setVolume(s.volume / 100); }
    if (s.textSpeed !== undefined) { speed.value = s.textSpeed; WF.DialogueView.setTextSpeed(s.textSpeed); }
    if (s.autoplay !== undefined) autoplay.checked = s.autoplay;
    updateTitleMenu();

    /* 定时检查关键状态，变了就刷新 HUD（控制台改数据也能生效） */
    let _lastKey = "";
    setInterval(() => {
      const d = WF.State.data;
      const key = [
        d.day, d.location, d.stamina, d.mood,
        d.nextChapterDay, d.nextChapterNum,
        WF.State.intimacyOf("su"),
        d.needNextChapter ? 1 : 0
      ].join("|");
      if (key !== _lastKey) {
        _lastKey = key;
        if (screens.game && screens.game.classList.contains("active")) {
          refreshHud();
        }
      }
    }, 500);
  })();

  /* 关闭 / 刷新网页时存档 */
  window.addEventListener("beforeunload", () => WF.Save.saveOnExit());
})();