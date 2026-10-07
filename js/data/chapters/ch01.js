/* ============================================================
   第一章《铁轨相逢，初秋晚风》
   火车车厢 → 沙县小吃 → 校园初入 → 宿舍夜晚
   伏笔（怕光/脸颊泛红/纯色头像/最便宜炒饭）只给悬疑，不给确认
   ============================================================ */
(function () {
  "use strict";
  const WF = window.WF || (window.WF = {});
  WF.Scenes = WF.Scenes || {};

  const BG = (f) => `center/cover no-repeat url("assets/bg/${f}")`;

  WF.Scenes.ch01 = {
    id: "ch01",
    chapter: 1,
    start: "s1",
    nodes: [
      /* ==================== 场景 1-1：火车车厢 ==================== */
      { id:"s1", type:"scene", location:"train", period:"morning", tag:"第一章 · 火车车厢", bg:BG("ch01_1-1-1.jpg") },

      { id:"s2", type:"narration", bg:BG("ch01_1-1-2.jpg"),
        text:"九月。大学开学的日子。\n我坐在靠窗的位置，看着窗外的景色从城市变成田野，再变成陌生的山丘。\n这是我第一次离开家。" },
      { id:"s3", type:"narration", bg:BG("ch01_1-1-2.jpg"),
        text:"目的地是一所我考了很久才考上的大学，药学专业。\n说实话，我对未来没什么概念，只知道要往前走。" },

      { id:"s3b", type:"narration", bg:BG("ch01_1-1-2.jpg"),
        text:"我考药学，没什么高尚的理由。\n只是小时候见过一个人被病拖走。\n那时候我就想——\n如果有一种药能救他就好了。" },

      { id:"s4", type:"narration", bg:BG("ch01_1-1-3.jpg"),
        text:"车厢过道对面，一个女生坐在斜前方。\n她侧脸对着窗，阳光刚好落在她脸上。\n她抬手挡了一下光，微微眯眼。" },
      { id:"s5", type:"narration", bg:BG("ch01_1-1-3.jpg"),
        text:"她怕光。\n这是我注意到她的第一件事。\n不是那种普通的怕晒，而是光一强，她就会下意识皱眉、偏头、抬手挡，像某种条件反射。" },

      { id:"s6", type:"narration", bg:BG("ch01_1-1-4.jpg"),
        text:"她从包里拿出一本书低头看，书页间夹着一张书签。\n我没多想，只是觉得，这个人挺安静的。" },

      { id:"s7", type:"narration", bg:BG("ch01_1-1-5.jpg"),
        text:"火车进站，我起身从行李架上取箱子，箱子有点重，动作不太利索。\n晃了一下，她下意识侧身让了让。" },

      { id:"s8", type:"dialogue", speaker:"chen", text:"不好意思。", bg:BG("ch01_1-1-6.jpg") },
      { id:"s9", type:"dialogue", speaker:"su",   text:"没事。", bg:BG("ch01_1-1-6.jpg") },

      { id:"s10", type:"narration", bg:BG("ch01_1-1-7.jpg"),
        text:"她声音很轻，说完就低下头往车门走。\n我没看清她的脸，只看到一个侧影。\n那是我们第一次说话，只有两个字。\n我当时不知道，这两个字会变成后来所有故事的开始。" },
      { id:"sA2", type:"achieve", achId:"first_meet" },

      /* ==================== 场景 1-2：沙县小吃 ==================== */
      { id:"s11", type:"scene", location:"shop", period:"afternoon", tag:"第一章 · 沙县小吃", bg:BG("ch01_1-2-1.jpg") },

      { id:"s12", type:"narration", bg:BG("ch01_1-2-2.jpg"),
        text:"下车第一件事是吃饭。\n我身上钱不多，学费、住宿费、生活费，每一笔都要算着花。\n沙县便宜，能吃饱，就够了。" },
      { id:"s13", type:"narration", bg:BG("ch01_1-2-2.jpg"),
        text:"我点了一份拌面和一碗馄饨，低头吃，吃得很快。\n吃到一半，门口进来一个人——是她，火车上那个怕光的女生。" },
      { id:"s14", type:"narration", bg:BG("ch01_1-2-2.jpg"),
        text:"她环顾一下，看到角落还有位置，走过来坐在我斜对面，没注意到我。\n她点了一份最便宜的炒饭，从包里拿出保温杯喝水，没点饮料。" },

      { id:"s15", type:"narration", bg:BG("ch01_1-2-3.jpg"),
        text:"我起身结账，点开支付页面——余额不足。又点一次，还是余额不足。\n那一刻我脑子里嗡了一下，是那种当众发现自己连顿饭都付不起的窘迫。" },

      { id:"s16", type:"dialogue", speaker:"chen", text:"那个……我能不能先欠着，一会儿取了钱送来。", bg:BG("ch01_1-2-3.jpg") },
      { id:"s17", type:"dialogue", speaker:"boss", text:"不行啊小伙子，我们这不赊账。", bg:BG("ch01_1-2-3.jpg") },

      { id:"s18", type:"narration", bg:BG("ch01_1-2-3.jpg"),
        text:"我攥着手机站在柜台前，背后还有人在等结账，耳朵发烫。\n她抬头看了我一眼，放下勺子，走到柜台前。" },

      { id:"s19", type:"dialogue", speaker:"su", text:"他的多少钱？", bg:BG("ch01_1-2-3.jpg") },
      { id:"s20", type:"dialogue", speaker:"boss", text:"拌面加馄饨，一共十八。", bg:BG("ch01_1-2-3.jpg") },
      { id:"s21", type:"dialogue", speaker:"su", text:"我帮他付。", bg:BG("ch01_1-2-3.jpg") },

      { id:"s22", type:"dialogue", speaker:"chen", text:"不用不用，我真的……", bg:BG("ch01_1-2-3.jpg") },
      { id:"s23", type:"dialogue", speaker:"su", text:"没事。", bg:BG("ch01_1-2-3.jpg") },
      { id:"s24", type:"dialogue", speaker:"chen", text:"那我加你微信，回头还你。", bg:BG("ch01_1-2-3.jpg") },
      { id:"s25", type:"dialogue", speaker:"su", text:"……好。", bg:BG("ch01_1-2-1.jpg") },

      { id:"s26", type:"set",
        effects:{ flag:{ wechat_added:true, met_su:true, notice_sun:true },
              meet:["su"], intimacy:{ su:1 },
              memory:{ su:"火车上她替我付了十八块钱" } } },

      { id:"sA3", type:"achieve", achId:"pay_18" },

      { id:"s27", type:"narration", bg:BG("ch01_1-2-1.jpg"),
        text:"她没多看我一眼，也没问我为什么没钱，就像做了一件很平常的事。\n我坐回位置，心里只有一个念头：这钱一定要还。" },

      { id:"s28", type:"dialogue", speaker:"chen", text:"我请你喝瓶水吧，现在只能请得起这个。", bg:BG("ch01_1-2-4.jpg") },
      { id:"s29", type:"dialogue", speaker:"su", text:"不用。", bg:BG("ch01_1-2-4.jpg") },
      { id:"s30", type:"dialogue", speaker:"chen", text:"那……我回头请你吃顿饭，正式的那种。", bg:BG("ch01_1-2-4.jpg") },
      { id:"s31", type:"dialogue", speaker:"su", text:"好。", bg:BG("ch01_1-2-4.jpg") },

      { id:"s32", type:"narration", bg:BG("ch01_1-2-4.jpg"),
        text:"两人一起走出店门。外面阳光很晒，她抬手挡了一下光，眯了眯眼。\n我多看了一眼，发现她脸颊上有一片淡淡的红。",
        next:"s32b" },
      { id:"s32b", type:"set", effects:{ flag:{ notice_blush:true } } },

      /* ==================== 路口分别 ==================== */
      { id:"s33", type:"scene", location:"road", period:"afternoon", tag:"第一章 · 路口", bg:BG("ch01_1-3-1.jpg") },

      { id:"s34", type:"dialogue", speaker:"chen", text:"你也是去大学报到？", bg:BG("ch01_1-3-1.jpg") },
      { id:"s35", type:"dialogue", speaker:"su", text:"嗯。", bg:BG("ch01_1-3-1.jpg") },
      { id:"s36", type:"dialogue", speaker:"chen", text:"这么巧？你什么专业？", bg:BG("ch01_1-3-1.jpg") },
      { id:"s37", type:"dialogue", speaker:"su", text:"心理学。", bg:BG("ch01_1-3-1.jpg") },
      { id:"s38", type:"dialogue", speaker:"chen", text:"我药学。以后就是校友了。", bg:BG("ch01_1-3-1.jpg") },
      { id:"s39", type:"dialogue", speaker:"su", text:"嗯。", bg:BG("ch01_1-3-2.jpg") },

      /* ==================== 场景 1-3：校园初入 ==================== */
      { id:"s40", type:"scene", location:"campus", period:"afternoon", tag:"第一章 · 校园初入", bg:BG("ch01_1-3-2.jpg") },
      { id:"s40b", type:"set", effects:{ flag:{ at_campus:true } } },

      { id:"s41", type:"narration", bg:BG("ch01_1-3-2.jpg"),
        text:"大学比我想的大。路是新的，树是新的，人也是新的。\n我找到药学系报到处，排队、签到、领材料，一切都很普通。" },

      { id:"s42", type:"narration", bg:BG("ch01_1-3-3.jpg"),
        text:"领到宿舍钥匙，路过校园公告栏时我停了一下。\n公告栏上贴着各专业新生名单。我扫了一眼药学系，又扫了一眼心理学系——\n苏挽月。心理学系。" },
      { id:"sA4", type:"achieve", achId:"campus_day1" },

      { id:"s43", type:"choice", next:"s44",
        options:[
      { text:"在心里认真记住「苏挽月」这三个字",
        effects:{ flag:{ remembered_name:true }, intimacy:{ su:2 } }, next:"s44" },
      { text:"不过是帮过忙的校友，没太放在心上",
        effects:{ flag:{ remembered_name:false } }, next:"s44" }
    ] },

      { id:"s44", type:"narration", bg:BG("ch01_1-3-3.jpg"),
        text:"我继续往宿舍走，手机震了一下——是她通过了好友申请。\n昵称叫「挽月」。" },

      { id:"s45", type:"dialogue", speaker:"chen", text:"今天谢谢你，钱我过两天还你。", bg:BG("ch01_1-3-3.jpg") },
      { id:"s46", type:"dialogue", speaker:"su",   text:"不急。", bg:BG("ch01_1-3-3.jpg") },
      { id:"s47", type:"dialogue", speaker:"chen", text:"你也是今天报到？", bg:BG("ch01_1-3-3.jpg") },
      { id:"s48", type:"dialogue", speaker:"su",   text:"嗯。", bg:BG("ch01_1-3-3.jpg") },
      { id:"s49", type:"dialogue", speaker:"chen", text:"那以后就是校友了。", bg:BG("ch01_1-3-3.jpg") },
      { id:"s50", type:"dialogue", speaker:"su",   text:"嗯。", bg:BG("ch01_1-3-3.jpg") },

      { id:"s51", type:"narration", bg:BG("ch01_1-3-3.jpg"),
        text:"对话就停在这里。我想再说点什么，又删掉了。\n她回消息很短，短到我不知道该接什么。\n但我记住了她的头像、她的名字，还有她脸颊上那片淡淡的红。" },

      /* ==================== 场景 1-4：宿舍夜晚 ==================== */
      { id:"s52", type:"scene", location:"dorm", period:"night", tag:"第一章 · 宿舍夜晚", bg:BG("ch01_1-4-1.jpg") },

      { id:"s53", type:"narration", bg:BG("ch01_1-4-1.jpg"),
        text:"宿舍四人间。一个本地人，一个北方人，一个戴眼镜的，还有我。\n大家客气地互相问老家、问专业、问高考分数。我一边聊，一边翻新生手册。" },
      { id:"s53b", type:"set",
        effects:{ meet:["lidh","yangwh","jiangx"],
                  flag:{ met_lidonghui:true, met_yangwenheng:true, met_jiangxun:true },
                  memory:{ yangwh:"他睡我上铺，一进来就开始教我吉他怎么抱",
                           lidh:"他话最少，但第一晚就帮我把蚊帐挂好了",
                           jiangx:"他回来最晚，进门总轻手轻脚" } } },
      { id:"sA5", type:"achieve", achId:"first_friend" },
      { id:"s54", type:"narration", bg:BG("ch01_1-4-1.jpg"),
        text:"手册上有一页校园地图：教学楼、图书馆、实验室、食堂、操场……\n我用手指点了一下「图书馆」。\n好好学习，拿奖学金，不给家里添负担。至于别的，我没想。" },

      { id:"s54b", type:"narration", bg:BG("ch01_1-4-1.jpg"),
        text:"再往后翻，是药学系的简介。\n研究方向那一栏写着：\n抗肿瘤药物、心血管药物、神经药物……\n我在「抗肿瘤药物」那一行停了一下。" },

      { id:"s54c", type:"narration", bg:BG("ch01_1-4-1.jpg"),
        text:"初中那年，家里有人病了。药太贵。买不起。最后没救回来。\n填志愿的时候我没多想。\n现在想想，也许那时候就在心里埋了颗种子。" },

      { id:"s54d", type:"narration", bg:BG("ch01_1-4-1.jpg"),
        text:"我要做出一款药。\n一款能救人的、普通人买得起的药。" },

      { id:"sA_goal", type:"achieve", achId:"goal_drug" },

      { id:"s55", type:"dialogue", speaker:"su", text:"你到宿舍了吗？", bg:BG("ch01_1-4-2.jpg") },
      { id:"s56", type:"dialogue", speaker:"chen", text:"到了。你呢？", bg:BG("ch01_1-4-2.jpg") },
      { id:"s57", type:"dialogue", speaker:"su", text:"到了。", bg:BG("ch01_1-4-2.jpg") },

      { id:"s58", type:"dialogue", speaker:"chen", text:"你明天有空吗？我把钱还你。", bg:BG("ch01_1-4-2.jpg") },
      { id:"s59", type:"dialogue", speaker:"su",   text:"不用急。", bg:BG("ch01_1-4-2.jpg") },
      { id:"s60", type:"dialogue", speaker:"chen", text:"那我请你吃饭吧，说好的。", bg:BG("ch01_1-4-2.jpg") },
      { id:"s61", type:"dialogue", speaker:"su",   text:"……好。", bg:BG("ch01_1-4-2.jpg") },

      { id:"s62", type:"narration", bg:BG("ch01_1-4-2.jpg"),
        text:"我看着那个「好」字，嘴角动了一下。\n不知道为什么，心里有点高兴。\n可能是因为终于能还上那十八块钱。也可能是因为——我想再见到她。" },

      { id:"s63", type:"achieve",
        achId:"b_firstmeet", kind:"B", poem:"铁轨尽头的风" },

      { id:"s64", type:"narration",
        text:"宿舍熄灯。我闭上眼睛。\n这是我在这所城市的第一个夜晚。" },

      { id:"s64b", type:"set", effects:{ flag:{ ch1_done:true }, location:"dorm" } },

      { id:"s65", type:"end", autoSave:true, quiet:true, completeChapter:1 }
    ]
  };
})();