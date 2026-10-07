/* ============================================================
   ProfileView · 我的档案
   头像 / 名字 / 学期 / 体力·心情·健康·智商·情商·金钱（进度条）
   每次打开实时读取 State 当前值，不读缓存
   ============================================================ */
(function () {
  "use strict";
  const WF = window.WF || (window.WF = {});

  const MONEY_FULL = 500;   // 金钱进度条参考刻度

  function bar(label, value, max, color, display) {
    const pct = Math.max(0, Math.min(100, Math.round((value / max) * 100)));
    return `<div class="pf-row">
      <div class="pf-row-top">
        <span class="pf-row-label">${label}</span>
        <span class="pf-row-val">${display !== undefined ? display : value}</span>
      </div>
      <div class="pf-track"><div class="pf-fill" style="width:${pct}%;background:${color}"></div></div>
    </div>`;
  }

  function open() {
    const d = WF.State.data;
    const moodLabel = d.mood >= 80 ? "良好" : d.mood >= 50 ? "一般" : d.mood >= 20 ? "低落" : "极差";
    document.getElementById("review-title").textContent = "我的档案";
    document.getElementById("review-list").innerHTML = `
      <div class="profile-head">
        <img class="profile-avatar" src="assets/chars/chen.png" alt="陈敬运">
        <div class="profile-id">
          <div class="profile-name">陈敬运</div>
          <div class="profile-term">${d.term} · 药学专业</div>
        </div>
      </div>
      <div class="profile-bars">
        ${bar("体力", d.stamina, d.staminaMax, "linear-gradient(90deg,#43a047,#81c784)", d.stamina + "/" + d.staminaMax)}
        ${bar("心情", d.mood, 100, "linear-gradient(90deg,#fb8c00,#ffd54f)", d.mood + "（" + moodLabel + "）")}
        ${bar("健康", d.health, 100, "linear-gradient(90deg,#00acc1,#80deea)", d.health + "/100")}
        ${bar("智商", d.iq, 100, "linear-gradient(90deg,#1e88e5,#90caf9)", d.iq)}
        ${bar("情商", d.eq, 100, "linear-gradient(90deg,#8e63c4,#ce93d8)", d.eq)}
        ${bar("金钱", d.money, MONEY_FULL, "linear-gradient(90deg,#e0a52e,#ecc94b)", d.money + " 元")}
      </div>`;
    document.getElementById("modal-review").classList.remove("hidden");
  }

  WF.ProfileView = { open };
})();
