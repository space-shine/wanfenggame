/* ============================================================
   DayCycle · 日循环
   ============================================================ */
(function () {
  "use strict";
  const WF = window.WF || (window.WF = {});

  WF.DayCycle = {
    advance() {
      const d = WF.State.data;
      d.day += 1;
      d.stamina = d.staminaMax;
      d.dailyGreet = {};
      d.encounterToday = null;
      // 更新学期
      if (WF.Course) {
        d.term = WF.Course.getTermByDay(d.day);
        WF.Course.checkTermEnd();
      }
      if (WF.SideQuest) WF.SideQuest.cleanupExpired();
      WF.Toast.show(`第 ${d.day} 天开始了。`);
      WF.eventbus.emit("hud-update");
    },

    periodLabel() { return ""; }
  };
})();