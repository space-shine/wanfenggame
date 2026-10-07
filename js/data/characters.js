/* ============================================================
   角色数据
   - social:true 的角色进入"人际"系统，有亲密度与分阶段信息卡
   - 信息卡 cards 带 unlock 条件（flag 或 intimacy 阈值），未满足显示"？？？"
   - 真相信息（与女主病情相关）只放表面解释，禁止写确诊/化疗
   ============================================================ */
(function () {
  "use strict";
  const WF = window.WF || (window.WF = {});

  const chars = {
    /* ---------- 女主 ---------- */
    su: {
      id:"su", name:"苏挽月", portrait:"月",
      role:"心理学专业", color:"#e2b786",
      image:"assets/chars/su.png", side:"right",
      social:true, relation:"校友",
      desc:"安静、话少、怕光，总点最便宜的饭，像有很多心事。",
      cards:[
        { k:"籍贯",        text:"你还不知道她是哪里人。", need:{ flag:{ home_known:true } },
          unlocked:"暂时没听她提过，只知道她和你同校。" },
        { k:"身高体重",    text:"？？？", need:{ intimacy:30 },
          unlocked:"比你矮大半个头，很瘦。" },
        { k:"家庭背景",    text:"？？？", need:{ intimacy:60 },
          unlocked:"她从不提家里。你只知道她坚持自己做兼职，不肯用家里的钱。" },
        { k:"怕光",        text:"？？？", need:{ flag:{ notice_sun:true } },
          unlocked:"阳光一强她就下意识抬手挡、眯眼。你以为是皮肤敏感。" },
        { k:"脸颊泛红",    text:"？？？", need:{ flag:{ notice_blush:true } },
          unlocked:"她脸颊上常有一片淡淡的红，从皮肤底下透出来。你以为是天热。" }
      ]
    },

    /* ---------- 男主自己（不进人际列表） ---------- */
    chen: {
      id:"chen", name:"陈敬运", portrait:"陈",
      role:"男主 · 药学专业", color:"#8aa69b",
      image:"assets/chars/chen.png", side:"left",
      self:true,
      desc:"家境普通，靠自己考大学，目标是奖学金与顺利毕业。"
    },

    /* ---------- 三个舍友 ---------- */
    lidh: {
      id:"lidh", name:"李东辉", portrait:"李",
      role:"宿舍老大", color:"#7d8f9a",
      image:"assets/chars/lidh.png", side:"right",
      social:true, relation:"舍友 · 老大",
      desc:"辽宁人，沉稳，话不多，关键时候最靠谱。",
      cards:[
        { k:"籍贯",        text:"？？？", need:{ flag:{ met_lidonghui:true } },
          unlocked:"辽宁人，说话带点东北口音，但很少开口。" },
        { k:"身高体重",    text:"？？？", need:{ intimacy:20 },
          unlocked:"1米八出头，壮实，一看就是北方体格。" },
        { k:"性格",        text:"？？？", need:{ intimacy:20 },
          unlocked:"不爱凑热闹，但谁心情不好他都能看出来，会默默递瓶水。" },
        { k:"特长",        text:"？？？", need:{ intimacy:40 },
          unlocked:"嘴上不饶人，杨文恒吹牛的时候他一句话就能拆穿。" },
        { k:"家庭背景",    text:"？？？", need:{ intimacy:70 },
          unlocked:"家里是普通工薪，他是宿舍里最省钱的一个，却总记得别人的生日。" }
      ]
    },

    yangwh: {
      id:"yangwh", name:"杨文恒", portrait:"杨",
      role:"宿舍老二 · 上铺", color:"#c79e6a",
      image:"assets/chars/yangwh.png", side:"right",
      social:true, relation:"舍友 · 老二",
      desc:"山东人，嘴碎爱调侃，损友型，但关键时刻很仗义。",
      cards:[
        { k:"籍贯",        text:"？？？", need:{ flag:{ met_yangwenheng:true } },
          unlocked:"山东人，自称医学是热爱、音乐是天赋。" },
        { k:"身高体重",    text:"？？？", need:{ intimacy:20 },
          unlocked:"1米七五，瘦，天天窝床上打游戏「打瓦」。" },
        { k:"特长",        text:"？？？", need:{ intimacy:30 },
          unlocked:"会弹吉他，高中文艺汇演靠「轮指起手加琶音收尾」拿过奖，外号「山东赵雷」。" },
        { k:"和你关系",    text:"？？？", need:{ intimacy:40 },
          unlocked:"和你关系最好，天天损你，但也是他先教你弹琴。" },
        { k:"家庭背景",    text:"？？？", need:{ intimacy:70 },
          unlocked:"山东县城出来的，家里开小饭馆，他说放假要带你去吃他家的煎饼。" }
      ]
    },

    jiangx: {
      id:"jiangx", name:"江寻", portrait:"江",
      role:"宿舍老四", color:"#8a9bb0",
      image:"assets/chars/jiangx.png", side:"right",
      social:true, relation:"舍友 · 老四",
      desc:"山西人，安静话少，总是最晚回来。",
      cards:[
        { k:"籍贯",        text:"？？？", need:{ flag:{ met_jiangxun:true } },
          unlocked:"山西人。" },
        { k:"作息",        text:"？？？", need:{ intimacy:20 },
          unlocked:"每天泡在图书馆，回来最晚，进门轻手轻脚怕吵醒你们。" },
        { k:"性格",        text:"？？？", need:{ intimacy:40 },
          unlocked:"话极少，但偶尔一句很到位——你做书签那晚他路过，只说了句「哟，手挺巧」。" },
        { k:"专业",        text:"？？？", need:{ intimacy:60 },
          unlocked:"不是医学专业，具体学什么他没怎么提过。" },
        { k:"家庭背景",    text:"？？？", need:{ intimacy:80 },
          unlocked:"？？？" }
      ]
    },

    /* ---------- 后续角色 ---------- */
    mentor: {
      id:"mentor", name:"导师", portrait:"师",
      role:"药学系导师", color:"#7d8f7a",
      social:true, relation:"老师",
      desc:"学生科研路上的引路人。"
    },

    partner: {
      id:"partner", name:"搭档", portrait:"搭",
      role:"药学系实验搭档", color:"#6a8a9b",
      social:true, relation:"实验搭档",
      desc:"一起做实验的同学，做事认真。"
    },

    clubfriend: {
      id:"clubfriend", name:"社团朋友", portrait:"社",
      role:"吉他社朋友", color:"#c79e6a",
      social:true, relation:"社团朋友",
      desc:"吉他社认识的朋友，聊得来。"
    },

    counselor: {
      id:"counselor", name:"咨询师", portrait:"咨",
      role:"心理咨询中心", color:"#8a9bb0",
      social:true, relation:"咨询师",
      desc:"学校心理咨询中心的咨询师。"
    },

    /* ---------- 不可社交的 NPC ---------- */
    boss: {
      id:"boss", name:"老板", portrait:"板",
      role:"沙县小吃老板", color:"#b08d6e",
      image:"assets/chars/boss.png", side:"right",
      desc:"火车站附近小吃店老板，不赊账。"
    }
  };

  WF.Characters = {
    get(id) { return chars[id]; },
    all() { return Object.values(chars); },
    socialList() { return Object.values(chars).filter(c => c.social && !c.self); },
    nameOf(id) { return (chars[id] && chars[id].name) || id; }
  };
})();
