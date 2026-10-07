/* ============================================================
   NovelEngine · 叙事引擎（节点图解释器）
   节点类型：bgm / scene / narration / dialogue / choice /
            set / branch / achieve / end
   ============================================================ */
(function () {
  "use strict";
  const WF = window.WF || (window.WF = {});

  let scene = null;
  let index = {};
  let currentId = null;
  let running = false;

  /* ---------- 效果应用 ---------- */
  function applyEffects(eff) {
    if (!eff) return;
    if (eff.flag)     Object.entries(eff.flag).forEach(([k, v]) => WF.State.flag(k, v));
    if (eff.favor)    Object.entries(eff.favor).forEach(([k, v]) => WF.State.addFavor(k, v));
    if (eff.money)    WF.State.addMoney(eff.money);
    if (eff.progress) WF.State.addProgress(eff.progress);
    if (eff.item)     (Array.isArray(eff.item) ? eff.item : [eff.item]).forEach(i => WF.State.addItem(i));
    if (eff.stat)     Object.entries(eff.stat).forEach(([k, v]) => WF.State.bump(k, v));
    if (eff.meet)     (Array.isArray(eff.meet) ? eff.meet : [eff.meet]).forEach(id => WF.State.meet(id));
    if (eff.intimacy) Object.entries(eff.intimacy).forEach(([k, v]) => WF.State.addIntimacy(k, v));
    if (eff.memory)   Object.entries(eff.memory).forEach(([k, v]) => WF.State.addMemory(k, v));
  }

  /* ---------- 条件判定 ---------- */
  function match(cond) {
    if (!cond) return true;
    if (cond.flag) {
      const ok = Object.entries(cond.flag).every(([k, v]) => WF.State.getFlag(k) === (v === undefined ? true : v));
      if (!ok) return false;
    }
    if (cond.favor) {
      const ok = Object.entries(cond.favor).every(([k, v]) => WF.State.intimacyOf(k) >= v);
      if (!ok) return false;
    }
    return true;
  }

  const Engine = {
    get running() { return running; },
    set running(v) { running = !!v; },
    get currentId() { return currentId; },

    /* 从起点开始 */
    start(sceneData) {
      scene = sceneData;
      index = {};
      sceneData.nodes.forEach((n, i) => { index[n.id || ("n" + i)] = n; });
      running = true;
      WF.DialogueView.clear();
      WF.DialogueView.showArea(true);
      this.go(sceneData.start);
    },

    /* 从指定节点开始（读档用） */
    startAt(sceneData, nodeId) {
      scene = sceneData;
      index = {};
      sceneData.nodes.forEach((n, i) => { index[n.id || ("n" + i)] = n; });
      running = true;
      WF.DialogueView.clear();
      WF.DialogueView.showArea(true);
      const savedBg = WF.State.data.currentBg;
      if (savedBg) {
        document.getElementById("bg-layer").style.background = savedBg;
      }
      this.go(nodeId);
    },

    stop() {
      running = false;
      scene = null;
      if (WF.ActorView) WF.ActorView.clear();
      WF.DialogueView.showArea(false);
      WF.DialogueView.clear();
      document.getElementById("scene-tag").style.display = "none";
    },

    /* 跳到某节点 */
    go(id) {
      if (!running) return;
      const node = index[id];
      if (!node) { WF.warn("[engine] 节点不存在:", id); return; }
      currentId = id;
      WF.State.data.currentNode = id;
      WF.State.data.currentState = 1;
      if (node.bg) WF.State.data.currentBg = node.bg;
      WF.State.markSeen(id);
      WF.eventbus.emit("node-change", { id });
      this.exec(node);
    },

    /* 推进到下一节点 */
    next() {
      if (!scene) return;
      const cur = index[currentId];
      if (cur && cur.next) return this.go(cur.next);
      const order = scene.nodes;
      const i = order.findIndex(n => (n.id || "n?") === currentId);
      const nx = order[i + 1];
      if (nx) this.go(nx.id || ("n" + (i + 1)));
    },

    /* ---------- 节点执行 ---------- */
    exec(node) {
      switch (node.type) {

        case "bgm":
          WF.Audio.playBgm(node.path || null, node);
          return this.next();

        case "scene": {
          if (!node.keepActors && WF.ActorView) WF.ActorView.clear();
          if (node.bg) document.getElementById("bg-layer").style.background = node.bg;
          if (node.location) WF.State.data.location = node.location;
          const tag = document.getElementById("scene-tag");
          tag.textContent = node.tag || "";
          if (node.period) WF.State.data.period = node.period;
          WF.eventbus.emit("hud-update");
          return this.next();
        }

        case "narration":
          if (node.bg) document.getElementById("bg-layer").style.background = node.bg;
          return WF.DialogueView.showNarration(node.text, () => {});

        case "dialogue": {
          if (node.bg) document.getElementById("bg-layer").style.background = node.bg;
          const ch = WF.Characters && WF.Characters.get(node.speaker);
          const name = (ch && ch.name) || node.speaker || "";
          const portrait = (ch && ch.portrait) || name.slice(0, 1);
          if (WF.ActorView) WF.ActorView.speak(node.speaker);
          return WF.DialogueView.showDialogue(name, portrait, node.text);
        }

        case "choice": {
          const opts = node.options.filter(o => match(o.showIf));
          return WF.DialogueView.showChoices(opts, opt => {
            applyEffects(opt.effects);
            if (opt.toast) WF.Toast.show(opt.toast);
            this.go(opt.next || node.next || this.afterChoice(node));
          });
        }

        case "set":
          applyEffects(node.effects);
          if (node.toast) WF.Toast.show(node.toast);
          return this.next();

        case "branch": {
          const hit = (node.cases || []).find(c => match(c.if));
          return this.go(hit ? hit.next : node.else);
        }

        case "timeSkip": {
          const days = node.days || 1;
          const options = node.options || [
            { key: "iq",     label: "智商",   icon: "🧠", add: 20 },
            { key: "eq",     label: "情商",   icon: "💬", add: 20 },
            { key: "health", label: "健康",   icon: "❤️", add: 20 }
          ];
          const text = node.text || `时间过去了 ${days} 天。`;
          const self = this;
          return showTimeSkipDialog(days, options, text, (chosen) => {
            applyTimeSkip(days, chosen);
            self.next();
          });
        }

        case "achieve": {
          const isB = node.kind === "B";
          const achId = node.achId || node.id;
          const added = WF.State.unlockAchievement(achId);
          if (added) {
            const ach = WF.Achievements.get(achId);
            if (isB) {
              WF.Toast.achieve(`解锁成就：「${ach.poem}」？？？\n未知`);
            } else if (ach) {
              WF.Toast.achieve(`解锁成就：${ach.name}\n${ach.desc || ""}`);
            }
          }
          return this.next();
        }

        case "end":
          running = false;
          WF.State.data.currentState = 2;
          WF.State.data.currentNode = null;
          WF.State.data.currentBg = "";
          if (WF.ActorView) WF.ActorView.clear();
          WF.DialogueView.showArea(false);
          if (node.completeChapter) WF.State.markChapterComplete(node.completeChapter);
          // 默认回宿舍；node.toDorm === false 时保留当前位置
          if (node.toDorm !== false) {
            WF.State.data.location = "dorm";
            document.getElementById("bg-layer").style.background =
              "url(assets/bg/dorm.jpg) center/cover no-repeat";
          }
          document.getElementById("scene-tag").style.display = "none";
          const endCard = document.getElementById("scene-end");
          document.getElementById("scene-end-text").textContent = node.text || "";
          if (node.quiet) {
            endCard.classList.add("hidden");
          } else {
            endCard.classList.remove("hidden");
          }
          WF.eventbus.emit("ch-end", { node });
          WF.eventbus.emit("hud-update");
          if (node.autoSave) WF.Save.autoSave();
          return;

        default:
          WF.warn("[engine] 未知节点类型:", node.type, node);
          return this.next();
      }
    },

    afterChoice(node) { return null; },

    /* ---------- 玩家推进 ---------- */
    advance() {
      if (!running) return;
      if (WF.DialogueView.isWaitingChoice()) return;
      if (WF.DialogueView.skipTyping()) return;   // 第一次点击补全文字
      this.next();
    }
  };
    /* ============================================================
     跳时间机制
     - 剧情里加 { type:"timeSkip", days:10, options:[...] }
     - 弹出选择框，让玩家选一个属性加值
     - 应用后进入下一个节点
     ============================================================ */
  function applyTimeSkip(days, chosen) {
    const d = WF.State.data;
    d.day += days;
    d.stamina = d.staminaMax;   // 跳时间体力恢复
    // 更新学期
    if (WF.Course && WF.Course.getTermByDay) {
      d.term = WF.Course.getTermByDay(d.day);
    }
    // 重置每日计数
    d.dailyGreet = {};
    d.encounterToday = null;
    d.studyCountDay = 0;
    d.studyCountToday = 0;

    if (chosen) {
      if (chosen.key === "money") {
        d.money = (d.money || 0) + chosen.add;
      } else {
        const cap = 100;
        d[chosen.key] = Math.min(cap, (d[chosen.key] || 0) + chosen.add);
      }
      WF.Toast.show(`时间过去了 ${days} 天　${chosen.label} +${chosen.add}`, "favor", 4200);
    } else {
      WF.Toast.show(`时间过去了 ${days} 天`);
    }
    WF.eventbus.emit("hud-update");
  }

  function showTimeSkipDialog(days, options, text, onDone) {
    const overlay = document.createElement("div");
    overlay.style.cssText =
      "position:fixed;inset:0;z-index:999;background:rgba(20,28,24,.78);" +
      "display:flex;align-items:center;justify-content:center;";

    let optHtml = "";
    options.forEach((opt, i) => {
      optHtml += `<button class="time-skip-opt" data-i="${i}" style="
        display:flex;align-items:center;gap:12px;
        width:100%;padding:14px 18px;margin-bottom:10px;
        background:#fff;border:2px solid #e0d5be;border-radius:12px;
        cursor:pointer;text-align:left;font-size:14px;
        transition:all .2s;
      ">
        <span style="font-size:24px">${opt.icon || ""}</span>
        <span style="flex:1;font-weight:600;color:#333">${opt.label}</span>
        <span style="color:#4caf50;font-weight:700">+${opt.add}</span>
      </button>`;
    });

    overlay.innerHTML = `
      <div style="background:#fbf8f1;padding:28px 26px;border-radius:16px;max-width:440px;width:92%;box-shadow:0 18px 50px rgba(0,0,0,.35)">
        <div style="text-align:center;margin-bottom:18px">
          <div style="font-size:13px;color:#8a7a5a;letter-spacing:.15em;margin-bottom:6px">时间流逝</div>
          <div style="font-family:var(--serif);font-size:22px;color:#5a4a3a;font-weight:700">${days} 天过去了</div>
        </div>
        <p style="color:#666;font-size:13px;line-height:1.8;margin-bottom:16px;text-align:center">${text}</p>
        <div style="background:#eef6ff;border-left:3px solid #4a90d9;padding:8px 12px;border-radius:0 6px 6px 0;font-size:12px;color:#555;line-height:1.7;margin-bottom:14px">
          <b style="color:#4a90d9">这段时间你做了什么？</b><br>
          选择一项属性提升：
        </div>
        ${optHtml}
      </div>`;
    document.body.appendChild(overlay);

    overlay.querySelectorAll(".time-skip-opt").forEach(btn => {
      btn.onmouseenter = () => { btn.style.borderColor = "#4a90d9"; btn.style.background = "#eef6ff"; };
      btn.onmouseleave = () => { btn.style.borderColor = "#e0d5be"; btn.style.background = "#fff"; };
      btn.onclick = () => {
        const idx = parseInt(btn.dataset.i);
        overlay.remove();
        onDone(options[idx]);
      };
    });
  }

  WF.Engine = Engine;
})();