/* ============================================================
   第三章《深秋寒夜，一只小猫》
   时间：大一 11 月
   主线：雨夜捡猫 → 宠物医院 → 甜品店打工 → 深夜便利店 → 共同喂养
   伏笔：钱不够、疲惫泛红、洗衣液味道、心动落地
   B类成就：糖糖的第七个夜晚
   ============================================================ */
(function () {
  "use strict";
  const WF = window.WF || (window.WF = {});
  WF.Scenes = WF.Scenes || {};

  const BG = (f) => `center/cover no-repeat url("assets/bg/${f}")`;

  WF.Scenes.ch03 = {
    id: "ch03",
    chapter: 3,
    start: "s1",
    nodes: [
      /* ==================== 场景 3-1：雨夜捡猫 ==================== */
      { id:"s1", type:"scene", location:"campus", tag:"第三章 · 深秋寒夜", bg:BG("ch03_3-1-1.jpg") },

      { id:"s2", type:"narration", bg:BG("ch03_3-1-1.jpg"),
        text:"十一月。\n天气一夜之间冷下来。\n那天晚上下着雨，我本来在宿舍复习。" },

      { id:"s3", type:"narration", bg:BG("ch03_3-1-1.jpg"),
        text:"手机震了一下。\n是苏挽月。\n只有四个字。" },

      { id:"s4", type:"dialogue", speaker:"su", text:"你能来吗。", bg:BG("ch03_3-1-1.jpg") },

      { id:"s5", type:"narration", bg:BG("ch03_3-1-1.jpg"),
        text:"我披了件外套就出去了。\n她没发定位，只说了句「学校西门外面那条巷子」。" },

      { id:"s6", type:"scene", location:"campus", tag:"第三章 · 校园外小巷", bg:BG("ch03_3-1-2.jpg") },

      { id:"s7", type:"narration", bg:BG("ch03_3-1-2.jpg"),
        text:"巷子很窄，路灯坏了两盏。\n我远远看到她蹲在地上，撑着一把伞，半边肩膀已经湿透。\n她面前放着一个纸箱。" },

      { id:"s8", type:"dialogue", speaker:"chen", text:"怎么回事？", bg:BG("ch03_3-1-2.jpg") },
      { id:"s9", type:"dialogue", speaker:"su",   text:"我路过，听到声音。", bg:BG("ch03_3-1-2.jpg") },
      { id:"s10", type:"dialogue", speaker:"chen", text:"它怎么了？", bg:BG("ch03_3-1-2.jpg") },
      { id:"s11", type:"dialogue", speaker:"su",   text:"不知道。它不动了。", bg:BG("ch03_3-1-2.jpg") },

      { id:"s12", type:"narration", bg:BG("ch03_3-1-2.jpg"),
        text:"我蹲下来，伸手碰了碰小猫。\n很小，很小的一只。\n眼睛都还没完全睁开。\n它在抖。" },

      { id:"s13", type:"dialogue", speaker:"chen", text:"得送医院。", bg:BG("ch03_3-1-2.jpg") },
      { id:"s14", type:"dialogue", speaker:"su",   text:"我查了。最近的宠物医院，打车要二十。", bg:BG("ch03_3-1-2.jpg") },
      { id:"s15", type:"dialogue", speaker:"chen", text:"那就打车。", bg:BG("ch03_3-1-2.jpg") },
      { id:"s16", type:"dialogue", speaker:"su",   text:"……我身上钱不够。", bg:BG("ch03_3-1-2.jpg") },

      { id:"s17", type:"narration", bg:BG("ch03_3-1-2.jpg"),
        text:"雨打在她的伞上。\n她半边肩膀已经湿透。\n她低着头，看着箱子。\n我看不清她的表情。" },

      { id:"s18", type:"narration", bg:BG("ch03_3-1-2.jpg"),
        text:"她说钱不够。\n我知道她一直在打工。\n但她连二十块打车费都拿不出来。\n我没问为什么。" },

      { id:"s19", type:"dialogue", speaker:"chen", text:"走，我出。", bg:BG("ch03_3-1-2.jpg") },
      { id:"s20", type:"dialogue", speaker:"su",   text:"我回头还你。", bg:BG("ch03_3-1-2.jpg") },
      { id:"s21", type:"dialogue", speaker:"chen", text:"不用。", bg:BG("ch03_3-1-2.jpg") },
      { id:"s22", type:"dialogue", speaker:"su",   text:"要还。", bg:BG("ch03_3-1-2.jpg") },

      { id:"s23", type:"narration", bg:BG("ch03_3-1-2.jpg"),
        text:"我没跟她争。\n我抱起纸箱。\n她撑着伞，跟在我旁边。\n两个人，一只猫，走进雨里。" },

      /* ==================== 场景 3-2：宠物医院 ==================== */
      { id:"s24", type:"scene", location:"campus", tag:"第三章 · 宠物医院", bg:BG("ch03_3-2-1.jpg") },

      { id:"s25", type:"narration", bg:BG("ch03_3-2-1.jpg"),
        text:"医生检查完，说小猫严重脱水、营养不良，需要住院观察。" },

      { id:"s26", type:"dialogue", speaker:"mentor", text:"押金五百，后续看情况。", bg:BG("ch03_3-2-1.jpg") },

      { id:"s27", type:"narration", bg:BG("ch03_3-2-1.jpg"),
        text:"她攥紧了衣角。\n没说话。\n但她的手在抖。" },

      { id:"s28", type:"dialogue", speaker:"chen", text:"我先垫。", bg:BG("ch03_3-2-1.jpg") },
      { id:"s29", type:"dialogue", speaker:"su",   text:"不行。", bg:BG("ch03_3-2-1.jpg") },
      { id:"s30", type:"dialogue", speaker:"chen", text:"那你有吗？", bg:BG("ch03_3-2-1.jpg") },
      { id:"s31", type:"dialogue", speaker:"su",   text:"……没有。", bg:BG("ch03_3-2-1.jpg") },
      { id:"s32", type:"dialogue", speaker:"chen", text:"那就先垫，你以后还我。", bg:BG("ch03_3-2-1.jpg") },

      { id:"s33", type:"narration", bg:BG("ch03_3-2-1.jpg"),
        text:"她看着我。\n眼睛有点红。\n但没哭。" },

      { id:"s34", type:"dialogue", speaker:"su", text:"我会还你的。", bg:BG("ch03_3-2-1.jpg") },
      { id:"s35", type:"dialogue", speaker:"chen", text:"我知道。", bg:BG("ch03_3-2-1.jpg") },

      { id:"s36", type:"narration", bg:BG("ch03_3-2-1.jpg"),
        text:"她说了会还。\n我知道她会还。\n她这个人，什么都自己扛。\n连一只猫，都不肯放弃。" },

      /* ==================== 场景 3-3：甜品店打工 ==================== */
      { id:"s37", type:"scene", location:"cafe", tag:"第三章 · 甜品店", bg:BG("ch03_3-3-1.jpg") },

      { id:"s38", type:"narration", bg:BG("ch03_3-3-1.jpg"),
        text:"为了还钱，她增加了打工时间。\n每周一、三、五，晚上六点到十点。\n周末全天。" },

      { id:"s39", type:"narration", bg:BG("ch03_3-3-2.jpg"),
        text:"我有一次路过甜品店，看到她在后厨。\n她没看到我。" },

      { id:"s40", type:"narration", bg:BG("ch03_3-3-2.jpg"),
        text:"她穿着围裙，在洗盘子。\n动作很快。\n脸颊因为忙碌变得红起来。" },

      { id:"s41", type:"narration", bg:BG("ch03_3-3-2.jpg"),
        text:"她看起来很累。\n但她还是在笑。\n对客人笑，对老板笑。\n只有转身的时候，笑容才收起来。" },

      { id:"s42", type:"narration", bg:BG("ch03_3-3-2.jpg"),
        text:"我站在外面看了很久。\n然后走了。" },

      /* ==================== 场景 3-4：深夜便利店 ==================== */
      { id:"s43", type:"scene", location:"cafe", tag:"第三章 · 深夜便利店", bg:BG("ch03_3-4-1.jpg") },

      { id:"s44", type:"narration", bg:BG("ch03_3-4-1.jpg"),
        text:"那天晚上快十点。\n我在学校附近便利店买水。\n结账的时候，看到她从甜品店下班，走进来。" },

      { id:"s45", type:"dialogue", speaker:"chen", text:"下班了？", bg:BG("ch03_3-4-1.jpg") },
      { id:"s46", type:"dialogue", speaker:"su",   text:"嗯。", bg:BG("ch03_3-4-1.jpg") },
      { id:"s47", type:"dialogue", speaker:"chen", text:"喝水吗？", bg:BG("ch03_3-4-1.jpg") },
      { id:"s48", type:"dialogue", speaker:"su",   text:"……好。", bg:BG("ch03_3-4-1.jpg") },

      { id:"s49", type:"narration", bg:BG("ch03_3-4-1.jpg"),
        text:"我们坐在便利店外面的长椅上。\n路灯昏黄。\n她拧开水，喝了一口。\n她的手指有点红，是洗碗洗的。" },

      { id:"s50", type:"narration", bg:BG("ch03_3-4-1.jpg"),
        text:"她坐在我旁边。\n很近。\n我能闻到她身上干净的洗衣液味道。\n她没说话。\n我也没说话。" },

      { id:"s51", type:"narration", bg:BG("ch03_3-4-1.jpg"),
        text:"但那一刻，我清楚地感觉到——\n我喜欢她。" },

      { id:"s52", type:"dialogue", speaker:"chen", text:"你每天都这么晚？", bg:BG("ch03_3-4-1.jpg") },
      { id:"s53", type:"dialogue", speaker:"su",   text:"嗯。", bg:BG("ch03_3-4-1.jpg") },
      { id:"s54", type:"dialogue", speaker:"chen", text:"不累吗？", bg:BG("ch03_3-4-1.jpg") },
      { id:"s55", type:"dialogue", speaker:"su",   text:"习惯了。", bg:BG("ch03_3-4-1.jpg") },
      { id:"s56", type:"dialogue", speaker:"chen", text:"……我帮你吧。", bg:BG("ch03_3-4-1.jpg") },
      { id:"s57", type:"dialogue", speaker:"su",   text:"不用。", bg:BG("ch03_3-4-1.jpg") },
      { id:"s58", type:"dialogue", speaker:"chen", text:"我不是说钱。", bg:BG("ch03_3-4-1.jpg") },
      { id:"s59", type:"dialogue", speaker:"su",   text:"那是什么？", bg:BG("ch03_3-4-1.jpg") },
      { id:"s60", type:"dialogue", speaker:"chen", text:"……不知道。就是想帮你。", bg:BG("ch03_3-4-1.jpg") },

      { id:"s61", type:"narration", bg:BG("ch03_3-4-1.jpg"),
        text:"她看着我。\n看了很久。\n然后她低下头，笑了一下。\n很轻，很淡。" },

      { id:"s62", type:"dialogue", speaker:"su", text:"你这个人，挺奇怪的。", bg:BG("ch03_3-4-1.jpg") },
      { id:"s63", type:"dialogue", speaker:"chen", text:"哪里奇怪？", bg:BG("ch03_3-4-1.jpg") },
      { id:"s64", type:"dialogue", speaker:"su", text:"……说不上来。", bg:BG("ch03_3-4-1.jpg") },

      { id:"s65", type:"narration", bg:BG("ch03_3-4-2.jpg"),
        text:"她站起来，把水瓶扔进垃圾桶。\n「走了。」\n「我送你。」\n「不用。」\n「顺路。」\n她看了我一眼：「……随便你。」" },

      { id:"s66", type:"narration", bg:BG("ch03_3-4-2.jpg"),
        text:"我们一起走回学校。\n深夜的街道很安静。\n路灯把我们的影子拉得很长。" },

      { id:"s67", type:"narration", bg:BG("ch03_3-4-2.jpg"),
        text:"一路上她没再说话。\n但走到她宿舍楼下的时候，她停了一下。\n回头看了我一眼。" },

      { id:"s68", type:"dialogue", speaker:"su", text:"……谢谢你。", bg:BG("ch03_3-4-2.jpg") },
      { id:"s69", type:"dialogue", speaker:"chen", text:"谢什么？", bg:BG("ch03_3-4-2.jpg") },
      { id:"s70", type:"dialogue", speaker:"su", text:"糖糖。", bg:BG("ch03_3-4-2.jpg") },
      { id:"s71", type:"dialogue", speaker:"chen", text:"糖糖？", bg:BG("ch03_3-4-2.jpg") },
      { id:"s72", type:"dialogue", speaker:"su", text:"……小猫的名字。", bg:BG("ch03_3-4-2.jpg") },
      { id:"s73", type:"dialogue", speaker:"su", text:"它喜欢舔糖。", bg:BG("ch03_3-4-2.jpg") },

      { id:"s74", type:"narration", bg:BG("ch03_3-4-2.jpg"),
        text:"她说完就进去了。\n我站在原地。\n把「糖糖」这两个字，记在心里。" },

      /* ==================== 场景 3-5：糖糖出院 ==================== */
      { id:"s75", type:"scene", location:"dorm", tag:"第三章 · 糖糖出院", bg:BG("ch03_3-5-1.jpg") },

      { id:"s76", type:"narration", bg:BG("ch03_3-5-1.jpg"),
        text:"一周后，糖糖出院了。\n宿舍不让养猫，我们把纸箱放在男生宿舍楼下。\n每天轮流喂。" },

      { id:"s77", type:"narration", bg:BG("ch03_3-5-2.jpg"),
        text:"她每天下课都来看糖糖。\n蹲在纸箱旁边，摸它的头。\n夕阳照在她脸上。\n她笑了。" },

      { id:"s78", type:"narration", bg:BG("ch03_3-5-2.jpg"),
        text:"那是我第一次看到她真心的笑。\n不是那种客气的笑。\n是真的笑了。\n眼睛弯起来，脸颊上的红也变得柔和。" },

      { id:"s79", type:"dialogue", speaker:"su", text:"陈敬运。", bg:BG("ch03_3-5-2.jpg") },
      { id:"s80", type:"dialogue", speaker:"chen", text:"嗯？", bg:BG("ch03_3-5-2.jpg") },
      { id:"s81", type:"dialogue", speaker:"su", text:"谢谢你。", bg:BG("ch03_3-5-2.jpg") },
      { id:"s82", type:"dialogue", speaker:"chen", text:"又谢？", bg:BG("ch03_3-5-2.jpg") },
      { id:"s83", type:"dialogue", speaker:"su", text:"……嗯。", bg:BG("ch03_3-5-2.jpg") },

      /* ==================== 结束 ==================== */
      { id:"s84", type:"set",
        effects:{
          flag:{ sugar_rescued:true },
          intimacy:{ su:8 },
          memory:{ su:"一起救了糖糖。她给小猫取名叫糖糖。" }
        } },

      { id:"s85", type:"narration", bg:BG("ch03_3-5-2.jpg"),
        text:"那天晚上我回宿舍。\n窗外还在下雨。\n但心里，是暖的。" },

      { id:"s86", type:"achieve", achId:"b_sugar", kind:"B", poem:"糖糖的第七个夜晚" },

      { id:"s87", type:"end", autoSave:true, quiet:true, completeChapter:3 }
    ]
  };
})();