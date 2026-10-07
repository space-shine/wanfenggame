/* ============================================================
   ActionPanel · 主界面行动面板
   - 位置由 state.location 决定
   - 小游戏通过 runMinigame 触发
   - 上课：走 Course 系统（选课后才可上）
   ============================================================ */
(function () {
  "use strict";
  const WF = window.WF || (window.WF = {});

  /* ============================================================
     各地点可做的行动
     字段说明：
       cost       消耗体力
       sleep      true=睡觉（进下一天）
       study      true=算学习（用于属性衰减）
       social     true=算社交
       sport      true=算运动
       useItem    需要消耗某物品（如 coffee）
       minigame   触发的小游戏 id
       minigameLabel  显示在按钮上的小游戏标签
       pickChar   需要选人（如和舍友聊天）
     ============================================================ */
  const ACTIONS = {
    dorm: [
      { name:"睡觉", cost:0, sleep:true, label:"睡觉（进入第二天）" },
      { name:"和舍友聊天", cost:8, social:true, pickChar:true }
    ],
    library: [
      { name:"读书", cost:8, study:true },
      { name:"查文献", cost:10, study:true, minigame:"literature", minigameLabel:"文献整理" }
    ],
    teaching: [
      { name:"上课", cost:8, study:true },                     // 走 Course 系统
      { name:"自习", cost:6, study:true, minigame:"recite", minigameLabel:"背书" }
    ],
    canteen: [
      { name:"吃饭", cost:5, minigame:"race", minigameLabel:"抢饭" }
    ],
    lab: [
      { name:"做实验", cost:10, study:true, minigame:"reagentOrMicroscope", minigameLabel:"实验操作" },
      { name:"整理数据", cost:8, study:true }
    ],
    playground: [
      { name:"跑步", cost:8, sport:true, minigame:"run", minigameLabel:"节奏跑" },
      { name:"散步", cost:5, sport:true }
    ],
    clubroom: [
      { name:"练吉他", cost:8, social:true, minigame:"guitar", minigameLabel:"弹奏" },
      { name:"社团活动", cost:5, social:true }
    ],
    cafe: [
      { name:"喝咖啡", cost:5, useItem:"coffee", minigame:"latte", minigameLabel:"拉花" },
      { name:"写东西", cost:8, study:true },
      { name:"兼职打工", cost:15, social:true }
    ],
    clinic: [
      { name:"看病", cost:5 }
    ]
  };

  /* 首次完成某类行动解锁的成就 */
  const FIRST_TIME_ACH = {
    读书:"first_library", 查文献:"first_library",
    做实验:"first_lab", 整理数据:"first_lab",
    跑步:"first_run", 吃饭:"first_meal"
  };

  /* 研究笔记池：做实验/查资料时按顺序解锁 */
  const NOTE_POOL = [
    "记录：试剂在 37℃ 下反应更稳定。",
    "记录：目标物在酸性环境中溶解度更高。",
    "记录：显微镜下细胞轮廓清晰、形态正常。",
    "记录：对照组成色与预期一致。",
    "记录：色谱峰分离度良好。"
  ];
  function unlockNote(d) {
    if (!d.researchNotes) d.researchNotes = [];
    const next = NOTE_POOL[d.researchNotes.length];
    if (next && !d.researchNotes.includes(next)) d.researchNotes.push(next);
  }

  /* ============================================================
     渲染行动面板
     ============================================================ */
  function render() {
    const panel = document.getElementById("action-panel");
    const d = WF.State.data;
    if (WF.Engine && WF.Engine.running) { panel.classList.add("hidden"); return; }
    if (!WF.State.getFlag("at_campus")) { panel.classList.add("hidden"); return; }

    const acts = ACTIONS[d.location] || [];
    if (!acts.length) { panel.classList.add("hidden"); return; }

    let html = `<div class="ap-title">当前地点：${WF.Locations.nameOf(d.location)}　体力 ${d.stamina}/${d.staminaMax}　心情 ${d.mood}</div>`;

    /* 支线按钮（蓝色） */
    if (WF.SideQuest) {
      WF.SideQuest.getAvailableHere().forEach(a => {
        html += `<button class="ap-btn ap-side" data-appt="${a.id}">
          <span class="ap-side-title">✦ ${a.title}</span>
          <span class="ap-side-tag">支线相关</span>
        </button>`;
      });
    }

    /* 偶遇按钮（金色） */
    if (WF.Encounter) {
      const enc = WF.Encounter.getAvailableHere();
      if (enc) {
        html += `<button class="ap-btn ap-enc" data-enc="1">
          <span class="ap-enc-title">👤 ${enc.title}</span>
          <span class="ap-enc-tag">偶遇</span>
        </button>`;
      }
    }

    /* 普通行动 */
    acts.forEach((a, i) => {
      const label = a.label || a.name;
      const mgTag = a.minigameLabel ? ` <small style="color:#c9a96e">【${a.minigameLabel}】</small>` : "";
      // 上课额外显示剩余次数
      let extra = "";
      if (a.name === "上课" && WF.Course) {
        extra = ` <small style="color:#4a90d9">(剩 ${WF.Course.remainingToday()} 次)</small>`;
      }
      const disabled = d.stamina < a.cost ? " disabled" : "";
      html += `<button class="ap-btn" data-i="${i}"${disabled}>${label}${mgTag}${extra} <small>-${a.cost}体力</small></button>`;
    });

    html += `<button class="ap-btn ap-map" data-i="map">打开地图</button>`;
    panel.innerHTML = html;
    panel.classList.remove("hidden");

    /* 绑定点击 */
    panel.querySelectorAll(".ap-btn").forEach(btn => {
      btn.onclick = () => {
        if (btn.dataset.appt) { WF.SideQuest.trigger(btn.dataset.appt); return; }
        if (btn.dataset.enc) { WF.Encounter.trigger(); return; }
        if (btn.dataset.i === "map") { WF.MapView.open(); return; }
        doAction(acts[btn.dataset.i]);
      };
    });
  }

  /* 触发小游戏（做实验：随机 reagent / microscope） */
  function runMinigame(act, callback) {
    let gameId = act.minigame;
    if (gameId === "reagentOrMicroscope") {
      gameId = Math.random() < 0.5 ? "reagent" : "microscope";
    }
    if (!gameId) { callback && callback(null); return; }
    WF.MinigameView.open(gameId, callback);
  }

  /* ============================================================
     执行一个行动
     ============================================================ */
  function doAction(a) {
    const d = WF.State.data;

    /* ---- 睡觉 ---- */
    if (a.sleep) {
      WF.Toast.show("晚安，明天见。");
      const msgs = WF.State.checkDecay();
      WF.DayCycle.advance();
      if (msgs.length) setTimeout(() => msgs.forEach(m => WF.Toast.show(m)), 800);
      // 下一章检查交给 refreshHud（hud-update 会触发）
      WF.eventbus.emit("hud-update");
      render();
      return;
    }

    /* ---- 体力检查 ---- */
    if (d.stamina < a.cost) { WF.Toast.show("今天太累了，赶快回宿舍睡觉吧。"); return; }

    /* ---- 物品检查（咖啡券） ---- */
    if (a.useItem === "coffee") {
      const count = (d.itemCounts && d.itemCounts.coffee) || 0;
      if (count <= 0) { WF.Toast.show("没有咖啡券，去商城买几张吧。"); return; }
    }

    /* ---- 上课：走选课流程 ---- */
    if (a.name === "上课") {
      if (!d.courses || d.courses.length === 0) {
        WF.Toast.show("还没有选课，请先打开电脑 → 课表选课", "favor", 4000);
        return;
      }
      if (!WF.Course.canStudyToday()) {
        WF.Toast.show("今天已经上了 4 节课，明天再来吧。", "favor", 3500);
        return;
      }
      openCoursePicker();
      return;
    }

    /* ---- 扣体力 ---- */
    d.stamina -= a.cost;
    let msg = `${a.name}（-${a.cost}体力）`;

    /* ---- 属性衰减计数 ---- */
    if (a.sport) d.lastSportDay = d.day;
    if (a.social) d.lastSocialDay = d.day;
    if (a.study) d.lastStudyDay = d.day;

    /* ---- 首次成就 ---- */
    const achId = FIRST_TIME_ACH[a.name];
    if (achId && WF.State.unlockAchievement(achId)) {
      const ach = WF.Achievements.get(achId);
      WF.Toast.achieve(`解锁成就：${ach.name}\n${ach.desc}`);
    }

    /* ---- 心情影响效率 ---- */
    const eff = d.mood >= 80 ? 1.0 : d.mood >= 50 ? 0.8 : d.mood >= 20 ? 0.5 : 0.2;

    /* ---- 各行动基础效果 ---- */
    if (a.name === "散步") { d.mood = Math.min(100, d.mood + 5); d.health = Math.min(100, d.health + 1); msg += " 心情+5 健康+1"; }
    if (a.name === "看病") { d.health = Math.min(100, d.health + 20); d.mood = Math.max(0, d.mood - 5); d.money = Math.max(0, d.money - 30); msg += " 健康+20 心情-5 金钱-30"; }
    if (a.name === "社团活动") { d.eq = Math.min(100, d.eq + 2); d.mood = Math.min(100, d.mood + 5); msg += " 情商+2 心情+5"; }
    if (a.name === "兼职打工") { d.money += 50; d.eq = Math.min(100, d.eq + 1); msg += " 金钱+50 情商+1"; }

    /* ---- 读书/整理数据/写东西：加智商 ---- */
    if (a.name === "读书" || a.name === "整理数据" || a.name === "写东西") {
      d.iq = Math.min(100, d.iq + 1);
      msg += " 智商+1";
    }

    /* ---- 喝咖啡：扣券 + 心情 ---- */
    if (a.useItem === "coffee") {
      d.itemCounts.coffee -= 1;
      if (d.itemCounts.coffee <= 0) {
        delete d.inventory.coffee;
        delete d.itemCounts.coffee;
      }
      d.mood = Math.min(100, d.mood + 8);
      msg = "喝了一杯咖啡（消耗1张咖啡券） 心情+8";
    }

    /* ---- 触发小游戏 ---- */
    if (a.minigame) {
      runMinigame(a, (result) => {
        let bonusMsg = "";
        if (result === null || result === "skip") {
          bonusMsg = "（已跳过）";
        } else if (result === "perfect") {
          d.mood = Math.min(100, d.mood + 2);
          unlockNote(d);
          bonusMsg = "完美！心情+2 解锁研究笔记";
        } else if (result === "good") {
          unlockNote(d);
          bonusMsg = "良好！解锁研究笔记";
        } else if (result === "normal") {
          bonusMsg = "普通";
        } else if (result === "fail") {
          d.mood = Math.max(0, d.mood - 1);
          bonusMsg = "失败……心情-1";
        }
        // 首次完成小游戏
        if (result && result !== "skip" && WF.State.unlockAchievement("first_mg")) {
          const ach = WF.Achievements.get("first_mg");
          WF.Toast.achieve(`解锁成就：${ach.name}\n${ach.desc}`);
        }
        WF.Toast.show(msg + "　" + bonusMsg);
        WF.eventbus.emit("hud-update");
        render();
      });
      return;
    }

    /* ---- 无小游戏的普通行动 ---- */
    WF.Toast.show(msg);
    WF.eventbus.emit("hud-update");
    render();
  }

  /* ============================================================
     上课选课弹窗
     ============================================================ */
  function openCoursePicker() {
    const d = WF.State.data;
    const courses = d.courses || [];
    const overlay = document.createElement("div");
    overlay.style.cssText = "position:fixed;inset:0;z-index:999;background:rgba(20,28,24,.78);display:flex;align-items:center;justify-content:center;";

    let listHtml = "";
    courses.forEach(cid => {
      const name = WF.Course.getCourseName(cid);
      const progress = d.courseProgress[cid] || 0;
      const full = progress >= 100;
      listHtml += `<button class="course-pick" data-id="${cid}" style="width:100%;padding:12px 14px;margin-bottom:8px;text-align:left;background:#fff;border:1px solid #ddd;border-radius:10px;cursor:pointer;transition:all .15s">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span style="font-weight:bold;color:#333">${name}</span>
          <span style="font-size:12px;color:${full ? "#c9a96e" : "#999"}">${full ? "已满 · 额外学习" : progress + " / 100"}</span>
        </div>
        <div style="height:6px;background:#eee;border-radius:3px;overflow:hidden;margin-top:6px">
          <div style="height:100%;width:${Math.min(100,progress)}%;background:${full ? "#c9a96e" : "#4caf50"}"></div>
        </div>
      </button>`;
    });

    overlay.innerHTML = `
      <div style="background:#fbf8f1;padding:24px;border-radius:16px;max-width:440px;width:92%;box-shadow:0 18px 50px rgba(0,0,0,.35);max-height:80vh;overflow-y:auto">
        <h3 style="margin:0 0 4px;color:#3a4a3a">选择课程</h3>
        <p style="color:#999;font-size:12px;margin:0 0 8px">今天还能上 ${WF.Course.remainingToday()} 节课</p>
        <div style="background:#eef6ff;border-left:3px solid #4a90d9;padding:8px 12px;border-radius:0 6px 6px 0;font-size:12px;color:#555;line-height:1.7;margin-bottom:14px">
          <b style="color:#4a90d9">学习规则</b><br>
          · 每天最多上 <b>4</b> 节课<br>
          · 每门课进度满 <b>100%</b> 后可额外学习<br>
          · 学期末考试，<b>进度 &lt; 80</b> 算挂科<br>
          · 挂科会影响大三研发进度与资金
        </div>
        ${listHtml}
        <div style="text-align:center;margin-top:14px">
          <button class="menu-btn small" id="course-cancel">取消</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    overlay.querySelectorAll(".course-pick").forEach(btn => {
      btn.onclick = () => {
        const cid = btn.dataset.id;
        overlay.remove();
        startClass(cid);
      };
    });
    overlay.querySelector("#course-cancel").onclick = () => overlay.remove();
  }

  /* 上某门课：走 classQuiz 小游戏，结果加该课进度 */
  function startClass(courseId) {
    const d = WF.State.data;
    WF.Course.recordStudy();
    d.stamina -= 8;
    d.lastStudyDay = d.day;

    WF.MinigameView.open("classQuiz", (result) => {
      let amount = 0;
      let msg = "";
      if (result === "perfect") { amount = 20; msg = "完美！"; }
      else if (result === "good") { amount = 15; msg = "良好！"; }
      else if (result === "normal") { amount = 10; msg = "普通"; }
      else if (result === "fail") { amount = 5; msg = "失败……"; }
      else { amount = 2; msg = "跳过"; }

      const r = WF.Course.addProgress(courseId, amount);
      const name = WF.Course.getCourseName(courseId);
      if (r.over) {
        WF.Toast.show(`${msg} ${name} 已满，额外学习 +${r.extra}`, "favor", 4000);
      } else if (r.extra > 0) {
        WF.Toast.show(`${msg} ${name} 进度 +${amount}，额外学习 +${r.extra}`, "favor", 4000);
      } else {
        WF.Toast.show(`${msg} ${name} 进度 +${amount}`, "favor", 3500);
      }
      WF.eventbus.emit("hud-update");
      render();
    });
  }

  WF.ActionPanel = { render };
  WF.eventbus.on("hud-update", render);
})();