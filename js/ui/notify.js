/* ============================================================
   Notif · 微信消息推送通知
   收到消息时从顶部滑下，显示头像+名字+预览
   ============================================================ */
(function () {
  "use strict";
  const WF = window.WF || (window.WF = {});

  function show(charId, text) {
    const c = WF.Characters.get(charId);
    if (!c) return;
    WF.PhoneView.setUnread(charId);

    let bar = document.getElementById("wx-notif");
    if (!bar) {
      bar = document.createElement("div");
      bar.id = "wx-notif";
      document.body.appendChild(bar);
    }
    bar.innerHTML = `<div class="wxn-face" style="background:${c.color}">${c.portrait}</div>
      <div class="wxn-body"><b>${c.name}</b><span>${text}</span></div>`;
    bar.classList.add("show");
    bar.onclick = () => { close(); WF.PhoneView.open(charId); };
    clearTimeout(bar._t);
    bar._t = setTimeout(close, 3500);
  }
  function close() {
    const bar = document.getElementById("wx-notif");
    if (bar) bar.classList.remove("show");
  }

  WF.Notif = { show, close };
})();
