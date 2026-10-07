/* ============================================================
   Toast · 浮动反馈（好感变化 / 成就 / 系统提示）
   ============================================================ */
(function () {
  "use strict";
  const WF = window.WF || (window.WF = {});

  let layer = null;
  function ensureLayer() {
    if (!layer) {
      layer = document.createElement("div");
      layer.className = "toast-layer";
      document.body.appendChild(layer);
    }
    return layer;
  }

  WF.Toast = {
    show(text, kind, duration) {
      const el = document.createElement("div");
      el.className = "toast" + (kind ? " " + kind : "");
      el.textContent = text;
      ensureLayer().appendChild(el);
      setTimeout(() => el.remove(), duration || 3800);
    },
    favor(text) { this.show(text, "favor", 4500); },
    achieve(text) { this.show(text, "achieve", 5000); }
  };

 /* 亲密度变化自动提示（只显示 "苏挽月 亲密度 +1"，不加其他废话） */
WF.eventbus.on("people-intimacy", ({ id }) => {
    const c = WF.Characters && WF.Characters.get(id);
    if (!c) return;
    WF.Toast.favor(`${c.name} 亲密度 +1`);
});
})();
