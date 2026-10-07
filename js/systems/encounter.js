/* ============================================================
   Encounter · 日常偶遇
   - 每天第一次切换地点时，30% 概率触发
   - 每个地点 3 个偶遇，不会立即重复
   - 保底：如果没抽中，随机一个"通用"偶遇（路过的人）
   - 触发后显示在行动面板 + 待办 UI
   - 玩家主动点击 → 进剧情
   ============================================================ */
(function () {
  "use strict";
  const WF = window.WF || (window.WF = {});

  const BG = (f) => `center/cover no-repeat url("assets/bg/${f}")`;

  /* ========== 地点偶遇池 ========== */
  const POOL = [
    /* ---------- 图书馆 ---------- */
    { id:"enc_lib_1", charId:"su", location:"library", bg:"library.jpg",
      title:"图书馆的偶遇",
      lines:[
        { s:"narration", t:"书架的另一头，你看到了苏挽月。" },
        { s:"narration", t:"她坐在靠窗的位置，低头看书，手边放着那个你送的书签。" },
        { s:"su", t:"……你也来了。" },
        { s:"chen", t:"嗯，找几本书。" },
        { s:"narration", t:"她没再说话。你也没再说话。安静地待了一会儿。" }
      ],
      effects:{ intimacy:{ su:1 }, memory:{ su:"在图书馆偶遇了她一次" } }
    },
    { id:"enc_lib_2", charId:"jiangx", location:"library", bg:"library.jpg",
      title:"图书馆的角落",
      lines:[
        { s:"narration", t:"图书馆角落，江寻戴着耳机看书。" },
        { s:"narration", t:"他抬头看到你，冲你点了下头，又低下头继续看。" },
        { s:"narration", t:"你在他旁边坐下。安静地待了一下午。" }
      ],
      effects:{ intimacy:{ jiangx:1 } }
    },
    { id:"enc_lib_3", charId:"yangwh", location:"library", bg:"library.jpg",
      title:"来还书的老二",
      lines:[
        { s:"yangwh", t:"老五，你怎么也来图书馆？" },
        { s:"chen", t:"来找书。" },
        { s:"yangwh", t:"稀罕啊。你不是不爱来的吗？" },
        { s:"chen", t:"……" },
        { s:"narration", t:"他咧嘴一笑，把一摞书塞给你。" },
        { s:"yangwh", t:"帮我一起还了吧，谢谢。" }
      ],
      effects:{ intimacy:{ yangwh:1 } }
    },

    /* ---------- 食堂 ---------- */
    { id:"enc_cant_1", charId:"su", location:"canteen", bg:"canteen.jpg",
      title:"食堂的角落",
      lines:[
        { s:"narration", t:"端着餐盘找位置的时候，你看到了苏挽月。" },
        { s:"narration", t:"她一个人坐在角落，面前是一份最便宜的套餐。" },
        { s:"chen", t:"这里有人吗？" },
        { s:"su", t:"……没有。" },
        { s:"narration", t:"你坐下来，和她一起吃饭。她没怎么说话，但也没走。" }
      ],
      effects:{ intimacy:{ su:1 }, memory:{ su:"在食堂偶遇了她一次" } }
    },
    { id:"enc_cant_2", charId:"yangwh", location:"canteen", bg:"canteen.jpg",
      title:"食堂里的老二",
      lines:[
        { s:"yangwh", t:"老五！这边这边！" },
        { s:"narration", t:"杨文恒挥舞着筷子喊你。你走过去，他把一盘菜推到你面前。" },
        { s:"yangwh", t:"看我多好，给你留了块红烧肉。" },
        { s:"chen", t:"……谢了。" }
      ],
      effects:{ intimacy:{ yangwh:1 } }
    },
    { id:"enc_cant_3", charId:"lidh", location:"canteen", bg:"canteen.jpg",
      title:"排队的老大",
      lines:[
        { s:"narration", t:"排队打饭时，前面站着一个熟悉的背影。" },
        { s:"lidh", t:"……哦，是你。" },
        { s:"chen", t:"嗯，你也来吃饭。" },
        { s:"lidh", t:"嗯。" },
        { s:"narration", t:"他让了让，让你插到他前面。" },
        { s:"lidh", t:"快点，后面人多。" }
      ],
      effects:{ intimacy:{ lidh:1 } }
    },

    /* ---------- 操场 ---------- */
    { id:"enc_play_1", charId:"jiangx", location:"playground", bg:"playground.jpg",
      title:"跑道上的身影",
      lines:[
        { s:"narration", t:"操场上，江寻一个人在跑步。" },
        { s:"narration", t:"他跑得不快，但很稳。你站在跑道边看了一会儿。" },
        { s:"narration", t:"经过你身边时，他冲你点头示意，继续向前跑去。" }
      ],
      effects:{ intimacy:{ jiangx:1 } }
    },
    { id:"enc_play_2", charId:"yangwh", location:"playground", bg:"playground.jpg",
      title:"篮球场边",
      lines:[
        { s:"yangwh", t:"老五！来不来打球？" },
        { s:"chen", t:"我不会。" },
        { s:"yangwh", t:"不会也得学！以后四年有的是机会。" },
        { s:"narration", t:"他把球塞到你手里，拽着你往球场走。" }
      ],
      effects:{ intimacy:{ yangwh:1 } }
    },
    { id:"enc_play_3", charId:"su", location:"playground", bg:"playground.jpg",
      title:"看台上的身影",
      lines:[
        { s:"narration", t:"操场看台上，你看到一个安静的背影。" },
        { s:"narration", t:"是苏挽月。她没看书，只是坐着看远方。" },
        { s:"chen", t:"……看什么呢？" },
        { s:"su", t:"天。" },
        { s:"narration", t:"你抬头看了看。天很蓝。" },
        { s:"su", t:"……挺好看的。" }
      ],
      effects:{ intimacy:{ su:1 }, memory:{ su:"和她在看台上一起看过天" } }
    },

    /* ---------- 咖啡厅 ---------- */
    { id:"enc_cafe_1", charId:"su", location:"cafe", bg:"cafe.jpg",
      title:"隔着玻璃",
      lines:[
        { s:"narration", t:"透过咖啡厅的玻璃，你看到了苏挽月。" },
        { s:"narration", t:"她穿着围裙，在后厨忙碌。" },
        { s:"narration", t:"你没有进去，只是在外面站了一会儿。" },
        { s:"narration", t:"她好像察觉到了什么，抬头看了一眼。隔着玻璃，她的嘴角动了一下。" }
      ],
      effects:{ intimacy:{ su:1 }, memory:{ su:"隔着咖啡厅的玻璃，看了她一眼" } }
    },
    { id:"enc_cafe_2", charId:"clubfriend", location:"cafe", bg:"cafe.jpg",
      title:"咖啡馆里的社友",
      lines:[
        { s:"narration", t:"咖啡厅角落，社团的朋友在写东西。" },
        { s:"clubfriend", t:"哎，你也来了？" },
        { s:"chen", t:"嗯，随便坐坐。" },
        { s:"clubfriend", t:"最近忙不忙？社团那边好久没见你了。" },
        { s:"chen", t:"……还行。" },
        { s:"narration", t:"他笑着摇摇头，继续写他的东西。" }
      ],
      effects:{ intimacy:{ clubfriend:1 } }
    },
    { id:"enc_cafe_3", charId:"lidh", location:"cafe", bg:"cafe.jpg",
      title:"咖啡厅门口",
      lines:[
        { s:"narration", t:"刚走到咖啡厅门口，就撞上了往外走的李东辉。" },
        { s:"lidh", t:"你请我喝一杯？" },
        { s:"chen", t:"……凭什么。" },
        { s:"lidh", t:"凭我上周帮你带了三顿饭。" },
        { s:"chen", t:"……好吧。" }
      ],
      effects:{ intimacy:{ lidh:1 } }
    },

    /* ---------- 教学楼 ---------- */
    { id:"enc_teach_1", charId:"su", location:"teaching", bg:"teaching.jpg",
      title:"走廊里",
      lines:[
        { s:"narration", t:"课间走廊，人群拥挤。" },
        { s:"narration", t:"你看到了苏挽月，她抱着一摞书，被人流挤得有点踉跄。" },
        { s:"chen", t:"给我吧。" },
        { s:"su", t:"……不用。" },
        { s:"chen", t:"拿着。" },
        { s:"narration", t:"你直接接过她手里的一半书。她没再坚持。" }
      ],
      effects:{ intimacy:{ su:1 }, memory:{ su:"在走廊上帮她搬过一次书" } }
    },
    { id:"enc_teach_2", charId:"yangwh", location:"teaching", bg:"teaching.jpg",
      title:"教室角落",
      lines:[
        { s:"narration", t:"课间，教室里趴着一个人。" },
        { s:"narration", t:"是杨文恒，睡得正香。" },
        { s:"chen", t:"……" },
        { s:"narration", t:"你在旁边坐下，他翻了个身，嘟囔了一句" },
        { s:"yangwh", t:"……别推我……再睡五分钟……" }
      ],
      effects:{ intimacy:{ yangwh:1 } }
    },
    { id:"enc_teach_3", charId:"jiangx", location:"teaching", bg:"teaching.jpg",
      title:"自习室",
      lines:[
        { s:"narration", t:"自习室里，江寻坐在角落。" },
        { s:"narration", t:"他冲你点点头，指了旁边的空位。" },
        { s:"narration", t:"你坐过去。安静地写了一会儿作业。" }
      ],
      effects:{ intimacy:{ jiangx:1 } }
    },

    /* ---------- 宿舍 ---------- */
    { id:"enc_dorm_1", charId:"lidh", location:"dorm", bg:"dorm.jpg",
      title:"宿舍楼下",
      lines:[
        { s:"narration", t:"宿舍楼下，李东辉坐在台阶上。" },
        { s:"lidh", t:"回来了？" },
        { s:"chen", t:"嗯。" },
        { s:"lidh", t:"今天图书馆人多吗？" },
        { s:"chen", t:"还行。" },
        { s:"narration", t:"他站起来，拍拍裤子。" },
        { s:"lidh", t:"走吧，上去吧。" }
      ],
      effects:{ intimacy:{ lidh:1 } }
    },
    { id:"enc_dorm_2", charId:"yangwh", location:"dorm", bg:"dorm.jpg",
      title:"宿舍的游戏声",
      lines:[
        { s:"narration", t:"一进门，就听到杨文恒在吼。" },
        { s:"yangwh", t:"上上上！别怂！" },
        { s:"chen", t:"……你在打什么？" },
        { s:"yangwh", t:"打瓦！来一把？" },
        { s:"chen", t:"不了。" },
        { s:"yangwh", t:"怂。" }
      ],
      effects:{ intimacy:{ yangwh:1 } }
    },
    { id:"enc_dorm_3", charId:"jiangx", location:"dorm", bg:"dorm.jpg",
      title:"深夜的室友",
      lines:[
        { s:"narration", t:"你回宿舍的时候，江寻刚洗完澡进来。" },
        { s:"jiangx", t:"……回来了。" },
        { s:"chen", t:"嗯。" },
        { s:"narration", t:"他拿毛巾擦了擦头发，钻进被窝。" },
        { s:"jiangx", t:"……灯关一下。" }
      ],
      effects:{ intimacy:{ jiangx:1 } }
    },

    /* ---------- 实验室 ---------- */
    { id:"enc_lab_1", charId:"partner", location:"lab", bg:"lab.jpg",
      title:"实验台前",
      lines:[
        { s:"narration", t:"实验室里，搭档正对着数据发呆。" },
        { s:"partner", t:"……这组数据又不对。" },
        { s:"chen", t:"要不要重新做一次？" },
        { s:"partner", t:"……行，你帮我。" }
      ],
      effects:{ intimacy:{ partner:1 } }
    },
    { id:"enc_lab_2", charId:"mentor", location:"lab", bg:"lab.jpg",
      title:"导师路过",
      lines:[
        { s:"narration", t:"导师路过实验室门口，停下脚步。" },
        { s:"mentor", t:"……在做实验？" },
        { s:"chen", t:"是。" },
        { s:"mentor", t:"注意标点。" },
        { s:"chen", t:"……是。" },
        { s:"narration", t:"他点点头，转身离开。" }
      ],
      effects:{ intimacy:{ mentor:1 } }
    },
    { id:"enc_lab_3", charId:"su", location:"lab", bg:"lab.jpg",
      title:"窗外的身影",
      lines:[
        { s:"narration", t:"你在实验室里做实验，抬头看到窗外有人。" },
        { s:"narration", t:"是苏挽月，她捧着一摞书从走廊经过。" },
        { s:"narration", t:"她也看到了你，隔着玻璃冲你轻轻点头，然后继续走了。" }
      ],
      effects:{ intimacy:{ su:1 } }
    },

    /* ---------- 校医院 ---------- */
    { id:"enc_clinic_1", charId:"counselor", location:"clinic", bg:"clinic.jpg",
      title:"心理咨询室门口",
      lines:[
        { s:"narration", t:"你路过心理咨询室门口。" },
        { s:"counselor", t:"……要不要进来坐坐？" },
        { s:"chen", t:"我没什么事。" },
        { s:"counselor", t:"没事也可以聊。" },
        { s:"narration", t:"你摇摇头，走开了。" }
      ],
      effects:{ intimacy:{ counselor:1 } }
    },
    { id:"enc_clinic_2", charId:"su", location:"clinic", bg:"clinic.jpg",
      title:"走廊尽头",
      lines:[
        { s:"narration", t:"校医院走廊，你看到一个熟悉的背影。" },
        { s:"narration", t:"是苏挽月。她刚从诊室里出来，手里拿着一张纸。" },
        { s:"narration", t:"看到你，她愣了一下，下意识把手里的纸放进包里。" },
        { s:"chen", t:"……你怎么了？" },
        { s:"su", t:"……没什么。拿了点药。" },
        { s:"narration", t:"她说完就快步走了。" }
      ],
      effects:{ intimacy:{ su:1 }, memory:{ su:"在校医院走廊遇到她，她好像有事瞒着你" } }
    },

    /* ---------- 社团活动室 ---------- */
    { id:"enc_club_1", charId:"clubfriend", location:"clubroom", bg:"clubroom.jpg",
      title:"练琴的社友",
      lines:[
        { s:"narration", t:"社团活动室里，有人在弹吉他。" },
        { s:"clubfriend", t:"哎，你来了。" },
        { s:"narration", t:"他弹了一小段，抬头看你。" },
        { s:"clubfriend", t:"学不学？" },
        { s:"chen", t:"……试试吧。" }
      ],
      effects:{ intimacy:{ clubfriend:1 } }
    },
    { id:"enc_club_2", charId:"yangwh", location:"clubroom", bg:"clubroom.jpg",
      title:"山东赵雷",
      lines:[
        { s:"narration", t:"你走进社团活动室，杨文恒正抱着吉他唱得投入。" },
        { s:"yangwh", t:"……轮指起手，加琶音收尾……" },
        { s:"chen", t:"……你这弹的什么？" },
        { s:"yangwh", t:"山东赵雷！不服来一段？" }
      ],
      effects:{ intimacy:{ yangwh:1 } }
    },
    { id:"enc_club_3", charId:"su", location:"clubroom", bg:"clubroom.jpg",
      title:"来借东西的人",
      lines:[
        { s:"narration", t:"社团活动室门口，苏挽月来借东西。" },
        { s:"su", t:"……图书馆的书卡还在吗？" },
        { s:"chen", t:"在的，我去拿。" },
        { s:"narration", t:"你翻了翻抽屉，把卡递给她。" },
        { s:"su", t:"……谢谢。" },
        { s:"narration", t:"她说完就走了。你站在门口，看着她的背影。" }
      ],
      effects:{ intimacy:{ su:1 } }
    }
  ];

  /* 通用保底偶遇（任何地点都可能触发） */
  const GENERIC = [
    { id:"enc_gen_1", charId:"none", location:"any", bg:"campus_map.jpg",
      title:"路过的同学",
      lines:[
        { s:"narration", t:"一个不认识的同学从你身边走过。" },
        { s:"narration", t:"他冲你点了点头，算是打过招呼，然后继续往前走。" }
      ],
      effects:{}
    },
    { id:"enc_gen_2", charId:"none", location:"any", bg:"campus_map.jpg",
      title:"校园的猫",
      lines:[
        { s:"narration", t:"路边蹲着一只猫。" },
        { s:"narration", t:"它抬头看了你一眼，又低下头继续晒太阳。" }
      ],
      effects:{}
    },
    { id:"enc_gen_3", charId:"none", location:"any", bg:"campus_map.jpg",
      title:"风吹过",
      lines:[
        { s:"narration", t:"一阵风吹过，卷起几片落叶。" },
        { s:"narration", t:"你站了一会儿，看着树叶在风里打转。" }
      ],
      effects:{}
    }
  ];

  const RECENT_LIMIT = 3;   // 记住最近 3 个偶遇，避免连续重复

  function getRecent() {
    const d = WF.State.data;
    if (!d.recentEncounters) d.recentEncounters = [];
    return d.recentEncounters;
  }
  function markRecent(id) {
    const d = WF.State.data;
    if (!d.recentEncounters) d.recentEncounters = [];
    d.recentEncounters.push(id);
    if (d.recentEncounters.length > RECENT_LIMIT) {
      d.recentEncounters.shift();
    }
  }

  function buildScene(enc) {
    const nodes = [];
    enc.lines.forEach((line, i) => {
      const node = {
        id: "n" + i,
        type: line.s === "narration" ? "narration" : "dialogue",
        text: line.t,
        bg: BG(enc.bg)
      };
      if (line.s !== "narration") node.speaker = line.s;
      nodes.push(node);
    });
    if (enc.effects && Object.keys(enc.effects).length) {
      nodes.push({
        id: "set",
        type: "set",
        effects: enc.effects,
        bg: BG(enc.bg)
      });
    }
    nodes.push({
      id: "end",
      type: "end",
      quiet: true,
      autoSave: true,
      toDorm: false,
      bg: BG(enc.bg)
    });
    return {
      id: enc.id,
      type: "encounter",
      start: "n0",
      nodes: nodes
    };
  }

  WF.Encounter = {
    tryTrigger() {
      const d = WF.State.data;
      if (!d.chapter1Completed) return false;
      if (d.encounterToday && !d.encounterToday.done) return false;
      if (d.lastEncounterDay === d.day) return false;
      if (Math.random() > 0.30) return false;

      const recent = getRecent();

      // 优先抽当前地点的偶遇
      let pool = POOL.filter(e => e.location === d.location && recent.indexOf(e.id) < 0);
      // 如果都抽过了，允许重复
      if (!pool.length) pool = POOL.filter(e => e.location === d.location);
      // 如果地点没配偶遇 → 用通用偶遇
      if (!pool.length) {
        pool = GENERIC.filter(e => recent.indexOf(e.id) < 0);
        if (!pool.length) pool = GENERIC;
      }

      if (!pool.length) return false;
      const enc = pool[Math.floor(Math.random() * pool.length)];

      d.encounterToday = {
        id: enc.id,
        charId: enc.charId,
        location: d.location,
        title: enc.title,
        done: false
      };
      d.lastEncounterDay = d.day;

      WF.Scenes[enc.id] = buildScene(enc);
      markRecent(enc.id);

      WF.eventbus.emit("hud-update");
      WF.Toast.show("余光里，似乎有人……", "favor", 3000);
      return true;
    },

    trigger() {
      const d = WF.State.data;
      if (!d.encounterToday || d.encounterToday.done) return false;
      const allEncs = POOL.concat(GENERIC);
      const enc = allEncs.find(e => e.id === d.encounterToday.id);
      if (!enc) return false;
      d.encounterToday.done = true;

      const scene = WF.Scenes[enc.id];
      if (!scene) return false;

      ["screen-title", "screen-library", "screen-game"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.toggle("active", id === "screen-game");
      });
      const ap = document.getElementById("action-panel");
      if (ap) ap.classList.add("hidden");

      WF.Engine.start(scene);
      return true;
    },

    getAvailableHere() {
      const d = WF.State.data;
      if (!d.encounterToday || d.encounterToday.done) return null;
      if (d.encounterToday.location !== d.location) return null;
      return d.encounterToday;
    }
  };
})();