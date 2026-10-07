/* ============================================================
   第6章《春日将至，心意难藏》
   时间：大一下学期 4 月初（约第 185-220 天）
   主线：朋友鼓励 → 准备告白 → 甜品店踩点
   结尾：直接连第 7 章（4.19 告白）
   ============================================================ */
(function () {
  "use strict";
  const WF = window.WF || (window.WF = {});
  WF.Scenes = WF.Scenes || {};

  const BG = (f) => `center/cover no-repeat url("assets/bg/${f}")`;

  WF.Scenes.ch06 = {
    id: "ch06",
    chapter: 6,
    start: "s1",
    nodes: [
      /* ==================== 场景 6-1：宿舍，心事 ==================== */
      { id:"s1", type:"scene", location:"dorm", tag:"第6章 · 四月 · 宿舍", bg:BG("ch06_6-2-1.jpg") },

      { id:"s2", type:"narration", bg:BG("ch06_6-2-1.jpg"),
        text:"四月。\n春天来了。\n校园里的樱花开了。" },

      { id:"s3", type:"narration", bg:BG("ch06_6-2-1.jpg"),
        text:"我最近不太对劲。\n上课走神，吃饭没胃口，写实验报告写到一半就走神。" },

      { id:"s4", type:"narration", bg:BG("ch06_6-2-1.jpg"),
        text:"我知道自己怎么了。\n但我不敢承认。" },

      { id:"s5", type:"dialogue", speaker:"yangwh", text:"老五。", bg:BG("ch06_6-2-1.jpg") },
      { id:"s6", type:"dialogue", speaker:"chen", text:"嗯？", bg:BG("ch06_6-2-1.jpg") },
      { id:"s7", type:"dialogue", speaker:"yangwh", text:"你又走神了。", bg:BG("ch06_6-2-1.jpg") },
      { id:"s8", type:"dialogue", speaker:"chen", text:"……没有。", bg:BG("ch06_6-2-1.jpg") },
      { id:"s9", type:"dialogue", speaker:"yangwh", text:"你跟我说实话。", bg:BG("ch06_6-2-1.jpg") },
      { id:"s10", type:"dialogue", speaker:"chen", text:"……什么？", bg:BG("ch06_6-2-1.jpg") },
      { id:"s11", type:"dialogue", speaker:"yangwh", text:"你是不是喜欢那个心理系的？", bg:BG("ch06_6-2-1.jpg") },

      { id:"s12", type:"narration", bg:BG("ch06_6-2-1.jpg"),
        text:"我没说话。\n他看着我，咧嘴笑了。" },

      { id:"s13", type:"dialogue", speaker:"yangwh", text:"别装了。你俩天天晚上在图书馆。", bg:BG("ch06_6-2-1.jpg") },
      { id:"s14", type:"dialogue", speaker:"chen", text:"……只是自习。", bg:BG("ch06_6-2-1.jpg") },
      { id:"s15", type:"dialogue", speaker:"yangwh", text:"那你为什么每次回来都笑？", bg:BG("ch06_6-2-1.jpg") },
      { id:"s16", type:"dialogue", speaker:"chen", text:"……有吗？", bg:BG("ch06_6-2-1.jpg") },
      { id:"s17", type:"dialogue", speaker:"yangwh", text:"有。", bg:BG("ch06_6-2-1.jpg") },

      { id:"s18", type:"dialogue", speaker:"lidh", text:"……我看出来了。", bg:BG("ch06_6-2-1.jpg") },
      { id:"s19", type:"dialogue", speaker:"chen", text:"老大你也在？", bg:BG("ch06_6-2-1.jpg") },
      { id:"s20", type:"dialogue", speaker:"lidh", text:"我一直都在。", bg:BG("ch06_6-2-1.jpg") },

      { id:"s21", type:"dialogue", speaker:"yangwh", text:"喜欢就追啊。", bg:BG("ch06_6-2-1.jpg") },
      { id:"s22", type:"dialogue", speaker:"chen", text:"我不知道她怎么想。", bg:BG("ch06_6-2-1.jpg") },
      { id:"s23", type:"dialogue", speaker:"yangwh", text:"你不问怎么知道？", bg:BG("ch06_6-2-1.jpg") },
      { id:"s24", type:"dialogue", speaker:"chen", text:"……", bg:BG("ch06_6-2-1.jpg") },
      { id:"s25", type:"dialogue", speaker:"lidh", text:"你生日快到了吧？", bg:BG("ch06_6-2-1.jpg") },
      { id:"s26", type:"dialogue", speaker:"chen", text:"4 月 19。", bg:BG("ch06_6-2-1.jpg") },
      { id:"s27", type:"dialogue", speaker:"yangwh", text:"那就那天。", bg:BG("ch06_6-2-1.jpg") },
      { id:"s28", type:"dialogue", speaker:"chen", text:"……", bg:BG("ch06_6-2-1.jpg") },
      { id:"s29", type:"dialogue", speaker:"yangwh", text:"怂。", bg:BG("ch06_6-2-1.jpg") },

      { id:"s30", type:"narration", bg:BG("ch06_6-2-1.jpg"),
        text:"他说得对。\n我怂。\n但我真的喜欢她。\n喜欢到每次看到她，心跳都会快。" },

      /* ==================== 场景 6-2：甜品店，踩点 ==================== */
      { id:"s31", type:"scene", location:"cafe", tag:"第6章 · 四月 · 甜品店", bg:BG("ch06_6-2-2.jpg") },

      { id:"s32", type:"narration", bg:BG("ch06_6-2-2.jpg"),
        text:"那天下午，我一个人去了那家甜品店。\n她打工的那家。" },

      { id:"s33", type:"narration", bg:BG("ch06_6-2-2.jpg"),
        text:"她今天不在。\n我找了个角落的位置坐下。\n点了一杯柠檬水。" },

      { id:"s34", type:"narration", bg:BG("ch06_6-2-2.jpg"),
        text:"我看着柜台。\n她曾经在这里洗过盘子。\n她曾经在这里笑过。" },

      { id:"s35", type:"dialogue", speaker:"boss", text:"喝什么？", bg:BG("ch06_6-2-2.jpg") },
      { id:"s36", type:"dialogue", speaker:"chen", text:"柠檬水。", bg:BG("ch06_6-2-2.jpg") },
      { id:"s37", type:"dialogue", speaker:"boss", text:"就这？", bg:BG("ch06_6-2-2.jpg") },
      { id:"s38", type:"dialogue", speaker:"chen", text:"……嗯。", bg:BG("ch06_6-2-2.jpg") },

      { id:"s39", type:"narration", bg:BG("ch06_6-2-2.jpg"),
        text:"我在这坐了半个小时。\n我想的很多。\n我想她喜欢的猫，想她画的风，想她笑起来的样子。" },

      { id:"s40", type:"narration", bg:BG("ch06_6-2-2.jpg"),
        text:"我也想到，她可能不喜欢我。\n但就算这样，我还是想告诉她。" },

      { id:"s41", type:"dialogue", speaker:"chen", text:"老板。", bg:BG("ch06_6-2-2.jpg") },
      { id:"s42", type:"dialogue", speaker:"boss", text:"嗯？", bg:BG("ch06_6-2-2.jpg") },
      { id:"s43", type:"dialogue", speaker:"chen", text:"4 月 19 号晚上，你们这边能订位置吗？", bg:BG("ch06_6-2-2.jpg") },
      { id:"s44", type:"dialogue", speaker:"boss", text:"可以，几位？", bg:BG("ch06_6-2-2.jpg") },
      { id:"s45", type:"dialogue", speaker:"chen", text:"两位。", bg:BG("ch06_6-2-2.jpg") },
      { id:"s46", type:"dialogue", speaker:"boss", text:"有特殊要求吗？", bg:BG("ch06_6-2-2.jpg") },
      { id:"s47", type:"dialogue", speaker:"chen", text:"……不用。", bg:BG("ch06_6-2-2.jpg") },
      { id:"s48", type:"dialogue", speaker:"boss", text:"好的。", bg:BG("ch06_6-2-2.jpg") },

      { id:"s49", type:"narration", bg:BG("ch06_6-2-2.jpg"),
        text:"走出甜品店的时候，我深吸了一口气。\n定了。\n4 月 19 号。" },

      /* ==================== 场景 6-3：宿舍，准备 ==================== */
      { id:"s50", type:"scene", location:"dorm", tag:"第6章 · 四月 · 宿舍夜晚", bg:BG("ch06_6-2-1.jpg") },

      { id:"s51", type:"narration", bg:BG("ch06_6-2-1.jpg"),
        text:"接下来几天，我在想送什么。\n想告白怎么说。" },

      { id:"s52", type:"narration", bg:BG("ch06_6-2-1.jpg"),
        text:"我没什么钱。\n买不起戒指，买不起花。\n但我可以给她一个承诺。" },

      { id:"s53", type:"dialogue", speaker:"yangwh", text:"你又在想什么？", bg:BG("ch06_6-2-1.jpg") },
      { id:"s54", type:"dialogue", speaker:"chen", text:"……没什么。", bg:BG("ch06_6-2-1.jpg") },
      { id:"s55", type:"dialogue", speaker:"yangwh", text:"你在想 4 月 19 号的事？", bg:BG("ch06_6-2-1.jpg") },
      { id:"s56", type:"dialogue", speaker:"chen", text:"……你怎么知道？", bg:BG("ch06_6-2-1.jpg") },
      { id:"s57", type:"dialogue", speaker:"yangwh", text:"我猜的。", bg:BG("ch06_6-2-1.jpg") },
      { id:"s58", type:"dialogue", speaker:"yangwh", text:"你小子，行。", bg:BG("ch06_6-2-1.jpg") },
      { id:"s59", type:"dialogue", speaker:"chen", text:"……", bg:BG("ch06_6-2-1.jpg") },
      { id:"s60", type:"dialogue", speaker:"yangwh", text:"加油。", bg:BG("ch06_6-2-1.jpg") },

      { id:"s61", type:"narration", bg:BG("ch06_6-2-1.jpg"),
        text:"他拍了拍我的肩膀。\n我低头，看着手里的纸。\n上面写着我想对她说的话。\n改了又改。" },

      /* ==================== 场景 6-4：告白前一天 ==================== */
      { id:"s62", type:"scene", location:"dorm", tag:"第6章 · 4 月 18 日 · 夜", bg:BG("ch06_6-2-1.jpg") },

      { id:"s63", type:"narration", bg:BG("ch06_6-2-1.jpg"),
        text:"4 月 18 号。\n告白前一天。" },

      { id:"s64", type:"narration", bg:BG("ch06_6-2-1.jpg"),
        text:"我一个人坐在床上。\n对着手机屏。\n微信上，她刚发过来一句：「明天见。」" },

      { id:"s65", type:"dialogue", speaker:"su", text:"明天见。", bg:BG("ch06_6-2-1.jpg") },
      { id:"s66", type:"narration", bg:BG("ch06_6-2-1.jpg"),
        text:"我盯着这三个字看了很久。\n想回点什么。\n最后只回了一个「嗯」。" },

      { id:"s67", type:"narration", bg:BG("ch06_6-2-1.jpg"),
        text:"然后我把手机放下，闭上眼睛。\n明天，我要把心里的话，全部说出来。" },

      { id:"s68", type:"narration", bg:BG("ch06_6-2-1.jpg"),
        text:"我不知道结果是什么。\n但我决定，说出来。" },

      /* ==================== 结束 ==================== */
      { id:"s69", type:"set",
        effects:{
          flag:{ ch6_done:true, date_april19:true },
          intimacy:{ su:3 },
          memory:{ su:"我决定在 4 月 19 日告白" }
        } },

      { id:"s70", type:"end", autoSave:true, quiet:true, completeChapter:6 }
    ]
  };
})();