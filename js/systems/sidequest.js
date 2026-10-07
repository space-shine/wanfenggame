/* ============================================================
   SideQuest · 支线/约定系统
   - 手机约定 → appointments 列表
   - 到地点后，行动面板出现蓝色按钮，玩家主动点
   ============================================================ */
(function () {
  "use strict";
  const WF = window.WF || (window.WF = {});

  WF.SideQuest = {
    add(appt) {
      const d = WF.State.data;
      if (!d.appointments) d.appointments = [];
      if (d.appointments.find(a => a.id === appt.id)) return false;
      d.appointments.push(appt);
      WF.eventbus.emit("hud-update");
      WF.Toast.show(`收到约定：${appt.title}`, "favor", 4000);
      return true;
    },

    listActive() {
      const d = WF.State.data;
      return (d.appointments || []).filter(a => !a.done);
    },

    cleanupExpired() {
      const d = WF.State.data;
      if (!d.appointments) return;
      const before = d.appointments.length;
      d.appointments = d.appointments.filter(a => a.done || a.day >= d.day);
      if (d.appointments.length !== before) {
        WF.eventbus.emit("hud-update");
      }
    },

    /* 当前地点，今天可触发的支线 */
    getAvailableHere() {
      const d = WF.State.data;
      if (!d.appointments) return [];
      return d.appointments.filter(a =>
        !a.done && a.day === d.day && a.location === d.location
      );
    },

    /* 玩家主动触发 */
    trigger(apptId) {
      const d = WF.State.data;
      const appt = (d.appointments || []).find(a => a.id === apptId && !a.done);
      if (!appt) return false;
      if (appt.day !== d.day || appt.location !== d.location) {
        WF.Toast.show("这个约定现在不能触发");
        return false;
      }
      const scene = WF.Scenes[appt.eventId];
      if (!scene) {
        console.warn("[SideQuest] 场景未找到:", appt.eventId);
        return false;
      }
      appt.done = true;

      // 切到游戏屏
      const screens = ["screen-title", "screen-library", "screen-game"];
      screens.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.toggle("active", id === "screen-game");
      });
      const ap = document.getElementById("action-panel");
      if (ap) ap.classList.add("hidden");

      WF.Engine.start(scene);
      return true;
    },

    getDisplayInfo(appt) {
      const d = WF.State.data;
      if (appt.day === d.day) return { text: "今天", color: "#6fbf6f" };
      if (appt.day === d.day + 1) return { text: "明天", color: "#e7c458" };
      if (appt.day > d.day + 1) return { text: "第 " + appt.day + " 天", color: "#a49a84" };
      return { text: "已过期", color: "#c62828" };
    }
  };
})();