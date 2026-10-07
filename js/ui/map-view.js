/* ============================================================
   MapView · 校园地图
   只负责：显示地图 + 选地点 + 确认穿越
   穿越后弹窗消失，主背景/标题切换，行动选项显示在主页面
   ============================================================ */
(function () {
  "use strict";
  const WF = window.WF || (window.WF = {});

  const PLACES = [
    { id:"dorm",       name:"男生宿舍",   icon:"宿", moveCost:5 },
    { id:"teaching",   name:"教学楼",     icon:"教", moveCost:8 },
    { id:"library",    name:"图书馆",     icon:"图", moveCost:8 },
    { id:"canteen",    name:"食堂",       icon:"食", moveCost:5 },
    { id:"lab",        name:"实验室",     icon:"研", moveCost:10 },
    { id:"playground", name:"操场",       icon:"操", moveCost:8 },
    { id:"clubroom",   name:"社团活动室", icon:"社", moveCost:8 },
    { id:"clinic",     name:"校医院",     icon:"医", moveCost:8 },
    { id:"cafe",       name:"咖啡厅",     icon:"咖", moveCost:10 }
  ];

  const PLACE_BG = {
    dorm:     "url(assets/bg/dorm.jpg) center/cover no-repeat",
    teaching: "url(assets/bg/teaching.jpg) center/cover no-repeat",
    library:  "url(assets/bg/library.jpg) center/cover no-repeat",
    canteen:  "url(assets/bg/canteen.jpg) center/cover no-repeat",
    lab:      "url(assets/bg/lab.jpg) center/cover no-repeat",
    playground:"url(assets/bg/playground.jpg) center/cover no-repeat",
    clubroom: "url(assets/bg/clubroom.jpg) center/cover no-repeat",
    clinic:   "url(assets/bg/clinic.jpg) center/cover no-repeat",
    cafe:     "url(assets/bg/cafe.jpg) center/cover no-repeat"
  };

  function open() {
    const d = WF.State.data;
    const panel = document.querySelector("#modal-map .modal-panel");
    panel.innerHTML = `<h2>校园 · 选择去向</h2>
      <p class="modal-tip" id="map-period"></p>
      <p class="modal-tip" style="font-size:11px;color:#999">体力值用于前往不同地点，以及在地点内进行活动。体力不足时可随时点「结束今天行动」返回宿舍休息，不耗体力。</p>
      <div class="map-body">
        <div class="map-img"><img src="assets/bg/campus_map.jpg" alt="校园地图"></div>
        <div class="map-side">
          <div class="map-grid" id="map-grid"></div>
          <button class="act-item end-day" id="map-endday">结束今天行动</button>
        </div>
      </div>
      <div class="modal-actions"><button class="menu-btn small" data-action="map-close">留在这里</button></div>`;
    document.getElementById("map-period").textContent =
      `第 ${d.day} 天　体力 ${d.stamina}/${d.staminaMax}`;
    const grid = document.getElementById("map-grid");
    PLACES.forEach(p => {
      const b = document.createElement("button");
      b.className = "map-place" + (p.id === d.location ? " here" : "");
      b.innerHTML = `<span class="mp-icon">${p.icon}</span><span class="mp-name">${p.name}</span>
        <span class="mp-cost">-${moveCost(p)}</span>`;
      b.onclick = () => goPlace(p);
      grid.appendChild(b);
    });
    document.getElementById("map-endday").onclick = endDay;
    document.getElementById("modal-map").classList.remove("hidden");
  }

  function moveCost(p) {
    const d = WF.State.data;
    if (p.id === "dorm") {
      // 回宿舍保底：体力不足以支付移动(5)时耗0，防止卡死；否则正常耗5
      return d.stamina >= 5 ? 5 : 0;
    }
    return p.moveCost;
  }

  function goPlace(p) {
    const d = WF.State.data;
    const mc = moveCost(p);
    if (p.id === d.location) { close(); return; }
    if (p.id !== "dorm" && d.stamina < mc) {
      WF.Toast.show("今天太累了，赶快「结束今天行动」回宿舍睡觉吧。");
      return;
    }
    d.stamina -= mc;
    d.location = p.id;
    const bg = document.getElementById("bg-layer");
    if (PLACE_BG[p.id]) bg.style.background = PLACE_BG[p.id];
    WF.eventbus.emit("hud-update");
    close();
    WF.Toast.show(mc > 0 ? `你去了${p.name}（-${mc}体力）` : `你回到了男生宿舍`);

    // 1) 检查下一章触发（到了新地点，满足条件就进剧情）
    if (WF.checkNextChapter && WF.State.checkNextChapter()) {
      setTimeout(() => {
        if (WF.checkNextChapter) WF.checkNextChapter();
      }, 500);
      return;   // 触发主线时不再触发偶遇
    }

    // 2) 检查偶遇
    if (WF.Encounter) {
      setTimeout(() => WF.Encounter.tryTrigger(), 400);
    }
  }

  function endDay() {
    const d = WF.State.data;
    // 结束今天行动 = 强制回宿舍，耗体力0，时间不推进
    d.location = "dorm";
    document.getElementById("bg-layer").style.background = PLACE_BG.dorm;
    close();
    WF.eventbus.emit("hud-update");
    WF.Toast.show("你回到了男生宿舍。\n在宿舍点击「睡觉」结束今天。");
  }

  function close() {
    document.getElementById("modal-map").classList.add("hidden");
  }

  WF.MapView = { open, close };
})();
