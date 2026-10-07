/* ============================================================
   第8章《并肩同行，爱意日常》
   时间：大二上学期（第330天左右）
   主线：大二开学 → 基础实验室 → 草稿纸上的风
   感情：热恋期日常，女主的异常开始出现（伏笔）
   ============================================================ */
(function () {
  "use strict";
  const WF = window.WF || (window.WF = {});
  WF.Scenes = WF.Scenes || {};

  const BG = (f) => `center/cover no-repeat url("assets/bg/${f}")`;

  WF.Scenes.ch08 = {
    id: "ch08",
    chapter: 8,
    start: "s1",
    nodes: [
      /* ==================== 场景 8-1：大二开学 ==================== */
      { id:"s1", type:"scene", location:"campus", tag:"第8章 · 大二开学", bg:BG("ch08_8-1-1.jpg") },

      { id:"s2", type:"narration", bg:BG("ch08_8-1-1.jpg"),
        text:"九月。\n大二开学。\n校园里的梧桐叶还没黄，但风已经凉了。" },

      { id:"s3", type:"narration", bg:BG("ch08_8-1-1.jpg"),
        text:"暑假两个多月没见。\n她回了老家，我留在城里打工。\n我们每天发消息，但都不长。" },

      { id:"s4", type:"narration", bg:BG("ch08_8-1-1.jpg"),
        text:"今天报到的时候，我在校门口等了她一会儿。\n远远地看到一个熟悉的身影。" },

      { id:"s5", type:"dialogue", speaker:"chen", text:"这边！", bg:BG("ch08_8-1-1.jpg") },

      { id:"s6", type:"narration", bg:BG("ch08_8-1-1.jpg"),
        text:"她朝我走过来。\n脸颊上带着淡淡的红。" },

      { id:"s7", type:"dialogue", speaker:"su", text:"等很久了？", bg:BG("ch08_8-1-1.jpg") },
      { id:"s8", type:"dialogue", speaker:"chen", text:"没有。刚到。", bg:BG("ch08_8-1-1.jpg") },
      { id:"s9", type:"dialogue", speaker:"su", text:"骗人。你衣服上有树叶。", bg:BG("ch08_8-1-1.jpg") },
      { id:"s10", type:"dialogue", speaker:"chen", text:"那怎么了……哼！", bg:BG("ch08_8-1-1.jpg") },

      { id:"s11", type:"narration", bg:BG("ch08_8-1-1.jpg"),
        text:"她笑了一下。\n很轻。\n我接过她手里的行李箱。\n我们一起往宿舍走。" },

      { id:"s12", type:"dialogue", speaker:"chen", text:"暑假过得好吗？", bg:BG("ch08_8-1-1.jpg") },
      { id:"s13", type:"dialogue", speaker:"su", text:"有你便是最好。", bg:BG("ch08_8-1-1.jpg") },
      { id:"s13bb", type:"dialogue", speaker:"chen", text:"...", bg:BG("ch08_8-1-1.jpg") },
      { id:"s14", type:"dialogue", speaker:"chen", text:"家里没什么事吧？", bg:BG("ch08_8-1-1.jpg") },
      { id:"s15", type:"dialogue", speaker:"su", text:"没事哦，不用你这么关心我。", bg:BG("ch08_8-1-1.jpg") },



      /* ==================== 场景 8-2：基础实验室 ==================== */
      { id:"s20", type:"scene", location:"lab", tag:"第8章 · 基础实验室", bg:BG("ch08_8-2-1.jpg") },

      { id:"s21", type:"narration", bg:BG("ch08_8-2-1.jpg"),
        text:"大二开始进基础实验室。\n药学专业从这学期起，正式接触实验。\n导师说，你们要先学会怎么拿试管，再谈研发。" },

      { id:"s22", type:"narration", bg:BG("ch08_8-2-1.jpg"),
        text:"那天下午我在实验室做了三个小时。\n出来的时候，看到她在实验室外面的长椅上等我。" },

      { id:"s23", type:"narration", bg:BG("ch08_8-2-1.jpg"),
        text:"她手里拿着一本笔记本。\n看到我出来，很快合上，塞进包里。" },

      { id:"s24", type:"dialogue", speaker:"chen", text:"写什么呢？", bg:BG("ch08_8-2-1.jpg") },
      { id:"s25", type:"dialogue", speaker:"su", text:"没什么。", bg:BG("ch08_8-2-1.jpg") },
      { id:"s26", type:"dialogue", speaker:"chen", text:"给我看看？", bg:BG("ch08_8-2-1.jpg") },
      { id:"s27", type:"dialogue", speaker:"su", text:"不行。", bg:BG("ch08_8-2-1.jpg") },
      { id:"s28", type:"dialogue", speaker:"chen", text:"为什么？", bg:BG("ch08_8-2-1.jpg") },
      { id:"s29", type:"dialogue", speaker:"su", text:"……还没写好。", bg:BG("ch08_8-2-1.jpg") },
      { id:"s30", type:"dialogue", speaker:"chen", text:"那什么时候写好？", bg:BG("ch08_8-2-1.jpg") },
      { id:"s31", type:"dialogue", speaker:"su", text:"……再说。", bg:BG("ch08_8-2-1.jpg") },

      { id:"s32", type:"narration", bg:BG("ch08_8-2-1.jpg"),
        text:"她把笔记本塞进包里。\n站起来。\n「走吧，吃饭。」" },

      { id:"s33", type:"narration", bg:BG("ch08_8-2-1.jpg"),
        text:"她总是这样。\n写东西的时候不让我看。\n唉，看不懂女生的小心思。" },

      /* ==================== 场景 8-3：草稿纸上的风 ==================== */
      { id:"s34", type:"scene", location:"library", tag:"第8章 · 草稿纸上的风", bg:BG("ch08_8-3-1.jpg") },

      { id:"s35", type:"narration", bg:BG("ch08_8-3-1.jpg"),
        text:"开学第一周，图书馆。\n我在做实验报告。\n她坐在我对面。" },

      { id:"s36", type:"narration", bg:BG("ch08_8-3-1.jpg"),
        text:"我写得有点累。\n推了推草稿纸。\n抬头的时候，发现她在上面画东西。" },

      { id:"s37", type:"dialogue", speaker:"chen", text:"又画风？", bg:BG("ch08_8-3-1.jpg") },
      { id:"s38", type:"dialogue", speaker:"su", text:"嗯。", bg:BG("ch08_8-3-1.jpg") },
      { id:"s39", type:"dialogue", speaker:"chen", text:"你到底为什么喜欢画风？", bg:BG("ch08_8-3-1.jpg") },
      { id:"s40", type:"dialogue", speaker:"su", text:"……风很自由。", bg:BG("ch08_8-3-1.jpg") },
      { id:"s41", type:"dialogue", speaker:"chen", text:"你想自由？", bg:BG("ch08_8-3-1.jpg") },
      { id:"s42", type:"dialogue", speaker:"su", text:"……谁不想呢。", bg:BG("ch08_8-3-1.jpg") },

      { id:"s43", type:"narration", bg:BG("ch08_8-3-1.jpg"),
        text:"她低头继续画。\n一笔一笔，很轻。\n那个风形图案小小的，占满半个草稿纸角落。" },

      { id:"s44", type:"narration", bg:BG("ch08_8-3-1.jpg"),
        text:"她说风很自由。\n她想像风一样飞翔。" },

            /* ==================== 场景 8-4：食堂傍晚 ==================== */
      { id:"s46", type:"scene", location:"canteen", tag:"第8章 · 食堂傍晚", bg:BG("ch08_8-4-1.jpg") },

      { id:"s47", type:"narration", bg:BG("ch08_8-4-1.jpg"),
        text:"傍晚在食堂。\n我们各自打了一份饭。\n她今天点的和平时不太一样，多加了一份小菜。" },

      { id:"s48", type:"dialogue", speaker:"chen", text:"今天吃这么好？", bg:BG("ch08_8-4-1.jpg") },
      { id:"s49", type:"dialogue", speaker:"su",   text:"……课多。", bg:BG("ch08_8-4-1.jpg") },
      { id:"s50", type:"dialogue", speaker:"chen", text:"那多吃点。", bg:BG("ch08_8-4-1.jpg") },
      { id:"s51", type:"dialogue", speaker:"su",   text:"嗯。", bg:BG("ch08_8-4-1.jpg") },

      { id:"s52", type:"narration", bg:BG("ch08_8-4-1.jpg"),
        text:"她边吃边看手机。\n看了一会儿，又放下。" },

      { id:"s53", type:"dialogue", speaker:"chen", text:"看什么呢？", bg:BG("ch08_8-4-1.jpg") },
      { id:"s54", type:"dialogue", speaker:"su",   text:"课表。下学期选课的通知出来了。", bg:BG("ch08_8-4-1.jpg") },
      { id:"s55", type:"dialogue", speaker:"chen", text:"又要选课了。", bg:BG("ch08_8-4-1.jpg") },
      { id:"s56", type:"dialogue", speaker:"su",   text:"嗯。你想好选什么了吗？", bg:BG("ch08_8-4-1.jpg") },
      { id:"s57", type:"dialogue", speaker:"chen", text:"还没。", bg:BG("ch08_8-4-1.jpg") },
      { id:"s58", type:"dialogue", speaker:"su",   text:"那一起看看。", bg:BG("ch08_8-4-1.jpg") },
      { id:"s59", type:"dialogue", speaker:"chen", text:"好。", bg:BG("ch08_8-4-1.jpg") },
      { id:"s60", type:"dialogue", speaker:"su",   text:"吃完饭去图书馆看吧。", bg:BG("ch08_8-4-1.jpg") },
      { id:"s61", type:"dialogue", speaker:"chen", text:"行。", bg:BG("ch08_8-4-1.jpg") },

      { id:"s62", type:"narration", bg:BG("ch08_8-4-1.jpg"),
        text:"她低头继续吃饭。\n我看着她的侧脸。\n窗外天色渐晚，食堂的灯一盏一盏亮起来。" },

      /* ==================== 结束 ==================== */
      { id:"s63", type:"set",
        effects:{
          flag:{ ch8_done:true },
          intimacy:{ su:5 },
          memory:{ su:"大二开学，图书馆里她画风的样子" }
        } },

      { id:"s64", type:"end", autoSave:true, quiet:true, completeChapter:8 }
    ]
  };
})();