/* ============================================================
   第4章《长夜相伴，心动落地》
   时间：大一 11 月底（糖糖出院后一周内）
   主线：共同喂养 → 深夜同行 → 心动落地
   末尾：timeSkip 30 天，跳到第5章
   ============================================================ */
(function () {
  "use strict";
  const WF = window.WF || (window.WF = {});
  WF.Scenes = WF.Scenes || {};

  const BG = (f) => `center/cover no-repeat url("assets/bg/${f}")`;

  WF.Scenes.ch04 = {
    id: "ch04",
    chapter: 4,
    start: "s1",
    nodes: [
      /* ==================== 场景 4-1：共同喂养 ==================== */
      { id:"s1", type:"scene", location:"dorm", tag:"第4章 · 男生宿舍楼下", bg:BG("ch04_4-1-1.jpg") },

      { id:"s2", type:"narration", bg:BG("ch04_4-1-1.jpg"),
        text:"糖糖出院后，我们把它养在男生宿舍楼下。\n纸箱换成了小笼子，垫子、食盆、水盆，都是她一件件买的。" },

      { id:"s3", type:"narration", bg:BG("ch04_4-1-1.jpg"),
        text:"她怕猫冷，把自己的一条旧围巾剪了，垫在笼子底下。\n她说反正不戴了。" },

      { id:"s4", type:"dialogue", speaker:"chen", text:"这围巾你戴过的吧？", bg:BG("ch04_4-1-1.jpg") },
      { id:"s5", type:"dialogue", speaker:"su", text:"嗯。", bg:BG("ch04_4-1-1.jpg") },
      { id:"s6", type:"dialogue", speaker:"chen", text:"剪了不心疼？", bg:BG("ch04_4-1-1.jpg") },
      { id:"s7", type:"dialogue", speaker:"su", text:"……糖糖冷。", bg:BG("ch04_4-1-1.jpg") },

      { id:"s8", type:"narration", bg:BG("ch04_4-1-1.jpg"),
        text:"她说得理所当然。\n好像剪掉自己的围巾，是一件不需要犹豫的事。" },

      { id:"s9", type:"narration", bg:BG("ch04_4-1-1.jpg"),
        text:"我们约好，每天下午五点半，一起喂糖糖。\n她下课比我早，一般她先到。\n我实验做完，就去楼下找她。" },

      { id:"s10", type:"narration", bg:BG("ch04_4-1-1.jpg"),
        text:"那段时间，成了我一天里最期待的时刻。" },

      /* ==================== 场景 4-2：糖糖的日常 ==================== */
      { id:"s11", type:"scene", location:"dorm", tag:"第4章 · 傍晚的笼子", bg:BG("ch04_4-2-1.jpg") },

      { id:"s12", type:"narration", bg:BG("ch04_4-2-1.jpg"),
        text:"糖糖恢复得很快。\n一周后已经会自己走路了。\n两周后开始乱窜。\n她蹲在笼子边上，能看它半小时。" },

      { id:"s13", type:"dialogue", speaker:"su", text:"你看它。", bg:BG("ch04_4-2-1.jpg") },
      { id:"s14", type:"dialogue", speaker:"chen", text:"嗯。", bg:BG("ch04_4-2-1.jpg") },
      { id:"s15", type:"dialogue", speaker:"su", text:"它刚才舔我的手。", bg:BG("ch04_4-2-1.jpg") },
      { id:"s16", type:"dialogue", speaker:"chen", text:"它饿了。", bg:BG("ch04_4-2-1.jpg") },
      { id:"s17", type:"dialogue", speaker:"su", text:"……才不是。", bg:BG("ch04_4-2-1.jpg") },

      { id:"s18", type:"narration", bg:BG("ch04_4-2-1.jpg"),
        text:"她有点不服气。\n又低头去看糖糖。\n夕阳照在她脸上。\n她笑起来的时候，脸颊上的红也变得柔和。" },

      { id:"s19", type:"narration", bg:BG("ch04_4-2-1.jpg"),
        text:"我在旁边看着。\n看着她蹲在那里，看着糖糖。\n心里忽然有个念头：\n如果每天都是这样，就好了。" },

      /* ==================== 场景 4-3：室友撞见 ==================== */
      { id:"s20", type:"scene", location:"dorm", tag:"第4章 · 宿舍楼下", bg:BG("ch04_4-3-1.jpg") },

      { id:"s21", type:"narration", bg:BG("ch04_4-3-1.jpg"),
        text:"有天傍晚，杨文恒下楼买水，撞见我们俩蹲在笼子前。" },

      { id:"s22", type:"dialogue", speaker:"yangwh", text:"哟，老五。", bg:BG("ch04_4-3-1.jpg") },
      { id:"s23", type:"dialogue", speaker:"chen", text:"……嗯。", bg:BG("ch04_4-3-1.jpg") },
      { id:"s24", type:"dialogue", speaker:"yangwh", text:"这是……你女朋友？", bg:BG("ch04_4-3-1.jpg") },
      { id:"s25", type:"dialogue", speaker:"chen", text:"……不是。", bg:BG("ch04_4-3-1.jpg") },
      { id:"s26", type:"dialogue", speaker:"yangwh", text:"那是？", bg:BG("ch04_4-3-1.jpg") },
      { id:"s27", type:"dialogue", speaker:"chen", text:"……同学。", bg:BG("ch04_4-3-1.jpg") },

      { id:"s28", type:"narration", bg:BG("ch04_4-3-1.jpg"),
        text:"苏挽月没说话。\n她只是低头摸了摸糖糖的头。" },

      { id:"s29", type:"dialogue", speaker:"yangwh", text:"行吧。我懂了。", bg:BG("ch04_4-3-1.jpg") },
      { id:"s30", type:"dialogue", speaker:"yangwh", text:"你俩慢慢来啊。", bg:BG("ch04_4-3-1.jpg") },

      { id:"s31", type:"narration", bg:BG("ch04_4-3-1.jpg"),
        text:"杨文恒笑着走了。\n他走后，我们俩都没说话。\n糖糖在笼子里叫了一声。" },

      { id:"s32", type:"dialogue", speaker:"su", text:"……我走了。", bg:BG("ch04_4-3-1.jpg") },
      { id:"s33", type:"dialogue", speaker:"chen", text:"我送你。", bg:BG("ch04_4-3-1.jpg") },
      { id:"s34", type:"dialogue", speaker:"su", text:"不用。", bg:BG("ch04_4-3-1.jpg") },
      { id:"s35", type:"dialogue", speaker:"chen", text:"顺路。", bg:BG("ch04_4-3-1.jpg") },
      { id:"s36", type:"dialogue", speaker:"su", text:"……随便你。", bg:BG("ch04_4-3-1.jpg") },

      /* ==================== 场景 4-4：深夜同行 ==================== */
      { id:"s37", type:"scene", location:"campus", tag:"第4章 · 深夜的校园小路", bg:BG("ch04_4-4-1.jpg") },

      { id:"s38", type:"narration", bg:BG("ch04_4-4-1.jpg"),
        text:"路灯昏黄。\n我们走得很慢。\n谁都没说话。\n但谁都没加快脚步。" },

      { id:"s39", type:"narration", bg:BG("ch04_4-4-1.jpg"),
        text:"我想牵她的手。\n但没敢。" },

      { id:"s40", type:"narration", bg:BG("ch04_4-4-1.jpg"),
        text:"走到她宿舍楼下的时候，她停下来。" },

      { id:"s41", type:"dialogue", speaker:"su", text:"到了。", bg:BG("ch04_4-4-1.jpg") },
      { id:"s42", type:"dialogue", speaker:"chen", text:"嗯。", bg:BG("ch04_4-4-1.jpg") },
      { id:"s43", type:"dialogue", speaker:"su", text:"你回去吧。", bg:BG("ch04_4-4-1.jpg") },
      { id:"s44", type:"dialogue", speaker:"chen", text:"你先上去。", bg:BG("ch04_4-4-1.jpg") },
      { id:"s45", type:"dialogue", speaker:"su", text:"……好。", bg:BG("ch04_4-4-1.jpg") },

      { id:"s46", type:"narration", bg:BG("ch04_4-4-1.jpg"),
        text:"她转身，走了两步。\n又停下来。" },

      { id:"s47", type:"dialogue", speaker:"su", text:"陈敬运。", bg:BG("ch04_4-4-1.jpg") },
      { id:"s48", type:"dialogue", speaker:"chen", text:"嗯？", bg:BG("ch04_4-4-1.jpg") },
      { id:"s49", type:"dialogue", speaker:"su", text:"……", bg:BG("ch04_4-4-1.jpg") },
      { id:"s50", type:"dialogue", speaker:"su", text:"没事。晚安。", bg:BG("ch04_4-4-1.jpg") },

      { id:"s51", type:"narration", bg:BG("ch04_4-4-1.jpg"),
        text:"她跑进宿舍楼。\n我站在原地。\n看着她消失的门口。" },

      /* ==================== 场景 4-5：夜晚的宿舍 ==================== */
      { id:"s54", type:"scene", location:"dorm", tag:"第4章 · 宿舍夜晚", bg:BG("ch04_4-5-1.jpg") },

      { id:"s55", type:"narration", bg:BG("ch04_4-5-1.jpg"),
        text:"回到宿舍，杨文恒正趴在床上打游戏。\n看到我回来，他坐起来。" },

      { id:"s26b", type:"dialogue", speaker:"yangwh", text:"怎么样？", bg:BG("ch04_4-5-1.jpg") },
      { id:"s27b", type:"dialogue", speaker:"chen", text:"什么怎么样。", bg:BG("ch04_4-5-1.jpg") },
      { id:"s28b", type:"dialogue", speaker:"yangwh", text:"你俩。", bg:BG("ch04_4-5-1.jpg") },
      { id:"s29b", type:"dialogue", speaker:"chen", text:"……没什么。", bg:BG("ch04_4-5-1.jpg") },
      { id:"s30b", type:"dialogue", speaker:"yangwh", text:"行，我不管。", bg:BG("ch04_4-5-1.jpg") },

      { id:"s31b", type:"narration", bg:BG("ch04_4-5-1.jpg"),
        text:"他躺回去。\n我坐在书桌前。\n拿出一张纸。\n想写点什么。\n但最后什么都没写。" },

      { id:"s32b", type:"narration", bg:BG("ch04_4-5-1.jpg"),
        text:"我只是在心里，把那两个字，写了一遍又一遍。\n苏挽月。" },

      /* ==================== 结束 + 跳时间 ==================== */
      { id:"s56", type:"set",
        effects:{
          flag:{ ch4_done:true },
          intimacy:{ su:5 },
          memory:{ su:"糖糖出院后，我们每天傍晚一起喂它" }
        } },

      { id:"s57", type:"narration", bg:BG("ch04_4-5-1.jpg"),
        text:"十一月快结束了。\n天气越来越冷。\n但每天傍晚的五点半，成了我最温暖的时刻。" },

      /* ---------- 跳时间：跳到第5章 ---------- */
      { id:"s58", type:"timeSkip", days:30,
        text:"接下来的一个月，日子平静地过去。\n每天上课、实验、喂糖糖。\n期末考试临近。\n你在这段时间做了什么？",
        options: [
          { key:"iq",     label:"智商",   icon:"🧠", add:8 },
          { key:"eq",     label:"情商",   icon:"💬", add:8 },
          { key:"health", label:"健康",   icon:"❤️", add:8 },
          { key:"money",  label:"金钱",   icon:"💰", add:300 }
        ]
      },

      { id:"s59", type:"narration", bg:BG("ch04_4-5-1.jpg"),
        text:"一个月过去了。\n期末考试结束了。\n新的一年，就这样来了。" },

      { id:"s60", type:"end", autoSave:true, quiet:true, completeChapter:4 }
    ]
  };
})();