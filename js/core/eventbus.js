/* ============================================================
   EventBus · 全局事件总线
   ============================================================ */
(function () {
  "use strict";
  const WF = window.WF || (window.WF = {});

  const listeners = {};   // event -> Set<fn>

  WF.eventbus = {
    on(event, fn) {
      (listeners[event] || (listeners[event] = new Set())).add(fn);
      return () => this.off(event, fn);
    },
    off(event, fn) {
      listeners[event] && listeners[event].delete(fn);
    },
    emit(event, payload) {
      const set = listeners[event];
      if (set) set.forEach(fn => { try { fn(payload); } catch (e) { console.error("[eventbus]", event, e); } });
    }
  };
})();
