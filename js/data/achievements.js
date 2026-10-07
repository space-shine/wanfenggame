/* ============================================================
   Achievements · 成就数据库
   A类：普通成就，直接显示详情
   B类：伏笔成就，解锁时只显示诗意短句+？？？，终章后解锁
   ============================================================ */
(function () {
  "use strict";
  const WF = window.WF || (window.WF = {});

  const A = [
    { id: "first_meet",      name: "铁轨相逢",     desc: "在火车上，第一次遇见她。" },
    { id: "pay_18",          name: "十八块",       desc: "那碗馄饨，她替你付了钱。" },
    { id: "campus_day1",     name: "开学那天",     desc: "大学报到的第一天。" },
    { id: "first_friend",    name: "同檐",         desc: "认识了第一个舍友。" },
    { id: "first_meal",      name: "人间烟火",     desc: "在食堂吃下大学的第一顿饭。" },
        { id: "goal_drug",       name: "白大褂的理想", desc: "决定研发一款普通人买得起的药。" },
    { id: "first_library",   name: "书页之间",     desc: "在图书馆读完第一本书。" },
    { id: "first_lab",       name: "白大褂",       desc: "第一次走进实验室。" },
    { id: "first_run",       name: "风里的操场",   desc: "在操场跑完第一圈。" },
    { id: "first_gift",      name: "风起时",       desc: "收到了一笔匿名的馈赠。" },
    { id: "first_pc",        name: "深夜的屏幕",   desc: "打开宿舍的电脑。" },
    { id: "first_mg",        name: "指尖的温度",   desc: "第一次完成研究小游戏。" },
    { id: "mg_guitar_full",  name: "十指如风",     desc: "吉他弹奏全部完美。" },
    { id: "mg_latte_master", name: "咖啡诗人",     desc: "拉花误差小于 2 像素。" },
    { id: "mg_recite_fast",  name: "过目不忘",     desc: "背书 10 步内完成全部配对。" },
    { id: "mg_run_fast",     name: "风一样的男人", desc: "节奏跑 3 秒内完成。" },
    { id: "mg_race_win",     name: "食堂之光",     desc: "抢饭得分 20 以上。" }
  ];

  const B = [
    { id: "b_firstmeet", poem: "铁轨尽头的风", answer: "故事开始的地方，风从铁轨尽头吹来。" },
    { id: "b_oct22",     poem: "十月的第二十二页", answer: "书页停在十月，那是她悄悄记下的相遇。" },
    { id: "b_sugar",     poem: "糖糖的第七个夜晚", answer: "第七个夜晚，糖糖替她说出了心事。" },
    { id: "b_apr19",     poem: "四月十九，晚风告白", answer: "四月的晚风里，他终于说出了那句话。" },
    { id: "b_tree",      poem: "风儿吹过老槐树", answer: "老槐树下，她写下了自己的心愿。" },
    { id: "b_taishan",   poem: "十年之约，泰山日出", answer: "十年之后，泰山日出，约定是否还在。" },
    { id: "b_gift",      poem: "风的馈赠", answer: "风悄悄送来的馈赠，他后来才知道是谁。" },
    { id: "b_mask",      poem: "口罩下的下颌线", answer: "口罩遮住的，不只是病容。" },
    { id: "b_drug",      poem: "药成，人未归", answer: "药终于炼成了，而她已不在原地。" },
    { id: "b_poem",      poem: "她写的诗，他终于读懂了", answer: "一字一句，他终于读懂了她的一生。" },
    { id: "b_cure",      poem: "希望治好我的病", answer: "她最大的心愿，只是希望被治好。" },
    { id: "b_windstop",  poem: "风停之前", answer: "风停下来之前，一切是否还来得及。" }
  ];

  WF.Achievements = {
    A: A,
    B: B,
    get: function (id) {
      return A.find(function (x) { return x.id === id; }) ||
             B.find(function (x) { return x.id === id; });
    },
    listUnlocked: function () {
      const done = WF.State.data.achievements || [];
      const out = [];
      A.forEach(function (a) { if (done.indexOf(a.id) >= 0) out.push(Object.assign({}, a, { type: "A" })); });
      B.forEach(function (b) { if (done.indexOf(b.id) >= 0) out.push(Object.assign({}, b, { type: "B" })); });
      return out;
    },
    listAll: function (useGlobal) {
      // 已解锁成就：优先从全局存档读（持久化，刷新不丢）
      // 兜底：如果全局没数据，用当前存档的
      let done = [];
      try {
        const globalData = WF.Save.getGlobal();
        if (globalData && globalData.achievements && globalData.achievements.unlocked) {
          done = globalData.achievements.unlocked;
        }
      } catch (e) {}
      if (!done.length && WF.State.data.achievements) {
        done = WF.State.data.achievements;
      }

      const ended = useGlobal
        ? WF.Save.getGlobal().anyEndingCompleted
        : !!WF.State.data.ending;

      const aList = A.map(function (a) {
        return Object.assign({}, a, { type: "A", unlocked: done.indexOf(a.id) >= 0 });
      });
      const bList = B.map(function (b) {
        return Object.assign({}, b, {
          type: "B",
          unlocked: done.indexOf(b.id) >= 0,
          revealed: ended
        });
      });
      return { A: aList, B: bList };
    }
  };
})();