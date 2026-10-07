/* ============================================================
   地点数据（M0：基础名称映射；M2 扩展为完整校园地图/坐标/开放时段）
   ============================================================ */
(function () {
  "use strict";
  const WF = window.WF || (window.WF = {});

  const locs = {
    train:      { id:"train", name:"火车" },
    shop:       { id:"shop", name:"沙县小吃" },
    road:       { id:"road", name:"路口" },
    dorm:       { id:"dorm", name:"男生宿舍" },
    teaching:   { id:"teaching", name:"教学楼" },
    library:    { id:"library", name:"图书馆" },
    lab:        { id:"lab", name:"实验室" },
    campus:     { id:"campus", name:"校园" },
    canteen:    { id:"canteen", name:"食堂" },
    playground: { id:"playground", name:"操场" },
    clubroom:   { id:"clubroom", name:"社团活动室" },
    clinic:     { id:"clinic", name:"校医院" },
    cafe:       { id:"cafe", name:"咖啡厅" }
  };

  WF.Locations = {
    get(id) { return locs[id]; },
    nameOf(id) {
      if (!id) return "未知";
      const loc = locs[id];
      if (loc) return loc.name;
      // 未定义的 id：返回中文兜底，不显示英文
      const fallback = {
        campus: "校园", train: "火车", shop: "沙县小吃", road: "路口",
        dorm: "男生宿舍"
      };
      return fallback[id] || "未知";
    },
    all() { return Object.values(locs); }
  };
})();
