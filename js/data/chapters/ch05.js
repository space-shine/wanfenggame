/* ============================================================
   第5章《朝夕自习，固定偏爱》
   时间：大一下学期（约第 130-155 天）
   主线：图书馆固定座位 → 暴雨共伞 → 风形图案
   伏笔：躲人群、疲惫泛红、风形图案
   末尾：timeSkip 40 天，跳到第6章
   ============================================================ */
(function () {
  "use strict";
  const WF = window.WF || (window.WF = {});
  WF.Scenes = WF.Scenes || {};

  const BG = (f) => `center/cover no-repeat url("assets/bg/${f}")`;

  WF.Scenes.ch05 = {
    id: "ch05",
    chapter: 5,
    start: "s1",
    nodes: [
      /* ==================== 场景 5-1：图书馆固定座位 ==================== */
      { id:"s1", type:"scene", location:"library", tag:"第5章 · 图书馆三楼", bg:BG("ch05_5-1-1.jpg") },

      { id:"s2", type:"narration", bg:BG("ch05_5-1-1.jpg"),
        text:"新学期开始后，我们默契地固定了自习时间。\n每周二、周四傍晚。\n图书馆三楼，靠窗的位置。" },

      { id:"s3", type:"narration", bg:BG("ch05_5-1-1.jpg"),
        text:"她帮我梳理药学晦涩的知识点。\n我帮她补高数。\n日复一日。\n不需要商量，也不需要约定。" },

      { id:"s4", type:"narration", bg:BG("ch05_5-1-1.jpg"),
        text:"那年春天来得晚。\n三月了，窗外还有残雪。" },

      { id:"s5", type:"dialogue", speaker:"chen", text:"你高数做完了？", bg:BG("ch05_5-1-1.jpg") },
      { id:"s6", type:"dialogue", speaker:"su", text:"嗯。", bg:BG("ch05_5-1-1.jpg") },
      { id:"s7", type:"dialogue", speaker:"chen", text:"这么快？", bg:BG("ch05_5-1-1.jpg") },
      { id:"s8", type:"dialogue", speaker:"su", text:"昨晚做的。", bg:BG("ch05_5-1-1.jpg") },
      { id:"s9", type:"dialogue", speaker:"chen", text:"你昨晚几点睡的？", bg:BG("ch05_5-1-1.jpg") },
      { id:"s10", type:"dialogue", speaker:"su", text:"……不记得了。", bg:BG("ch05_5-1-1.jpg") },

      { id:"s11", type:"narration", bg:BG("ch05_5-1-1.jpg"),
        text:"她低头写题。\n我看着她的侧脸。\n脸颊上又浮出那片红。" },

      { id:"s12", type:"dialogue", speaker:"chen", text:"你脸怎么了？", bg:BG("ch05_5-1-1.jpg") },
      { id:"s13", type:"dialogue", speaker:"su", text:"没事，有点热。", bg:BG("ch05_5-1-1.jpg") },
      { id:"s14", type:"dialogue", speaker:"chen", text:"要不要开窗？", bg:BG("ch05_5-1-1.jpg") },
      { id:"s15", type:"dialogue", speaker:"su", text:"不用。", bg:BG("ch05_5-1-1.jpg") },

      { id:"s16", type:"narration", bg:BG("ch05_5-1-1.jpg"),
        text:"她继续写题。\n我没再问。" },

      /* ==================== 场景 5-2：图书馆闭馆 ==================== */
      { id:"s17", type:"scene", location:"library", tag:"第5章 · 图书馆闭馆", bg:BG("ch05_5-2-1.jpg") },

      { id:"s18", type:"narration", bg:BG("ch05_5-2-1.jpg"),
        text:"那天晚上，我们学到九点四十。\n图书馆十点闭馆。\n广播一响，她才抬头。" },

      { id:"s19", type:"dialogue", speaker:"su", text:"这么晚了。", bg:BG("ch05_5-2-1.jpg") },
      { id:"s20", type:"dialogue", speaker:"chen", text:"嗯。走吧。", bg:BG("ch05_5-2-1.jpg") },

      { id:"s21", type:"narration", bg:BG("ch05_5-2-1.jpg"),
        text:"我们收拾好东西。\n走到门口的时候——\n外面下雨了。" },

      { id:"s22", type:"narration", bg:BG("ch05_5-2-1.jpg"),
        text:"不是小雨。\n是那种突然砸下来的暴雨。\n门口站了一堆人，都在等雨小。" },

      { id:"s23", type:"dialogue", speaker:"chen", text:"等会儿吧。", bg:BG("ch05_5-2-1.jpg") },
      { id:"s24", type:"dialogue", speaker:"su", text:"嗯。", bg:BG("ch05_5-2-1.jpg") },

      { id:"s25", type:"narration", bg:BG("ch05_5-2-1.jpg"),
        text:"我们站在门口。\n雨没小。\n反而更大了。" },

      { id:"s26", type:"narration", bg:BG("ch05_5-2-1.jpg"),
        text:"她看了看表。\n又看了看雨。\n眉头轻轻皱了一下。" },

      { id:"s27", type:"dialogue", speaker:"chen", text:"有伞吗？", bg:BG("ch05_5-2-1.jpg") },
      { id:"s28", type:"dialogue", speaker:"su", text:"……没带。", bg:BG("ch05_5-2-1.jpg") },
      { id:"s29", type:"dialogue", speaker:"chen", text:"我带了。", bg:BG("ch05_5-2-1.jpg") },

      { id:"s30", type:"narration", bg:BG("ch05_5-2-1.jpg"),
        text:"我从包里掏出伞。\n一把很小的折叠伞。" },

      { id:"s31", type:"dialogue", speaker:"chen", text:"我送你。", bg:BG("ch05_5-2-1.jpg") },
      { id:"s32", type:"dialogue", speaker:"su", text:"那你呢？", bg:BG("ch05_5-2-1.jpg") },
      { id:"s33", type:"dialogue", speaker:"chen", text:"我跑回去。", bg:BG("ch05_5-2-1.jpg") },
      { id:"s34", type:"dialogue", speaker:"su", text:"……一起吧。", bg:BG("ch05_5-2-1.jpg") },

      /* ==================== 场景 5-3：暴雨共伞 ==================== */
      { id:"s35", type:"scene", location:"campus", tag:"第5章 · 雨中校园", bg:BG("ch05_5-2-2.jpg") },

      { id:"s36", type:"narration", bg:BG("ch05_5-2-2.jpg"),
        text:"两个人。\n一把小伞。\n她靠得很近。" },

      { id:"s37", type:"narration", bg:BG("ch05_5-2-2.jpg"),
        text:"我能闻到她身上干净的洗衣液味道。\n很淡。\n但很清晰。" },

      { id:"s38", type:"narration", bg:BG("ch05_5-2-2.jpg"),
        text:"雨点打在伞面上。\n啪啪啪。\n谁都没说话。" },

      { id:"s39", type:"narration", bg:BG("ch05_5-2-2.jpg"),
        text:"走到图书馆门口那段路的时候，迎面来了一群从食堂出来的人。\n人很多。\n有的在说笑，有的在跑。" },

      { id:"s40", type:"narration", bg:BG("ch05_5-2-2.jpg"),
        text:"她下意识往我身后躲了一下。" },

      { id:"s41", type:"dialogue", speaker:"chen", text:"怎么了？", bg:BG("ch05_5-2-2.jpg") },
      { id:"s42", type:"dialogue", speaker:"su", text:"没什么。", bg:BG("ch05_5-2-2.jpg") },
      { id:"s43", type:"dialogue", speaker:"chen", text:"人太多了？", bg:BG("ch05_5-2-2.jpg") },
      { id:"s44", type:"dialogue", speaker:"su", text:"……嗯。", bg:BG("ch05_5-2-2.jpg") },

      { id:"s45", type:"narration", bg:BG("ch05_5-2-2.jpg"),
        text:"她往我身边又靠了靠。\n我把伞往她那边偏了一点。\n自己的肩膀湿了。" },

      /* ==================== 场景 5-4：雨停 ==================== */
      { id:"s47", type:"scene", location:"campus", tag:"第5章 · 宿舍楼下", bg:BG("ch05_5-2-3.jpg") },

      { id:"s48", type:"narration", bg:BG("ch05_5-2-3.jpg"),
        text:"到女生宿舍楼下的时候，雨小了。\n她把伞递还给我。" },

      { id:"s49", type:"dialogue", speaker:"su", text:"谢谢你。", bg:BG("ch05_5-2-3.jpg") },
      { id:"s50", type:"dialogue", speaker:"chen", text:"嗯。", bg:BG("ch05_5-2-3.jpg") },
      { id:"s51", type:"dialogue", speaker:"su", text:"你肩膀湿了。", bg:BG("ch05_5-2-3.jpg") },
      { id:"s52", type:"dialogue", speaker:"chen", text:"没湿多少。", bg:BG("ch05_5-2-3.jpg") },
      { id:"s53", type:"dialogue", speaker:"su", text:"……骗人。", bg:BG("ch05_5-2-3.jpg") },

      { id:"s54", type:"narration", bg:BG("ch05_5-2-3.jpg"),
        text:"她看了我一眼。\n没再多说什么。\n跑进了宿舍楼。" },

      { id:"s55", type:"narration", bg:BG("ch05_5-2-3.jpg"),
        text:"我撑着伞，站在原地。\n雨还在下。\n但我一点都不觉得冷。" },

      /* ==================== 场景 5-5：风形图案 ==================== */
      { id:"s56", type:"scene", location:"library", tag:"第5章 · 图书馆", bg:BG("ch05_5-3-1.jpg") },

      { id:"s57", type:"narration", bg:BG("ch05_5-3-1.jpg"),
        text:"第二天傍晚，图书馆。\n我在写实验报告。\n写到一半，推了推草稿纸。" },

      { id:"s58", type:"narration", bg:BG("ch05_5-3-1.jpg"),
        text:"我从笔袋里拿笔的时候，发现草稿纸的空白角落上，多了一个小东西。" },

      { id:"s59", type:"narration", bg:BG("ch05_5-3-1.jpg"),
        text:"一个风形图案。\n小小的。\n用铅笔画的。" },

      { id:"s60", type:"narration", bg:BG("ch05_5-3-1.jpg"),
        text:"我抬头。\n她正低头写题。\n装作什么都没发生。" },

      { id:"s61", type:"dialogue", speaker:"chen", text:"这是你画的？", bg:BG("ch05_5-3-1.jpg") },
      { id:"s62", type:"dialogue", speaker:"su", text:"……嗯。", bg:BG("ch05_5-3-1.jpg") },
      { id:"s63", type:"dialogue", speaker:"chen", text:"为什么画风？", bg:BG("ch05_5-3-1.jpg") },
      { id:"s64", type:"dialogue", speaker:"su", text:"……风很自由。", bg:BG("ch05_5-3-1.jpg") },
      { id:"s65", type:"dialogue", speaker:"chen", text:"你想自由？", bg:BG("ch05_5-3-1.jpg") },
      { id:"s66", type:"dialogue", speaker:"su", text:"……谁不想呢。", bg:BG("ch05_5-3-1.jpg") },

      { id:"s67", type:"narration", bg:BG("ch05_5-3-1.jpg"),
        text:"她低头继续写。\n我没再问。\n但那天起，我在草稿纸上看到过很多次这个图案。" },

      { id:"s68", type:"narration", bg:BG("ch05_5-3-1.jpg"),
        text:"小小的，一笔一笔。\n藏在我写的字旁边。\n像一个只属于她的记号。" },

      /* ==================== 结束 + 跳时间 ==================== */
      { id:"s70", type:"set",
        effects:{
          flag:{ ch5_done:true },
          intimacy:{ su:5 },
          memory:{ su:"图书馆固定座位、暴雨共伞、她画的风形图案" }
        } },

      { id:"s71", type:"narration", bg:BG("ch05_5-3-1.jpg"),
        text:"这学期剩下的日子，过得很平常。\n每周二、四的傍晚，成了我最期待的时间。\n图书馆的三楼靠窗，成了我们的固定位置。" },

      /* ---------- 跳时间：跳到第6章 ---------- */
      { id:"s72", type:"timeSkip", days:40,
        text:"接下来的一个多月，日子平静地过去。\n春天彻底来了。\n四月初。\n你的生日快到了。\n这段时间你做了什么？",
        options: [
          { key:"iq",     label:"智商",   icon:"🧠", add:10 },
          { key:"eq",     label:"情商",   icon:"💬", add:10 },
          { key:"health", label:"健康",   icon:"❤️", add:10 },
          { key:"money",  label:"金钱",   icon:"💰", add:400 }
        ]
      },

      { id:"s73", type:"narration", bg:BG("ch05_5-3-1.jpg"),
        text:"四月。\n春天来了。\n我的生日，也快到了。" },

      { id:"s74", type:"end", autoSave:true, quiet:true, completeChapter:5 }
    ]
  };
})();