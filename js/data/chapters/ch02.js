/* ============================================================
   第二章《十月二十二，无声生辰》
   大一 10 月，班级信息表 → 手工书签 → 校园长椅过生日 → 兼职线索
   伏笔：独自吃面包、兼职、脸颊泛红、怕光
   ============================================================ */
(function () {
  "use strict";
  const WF = window.WF || (window.WF = {});
  WF.Scenes = WF.Scenes || {};

  const BG = (f) => `center/cover no-repeat url("assets/bg/${f}")`;

  WF.Scenes.ch02 = {
    id: "ch02",
    chapter: 2,
    start: "s1",
    nodes: [
      /* ==================== 场景 2-1：教室 ==================== */
      { id:"s1", type:"scene", location:"teaching", tag:"第二章 · 教室", bg:BG("ch02_2-1-1.jpg") },

      { id:"s2", type:"narration", bg:BG("ch02_2-1-1.jpg"),
        text:"大学第一个月过得很快。\n上课、吃饭、图书馆、宿舍，四点一线。\n我偶尔和苏挽月发消息，不多，一天几句。\n她回得慢，但每次都会回。" },

      { id:"s3", type:"narration", bg:BG("ch02_2-1-1.jpg"),
        text:"那天课间，我在教室里翻看班级信息表。\n姓名、学号、生日，一行一行排下来。\n翻到心理学系那页时，我手指停住了。" },

      { id:"s4", type:"narration", bg:BG("ch02_2-1-2.jpg"),
        text:"苏挽月。\n生日：10 月 22 日。" },

      { id:"s5", type:"narration", bg:BG("ch02_2-1-2.jpg"),
        text:"还有三天。\n我不知道为什么，把这一页拍了下来。\n然后在备忘录里打了一行字：10.22，礼物。" },

      { id:"sA1", type:"achieve", achId:"b_oct22", kind:"B", poem:"十月的第二十二页" },

      /* ==================== 场景 2-2：宿舍做书签 ==================== */
      { id:"s6", type:"scene", location:"dorm", tag:"第二章 · 宿舍夜晚", bg:BG("ch02_2-2-1.jpg") },

      { id:"s7", type:"narration", bg:BG("ch02_2-2-1.jpg"),
        text:"那三天里，我一直在想送什么。\n买不起贵的，也送不出心意。\n最后决定：自己做一个书签。" },

      { id:"s8", type:"narration", bg:BG("ch02_2-2-1.jpg"),
        text:"她喜欢看书。火车上就在看。\n应该用得上。" },

      { id:"s9", type:"dialogue", speaker:"lidh", text:"你在干嘛？", bg:BG("ch02_2-2-1.jpg") },
      { id:"s10", type:"dialogue", speaker:"chen", text:"做东西。", bg:BG("ch02_2-2-1.jpg") },
      { id:"s11", type:"dialogue", speaker:"lidh", text:"送谁？", bg:BG("ch02_2-2-1.jpg") },
      { id:"s12", type:"dialogue", speaker:"chen", text:"……同学。", bg:BG("ch02_2-2-1.jpg") },
      { id:"s13", type:"dialogue", speaker:"yangwh", text:"女同学吧？", bg:BG("ch02_2-2-1.jpg") },
      { id:"s14", type:"dialogue", speaker:"chen", text:"……", bg:BG("ch02_2-2-1.jpg") },
      { id:"s15", type:"dialogue", speaker:"yangwh", text:"懂了。老二我什么都懂。", bg:BG("ch02_2-2-1.jpg") },
      { id:"s16", type:"dialogue", speaker:"chen", text:"……闭嘴。", bg:BG("ch02_2-2-1.jpg") },

      { id:"s17", type:"narration", bg:BG("ch02_2-2-2.jpg"),
        text:"剪了好几张纸，桌上堆着失败品。\n我叹了口气，重新拿了一张。\n终于，一个还算能看的书签成型了。\n素色，细绳，角落画了一个小小的月亮。" },

      { id:"s18", type:"narration", bg:BG("ch02_2-2-2.jpg"),
        text:"月亮。\n她名字里有个「月」。\n我不知道她会不会喜欢。\n但这是我唯一能拿得出手的东西。" },

      /* ==================== 场景 2-3：校园长椅生日夜 ==================== */
      { id:"s19", type:"scene", location:"campus", tag:"第二章 · 十月二十二日", bg:BG("ch02_2-3-1.jpg") },

      { id:"s20", type:"narration", bg:BG("ch02_2-3-1.jpg"),
        text:"10 月 22 日，晚上。\n校园长椅。\n路灯昏黄。" },

      { id:"s21", type:"narration", bg:BG("ch02_2-3-2.jpg"),
        text:"她坐在长椅上，低头看书。\n我从远处走过去。\n走近了才发现，路灯照在她脸上的时候，她脸颊上那片红又浮出来了。" },

      { id:"s22", type:"dialogue", speaker:"chen", text:"这么晚还看书？", bg:BG("ch02_2-3-2.jpg") },
      { id:"s23", type:"dialogue", speaker:"su",   text:"嗯。", bg:BG("ch02_2-3-2.jpg") },
      { id:"s24", type:"dialogue", speaker:"chen", text:"今天……是你生日吧？", bg:BG("ch02_2-3-2.jpg") },
      { id:"s25", type:"dialogue", speaker:"su",   text:"……你怎么知道？", bg:BG("ch02_2-3-2.jpg") },
      { id:"s26", type:"dialogue", speaker:"chen", text:"班级信息表上看到的。", bg:BG("ch02_2-3-2.jpg") },
      { id:"s27", type:"dialogue", speaker:"su",   text:"……哦。", bg:BG("ch02_2-3-2.jpg") },

      { id:"s28", type:"narration", bg:BG("ch02_2-3-3.jpg"),
        text:"我从包里拿出书签，递过去。" },

      { id:"s29", type:"dialogue", speaker:"chen", text:"生日快乐。", bg:BG("ch02_2-3-3.jpg") },

      { id:"s30", type:"narration", bg:BG("ch02_2-3-4.jpg"),
        text:"她接过书签，看了很久。\n路灯照在她脸上。\n那片红更深了。" },

      { id:"s31", type:"dialogue", speaker:"su", text:"……你自己做的？", bg:BG("ch02_2-3-4.jpg") },
      { id:"s32", type:"dialogue", speaker:"chen", text:"嗯，做得不太好。", bg:BG("ch02_2-3-4.jpg") },
      { id:"s33", type:"dialogue", speaker:"su", text:"谢谢。", bg:BG("ch02_2-3-4.jpg") },

      { id:"s34", type:"narration", bg:BG("ch02_2-3-4.jpg"),
        text:"她把书签握在手里。\n低头看着上面的月亮。\n我问她今天怎么过的。\n她说，没怎么过。\n一个人。" },

      { id:"s35", type:"dialogue", speaker:"chen", text:"没和朋友一起？", bg:BG("ch02_2-3-4.jpg") },
      { id:"s36", type:"dialogue", speaker:"su",   text:"没有。", bg:BG("ch02_2-3-4.jpg") },
      { id:"s37", type:"dialogue", speaker:"chen", text:"室友呢？", bg:BG("ch02_2-3-4.jpg") },
      { id:"s38", type:"dialogue", speaker:"su",   text:"她们有课。", bg:BG("ch02_2-3-4.jpg") },
      { id:"s39", type:"dialogue", speaker:"chen", text:"那你吃饭了吗？", bg:BG("ch02_2-3-4.jpg") },
      { id:"s40", type:"dialogue", speaker:"su",   text:"……吃了。", bg:BG("ch02_2-3-4.jpg") },

      { id:"s41", type:"narration", bg:BG("ch02_2-3-4.jpg"),
        text:"她说吃了。\n但我看到她包里露出半袋面包。\n她今天大概只吃了那个。\n我没问。\n我只是坐在她旁边，陪她看了一会儿路灯。" },

      /* ==================== 场景 2-4：兼职线索 ==================== */
      { id:"s42", type:"narration", bg:BG("ch02_2-4-1.jpg"),
        text:"坐着的时候，我看到了她包里的排班表。\n甜品店。\n每周一、三、五，晚上六点到十点。\n还有周末全天。\n我算了一下，她几乎每天都在打工。" },

      { id:"s43", type:"dialogue", speaker:"chen", text:"你在打工？", bg:BG("ch02_2-4-1.jpg") },
      { id:"s44", type:"dialogue", speaker:"su",   text:"嗯。", bg:BG("ch02_2-4-1.jpg") },
      { id:"s45", type:"dialogue", speaker:"chen", text:"很累吧？", bg:BG("ch02_2-4-1.jpg") },
      { id:"s46", type:"dialogue", speaker:"su",   text:"还好。", bg:BG("ch02_2-4-1.jpg") },
      { id:"s47", type:"dialogue", speaker:"chen", text:"你家里……", bg:BG("ch02_2-4-1.jpg") },
      { id:"s48", type:"dialogue", speaker:"su",   text:"我想自己赚点钱。", bg:BG("ch02_2-4-1.jpg") },

      { id:"s49", type:"narration", bg:BG("ch02_2-4-1.jpg"),
        text:"她说这句话时，语气很平静。\n但我感觉到，她不想继续这个话题。\n我没再问。\n但我记住了那家甜品店的名字。" },

      { id:"s50", type:"narration", bg:BG("ch02_2-4-2.jpg"),
        text:"快到十点，她站起来。\n「走了。」\n「我送你。」\n她看了我一眼，没说话，往宿舍方向走。\n我跟上。" },

      { id:"s51", type:"narration", bg:BG("ch02_2-4-2.jpg"),
        text:"一路上我们都没怎么说话。\n她走得很慢。\n我也放慢脚步。\n到她宿舍楼下，她停下来。" },

      { id:"s52", type:"dialogue", speaker:"su",   text:"到了。", bg:BG("ch02_2-4-2.jpg") },
      { id:"s53", type:"dialogue", speaker:"chen", text:"嗯。", bg:BG("ch02_2-4-2.jpg") },
      { id:"s54", type:"dialogue", speaker:"su",   text:"你回去吧。", bg:BG("ch02_2-4-2.jpg") },
      { id:"s55", type:"dialogue", speaker:"chen", text:"你先上去。", bg:BG("ch02_2-4-2.jpg") },
      { id:"s56", type:"dialogue", speaker:"su",   text:"……好。", bg:BG("ch02_2-4-2.jpg") },

      { id:"s57", type:"narration", bg:BG("ch02_2-4-2.jpg"),
        text:"她转身，走了两步。\n又停下来。" },

      { id:"s58", type:"dialogue", speaker:"su",   text:"陈敬运。", bg:BG("ch02_2-4-2.jpg") },
      { id:"s59", type:"dialogue", speaker:"chen", text:"嗯？", bg:BG("ch02_2-4-2.jpg") },
      { id:"s60", type:"dialogue", speaker:"su",   text:"……书签。", bg:BG("ch02_2-4-2.jpg") },
      { id:"s61", type:"dialogue", speaker:"chen", text:"嗯？", bg:BG("ch02_2-4-2.jpg") },
      { id:"s62", type:"dialogue", speaker:"su",   text:"我会一直用。", bg:BG("ch02_2-4-2.jpg") },

      { id:"s63", type:"narration", bg:BG("ch02_2-4-2.jpg"),
        text:"她说完就进去了。\n我站在原地，愣了几秒。\n然后笑了。" },

      /* ==================== 结束 ==================== */
      { id:"s64", type:"set",
        effects:{
          flag:{ oct22_passed:true },
          intimacy:{ su:8 },
          memory:{ su:"她生日那天，我送了她一个手工书签。她说会一直用。" }
        } },

      { id:"s65", type:"narration", bg:BG("ch02_2-4-2.jpg"),
        text:"十月二十二日。\n她的生日。\n从这天起，我好像更想见到她了。" },

      { id:"s66", type:"end", autoSave:true, quiet:true, completeChapter:2 }
    ]
  };
})();