/* ============================================================
   PeopleView · 人际系统
   - 左列：已结识的可社交角色
   - 右列：详情（关系 / 亲密度 / 分阶段信息卡 / 共同记忆）
   - 信息卡未满足解锁条件时显示「？？？」
   ============================================================ */
(function () {
  "use strict";
  const WF = window.WF || (window.WF = {});

  let selected = null;

  const listEl = () => document.getElementById("people-list");
  const detailEl = () => document.getElementById("people-detail");

  function cardUnlocked(card) {
    if (!card.need) return true;
    if (card.need.flag) {
      return Object.entries(card.need.flag).every(([k, v]) => WF.State.getFlag(k) === (v === undefined ? true : v));
    }
    if (card.need.intimacy) {
      return (WF.State.peopleOf(card._charId).intimacy >= card.need.intimacy);
    }
    return true;
  }

  function renderList() {
    const box = listEl();
    box.innerHTML = "";
    const met = WF.Characters.socialList().filter(c => WF.State.peopleOf(c.id).met);
    if (met.length === 0) {
      box.innerHTML = '<p class="people-empty">还没有结识任何人。</p>';
      detailEl().innerHTML = "";
      return;
    }
    if (!selected || !WF.State.peopleOf(selected).met) selected = met[0].id;
    met.forEach(c => {
      const p = WF.State.peopleOf(c.id);
      const btn = document.createElement("button");
      btn.className = "people-item" + (c.id === selected ? " on" : "");
      btn.innerHTML = `<span class="pi-face">${c.portrait}</span>
        <span class="pi-name">${c.name}</span>
        <span class="pi-rel">${c.relation}</span>`;
      btn.onclick = () => { selected = c.id; renderList(); };
      box.appendChild(btn);
    });
    renderDetail();
  }

  function intimacyTitle(v) {
    if (v >= 100) return "恋人";
    if (v >= 80) return "亲如亲人";
    if (v >= 60) return "真心朋友";
    if (v >= 40) return "亲密朋友";
    if (v >= 20) return "好朋友";
    return "初识";
  }

  function renderDetail() {
    const c = WF.Characters.get(selected);
    const box = detailEl();
    if (!c) { box.innerHTML = ""; return; }
    const p = WF.State.peopleOf(c.id);

    let html = `<div class="pd-head">
      <div class="pd-face" style="background:${c.color}">${c.portrait}</div>
      <div><div class="pd-name">${c.name}</div>
      <div class="pd-rel">${c.relation}</div></div>
      <button class="msg-btn" id="pd-msg">发消息</button>
    </div>
    <div class="pd-intimacy">
      <div class="pd-label">亲密度 <b>${p.intimacy}</b><span class="intimacy-title">${intimacyTitle(p.intimacy)}</span></div>
      <div class="pd-bar"><i style="width:${p.intimacy}%"></i></div>
    </div>
    <p class="pd-desc">${c.desc || ""}</p>`;

    // 信息卡
    if (c.cards && c.cards.length) {
      html += `<div class="pd-cards">`;
      c.cards.forEach(card => {
        card._charId = c.id;
        const ok = cardUnlocked(card);
        html += `<div class="pd-card ${ok ? "" : "lock"}">
          <span class="pdc-k">${card.k}</span>
          <span class="pdc-v">${ok ? card.unlocked : card.text}</span>
        </div>`;
      });
      html += `</div>`;
    }

    // 共同记忆
    if (p.memories && p.memories.length) {
      html += `<div class="pd-mem">`;
      p.memories.forEach(m => html += `<p class="pd-mem-item">· ${m}</p>`);
      html += `</div>`;
    } else {
      html += `<p class="pd-mem-empty">还没有一起做过什么特别的事。</p>`;
    }

    box.innerHTML = html;

    // 发消息按钮 → 切到手机对应好友
    const msg = document.getElementById("pd-msg");
    if (msg) msg.onclick = () => {
      WF.PeopleView.close();
      WF.PhoneView.open(c.id);
    };
  }

  WF.PeopleView = {
    open() {
      renderList();
      document.getElementById("modal-people").classList.remove("hidden");
    },
    close() {
      document.getElementById("modal-people").classList.add("hidden");
    },
    refresh() { if (!document.getElementById("modal-people").classList.contains("hidden")) renderList(); }
  };

  // 结识新人物时弹提示
  WF.eventbus.on("people-met", ({ id }) => {
    const c = WF.Characters.get(id);
    if (!c) return;
    WF.Toast.show(`解锁人物：${c.name}\n关系：${c.relation}`, "favor", 4500);
  });

  // 亲密度变化时如果弹窗开着就实时刷新
  WF.eventbus.on("people-intimacy", () => {
    const m = document.getElementById("modal-people");
    if (m && !m.classList.contains("hidden")) renderList();
  });
})();
