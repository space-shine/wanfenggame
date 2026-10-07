/* ============================================================
   第7章《四月十九，晚风告白》
   时间：大一 4 月 19 日（约第 225 天）
   主线：甜品店告白 → 正式在一起
   末尾：timeSkip 100 天，跳到第8章（大二）
   ============================================================ */
(function () {
  "use strict";
  const WF = window.WF || (window.WF = {});
  WF.Scenes = WF.Scenes || {};

  const BG = (f) => `center/cover no-repeat url("assets/bg/${f}")`;

  WF.Scenes.ch07 = {
    id: "ch07",
    chapter: 7,
    start: "s1",
    nodes: [
      /* ==================== 场景 7-1：白天，准备 ==================== */
      { id:"s1", type:"scene", location:"dorm", tag:"第7章 · 4 月 19 日 · 白天", bg:BG("ch07_7-1-1.jpg") },

      { id:"s2", type:"narration", bg:BG("ch07_7-1-1.jpg"),
        text:"4 月 19 日。\n我的生日。\n今天天气很好。" },

      { id:"s3", type:"narration", bg:BG("ch07_7-1-1.jpg"),
        text:"宿舍里，杨文恒一大早就在叽叽喳喳。" },

      { id:"s4", type:"dialogue", speaker:"yangwh", text:"老五！生日快乐！", bg:BG("ch07_7-1-1.jpg") },
      { id:"s5", type:"dialogue", speaker:"chen", text:"……谢谢。", bg:BG("ch07_7-1-1.jpg") },
      { id:"s6", type:"dialogue", speaker:"yangwh", text:"今晚有安排？", bg:BG("ch07_7-1-1.jpg") },
      { id:"s7", type:"dialogue", speaker:"chen", text:"……有。", bg:BG("ch07_7-1-1.jpg") },
      { id:"s8", type:"dialogue", speaker:"yangwh", text:"哟。", bg:BG("ch07_7-1-1.jpg") },
      { id:"s9", type:"dialogue", speaker:"chen", text:"你别笑。", bg:BG("ch07_7-1-1.jpg") },
      { id:"s10", type:"dialogue", speaker:"yangwh", text:"不笑不笑。我祝你成功。", bg:BG("ch07_7-1-1.jpg") },

      { id:"s11", type:"dialogue", speaker:"lidh", text:"……加油。", bg:BG("ch07_7-1-1.jpg") },
      { id:"s12", type:"dialogue", speaker:"chen", text:"老大你也……", bg:BG("ch07_7-1-1.jpg") },
      { id:"s13", type:"dialogue", speaker:"lidh", text:"我什么都不知道。", bg:BG("ch07_7-1-1.jpg") },

      { id:"s14", type:"narration", bg:BG("ch07_7-1-1.jpg"),
        text:"我看了看表。\n下午还有一节课。\n下课之后，就是晚上了。" },

      { id:"s15", type:"narration", bg:BG("ch07_7-1-1.jpg"),
        text:"我把准备好的东西放进包里。\n一张手工做的卡片。\n还有，练习了一整个星期的那几句话。" },

      /* ==================== 场景 7-2：甜品店 ==================== */
      { id:"s16", type:"scene", location:"cafe", tag:"第7章 · 4 月 19 日 · 夜", bg:BG("ch07_7-1-2.jpg") },

      { id:"s17", type:"narration", bg:BG("ch07_7-1-2.jpg"),
        text:"晚上七点。\n甜品店。\n她打工的那家。" },

      { id:"s18", type:"narration", bg:BG("ch07_7-1-2.jpg"),
        text:"我提前到了半个小时。\n坐在角落的位置。\n手心一直在出汗。" },

      { id:"s19", type:"narration", bg:BG("ch07_7-1-2.jpg"),
        text:"我反复练习要说的话。\n但每次练到一半，就忘了。" },

      { id:"s20", type:"narration", bg:BG("ch07_7-1-2.jpg"),
        text:"窗外的樱花开了。\n花瓣随着晚风飘下来。\n路灯亮了。" },

      { id:"s21", type:"narration", bg:BG("ch07_7-1-2.jpg"),
        text:"七点半。\n她推门进来。" },

      { id:"s22", type:"narration", bg:BG("ch07_7-1-2.jpg"),
        text:"她今天没穿工作服。\n穿了一件素色的连衣裙。\n脸颊上带着淡淡的红。" },

      { id:"s23", type:"dialogue", speaker:"su", text:"你到这么早？", bg:BG("ch07_7-1-2.jpg") },
      { id:"s24", type:"dialogue", speaker:"chen", text:"嗯。", bg:BG("ch07_7-1-2.jpg") },
      { id:"s25", type:"dialogue", speaker:"su", text:"今天你生日。", bg:BG("ch07_7-1-2.jpg") },
      { id:"s26", type:"dialogue", speaker:"chen", text:"嗯。", bg:BG("ch07_7-1-2.jpg") },
      { id:"s27", type:"dialogue", speaker:"su", text:"生日快乐。", bg:BG("ch07_7-1-2.jpg") },
      { id:"s28", type:"dialogue", speaker:"chen", text:"谢谢。", bg:BG("ch07_7-1-2.jpg") },

      { id:"s29", type:"narration", bg:BG("ch07_7-1-2.jpg"),
        text:"她坐下。\n我们点了一点东西。\n气氛安静。" },

      { id:"s30", type:"narration", bg:BG("ch07_7-1-2.jpg"),
        text:"她低头喝水。\n我看着她的侧脸。\n灯光照着她脸颊上那片淡淡的红。" },

      /* ==================== 场景 7-3：告白 ==================== */
      { id:"s31", type:"dialogue", speaker:"chen", text:"苏挽月。", bg:BG("ch07_7-1-2.jpg") },
      { id:"s32", type:"dialogue", speaker:"su",   text:"嗯？", bg:BG("ch07_7-1-2.jpg") },
      { id:"s33", type:"dialogue", speaker:"chen", text:"我……", bg:BG("ch07_7-1-2.jpg") },
      { id:"s34", type:"dialogue", speaker:"su",   text:"嗯。", bg:BG("ch07_7-1-2.jpg") },
      { id:"s35", type:"dialogue", speaker:"chen", text:"我喜欢你。", bg:BG("ch07_7-1-2.jpg") },

      { id:"s36", type:"narration", bg:BG("ch07_7-1-2.jpg"),
        text:"她愣住了。\n看着我。\n没说话。" },

      { id:"s37", type:"dialogue", speaker:"chen", text:"从火车上第一次见到你，就记住了你。", bg:BG("ch07_7-1-2.jpg") },
      { id:"s38", type:"dialogue", speaker:"chen", text:"后来加微信，还钱，请你吃饭。", bg:BG("ch07_7-1-2.jpg") },
      { id:"s39", type:"dialogue", speaker:"chen", text:"再后来，救糖糖，自习，暴雨。", bg:BG("ch07_7-1-2.jpg") },
      { id:"s40", type:"dialogue", speaker:"chen", text:"我不知道你喜不喜欢我。", bg:BG("ch07_7-1-2.jpg") },
      { id:"s41", type:"dialogue", speaker:"chen", text:"但我想告诉你。", bg:BG("ch07_7-1-2.jpg") },
      { id:"s42", type:"dialogue", speaker:"chen", text:"我喜欢你。", bg:BG("ch07_7-1-2.jpg") },

      { id:"s43", type:"narration", bg:BG("ch07_7-1-2.jpg"),
        text:"她低下头。\n手在桌子下面攥紧了。" },

      { id:"s44", type:"dialogue", speaker:"su", text:"……你确定吗？", bg:BG("ch07_7-1-2.jpg") },
      { id:"s45", type:"dialogue", speaker:"chen", text:"确定。", bg:BG("ch07_7-1-2.jpg") },
      { id:"s46", type:"dialogue", speaker:"su", text:"我……", bg:BG("ch07_7-1-2.jpg") },
      { id:"s47", type:"dialogue", speaker:"chen", text:"你不用现在回答。", bg:BG("ch07_7-1-2.jpg") },
      { id:"s48", type:"dialogue", speaker:"su", text:"不是。", bg:BG("ch07_7-1-2.jpg") },
      { id:"s49", type:"dialogue", speaker:"chen", text:"嗯？", bg:BG("ch07_7-1-2.jpg") },

      { id:"s50", type:"narration", bg:BG("ch07_7-1-2.jpg"),
        text:"她抬起头。\n眼睛有点红。" },

      { id:"s51", type:"dialogue", speaker:"su", text:"我也喜欢你。", bg:BG("ch07_7-1-2.jpg") },

      { id:"s52", type:"narration", bg:BG("ch07_7-1-2.jpg"),
        text:"我愣住了。\n她看着我。\n眼睛里有光。" },

      { id:"s53", type:"dialogue", speaker:"chen", text:"……真的？", bg:BG("ch07_7-1-2.jpg") },
      { id:"s54", type:"dialogue", speaker:"su", text:"嗯。", bg:BG("ch07_7-1-2.jpg") },
      { id:"s55", type:"dialogue", speaker:"chen", text:"那……我们在一起？", bg:BG("ch07_7-1-2.jpg") },
      { id:"s56", type:"dialogue", speaker:"su", text:"好。", bg:BG("ch07_7-1-2.jpg") },

      { id:"s57", type:"narration", bg:BG("ch07_7-1-2.jpg"),
        text:"我们看着对方。\n甜品店的灯光很暖。\n她低头笑了一下。\n我也笑了。" },

      { id:"sA1", type:"achieve", achId:"b_apr19", kind:"B", poem:"四月十九，晚风告白" },

      /* ==================== 场景 7-4：回宿舍 ==================== */
      { id:"s58", type:"scene", location:"campus", tag:"第7章 · 4 月 19 日 · 夜", bg:BG("ch07_7-2-2.jpg") },

      { id:"s59", type:"narration", bg:BG("ch07_7-2-2.jpg"),
        text:"晚上九点半。\n我们走出甜品店。\n樱花树下，路灯把我们的影子拉得很长。" },

      { id:"s60", type:"dialogue", speaker:"su", text:"今天……是个好日子。", bg:BG("ch07_7-2-2.jpg") },
      { id:"s61", type:"dialogue", speaker:"chen", text:"嗯。", bg:BG("ch07_7-2-2.jpg") },

      { id:"s62", type:"narration", bg:BG("ch07_7-2-2.jpg"),
        text:"我们慢慢往回走。\n走到一半的时候，她把手伸过来。\n牵住了我的手。" },

      { id:"s63", type:"narration", bg:BG("ch07_7-2-2.jpg"),
        text:"她的手很凉。\n但握得很紧。" },

      { id:"s64", type:"dialogue", speaker:"su", text:"陈敬运。", bg:BG("ch07_7-2-2.jpg") },
      { id:"s65", type:"dialogue", speaker:"chen", text:"嗯？", bg:BG("ch07_7-2-2.jpg") },
      { id:"s66", type:"dialogue", speaker:"su", text:"以后……要一直在一起。", bg:BG("ch07_7-2-2.jpg") },
      { id:"s67", type:"dialogue", speaker:"chen", text:"嗯。一直在一起。", bg:BG("ch07_7-2-2.jpg") },

      { id:"s68", type:"narration", bg:BG("ch07_7-2-2.jpg"),
        text:"她没再说话。\n只是牵着我的手，往前走着。\n樱花花瓣落在她的肩上。\n我替她拂掉。" },

      /* ==================== 场景 7-5：女生宿舍楼下 ==================== */
      { id:"s69", type:"scene", location:"campus", tag:"第7章 · 女生宿舍楼下", bg:BG("ch07_7-2-1.jpg") },

      { id:"s70", type:"narration", bg:BG("ch07_7-2-1.jpg"),
        text:"到了她宿舍楼下。\n她停下来，松开手。" },

      { id:"s71", type:"dialogue", speaker:"su", text:"到了。", bg:BG("ch07_7-2-1.jpg") },
      { id:"s72", type:"dialogue", speaker:"chen", text:"嗯。", bg:BG("ch07_7-2-1.jpg") },
      { id:"s73", type:"dialogue", speaker:"su", text:"你回去吧。", bg:BG("ch07_7-2-1.jpg") },
      { id:"s74", type:"dialogue", speaker:"chen", text:"你先上去。", bg:BG("ch07_7-2-1.jpg") },
      { id:"s75", type:"dialogue", speaker:"su", text:"……好。", bg:BG("ch07_7-2-1.jpg") },

      { id:"s76", type:"narration", bg:BG("ch07_7-2-1.jpg"),
        text:"她转身，走了两步。\n又停下来。" },

      { id:"s77", type:"dialogue", speaker:"su", text:"陈敬运。", bg:BG("ch07_7-2-1.jpg") },
      { id:"s78", type:"dialogue", speaker:"chen", text:"嗯？", bg:BG("ch07_7-2-1.jpg") },
      { id:"s79", type:"dialogue", speaker:"su", text:"……谢谢你。", bg:BG("ch07_7-2-1.jpg") },
      { id:"s80", type:"dialogue", speaker:"chen", text:"谢什么？", bg:BG("ch07_7-2-1.jpg") },
      { id:"s81", type:"dialogue", speaker:"su", text:"……谢谢你喜欢我。", bg:BG("ch07_7-2-1.jpg") },

      { id:"s82", type:"narration", bg:BG("ch07_7-2-1.jpg"),
        text:"她跑进宿舍楼。\n我站在原地。\n笑了。" },

      { id:"s83", type:"narration", bg:BG("ch07_7-2-1.jpg"),
        text:"她跑进宿舍楼。\n我站在原地，笑了很久。\n4 月 19 日，我的生日。\n也是我们在一起的第一天。" },

      /* ==================== 结束 + 跳时间 ==================== */
      { id:"s84", type:"set",
        effects:{
          flag:{ ch7_done:true, together:true },
          intimacy:{ su:20 },
          memory:{ su:"4 月 19 日，我们在一起了。" }
        } },

      { id:"s85", type:"narration", bg:BG("ch07_7-2-1.jpg"),
        text:"大一结束了。\n我们在一起了。" },

      /* ---------- 跳时间：暑假 100 天，跳到第8章 ---------- */
      { id:"s86", type:"timeSkip", days:100,
        text:"接下来的暑假，两个多月。\n她回了老家，你留在城里打工。\n每天晚上视频。\n你在这段时间做了什么？",
        options: [
          { key:"iq",     label:"智商",   icon:"🧠", add:15 },
          { key:"eq",     label:"情商",   icon:"💬", add:15 },
          { key:"health", label:"健康",   icon:"❤️", add:15 },
          { key:"money",  label:"金钱",   icon:"💰", add:800 }
        ]
      },

      { id:"s87", type:"narration", bg:BG("ch07_7-2-1.jpg"),
        text:"暑假结束。\n九月。\n大二开学。" },

      { id:"s88", type:"end", autoSave:true, quiet:true, completeChapter:7 }
    ]
  };
})();