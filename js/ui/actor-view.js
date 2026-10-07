/* ============================================================
   ActorView · 对话立绘展示
   - 男主（默认 left）显示在左侧；NPC（默认 right）显示在右侧
   - 发言方高亮（提亮 + 柔光描边 + 轻微放大）
   - 同框时非发言方降亮去饱和
   ============================================================ */
(function () {
  "use strict";
  const WF = window.WF || (window.WF = {});

  const layer = document.getElementById("char-layer");

  const slots = {
    left:  makeSlot("left"),
    right: makeSlot("right")
  };
  const state = { left: null, right: null };   // 记录该侧当前角色 id

  function makeSlot(side) {
    const wrap = document.createElement("div");
    wrap.className = "actor-slot actor-" + side;
    const img = document.createElement("img");
    img.alt = "";
    wrap.appendChild(img);
    layer.appendChild(wrap);
    return { wrap, img };
  }

  function setSlot(side, charId) {
    const ch = WF.Characters.get(charId);
    const slot = slots[side];
    if (!ch || !ch.image) {
      slot.wrap.classList.remove("show", "active");
      state[side] = null;
      return;
    }
    if (state[side] !== charId) slot.img.src = ch.image;
    state[side] = charId;
    slot.wrap.classList.add("show");
  }

  function markActive(side) {
    ["left", "right"].forEach(s => slots[s].wrap.classList.toggle("active", s === side));
  }

  WF.ActorView = {
    /** 显示某角色发言；未提供立绘的角色则不显示前景 */
    speak(charId) {
      const ch = WF.Characters.get(charId);
      if (!ch || !ch.image) return;
      const side = ch.side || "right";
      setSlot(side, charId);
      markActive(side);
    },

    /** 两人同框：先 enter 另一人（非高亮），再由 speak 高亮发言者 */
    enter(charId) {
      const ch = WF.Characters.get(charId);
      if (!ch || !ch.image) return;
      setSlot(ch.side || "right", charId);
    },

    clear() {
      ["left", "right"].forEach(s => {
        slots[s].wrap.classList.remove("show", "active");
        state[s] = null;
      });
    },

    hide(charId) {
      ["left", "right"].forEach(s => {
        if (state[s] === charId) {
          slots[s].wrap.classList.remove("show", "active");
          state[s] = null;
        }
      });
    }
  };
})();
