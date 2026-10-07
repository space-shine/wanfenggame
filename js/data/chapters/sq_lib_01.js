/* ============================================================
   支线示例 · 图书馆的约定
   结构跟章节一样，复用现有引擎
   ============================================================ */
(function () {
  "use strict";
  const WF = window.WF || (window.WF = {});
  WF.Scenes = WF.Scenes || {};

  const BG = (f) => `center/cover no-repeat url("assets/bg/${f}")`;

  WF.Scenes.sq_lib_01 = {
    id: "sq_lib_01",
    type: "sidequest",
    start: "s1",
    nodes: [
      { id:"s1", type:"scene", location:"library", tag:"支线 · 图书馆", bg:BG("library.jpg") },

      { id:"s2", type:"narration", bg:BG("library.jpg"),
        text:"下午三点。\n图书馆三楼。\n她坐在靠窗的位置，面前摊着一本书。" },

      { id:"s3", type:"dialogue", speaker:"su", text:"你来了。", bg:BG("library.jpg") },
      { id:"s4", type:"narration", bg:BG("library.jpg"),
        text:"你走过去，在她对面坐下。" },

      { id:"s5", type:"dialogue", speaker:"su", text:"……坐吧。", bg:BG("library.jpg") },

      { id:"s6", type:"narration", bg:BG("library.jpg"),
        text:"安静的一下午。\n她没怎么说话，你也没怎么说话。\n但好像也不需要说什么。" },

      { id:"s7", type:"set",
        effects:{
          intimacy:{ su:3 },
          memory:{ su:"和她在图书馆坐了一下午" }
        } },

      { id:"s8", type:"narration", bg:BG("library.jpg"),
        text:"傍晚，她合上书。\n「走了。」\n你点点头。" },

      { id:"s9", type:"end", autoSave:true, quiet:true, toDorm:false }
    ]
  };
})();