/* ============================================================
   PhoneView · 手机（微信）
   - 好友列表 = 人际里已结识的人
   - 选项式发消息（按 chatStep 推进，不可重复）
   - 日常问候（每天一次，每次 +1 亲密度，随机内容）
   - 部分选项带 appointment → 触发支线约定
   ============================================================ */
(function () {
  "use strict";
  const WF = window.WF || (window.WF = {});

  const REPLIES = {
    su: [
      { send:"今天谢谢你，钱我过两天还你。", reply:"不急。" },
      { send:"你也是今天报到？", reply:"嗯。" },
      { send:"那以后就是校友了。", reply:"嗯。" },
      { send:"你到宿舍了吗？", reply:"到了。你呢？" },
      { send:"到了。", reply:"那就好。" },
      { send:"你明天有空吗？我把钱还你。", reply:"不用急。" },
      { send:"那我请你吃饭吧，说好的。", reply:"……好。" },
      { send:"你明天下午有空吗？", reply:"……有。" },
      { send:"那下午三点，图书馆三楼见？", reply:"好。",
        appointment: {
          id: "appt_su_lib_01",
          charId: "su",
          dayOffset: 1,
          location: "library",
          eventId: "sq_lib_01",
          title: "图书馆的约定"
        }
      }
    ],
    yangwh: [
      { send:"老二，晚上开黑吗？", reply:"来啊！" },
      { send:"今天课好多。", reply:"习惯就好。" }
    ],
    lidh: [
      { send:"老大，明天几点起？", reply:"七点半。" }
    ],
    jiangx: [
      { send:"老四，又去图书馆？", reply:"嗯。" }
    ]
  };

  const DAILY_GREETS = {
    su: [
      { send:"早。", reply:"嗯，早。" },
      { send:"今天天气不错。", reply:"……是。" },
      { send:"吃饭了吗？", reply:"还没。" },
      { send:"最近忙吗？", reply:"还好。" },
      { send:"晚安。", reply:"晚安。" },
      { send:"注意身体。", reply:"谢谢。" }
    ],
    yangwh: [
      { send:"早啊老二。", reply:"滚去上课。" },
      { send:"今天心情不错。", reply:"遇到好事了？" },
      { send:"晚上一起吃饭？", reply:"行啊。" },
      { send:"又打游戏呢？", reply:"你管我。" }
    ],
    lidh: [
      { send:"早，老大。", reply:"嗯。" },
      { send:"今天有什么安排？", reply:"自习。" },
      { send:"晚上回宿舍吗？", reply:"回。" }
    ],
    jiangx: [
      { send:"老四，在图书馆？", reply:"嗯。" },
      { send:"吃了吗？", reply:"吃了。" },
      { send:"晚安。", reply:"晚安。" }
    ]
  };

  let selected = null;

  function getChats(id) {
    if (!WF.State.data.chatRecords[id]) WF.State.data.chatRecords[id] = [];
    return WF.State.data.chatRecords[id];
  }
  function getStep(id) {
    return WF.State.data.chatStep[id] || 0;
  }
  function setStep(id, n) {
    WF.State.data.chatStep[id] = n;
  }

  function friends() {
    return WF.Characters.socialList().filter(c => WF.State.peopleOf(c.id).met);
  }

  function hasGreetedToday(id) {
    const d = WF.State.data;
    if (!d.dailyGreet) d.dailyGreet = {};
    return d.dailyGreet[id] === d.day;
  }
  function markGreeted(id) {
    const d = WF.State.data;
    if (!d.dailyGreet) d.dailyGreet = {};
    d.dailyGreet[id] = d.day;
  }

  function renderList() {
    const box = document.getElementById("phone-friends");
    const fs = friends();
    box.innerHTML = "";
    if (!fs.length) {
      box.innerHTML = '<p class="phone-empty">还没有好友。<br>认识新的人，就会出现在这里。</p>';
      renderChat(); return;
    }
    if (!selected || !fs.find(f => f.id === selected)) selected = fs[0].id;
    fs.forEach(f => {
      const p = WF.State.peopleOf(f.id);
      const b = document.createElement("button");
      b.className = "phone-friend" + (f.id === selected ? " on" : "");
      b.innerHTML = `<span class="pf-face" style="background:${f.color}">${f.portrait}</span>
        <span class="pf-meta"><span class="pf-name">${f.name}</span><span class="pf-rel">${f.relation}</span></span>
        ${p.unread ? '<i class="pf-dot"></i>' : ""}`;
      b.onclick = () => { selected = f.id; p.unread = false; renderList(); };
      box.appendChild(b);
    });
    renderChat();
  }

  function renderChat() {
    const box = document.getElementById("phone-screen");
    const dock = document.getElementById("phone-dock");
    const f = WF.Characters.get(selected);
    if (!f) { box.innerHTML = ""; dock.innerHTML = ""; return; }
    const rows = getChats(f.id);
    const replies = REPLIES[f.id] || [];
    const step = getStep(f.id);
    const greeted = hasGreetedToday(f.id);

    let html = `<div class="chat-peer">
      <div class="chat-avatar" style="background:${f.color}">${f.portrait}</div>
      <div><b>${f.name}</b><span class="chat-sub">${f.relation}</span></div>
    </div>`;
    rows.forEach(r => {
      const who = r.from === "me" ? "mine" : "theirs";
      html += `<div class="chat-row ${who}"><div class="bubble">${r.text}</div></div>`;
    });
    box.innerHTML = html;
    box.scrollTop = box.scrollHeight;

    if (step < replies.length) {
      const cur = replies[step];
      const isSide = !!cur.appointment;
      const cls = "chat-opt" + (isSide ? " chat-opt-side" : "");
      const tag = isSide ? '<span class="chat-opt-tag">支线相关</span>' : "";
      dock.innerHTML = '<button class="' + cls + '" data-i="' + step + '">' + cur.send + tag + '</button>';
      dock.querySelector(".chat-opt").onclick = () => sendReply(step);
    } else if (!greeted && DAILY_GREETS[f.id]) {
      dock.innerHTML = '<button class="chat-opt daily-greet" data-id="' + f.id + '">👋 日常问候（每天一次，亲密度 +1）</button>';
      dock.querySelector(".chat-opt").onclick = () => sendDailyGreet(f.id);
    } else {
      dock.innerHTML = '<span class="dock-done">今天已经聊过了，明天再来吧</span>';
    }
  }

  function sendReply(i) {
    const f = selected;
    const r = REPLIES[f] && REPLIES[f][i];
    if (!r) return;
    const chats = getChats(f);
    chats.push({ from: "me", text: r.send });
    setStep(f, i + 1);

    if (r.appointment && WF.SideQuest) {
      const d = WF.State.data;
      const appt = Object.assign({}, r.appointment);
      appt.day = d.day + (appt.dayOffset || 1);
      delete appt.dayOffset;
      appt.done = false;
      setTimeout(() => WF.SideQuest.add(appt), 500);
    }

    setTimeout(() => {
      chats.push({ from: "them", text: r.reply });
      renderChat();
    }, 600);
    renderChat();
  }

  function sendDailyGreet(f) {
    const pool = DAILY_GREETS[f] || [];
    if (!pool.length) return;
    const r = pool[Math.floor(Math.random() * pool.length)];
    const chats = getChats(f);
    chats.push({ from: "me", text: r.send });
    markGreeted(f);
    WF.State.addIntimacy(f, 1);
    setTimeout(() => {
      chats.push({ from: "them", text: r.reply });
      renderChat();
    }, 600);
    renderChat();
  }

  function open(charId) {
    if (charId) selected = charId;
    renderList();
    document.getElementById("modal-phone").classList.remove("hidden");
  }
  function close() {
    document.getElementById("modal-phone").classList.add("hidden");
  }

  function setUnread(id) {
    const p = WF.State.peopleOf(id);
    p.unread = true;
    const modal = document.getElementById("modal-phone");
    if (modal && !modal.classList.contains("hidden")) renderList();
  }

  WF.PhoneView = { open, close, renderList, setUnread };
})();