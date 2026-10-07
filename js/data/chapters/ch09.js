/* ============================================================
   第9章《秋日研学，心底藏诗》
   时间：大二上学期 10 月（约第 340-360 天）
   主线：研学出发 → 山路徒步 → 老槐树心愿 → 瞥见《风儿吹》
   本卷核心情绪：热恋期，甜，日常
   末尾：timeSkip 50 天，跳到第10章
   ============================================================ */
(function () {
  "use strict";
  const WF = window.WF || (window.WF = {});
  WF.Scenes = WF.Scenes || {};

  const BG = (f) => `center/cover no-repeat url("assets/bg/${f}")`;

  WF.Scenes.ch09 = {
    id: "ch09",
    chapter: 9,
    start: "s1",
    nodes: [
      /* ==================== 场景 9-1：研学出发 ==================== */
      { id:"s1", type:"scene", location:"campus", tag:"第9章 · 研学出发", bg:BG("ch09_9-1-1.jpg") },

      { id:"s2", type:"narration", bg:BG("ch09_9-1-1.jpg"),
        text:"十月初。\n学校组织了一次跨系联合研学。\n药学系和心理学系一起。\n去乡下做慢性病实地调研。" },

      { id:"s3", type:"narration", bg:BG("ch09_9-1-1.jpg"),
        text:"她报了名。\n我也报了名。\n名单下来那天，她发我一条消息：" },

      { id:"s4", type:"dialogue", speaker:"su", text:"我们也去。", bg:BG("ch09_9-1-1.jpg") },
      { id:"s5", type:"dialogue", speaker:"chen", text:"嗯。", bg:BG("ch09_9-1-1.jpg") },
      { id:"s6", type:"dialogue", speaker:"su", text:"……我就说一声。", bg:BG("ch09_9-1-1.jpg") },
      { id:"s7", type:"dialogue", speaker:"chen", text:"知道。", bg:BG("ch09_9-1-1.jpg") },

      { id:"s8", type:"narration", bg:BG("ch09_9-1-1.jpg"),
        text:"出发那天早上七点。\n大巴停在图书馆门口。\n她比我到得早，正站在车门旁边看手机。" },

      { id:"s9", type:"dialogue", speaker:"chen", text:"来这么早？", bg:BG("ch09_9-1-1.jpg") },
      { id:"s10", type:"dialogue", speaker:"su", text:"睡不着。", bg:BG("ch09_9-1-1.jpg") },
      { id:"s11", type:"dialogue", speaker:"chen", text:"兴奋？", bg:BG("ch09_9-1-1.jpg") },
      { id:"s12", type:"dialogue", speaker:"su", text:"……嗯。", bg:BG("ch09_9-1-1.jpg") },

      { id:"s13", type:"narration", bg:BG("ch09_9-1-1.jpg"),
        text:"车开了。\n她坐我旁边。\n窗外的城市慢慢变成田野，再变成远处的山。" },

      { id:"s14", type:"dialogue", speaker:"su", text:"你晕车吗？", bg:BG("ch09_9-1-1.jpg") },
      { id:"s15", type:"dialogue", speaker:"chen", text:"不晕。", bg:BG("ch09_9-1-1.jpg") },
      { id:"s16", type:"dialogue", speaker:"su", text:"我有一点。", bg:BG("ch09_9-1-1.jpg") },
      { id:"s17", type:"dialogue", speaker:"chen", text:"靠着我睡会儿？", bg:BG("ch09_9-1-1.jpg") },
      { id:"s18", type:"dialogue", speaker:"su", text:"……好。", bg:BG("ch09_9-1-1.jpg") },

      { id:"s19", type:"narration", bg:BG("ch09_9-1-1.jpg"),
        text:"她靠在我的肩膀上，很快睡着了。\n她呼吸很轻。\n我坐得笔直，一动不敢动。" },

      { id:"s20", type:"narration", bg:BG("ch09_9-1-1.jpg"),
        text:"三个小时。\n她的头一直没动。\n我胳膊麻了，也没换姿势。" },

      /* ==================== 场景 9-2：山路徒步 ==================== */
      { id:"s21", type:"scene", location:"campus", tag:"第9章 · 山路", bg:BG("ch09_9-2-1.jpg") },

      { id:"s22", type:"narration", bg:BG("ch09_9-2-1.jpg"),
        text:"到村里已经是中午。\n导师让大家分组走访慢性病家庭。\n下午两点集合，去后山实地考察中草药资源。" },

      { id:"s23", type:"narration", bg:BG("ch09_9-2-1.jpg"),
        text:"山不高，但路很陡。\n石头台阶有的地方被雨水冲塌了。" },

      { id:"s24", type:"dialogue", speaker:"mentor", text:"大家小心点，跟紧队伍。", bg:BG("ch09_9-2-1.jpg") },

      { id:"s25", type:"narration", bg:BG("ch09_9-2-1.jpg"),
        text:"她在队伍中间。\n一开始还跟得上。\n走到一半的时候，慢慢落在后面。" },

      { id:"s26", type:"dialogue", speaker:"chen", text:"累了？", bg:BG("ch09_9-2-1.jpg") },
      { id:"s27", type:"dialogue", speaker:"su", text:"有一点。", bg:BG("ch09_9-2-1.jpg") },
      { id:"s28", type:"dialogue", speaker:"chen", text:"手给我。", bg:BG("ch09_9-2-1.jpg") },
      { id:"s29", type:"dialogue", speaker:"su", text:"……", bg:BG("ch09_9-2-1.jpg") },
      { id:"s30", type:"dialogue", speaker:"chen", text:"快点。", bg:BG("ch09_9-2-1.jpg") },
      { id:"s31", type:"dialogue", speaker:"su", text:"……嗯。", bg:BG("ch09_9-2-1.jpg") },

      { id:"s32", type:"narration", bg:BG("ch09_9-2-1.jpg"),
        text:"她把手伸过来。\n我握住了。\n她的手有点凉。" },

      { id:"s33", type:"dialogue", speaker:"chen", text:"是不是冷了？", bg:BG("ch09_9-2-1.jpg") },
      { id:"s34", type:"dialogue", speaker:"su", text:"不是。", bg:BG("ch09_9-2-1.jpg") },
      { id:"s35", type:"narration", bg:BG("ch09_9-2-1.jpg"),
        text:"我把她的手放进我口袋里。\n她没抽开。" },

      { id:"s36", type:"narration", bg:BG("ch09_9-2-1.jpg"),
        text:"我们就这样，慢慢地往上走。\n前面的队伍已经甩开我们很远。\n但我们都不着急。" },

      /* ==================== 场景 9-3：山顶远眺 ==================== */
      { id:"s37", type:"scene", location:"campus", tag:"第9章 · 山顶", bg:BG("ch09_9-3-1.jpg") },

      { id:"s38", type:"narration", bg:BG("ch09_9-3-1.jpg"),
        text:"山顶。\n秋天的风从远处吹过来。\n整片田野都在脚下。" },

      { id:"s39", type:"dialogue", speaker:"su", text:"好看。", bg:BG("ch09_9-3-1.jpg") },
      { id:"s40", type:"dialogue", speaker:"chen", text:"嗯。", bg:BG("ch09_9-3-1.jpg") },

      { id:"s41", type:"narration", bg:BG("ch09_9-3-1.jpg"),
        text:"她站在我旁边。\n风吹起她的头发。\n她抬手挡了一下风，看着远处。" },

      { id:"s42", type:"dialogue", speaker:"su", text:"陈敬运。", bg:BG("ch09_9-3-1.jpg") },
      { id:"s43", type:"dialogue", speaker:"chen", text:"嗯？", bg:BG("ch09_9-3-1.jpg") },
      { id:"s44", type:"dialogue", speaker:"su", text:"……没什么。", bg:BG("ch09_9-3-1.jpg") },
      { id:"s45", type:"dialogue", speaker:"chen", text:"你最近老是这样。", bg:BG("ch09_9-3-1.jpg") },
      { id:"s46", type:"dialogue", speaker:"su", text:"哪样？", bg:BG("ch09_9-3-1.jpg") },
      { id:"s47", type:"dialogue", speaker:"chen", text:"叫我一声，又不说。", bg:BG("ch09_9-3-1.jpg") },
      { id:"s48", type:"dialogue", speaker:"su", text:"……就是想叫你一下。", bg:BG("ch09_9-3-1.jpg") },

      { id:"s49", type:"narration", bg:BG("ch09_9-3-1.jpg"),
        text:"她低头笑了一下。\n我没再问。" },

      /* ==================== 场景 9-4：老槐树心愿 ==================== */
      { id:"s50", type:"scene", location:"campus", tag:"第9章 · 老槐树", bg:BG("ch09_9-4-1.jpg") },

      { id:"s51", type:"narration", bg:BG("ch09_9-4-1.jpg"),
        text:"下山的时候，路过一棵老槐树。\n树很大，三个人合抱都抱不过来。\n树下有一块空地。" },

      { id:"s52", type:"dialogue", speaker:"mentor", text:"来，都过来。", bg:BG("ch09_9-4-1.jpg") },
      { id:"s53", type:"dialogue", speaker:"mentor", text:"研学最后一件事。", bg:BG("ch09_9-4-1.jpg") },
      { id:"s54", type:"dialogue", speaker:"mentor", text:"每人写一句心愿，密封进玻璃瓶，埋在这棵树下。", bg:BG("ch09_9-4-1.jpg") },
      { id:"s55", type:"dialogue", speaker:"mentor", text:"十年后再来挖。", bg:BG("ch09_9-4-1.jpg") },

      { id:"s56", type:"narration", bg:BG("ch09_9-4-1.jpg"),
        text:"导师给每个人发了一张纸条和一支笔。\n大家散开，各自找地方写。" },

      { id:"s57", type:"narration", bg:BG("ch09_9-4-1.jpg"),
        text:"我写了几句。\n很简单。\n希望她平安，希望顺利毕业。" },

      { id:"s58", type:"narration", bg:BG("ch09_9-4-1.jpg"),
        text:"写完之后，我偷偷看了一眼她。\n她坐在树下，背对着我。" },

      { id:"s59", type:"narration", bg:BG("ch09_9-4-1.jpg"),
        text:"她写得很慢。\n笔在纸上停了好几次。\n像是在想什么。" },

      { id:"s60", type:"dialogue", speaker:"chen", text:"写什么呢？", bg:BG("ch09_9-4-1.jpg") },
      { id:"s61", type:"dialogue", speaker:"su", text:"不告诉你。", bg:BG("ch09_9-4-1.jpg") },
      { id:"s62", type:"dialogue", speaker:"chen", text:"为什么？", bg:BG("ch09_9-4-1.jpg") },
      { id:"s63", type:"dialogue", speaker:"su", text:"……说出来就不灵了。", bg:BG("ch09_9-4-1.jpg") },
      { id:"s64", type:"dialogue", speaker:"chen", text:"那我的给你看。", bg:BG("ch09_9-4-1.jpg") },
      { id:"s65", type:"dialogue", speaker:"su", text:"不用。", bg:BG("ch09_9-4-1.jpg") },
      { id:"s66", type:"dialogue", speaker:"chen", text:"你不想知道我的？", bg:BG("ch09_9-4-1.jpg") },
      { id:"s67", type:"dialogue", speaker:"su", text:"……想。", bg:BG("ch09_9-4-1.jpg") },
      { id:"s68", type:"dialogue", speaker:"chen", text:"那交换？", bg:BG("ch09_9-4-1.jpg") },
      { id:"s69", type:"dialogue", speaker:"su", text:"不行。", bg:BG("ch09_9-4-1.jpg") },

      { id:"s70", type:"narration", bg:BG("ch09_9-4-1.jpg"),
        text:"她把纸条折好，放进导师手里的玻璃瓶。\n动作很快。\n但我还是瞥见了开头几个字。" },

      { id:"s71", type:"narration", bg:BG("ch09_9-4-1.jpg"),
        text:"「希望……」\n后面被她用手遮住了。" },

      { id:"s72", type:"narration", bg:BG("ch09_9-4-1.jpg"),
        text:"我没看清。" },

      { id:"s73", type:"dialogue", speaker:"chen", text:"写的什么？", bg:BG("ch09_9-4-1.jpg") },
      { id:"s74", type:"dialogue", speaker:"su", text:"……不告诉你。", bg:BG("ch09_9-4-1.jpg") },
      { id:"s75", type:"dialogue", speaker:"chen", text:"行吧。", bg:BG("ch09_9-4-1.jpg") },

      { id:"s76", type:"narration", bg:BG("ch09_9-4-1.jpg"),
        text:"导师把所有人的纸条放进瓶子，密封，埋在树下。\n大家拍了拍手上的土。\n她站在旁边，看着埋瓶子的地方，看了一会儿。" },

      { id:"s77", type:"narration", bg:BG("ch09_9-4-1.jpg"),
        text:"她没说话。\n我也没说话。" },

      /* ==================== 场景 9-5：午后，瞥见《风儿吹》 ==================== */
      { id:"s78", type:"scene", location:"campus", tag:"第9章 · 午后·树下", bg:BG("ch09_9-5-1.jpg") },

      { id:"s79", type:"narration", bg:BG("ch09_9-5-1.jpg"),
        text:"埋完瓶子，导师让大家自由活动。\n傍晚才集合回城。" },

      { id:"s80", type:"narration", bg:BG("ch09_9-5-1.jpg"),
        text:"她找了个树下坐着。\n拿出那本一直在写的笔记本。" },

      { id:"s81", type:"narration", bg:BG("ch09_9-5-1.jpg"),
        text:"我本来不想打扰她。\n但山里风大，我怕她冷，走过去想把外套给她。" },

      { id:"s82", type:"narration", bg:BG("ch09_9-5-1.jpg"),
        text:"走到她身后的时候，我看到她在写字。\n笔迹很轻。" },

      { id:"s83", type:"narration", bg:BG("ch09_9-5-1.jpg"),
        text:"我看到了标题。\n《风儿吹》。" },

      { id:"s84", type:"narration", bg:BG("ch09_9-5-1.jpg"),
        text:"下面几行字，只有一部分露在我能看见的角度。" },

      { id:"s85", type:"narration", bg:BG("ch09_9-5-1.jpg"),
        text:"风儿吹，风儿吹，\n吹过恋人的脸庞，秋千上摇荡，发丝的芳香。\n风儿有点悲伤。" },

      { id:"s86", type:"narration", bg:BG("ch09_9-5-1.jpg"),
        text:"就这三行。\n剩下的被她自己挡住了。" },

      { id:"s87", type:"narration", bg:BG("ch09_9-5-1.jpg"),
        text:"她好像察觉到什么，回头看了一眼。\n看到是我。\n慌忙合上本子。" },

      { id:"s88", type:"dialogue", speaker:"su", text:"你什么时候来的？", bg:BG("ch09_9-5-1.jpg") },
      { id:"s89", type:"dialogue", speaker:"chen", text:"刚来。", bg:BG("ch09_9-5-1.jpg") },
      { id:"s90", type:"dialogue", speaker:"su", text:"你看到了？", bg:BG("ch09_9-5-1.jpg") },
      { id:"s91", type:"dialogue", speaker:"chen", text:"看到一点。", bg:BG("ch09_9-5-1.jpg") },
      { id:"s92", type:"dialogue", speaker:"su", text:"……", bg:BG("ch09_9-5-1.jpg") },
      { id:"s93", type:"dialogue", speaker:"chen", text:"你写的？", bg:BG("ch09_9-5-1.jpg") },
      { id:"s94", type:"dialogue", speaker:"su", text:"随手写的。", bg:BG("ch09_9-5-1.jpg") },
      { id:"s95", type:"dialogue", speaker:"chen", text:"写得挺好。", bg:BG("ch09_9-5-1.jpg") },
      { id:"s96", type:"dialogue", speaker:"su", text:"……别看了。", bg:BG("ch09_9-5-1.jpg") },
      { id:"s97", type:"dialogue", speaker:"chen", text:"为什么？", bg:BG("ch09_9-5-1.jpg") },
      { id:"s98", type:"dialogue", speaker:"su", text:"……还没写好。", bg:BG("ch09_9-5-1.jpg") },

      { id:"s99", type:"narration", bg:BG("ch09_9-5-1.jpg"),
        text:"她把本子抱在怀里。\n低头。\n脸颊上有点红。" },

      { id:"s100", type:"narration", bg:BG("ch09_9-5-1.jpg"),
        text:"我看着她抱着本子的样子。\n觉得有点好笑。\n又有点心动。" },

      { id:"s101", type:"narration", bg:BG("ch09_9-5-1.jpg"),
        text:"她写的是吃醋。\n写她看见我和别人说笑时的心情。" },

      { id:"s102", type:"narration", bg:BG("ch09_9-5-1.jpg"),
        text:"她好可爱。" },

      /* ==================== 结束 + 跳时间 ==================== */
      { id:"s103", type:"set",
        effects:{
          flag:{ ch9_done:true },
          intimacy:{ su:10 },
          memory:{ su:"大二研学。和她一起爬山，在老槐树下埋心愿，还有她的《风儿吹》。" }
        } },

      { id:"s104", type:"narration", bg:BG("ch09_9-5-1.jpg"),
        text:"傍晚回城。\n她又靠在我肩膀上睡着了。\n秋天的晚风从窗户缝里吹进来。\n不冷。" },

      /* ---------- 跳时间：50 天 ---------- */
      { id:"s105", type:"timeSkip", days:50,
        text:"研学结束后的一个多月，日子平静地过去。\n课程、实验、图书馆，和往常一样。\n冬天来了。\n寒假也快到了。\n这段时间你做了什么？",
        options: [
          { key:"iq",     label:"智商",   icon:"🧠", add:15 },
          { key:"eq",     label:"情商",   icon:"💬", add:15 },
          { key:"health", label:"健康",   icon:"❤️", add:15 },
          { key:"money",  label:"金钱",   icon:"💰", add:600 }
        ]
      },

      { id:"s106", type:"narration", bg:BG("ch09_9-5-1.jpg"),
        text:"冬天来了。\n寒假。\n她说想去泰山看日出。" },

      { id:"s107", type:"end", autoSave:true, quiet:true, completeChapter:9 }
    ]
  };
})();