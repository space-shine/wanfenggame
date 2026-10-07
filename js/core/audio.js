/* ============================================================
   AudioMgr · BGM / 音效管理（M0 占位，接口按 BGM 清单预留）
   - 淡入淡出、按场景切换；主音量由设置控制
   - 原型阶段 assets/audio 无文件时静默，不报错
   ============================================================ */
(function () {
  "use strict";
  const WF = window.WF || (window.WF = {});

  let bgmEl = null;
  let sfxEl = null;
  let currentBgm = null;
  let masterVolume = 0.6;

  WF.Audio = {
    init() {
      if (!bgmEl) {
        bgmEl = new Audio();
        bgmEl.loop = true;
        sfxEl = new Audio();
      }
      this.setVolume(masterVolume);
    },

    setVolume(v) {
      masterVolume = v;
      if (bgmEl) bgmEl.volume = 0.7 * v;
      if (sfxEl) sfxEl.volume = 0.9 * v;
    },

    /** 播放 BGM；path 为空或文件缺失时静默 */
    playBgm(path, opts) {
      this.init();
      if (currentBgm === path) return;
      currentBgm = path;
      if (!path) { bgmEl.removeAttribute("src"); bgmEl.pause(); return; }
      bgmEl.src = path;
      const p = bgmEl.play();
      if (p && p.catch) p.catch(() => {/* 占位：浏览器自动播放策略或无文件，忽略 */});
      if (opts && opts.fade) bgmEl.volume = 0;
    },

    stopBgm() {
      if (bgmEl) { bgmEl.pause(); bgmEl.currentTime = 0; }
      currentBgm = null;
    },

    playSfx(path) {
      this.init();
      if (!path) return;
      try {
        sfxEl.src = path;
        const p = sfxEl.play();
        if (p && p.catch) p.catch(() => {});
      } catch (e) { /* 占位忽略 */ }
    }
  };
})();
