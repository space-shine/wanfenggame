/* ============================================================
   SaveView · 存档系统（左列表 + 右详情）
   - 左侧：10 个存档槽位，可编辑标题
   - 右侧：选中存档的完整信息（封面、章节、天数、地点、属性）
   ============================================================ */
(function () {
  "use strict";
  const WF = window.WF || (window.WF = {});

  let currentMode = "load";
  let selectedSlot = null;
  let modalEl = null;

  const LOC_BG = {
    dorm:       "url(assets/bg/dorm.jpg) center/cover no-repeat",
    teaching:   "url(assets/bg/teaching.jpg) center/cover no-repeat",
    library:    "url(assets/bg/library.jpg) center/cover no-repeat",
    canteen:    "url(assets/bg/canteen.jpg) center/cover no-repeat",
    lab:        "url(assets/bg/lab.jpg) center/cover no-repeat",
    playground: "url(assets/bg/playground.jpg) center/cover no-repeat",
    clubroom:   "url(assets/bg/clubroom.jpg) center/cover no-repeat",
    clinic:     "url(assets/bg/clinic.jpg) center/cover no-repeat",
    cafe:       "url(assets/bg/cafe.jpg) center/cover no-repeat"
  };

  function ensureModal() {
    if (modalEl) return modalEl;
    modalEl = document.createElement("div");
    modalEl.id = "modal-save";
    modalEl.className = "modal hidden";
    modalEl.innerHTML = `
      <div class="save-page">
        <aside class="save-side">
          <button class="save-back" id="save-close">← 返回主菜单</button>
          <h2 class="save-side-title">存档管理</h2>
          <div class="save-tabs">
            <button class="save-import-btn" id="save-import">📥 导入存档</button>
          </div>
          <div class="save-list" id="save-list"></div>
        </aside>
        <main class="save-detail" id="save-detail">
          <div class="save-empty">左侧选择存档查看详情</div>
        </main>
      </div>
    `;
    document.body.appendChild(modalEl);

    modalEl.querySelector("#save-close").onclick = close;
    modalEl.querySelector("#save-import").onclick = doImport;
    return modalEl;
  }

  function getSlots() {
    const out = [];
    for (let i = 1; i <= 10; i++) {
      const raw = localStorage.getItem("wf_slot_v2_" + i);
      if (raw) {
        try {
          const s = JSON.parse(raw);
          out.push({ slot: i, empty: false, data: s });
        } catch (e) {
          out.push({ slot: i, empty: true, corrupted: true });
        }
      } else {
        out.push({ slot: i, empty: true });
      }
    }
    return out;
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, c => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }

  function formatTime(ts) {
    if (!ts) return "—";
    const d = new Date(ts);
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
  }

  function renderList() {
    const list = document.getElementById("save-list");
    if (!list) return;
    const slots = getSlots();
    let html = "";
    slots.forEach(s => {
      const on = s.slot === selectedSlot ? " on" : "";
      if (s.empty) {
        const sub = currentMode === "save" ? "点击保存到此槽" : "暂无存档";
        html += `<div class="save-list-item empty${on}" data-slot="${s.slot}">
          <span class="save-list-num">${s.slot}</span>
          <div class="save-list-info">
            <div class="save-list-name">空槽位</div>
            <div class="save-list-sub">${sub}</div>
          </div>
        </div>`;
      } else {
        const locName = WF.Locations.nameOf(s.data.location) || "未知";
        html += `<div class="save-list-item${on}" data-slot="${s.slot}">
          <span class="save-list-num">${s.slot}</span>
          <div class="save-list-info">
            <div class="save-list-name">${escapeHtml(s.data.name || ("存档 " + s.slot))}</div>
            <div class="save-list-sub">第${s.data.day || 1}天 · ${locName}</div>
          </div>
        </div>`;
      }
    });
    list.innerHTML = html;

    list.querySelectorAll(".save-list-item").forEach(el => {
      el.onclick = () => {
        selectedSlot = parseInt(el.dataset.slot);
        renderList();
        renderDetail();
      };
    });
  }

  function renderDetail() {
    const detail = document.getElementById("save-detail");
    if (!detail) return;
    if (!selectedSlot) {
      detail.innerHTML = `<div class="save-empty">左侧选择存档查看详情</div>`;
      return;
    }
    const slots = getSlots();
    const s = slots.find(x => x.slot === selectedSlot);
    if (!s) return;

       if (s.empty) {
      detail.innerHTML = `
        <div class="save-detail-hero" style="background: linear-gradient(135deg,#3f5d54,#2c443d)">
          <div class="save-detail-hero-mask"></div>
          <div class="save-detail-hero-text">
            <div class="save-detail-day">空槽位 · ${selectedSlot}</div>
            <div class="save-detail-loc">这里还没有存档</div>
          </div>
        </div>
        <div class="save-detail-body">
          <div class="save-detail-title-row">
            <div class="save-detail-title-input" style="cursor:default">存档 ${selectedSlot}</div>
          </div>
          <div class="save-detail-sub">ID: slot_${selectedSlot}</div>
          <div class="save-detail-actions">
            <span class="save-detail-hint">此槽位为空。可通过「📥 导入存档」导入 JSON 文件，或进入游戏后点击顶部「存档」按钮保存。</span>
          </div>
        </div>
      `;
      return;
    }

    const d = s.data;
    const bgImg = d.currentBg || LOC_BG[d.location] || LOC_BG.dorm;
    const locName = WF.Locations.nameOf(d.location) || "未知";

    detail.innerHTML = `
      <div class="save-detail-hero" style="background: ${bgImg}">
        <div class="save-detail-hero-mask"></div>
        <div class="save-detail-hero-text">
          <div class="save-detail-day">第 ${d.day || 1} 天</div>
          <div class="save-detail-loc">${locName}</div>
        </div>
      </div>
      <div class="save-detail-body">
        <div class="save-detail-title-row">
          <div class="save-detail-title-input">${escapeHtml(d.name || ("存档 " + s.slot))}</div>
          <button class="save-edit-btn" id="edit-title">修改标题</button>
        </div>
        <div class="save-detail-sub">ID: slot_${s.slot} · 保存于 ${formatTime(d.updatedAt)}</div>

        <div class="save-detail-grid">
          <div class="save-detail-cell">
            <div class="sdc-label">章节</div>
            <div class="sdc-val">第 ${d.chapter || 1} 章</div>
          </div>
          <div class="save-detail-cell">
            <div class="sdc-label">学期</div>
            <div class="sdc-val">${d.term || "大一上"}</div>
          </div>
          <div class="save-detail-cell">
            <div class="sdc-label">体力</div>
            <div class="sdc-val">${d.stamina || 0}/${d.staminaMax || 60}</div>
          </div>
          <div class="save-detail-cell">
            <div class="sdc-label">心情</div>
            <div class="sdc-val">${d.mood || 0}</div>
          </div>
          <div class="save-detail-cell">
            <div class="sdc-label">智商</div>
            <div class="sdc-val">${d.iq || 0}</div>
          </div>
          <div class="save-detail-cell">
            <div class="sdc-label">情商</div>
            <div class="sdc-val">${d.eq || 0}</div>
          </div>
          <div class="save-detail-cell">
            <div class="sdc-label">金钱</div>
            <div class="sdc-val">${d.money || 0} 元</div>
          </div>
          <div class="save-detail-cell">
            <div class="sdc-label">健康</div>
            <div class="sdc-val">${d.health || 0}</div>
          </div>
        </div>

       <div class="save-detail-actions">
          <button class="save-action-btn primary" id="act-load">读取此存档</button>
          <button class="save-action-btn" id="act-export">导出 JSON</button>
          <button class="save-action-btn danger" id="act-delete">删除</button>
        </div>
      </div>
    `;

    const editBtn = detail.querySelector("#edit-title");
    if (editBtn) {
      editBtn.onclick = () => {
        const newTitle = prompt("输入新的存档名：", d.name || ("存档 " + s.slot));
        if (newTitle === null) return;
        const trimmed = newTitle.trim();
        if (!trimmed) return;
        d.name = trimmed;
        localStorage.setItem("wf_slot_v2_" + s.slot, JSON.stringify(d));
        WF.Toast.show("存档名已更新");
        renderList();
        renderDetail();
      };
    }

    const loadBtn = detail.querySelector("#act-load");
    if (loadBtn) loadBtn.onclick = () => doLoad(s.slot);

    const exportBtn = detail.querySelector("#act-export");
    if (exportBtn) exportBtn.onclick = () => doExport(s.slot);

    const delBtn = detail.querySelector("#act-delete");
    if (delBtn) delBtn.onclick = () => doDelete(s.slot);
  }

  function doSave(slot) {
    const d = WF.State.data;
    const defaultName = (slot === d.currentSlot && d.saveName) ? d.saveName : ("存档 " + slot);
    const name = prompt(`保存到槽位 ${slot}，输入存档名：`, defaultName);
    if (name === null) return;
    d.currentSlot = slot;
    d.saveName = name || defaultName;
    const r = WF.Save.saveToSlot(slot, d.saveName);
    if (r.success) {
      WF.Toast.show(`已保存到槽位 ${slot}`);
      selectedSlot = slot;
      renderList();
      renderDetail();
    } else {
      WF.Toast.show("保存失败：" + r.error);
    }
  }

  function doLoad(slot) {
    if (!confirm(`确定要读取槽位 ${slot} 的存档吗？当前进度将丢失。`)) return;
    const r = WF.Save.loadFromSlot(slot);
    if (r.success) {
      const d = WF.State.data;
      d.currentSlot = slot;
      const raw = localStorage.getItem("wf_slot_v2_" + slot);
      if (raw) {
        try { d.saveName = JSON.parse(raw).name || ("存档 " + slot); } catch(e) {}
      }

      /* 读档后强制清空所有剧情 UI */
      if (WF.Engine) WF.Engine.stop();
      document.getElementById("dialogue-area").classList.add("hidden");
      document.getElementById("scene-end").classList.add("hidden");
      const ap = document.getElementById("action-panel");
      if (ap) ap.classList.add("hidden");
      if (WF.ActorView) WF.ActorView.clear();

      WF.Toast.show("读档成功");
      close();
      if (WF.afterLoad) WF.afterLoad();
    } else {
      WF.Toast.show("读档失败：" + r.error);
    }
  }

  function doDelete(slot) {
    if (!confirm(`确定要删除槽位 ${slot} 的存档吗？此操作不可恢复。`)) return;
    const r = WF.Save.deleteSlot(slot);
    if (r.success) {
      WF.Toast.show("已删除");
      selectedSlot = null;
      renderList();
      renderDetail();
    } else {
      WF.Toast.show("删除失败：" + r.error);
    }
  }

    function doImport() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json,application/json";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target.result);
          if (!data || !data.version || !data.day) {
            WF.Toast.show("这不是有效的挽风存档文件");
            return;
          }
          // 找一个空槽位
          const slots = getSlots();
          let freeSlot = null;
          for (let i = 1; i <= 10; i++) {
            if (slots.find(x => x.slot === i && x.empty)) {
              freeSlot = i;
              break;
            }
          }
          if (!freeSlot) {
            WF.Toast.show("没有空槽位，请先删除一个存档");
            return;
          }
          data.name = data.name || ("导入的存档 " + freeSlot);
          localStorage.setItem("wf_slot_v2_" + freeSlot, JSON.stringify(data));
          WF.Toast.show("已导入到槽位 " + freeSlot);
          selectedSlot = freeSlot;
          renderList();
          renderDetail();
        } catch (err) {
          WF.Toast.show("导入失败：文件不是有效 JSON");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }

  function doExport(slot) {
    try {
      const raw = localStorage.getItem("wf_slot_v2_" + slot);
      if (!raw) { WF.Toast.show("存档不存在"); return; }
      const blob = new Blob([raw], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `挽风_存档${slot}_${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      WF.Toast.show("已导出为 JSON 文件");
    } catch (e) {
      WF.Toast.show("导出失败");
    }
  }

  function open() {
    ensureModal();
    currentMode = "load";           // 存档页固定读取模式，保存走游戏内按钮
    selectedSlot = null;
    renderList();
    renderDetail();
    modalEl.classList.remove("hidden");
  }

  function close() {
    if (modalEl) modalEl.classList.add("hidden");
  }

  WF.SaveView = { open, close };
})();