/* ============================================================
   Version & Debug · 全局版本号与日志开关
   - WF.VERSION：游戏版本号，save.js 引用它写进存档
   - WF.DEBUG：是否输出调试日志；上线时改 false
   - WF.log / WF.warn / WF.error：统一日志入口
   ============================================================ */
(function () {
  "use strict";
  const WF = window.WF || (window.WF = {});

  WF.VERSION = "1.0.0";
  WF.DEBUG = false;

  WF.log = function () {
    if (WF.DEBUG) console.log.apply(console, arguments);
  };
  WF.warn = function () {
    if (WF.DEBUG) console.warn.apply(console, arguments);
  };
  WF.error = function () {
    console.error.apply(console, arguments);   // 错误永远输出
  };
})();