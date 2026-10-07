/* ============================================================
   MinigameView · 小游戏（融入日常行动）
   9 个游戏：
   - reagent 试剂分装（拖拽配对）
   - microscope 显微镜观察（时机）
   - literature 文献整理（分类，8 篇）
   - guitar 吉他弹奏（节奏点击 + 音效 + 反馈）
   - classQuiz 上课回答问题（20 题）
   - recite 背书（6 对 + 可重复）
   - latte 咖啡拉花（画圈，严格标准）
   - run 节奏跑（连点节奏）
   - race 抢饭（限时点击）
   结果分档：perfect / good / normal / fail / skip
   ============================================================ */
(function () {
  "use strict";
  const WF = window.WF || (window.WF = {});

  const RESULT = {
    perfect: { color:"#2e7d32", name:"完美",  desc:"操作精准，无懈可击。" },
    good:    { color:"#1976d2", name:"良好",  desc:"完成得不错。" },
    normal:  { color:"#f9a825", name:"普通",  desc:"基本完成，还有提升空间。" },
    fail:    { color:"#c62828", name:"失败",  desc:"这次没做好，再试一次吧。" }
  };

  const overlayCss =
    "position:fixed;inset:0;z-index:999;background:rgba(20,28,24,.78);display:flex;align-items:center;justify-content:center;";
  const cardCss =
    "background:#fbf8f1;padding:24px 26px;border-radius:16px;max-width:520px;width:92%;box-shadow:0 18px 50px rgba(0,0,0,.35);text-align:center;";

  function removeOverlay(el) { if (el && el.parentNode) el.parentNode.removeChild(el); }

  /* ---------- 音效（Web Audio API） ---------- */
  let audioCtx = null;
  function ensureAudio() {
    if (!audioCtx) {
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {}
    }
    if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
    return audioCtx;
  }
  function playTone(freq, duration, type) {
    const ctx = ensureAudio();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = type || "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (duration || 0.15));
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + (duration || 0.15));
    } catch (e) {}
  }

  function showResult(overlay, r, extraText, onResult, retry) {
    const rc = RESULT[r];
    const canConfirm = r !== "fail";
    overlay.querySelector(".mg-card").innerHTML = `
      <h3 style="margin:0 0 8px;color:${rc.color}">${rc.name}</h3>
      <p style="color:#6f6a5d;font-size:13px;margin:0 0 16px">${rc.desc}${extraText ? "（" + extraText + "）" : ""}</p>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
        ${canConfirm ? `<button class="ap-btn" id="mg-confirm">确认结果</button>` : ""}
        <button class="menu-btn small" id="mg-retry">再试一次</button>
        ${canConfirm ? "" : `<button class="menu-btn small" id="mg-skip2">跳过</button>`}
      </div>`;
    const cf = overlay.querySelector("#mg-confirm");
    if (cf) cf.onclick = () => { removeOverlay(overlay); onResult(r); };
    overlay.querySelector("#mg-retry").onclick = () => { removeOverlay(overlay); retry(); };
    const sk2 = overlay.querySelector("#mg-skip2");
    if (sk2) sk2.onclick = () => { removeOverlay(overlay); onResult("skip"); };
  }

  /* ============================================================
     1. 试剂分装（拖拽配对）
     6 个彩色试剂瓶 → 拖到对应颜色的试管
     ============================================================ */
  function reagentGame(onResult) {
    const ITEMS = [
      { id:"r1", name:"氯化钠", color:"#4a90d9", label:"NaCl" },
      { id:"r2", name:"硫酸铜", color:"#2e7d32", label:"CuSO₄" },
      { id:"r3", name:"高锰酸钾", color:"#8e44ad", label:"KMnO₄" },
      { id:"r4", name:"重铬酸钾", color:"#e67e22", label:"K₂Cr₂O₇" }
    ];
    const placed = {};
    let selected = null;

    const overlay = document.createElement("div");
    overlay.style.cssText = overlayCss;
    overlay.innerHTML = `
      <div class="mg-card" style="${cardCss};max-width:560px">
        <h3 style="margin:0 0 6px;color:#3a4a3a">试剂分装</h3>
        <p style="color:#8a8578;font-size:13px;margin:0 0 14px">点选试剂瓶，再点对应标签的试管分装。</p>
        <div id="mg-items" style="display:flex;gap:10px;justify-content:center;margin-bottom:18px;flex-wrap:wrap"></div>
        <div id="mg-tubes" style="display:flex;gap:12px;justify-content:center;margin-bottom:14px;flex-wrap:wrap"></div>
        <div id="mg-status" style="height:18px;font-size:12px;color:#9a9486;margin-bottom:10px"></div>
        <div style="display:flex;gap:10px;justify-content:center">
          <button class="menu-btn small" id="mg-reset">重置</button>
          <button class="menu-btn small" id="mg-skip">跳过</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    const itemsBox = overlay.querySelector("#mg-items");
    const tubesBox = overlay.querySelector("#mg-tubes");
    const status = overlay.querySelector("#mg-status");

    function render() {
      // 试剂瓶
      itemsBox.innerHTML = "";
      ITEMS.forEach(it => {
        const btn = document.createElement("button");
        btn.style.cssText = `padding:12px 16px;border-radius:10px;border:2px solid ${selected===it.id?"#c9a96e":"#ddd"};background:${it.color};color:#fff;font-size:13px;font-weight:600;cursor:pointer;opacity:${placed[it.id]?"0.3":"1"}`;
        btn.textContent = it.label;
        btn.disabled = !!placed[it.id];
        btn.onclick = () => { selected = it.id; render(); status.textContent = "已选中 " + it.label; };
        itemsBox.appendChild(btn);
      });
      // 试管
      tubesBox.innerHTML = "";
      ITEMS.forEach(it => {
        const tube = document.createElement("div");
        const matched = placed[it.id] === it.id;
        tube.style.cssText = `width:60px;height:100px;border:2px solid #888;border-radius:0 0 20px 20px;background:${matched?it.color:"#f5f5f5"};display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding-bottom:6px;cursor:pointer;transition:all .2s`;
        tube.innerHTML = `<span style="font-size:11px;color:${matched?"#fff":"#333"};font-weight:600">${it.label}</span>`;
        tube.onclick = () => {
          if (!selected) { status.textContent = "请先选试剂瓶"; return; }
          if (selected === it.id) {
            placed[it.id] = it.id;
            selected = null;
            playTone(600, 0.1);
            render();
            if (Object.keys(placed).length === ITEMS.length) {
              playTone(880, 0.3);
              setTimeout(() => showResult(overlay, "perfect", "全部分装正确", onResult, () => reagentGame(onResult)), 400);
            }
          } else {
            playTone(200, 0.2, "square");
            status.textContent = "对不上，再想想";
          }
        };
        tubesBox.appendChild(tube);
      });
    }
    render();

    overlay.querySelector("#mg-reset").onclick = () => { for (const k in placed) delete placed[k]; selected = null; render(); };
    overlay.querySelector("#mg-skip").onclick = () => { removeOverlay(overlay); onResult("skip"); };
  }

  /* ============================================================
     2. 显微镜观察（时机判定）
     ============================================================ */
  function timingGame(cfg, onResult) {
    const overlay = document.createElement("div");
    overlay.style.cssText = overlayCss;
    overlay.innerHTML = `
      <div class="mg-card" style="${cardCss}">
        <h3 style="margin:0 0 6px;color:#3a4a3a">${cfg.title}</h3>
        <p style="color:#8a8578;font-size:13px;margin:0 0 16px">${cfg.desc}</p>
        <div style="position:relative;height:26px;background:#e9e4d8;border-radius:13px;overflow:hidden;margin-bottom:6px">
          <div style="position:absolute;top:0;bottom:0;left:${cfg.center-cfg.goodHalf}%;width:${cfg.goodHalf*2}%;background:#bfe3c2"></div>
          <div style="position:absolute;top:0;bottom:0;left:${cfg.center-cfg.perfectHalf}%;width:${cfg.perfectHalf*2}%;background:#5fbf6a"></div>
          <div id="mg-needle" style="position:absolute;top:0;bottom:0;left:0;width:3px;background:#2f3a30"></div>
        </div>
        <div style="height:20px;font-size:12px;color:#9a9486;margin-bottom:12px">等指针走到绿色区域时点「${cfg.action}」</div>
        <div style="display:flex;gap:10px;justify-content:center">
          <button class="ap-btn" id="mg-stop">${cfg.action}</button>
          <button class="menu-btn small" id="mg-skip">跳过</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    const needle = overlay.querySelector("#mg-needle");
    let pos = 0, dir = 1, stopped = false;
    const timer = setInterval(() => {
      if (stopped) return;
      pos += dir * cfg.speed;
      if (pos >= 100) { pos = 100; dir = -1; }
      if (pos <= 0) { pos = 0; dir = 1; }
      needle.style.left = pos + "%";
    }, 16);

    overlay.querySelector("#mg-stop").onclick = () => {
      if (stopped) return;
      stopped = true; clearInterval(timer);
      const dist = Math.abs(pos - cfg.center);
      let r = "fail";
      if (dist <= cfg.perfectHalf) r = "perfect";
      else if (dist <= cfg.goodHalf) r = "good";
      else if (dist <= cfg.normalHalf) r = "normal";
      playTone(r === "perfect" ? 880 : r === "good" ? 660 : 400, 0.15);
      showResult(overlay, r, "指针停在 " + Math.round(pos) + "%", onResult, () => timingGame(cfg, onResult));
    };
    overlay.querySelector("#mg-skip").onclick = () => { clearInterval(timer); removeOverlay(overlay); onResult("skip"); };
  }

  /* ============================================================
     3. 文献整理（8 篇分类）
     ============================================================ */
  function literatureGame(onResult) {
    const DOCS = [
      { id:"d1", text:"有机合成路线设计",   cat:"chem" },
      { id:"d2", text:"酶催化反应动力学",   cat:"bio" },
      { id:"d3", text:"色谱与光谱分析法",   cat:"chem" },
      { id:"d4", text:"细胞信号传导通路",   cat:"bio" },
      { id:"d5", text:"药物分子构效关系",   cat:"chem" },
      { id:"d6", text:"蛋白质结构解析",     cat:"bio" },
      { id:"d7", text:"高分子材料合成",     cat:"chem" },
      { id:"d8", text:"基因表达调控",       cat:"bio" }
    ];
    const placed = {};
    let selected = null;

    const overlay = document.createElement("div");
    overlay.style.cssText = overlayCss;
    overlay.innerHTML = `
      <div class="mg-card" style="${cardCss};max-width:560px">
        <h3 style="margin:0 0 6px;color:#3a4a3a">文献整理</h3>
        <p style="color:#8a8578;font-size:13px;margin:0 0 12px">点选文献，再点分类箱。8 篇全部归类正确 = 完美。</p>
        <div id="mg-docs" style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-bottom:14px;min-height:40px"></div>
        <div style="display:flex;gap:10px;justify-content:center;margin-bottom:12px">
          <div id="bin-chem" data-cat="chem" style="flex:1;max-width:200px;padding:14px 10px;border:2px dashed #7fa7c4;border-radius:12px;color:#3a6a8a;font-size:13px;min-height:80px">化学 / 分析类<div class="bin-list" style="margin-top:6px;display:flex;flex-direction:column;gap:3px"></div></div>
          <div id="bin-bio" data-cat="bio" style="flex:1;max-width:200px;padding:14px 10px;border:2px dashed #7fb88a;border-radius:12px;color:#3a7a45;font-size:13px;min-height:80px">生物 / 药学类<div class="bin-list" style="margin-top:6px;display:flex;flex-direction:column;gap:3px"></div></div>
        </div>
        <div id="mg-status" style="height:18px;font-size:12px;color:#9a9486;margin-bottom:10px"></div>
        <div style="display:flex;gap:10px;justify-content:center">
          <button class="menu-btn small" id="mg-reset">重置</button>
          <button class="menu-btn small" id="mg-skip">跳过</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    const docsBox = overlay.querySelector("#mg-docs");
    const status = overlay.querySelector("#mg-status");

    function render() {
      docsBox.innerHTML = "";
      DOCS.forEach(d => {
        if (placed[d.id]) return;
        const chip = document.createElement("button");
        chip.style.cssText = `padding:6px 11px;border-radius:16px;border:1px solid #c9a96e;background:${selected===d.id?"#c9a96e":"#fff"};color:${selected===d.id?"#fff":"#5a4a3a"};font-size:12px;cursor:pointer`;
        chip.textContent = d.text;
        chip.onclick = () => { selected = d.id; render(); status.textContent = "已选中「" + d.text + "」"; };
        docsBox.appendChild(chip);
      });
      ["chem","bio"].forEach(cat => {
        const list = overlay.querySelector("#bin-" + cat + " .bin-list");
        list.innerHTML = "";
        DOCS.forEach(d => {
          if (placed[d.id] === cat) {
            const tag = document.createElement("span");
            tag.style.cssText = "font-size:11px;background:rgba(255,255,255,.85);padding:2px 6px;border-radius:6px;cursor:pointer";
            tag.textContent = "✓ " + d.text;
            tag.onclick = () => { delete placed[d.id]; render(); };
            list.appendChild(tag);
          }
        });
      });
      if (Object.keys(placed).length === DOCS.length) {
        let correct = 0;
        DOCS.forEach(d => { if (placed[d.id] === d.cat) correct++; });
        let r = correct === 8 ? "perfect" : correct >= 6 ? "good" : correct >= 4 ? "normal" : "fail";
        playTone(r === "perfect" ? 880 : 400, 0.2);
        setTimeout(() => showResult(overlay, r, "正确 " + correct + "/" + DOCS.length, onResult, () => literatureGame(onResult)), 400);
      }
    }

    overlay.querySelectorAll("[data-cat]").forEach(bin => {
      bin.onclick = () => {
        if (!selected) { status.textContent = "请先选一篇文献"; return; }
        placed[selected] = bin.dataset.cat;
        selected = null;
        render();
      };
    });
    overlay.querySelector("#mg-reset").onclick = () => { for (const k in placed) delete placed[k]; selected = null; render(); };
    overlay.querySelector("#mg-skip").onclick = () => { removeOverlay(overlay); onResult("skip"); };
    render();
  }

  /* ============================================================
     4. 吉他弹奏（节奏 + 音效 + 视觉反馈）
     ============================================================ */
  function guitarGame(onResult) {
    const KEYS = ["D", "F", "J", "K"];
    const FREQS = [261.63, 329.63, 392.00, 523.25]; // C4 E4 G4 C5
    const NOTES = 16;
    const SPEED = 3.4;

    const overlay = document.createElement("div");
    overlay.style.cssText = overlayCss;
    overlay.innerHTML = `
      <div class="mg-card" style="${cardCss};max-width:520px">
        <h3 style="margin:0 0 6px;color:#3a4a3a">吉他弹奏</h3>
        <p style="color:#8a8578;font-size:13px;margin:0 0 12px">音符落到判定线时按对应键（D/F/J/K）或点击轨道。</p>
        <div id="mg-stage" style="position:relative;height:300px;background:#2a3444;border-radius:12px;overflow:hidden;margin-bottom:10px;display:flex">
          <div style="flex:1;border-right:1px solid #3a4454;position:relative" data-lane="0"></div>
          <div style="flex:1;border-right:1px solid #3a4454;position:relative" data-lane="1"></div>
          <div style="flex:1;border-right:1px solid #3a4454;position:relative" data-lane="2"></div>
          <div style="flex:1;position:relative" data-lane="3"></div>
          <div style="position:absolute;left:0;right:0;top:250px;height:3px;background:#e7c458;box-shadow:0 0 12px #e7c458;pointer-events:none"></div>
        </div>
        <div style="display:flex;gap:6px;justify-content:center;margin-bottom:10px">
          <div style="flex:1;text-align:center;font-size:13px;color:#888;font-weight:bold">D</div>
          <div style="flex:1;text-align:center;font-size:13px;color:#888;font-weight:bold">F</div>
          <div style="flex:1;text-align:center;font-size:13px;color:#888;font-weight:bold">J</div>
          <div style="flex:1;text-align:center;font-size:13px;color:#888;font-weight:bold">K</div>
        </div>
        <div id="mg-combo" style="height:20px;font-size:14px;color:#d98348;font-weight:bold;margin-bottom:8px"></div>
        <div style="display:flex;gap:10px;justify-content:center">
          <button class="menu-btn small" id="mg-skip">跳过</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    const stage = overlay.querySelector("#mg-stage");
    const lanes = Array.from(stage.querySelectorAll("[data-lane]"));
    const comboEl = overlay.querySelector("#mg-combo");
    const STAGE_H = 300, JUDGE_Y = 250, PERFECT_WIN = 15, GOOD_WIN = 40;

    let notes = [];
    let hits = { perfect:0, good:0, normal:0, miss:0 };
    let totalSpawned = 0, finished = false;
    let combo = 0, maxCombo = 0;

    const schedule = [];
    for (let i = 0; i < NOTES; i++) {
      schedule.push({ time: 700 + i * 380, lane: Math.floor(Math.random() * 4) });
    }
    schedule.forEach(s => setTimeout(() => spawnNote(s.lane), s.time));

    function spawnNote(lane) {
      if (finished) return;
      const el = document.createElement("div");
      el.style.cssText = "position:absolute;top:-30px;left:50%;transform:translateX(-50%);width:44px;height:26px;background:linear-gradient(180deg,#d98348,#b5642f);border-radius:6px;box-shadow:0 2px 8px rgba(0,0,0,.3)";
      lanes[lane].appendChild(el);
      notes.push({ lane, y: -30, el, hit: false });
      totalSpawned++;
      if (totalSpawned === NOTES) setTimeout(finish, 3000);
    }

    function flashLane(lane) {
      const el = lanes[lane];
      el.style.background = "rgba(231,196,88,.35)";
      setTimeout(() => el.style.background = "", 120);
    }

    function hitLane(lane) {
      if (finished) return;
      flashLane(lane);
      let target = null, minDist = 9999;
      notes.forEach(n => {
        if (n.lane !== lane || n.hit) return;
        const dist = Math.abs(n.y - JUDGE_Y);
        if (dist < minDist) { minDist = dist; target = n; }
      });
      if (!target || minDist > GOOD_WIN) {
        hits.miss++;
        combo = 0;
        playTone(180, 0.15, "square");
        updateCombo();
        return;
      }
      target.hit = true;
      target.el.style.opacity = "0";
      target.el.style.transition = "opacity .2s";
      let r = "normal";
      if (minDist <= PERFECT_WIN) { r = "perfect"; hits.perfect++; combo++; }
      else if (minDist <= PERFECT_WIN * 2) { r = "good"; hits.good++; combo++; }
      else { r = "normal"; hits.normal++; combo++; }
      maxCombo = Math.max(maxCombo, combo);
      playTone(FREQS[lane], 0.18, "triangle");
      updateCombo();
    }

    function updateCombo() {
      comboEl.textContent = combo >= 2 ? "连击 ×" + combo : "";
    }

    function keyHandler(e) {
      const k = e.key.toUpperCase();
      const idx = KEYS.indexOf(k);
      if (idx >= 0) { e.preventDefault(); hitLane(idx); }
    }
    document.addEventListener("keydown", keyHandler);
    lanes.forEach((laneEl, i) => { laneEl.onclick = () => hitLane(i); });

    let animId = null;
    function animate() {
      if (finished) return;
      notes.forEach(n => {
        if (n.hit) return;
        n.y += SPEED;
        n.el.style.top = n.y + "px";
        if (n.y > STAGE_H + 30) {
          n.hit = true;
          n.el.style.opacity = "0";
          hits.miss++;
          combo = 0;
          updateCombo();
        }
      });
      animId = requestAnimationFrame(animate);
    }
    animate();

    function finish() {
      if (finished) return;
      finished = true;
      document.removeEventListener("keydown", keyHandler);
      cancelAnimationFrame(animId);
      const total = NOTES;
      const perfectRate = hits.perfect / total;
      const goodRate = (hits.perfect + hits.good) / total;
      let r = "fail";
      if (perfectRate >= 0.7) r = "perfect";
      else if (perfectRate >= 0.4 || goodRate >= 0.7) r = "good";
      else if (goodRate >= 0.4) r = "normal";

      // 成就：全 Perfect
      if (hits.perfect === total && WF.State && WF.State.unlockAchievement) {
        if (WF.State.unlockAchievement("mg_guitar_full")) {
          const ach = WF.Achievements.get("mg_guitar_full");
          if (ach) WF.Toast.achieve(`解锁成就：${ach.name}\n${ach.desc}`);
        }
      }

      showResult(overlay, r,
        `完美 ${hits.perfect} · 良好 ${hits.good} · 普通 ${hits.normal} · 失误 ${hits.miss}　最高连击 ${maxCombo}`,
        onResult, () => guitarGame(onResult));
    }

    overlay.querySelector("#mg-skip").onclick = () => {
      finished = true;
      document.removeEventListener("keydown", keyHandler);
      cancelAnimationFrame(animId);
      removeOverlay(overlay);
      onResult("skip");
    };
  }

  /* ============================================================
     5. 上课回答问题（20 题）
     ============================================================ */
  const ALL_QUESTIONS = [
    { q:"青霉素属于哪类抗生素？", opts:["β-内酰胺类","大环内酯类","氨基糖苷类","四环素类"], correct:0 },
    { q:"药物代谢最主要的器官是？", opts:["心脏","肝脏","肾脏","脾脏"], correct:1 },
    { q:"HPLC 指的是哪种分析方法？", opts:["气相色谱","高效液相色谱","薄层色谱","紫外分光光度"], correct:1 },
    { q:"阿司匹林的化学名是？", opts:["对乙酰氨基酚","布洛芬","阿司匹林","乙酰水杨酸"], correct:3 },
    { q:"缓释制剂的主要特点是？", opts:["起效快","血药浓度稳定","半衰期极短","不需控释"], correct:1 },
    { q:"下列哪种药物属于质子泵抑制剂？", opts:["奥美拉唑","雷尼替丁","氢氧化铝","硫糖铝"], correct:0 },
    { q:"药物经肝脏代谢后一般会？", opts:["活性增强","极性增大","脂溶性增大","分子量减小"], correct:1 },
    { q:"药代动力学 ADME 中，M 代表？", opts:["吸收","分布","代谢","排泄"], correct:2 },
    { q:"生物利用度是指？", opts:["药物吸收速度","进入体循环的药量比例","药物半衰期","药物消除速率"], correct:1 },
    { q:"下列哪一项属于药物制剂稳定性考察内容？", opts:["高温试验","低温试验","辐射试验","加压试验"], correct:0 },
    { q:"阿莫西林属于哪类抗生素？", opts:["青霉素类","头孢菌素类","大环内酯类","喹诺酮类"], correct:0 },
    { q:"药物半衰期 t1/2 指？", opts:["药物起效时间","血药浓度下降一半的时间","药物代谢产物出现时间","药物完全排出时间"], correct:1 },
    { q:"下列哪个是常用的解热镇痛药？", opts:["地西泮","阿司匹林","硝酸甘油","地高辛"], correct:1 },
    { q:"药物与血浆蛋白结合后？", opts:["活性增强","暂时失活","立即代谢","迅速排泄"], correct:1 },
    { q:"弱酸性药物在碱性尿液中？", opts:["易重吸收","易排泄","代谢加快","活性增强"], correct:1 },
    { q:"片剂的崩解时限一般要求？", opts:["15 分钟内","30 分钟内","60 分钟内","120 分钟内"], correct:0 },
    { q:"下列哪项不是处方药的特征？", opts:["需医生处方","可在超市购买","有严格剂量","有明确适应症"], correct:1 },
    { q:"维生素 C 缺乏会导致？", opts:["脚气病","坏血病","夜盲症","佝偻病"], correct:1 },
    { q:"下列哪种不是常用防腐剂？", opts:["苯甲酸钠","山梨酸钾","乙醇","氯化钠"], correct:3 },
    { q:"下列哪项属于药物不良反应？", opts:["副作用","治疗作用","预防作用","诊断作用"], correct:0 }
  ];

  function classQuiz(onResult) {
    const picked = ALL_QUESTIONS.slice().sort(() => Math.random() - 0.5).slice(0, 5);
    let idx = 0, correct = 0;

    const overlay = document.createElement("div");
    overlay.style.cssText = overlayCss;
    overlay.innerHTML = `<div class="mg-card" style="${cardCss}"></div>`;
    document.body.appendChild(overlay);

    function render() {
      if (idx >= picked.length) {
        let r = correct === 5 ? "perfect" : correct === 4 ? "good" : correct === 3 ? "normal" : "fail";
        playTone(r === "perfect" ? 880 : 400, 0.2);
        showResult(overlay, r, "答对 " + correct + "/" + picked.length, onResult, () => classQuiz(onResult));
        return;
      }
      const q = picked[idx];
      overlay.querySelector(".mg-card").innerHTML = `
        <h3 style="margin:0 0 6px;color:#3a4a3a">上课回答问题</h3>
        <p style="color:#999;font-size:12px;margin:0 0 12px">第 ${idx+1} / ${picked.length} 题　当前答对 ${correct}</p>
        <p style="color:#333;font-size:15px;margin:0 0 14px;font-weight:600">${q.q}</p>
        <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
          ${q.opts.map((o, i) => `<button class="ap-btn quiz-opt" data-i="${i}" style="text-align:left;font-size:13px">${String.fromCharCode(65+i)}. ${o}</button>`).join("")}
        </div>
        <div style="display:flex;gap:10px;justify-content:center">
          <button class="menu-btn small" id="mg-skip">跳过</button>
        </div>`;
      overlay.querySelectorAll(".quiz-opt").forEach(btn => {
        btn.onclick = () => {
          const i = parseInt(btn.dataset.i);
          if (i === q.correct) {
            correct++;
            btn.style.background = "#5fbf6a"; btn.style.color = "#fff";
            playTone(660, 0.12);
          } else {
            btn.style.background = "#c62828"; btn.style.color = "#fff";
            const right = overlay.querySelector(`.quiz-opt[data-i="${q.correct}"]`);
            if (right) { right.style.background = "#5fbf6a"; right.style.color = "#fff"; }
            playTone(220, 0.2, "square");
          }
          overlay.querySelectorAll(".quiz-opt").forEach(b => b.disabled = true);
          setTimeout(() => { idx++; render(); }, 700);
        };
      });
      overlay.querySelector("#mg-skip").onclick = () => { removeOverlay(overlay); onResult("skip"); };
    }
    render();
  }

  /* ============================================================
     6. 背书（6 对，可重复玩）
     ============================================================ */
  const RECITE_POOL = [
    { id:"阿司匹林", text:"阿司匹林" },
    { id:"青霉素",   text:"青霉素" },
    { id:"维生素C",  text:"维生素C" },
    { id:"地西泮",   text:"地西泮" },
    { id:"布洛芬",   text:"布洛芬" },
    { id:"阿莫西林", text:"阿莫西林" },
    { id:"红霉素",   text:"红霉素" },
    { id:"头孢拉定", text:"头孢拉定" }
  ];

  function reciteGame(onResult) {
    // 随机抽 6 对
    const pairs = RECITE_POOL.slice().sort(() => Math.random() - 0.5).slice(0, 6);
    const cards = [];
    pairs.forEach(p => {
      cards.push({ pair:p.id, text:p.text, flipped:false, matched:false });
      cards.push({ pair:p.id, text:p.text, flipped:false, matched:false });
    });
    cards.sort(() => Math.random() - 0.5);

    let first = null, second = null, matchedCount = 0, moves = 0;
    let showAll = true;

    const overlay = document.createElement("div");
    overlay.style.cssText = overlayCss;
    overlay.innerHTML = `
      <div class="mg-card" style="${cardCss};max-width:560px">
        <h3 style="margin:0 0 6px;color:#3a4a3a">背书</h3>
        <p style="color:#8a8578;font-size:13px;margin:0 0 14px">记住每张卡的位置，找出 6 对相同内容。尽量少用步数。</p>
        <div id="mg-cards" style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px"></div>
        <div id="mg-moves" style="height:18px;font-size:12px;color:#9a9486;margin-bottom:10px">准备……</div>
        <div style="display:flex;gap:10px;justify-content:center">
          <button class="menu-btn small" id="mg-skip">跳过</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    const cardsBox = overlay.querySelector("#mg-cards");
    const movesEl = overlay.querySelector("#mg-moves");

    function render() {
      cardsBox.innerHTML = "";
      cards.forEach((c, i) => {
        const btn = document.createElement("button");
        const showText = showAll || c.flipped || c.matched;
        btn.style.cssText = `padding:22px 6px;font-size:13px;font-weight:600;border-radius:10px;border:2px solid ${c.matched ? "#5fbf6a" : "#ddd"};background:${showText ? "#fff" : "linear-gradient(135deg,#3f5d54,#2c443d)"};color:${showText ? "#333" : "transparent"};cursor:${c.matched ? "default" : "pointer"};transition:all .2s`;
        btn.textContent = showText ? c.text : "?";
        btn.disabled = c.matched;
        btn.onclick = () => flip(i);
        cardsBox.appendChild(btn);
      });
    }

    function flip(i) {
      if (showAll) return;
      const c = cards[i];
      if (c.flipped || c.matched) return;
      if (first === null) { first = i; c.flipped = true; playTone(520, 0.06); render(); }
      else if (first === i) return;
      else if (second === null) {
        second = i; c.flipped = true; playTone(520, 0.06); render();
        moves++;
        movesEl.textContent = "已用 " + moves + " 步";
        setTimeout(checkMatch, 500);
      }
    }

    function checkMatch() {
      const a = cards[first], b = cards[second];
      if (a.pair === b.pair) {
        a.matched = true; b.matched = true;
        matchedCount++;
        first = second = null;
        playTone(880, 0.15);
        render();
        if (matchedCount === 6) {
          setTimeout(() => {
            let r = moves <= 8 ? "perfect" : moves <= 12 ? "good" : moves <= 18 ? "normal" : "fail";
            // 成就：4 步内完成（不可能，但设置一个更合理的 <10 步）
            if (moves <= 10 && WF.State.unlockAchievement("mg_recite_fast")) {
              const ach = WF.Achievements.get("mg_recite_fast");
              if (ach) WF.Toast.achieve(`解锁成就：${ach.name}\n${ach.desc}`);
            }
            showResult(overlay, r, "用了 " + moves + " 步", onResult, () => reciteGame(onResult));
          }, 400);
        }
      } else {
        a.flipped = false; b.flipped = false;
        first = second = null;
        playTone(220, 0.1, "square");
        render();
      }
    }

    render();
    setTimeout(() => { showAll = false; render(); movesEl.textContent = "开始！"; }, 3000);

    overlay.querySelector("#mg-skip").onclick = () => { removeOverlay(overlay); onResult("skip"); };
  }

  /* ============================================================
     7. 咖啡拉花（画圈，标准严格）
     ============================================================ */
  function latteGame(onResult) {
    const overlay = document.createElement("div");
    overlay.style.cssText = overlayCss;
    overlay.innerHTML = `
      <div class="mg-card" style="${cardCss};max-width:480px">
        <h3 style="margin:0 0 6px;color:#3a4a3a">咖啡拉花</h3>
        <p style="color:#8a8578;font-size:13px;margin:0 0 12px">沿着虚线圆画圈，画得越圆越好。<br><span style="color:#c9a96e;font-size:12px">完美 < 1.5px · 良好 < 4px · 普通 < 8px · 失败 ≥ 8px</span></p>
        <div style="position:relative;width:280px;height:280px;margin:0 auto 14px;background:#f5ecd8;border-radius:50%;overflow:hidden">
          <div id="mg-target" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:220px;height:220px;border:2px dashed #c9a96e;border-radius:50%"></div>
          <canvas id="mg-canvas" width="280" height="280" style="position:absolute;top:0;left:0;cursor:crosshair;touch-action:none"></canvas>
        </div>
        <div style="height:20px;font-size:12px;color:#9a9486;margin-bottom:10px" id="mg-status">按住鼠标（或手指）画圈</div>
        <div style="display:flex;gap:10px;justify-content:center">
          <button class="ap-btn" id="mg-done" disabled>完成</button>
          <button class="menu-btn small" id="mg-skip">跳过</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    const canvas = overlay.querySelector("#mg-canvas");
    const ctx = canvas.getContext("2d");
    const status = overlay.querySelector("#mg-status");
    const doneBtn = overlay.querySelector("#mg-done");
    let drawing = false;
    let points = [];
    const CX = 140, CY = 140, R = 110;

    function getPos(e) {
      const r = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return { x: clientX - r.left, y: clientY - r.top };
    }

    function draw(e) {
      if (!drawing) return;
      e.preventDefault();
      const p = getPos(e);
      const last = points[points.length - 1];
      if (!last || Math.hypot(p.x - last.x, p.y - last.y) > 2) {
        points.push(p);
        ctx.strokeStyle = "#8b5a2b";
        ctx.lineWidth = 7;
        ctx.lineCap = "round";
        ctx.beginPath();
        if (last) { ctx.moveTo(last.x, last.y); ctx.lineTo(p.x, p.y); }
        else { ctx.moveTo(p.x, p.y); }
        ctx.stroke();
        updateStatus();
        if (points.length > 20) doneBtn.disabled = false;
      }
    }

    function calcDev() {
      let totalDev = 0;
      points.forEach(p => {
        const d = Math.hypot(p.x - CX, p.y - CY);
        totalDev += Math.abs(d - R);
      });
      return points.length ? totalDev / points.length : 999;
    }

    function updateStatus() {
      if (points.length < 10) { status.textContent = "继续画……"; return; }
      const avgDev = calcDev();
      if (avgDev < 1.5) status.textContent = "太完美了！";
      else if (avgDev < 4) status.textContent = "画得很圆！";
      else if (avgDev < 8) status.textContent = "还不错";
      else status.textContent = "再圆一点";
    }

    canvas.addEventListener("mousedown", e => { drawing = true; draw(e); });
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", () => { drawing = false; });
    canvas.addEventListener("mouseleave", () => { drawing = false; });
    canvas.addEventListener("touchstart", e => { drawing = true; draw(e); }, { passive: false });
    canvas.addEventListener("touchmove", draw, { passive: false });
    canvas.addEventListener("touchend", () => { drawing = false; });

    doneBtn.onclick = () => {
      if (points.length < 20) { status.textContent = "画得太少了"; return; }
      const avgDev = calcDev();
      let r = "fail";
      if (avgDev < 1.5) r = "perfect";
      else if (avgDev < 4) r = "good";
      else if (avgDev < 8) r = "normal";
      playTone(r === "perfect" ? 880 : r === "good" ? 660 : 400, 0.2);

      if (avgDev < 1.5 && WF.State.unlockAchievement("mg_latte_master")) {
        const ach = WF.Achievements.get("mg_latte_master");
        if (ach) WF.Toast.achieve(`解锁成就：${ach.name}\n${ach.desc}`);
      }

      showResult(overlay, r, "平均偏差 " + avgDev.toFixed(1) + "px", onResult, () => latteGame(onResult));
    };
    overlay.querySelector("#mg-skip").onclick = () => { removeOverlay(overlay); onResult("skip"); };
  }

  /* ============================================================
     8. 节奏跑（连点节奏）
     屏幕出现"跑！"时点击，速度越快越好
     ============================================================ */
  function runGame(onResult) {
    const TARGET = 20;         // 需要点击 20 次
    let count = 0, startTime = 0, started = false;
    const TIME_LIMIT = 8000;   // 8 秒内完成

    const overlay = document.createElement("div");
    overlay.style.cssText = overlayCss;
    overlay.innerHTML = `
      <div class="mg-card" style="${cardCss};max-width:480px">
        <h3 style="margin:0 0 6px;color:#3a4a3a">节奏跑</h3>
        <p style="color:#8a8578;font-size:13px;margin:0 0 14px">8 秒内快速点击"跑"按钮 20 次。</p>
        <div style="height:80px;display:flex;align-items:center;justify-content:center;font-size:36px;font-weight:900;color:#d98348;font-family:var(--serif)" id="mg-count">0 / ${TARGET}</div>
        <div style="height:12px;background:#e9e4d8;border-radius:6px;overflow:hidden;margin-bottom:14px">
          <div id="mg-bar" style="height:100%;width:0%;background:linear-gradient(90deg,#d98348,#e7c458);transition:width .15s"></div>
        </div>
        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
          <button class="ap-btn" id="mg-run" style="font-size:22px;padding:18px 48px;font-weight:900">跑</button>
        </div>
        <div style="display:flex;gap:10px;justify-content:center;margin-top:10px">
          <button class="menu-btn small" id="mg-skip">跳过</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    const countEl = overlay.querySelector("#mg-count");
    const barEl = overlay.querySelector("#mg-bar");
    const runBtn = overlay.querySelector("#mg-run");

    function update() {
      countEl.textContent = count + " / " + TARGET;
      barEl.style.width = Math.min(100, (count / TARGET) * 100) + "%";
    }

    runBtn.onclick = () => {
      if (!started) { started = true; startTime = Date.now(); }
      count++;
      playTone(400 + count * 30, 0.05);
      update();
      if (count >= TARGET) finish();
    };

    function finish() {
      const elapsed = Date.now() - startTime;
      let r = "fail";
      if (elapsed <= 3000) r = "perfect";
      else if (elapsed <= 4500) r = "good";
      else if (elapsed <= 6000) r = "normal";
      playTone(r === "perfect" ? 880 : 400, 0.2);

      // 成就：3 秒内完成
      if (elapsed <= 3000 && WF.State.unlockAchievement("mg_run_fast")) {
        const ach = WF.Achievements.get("mg_run_fast");
        if (ach) WF.Toast.achieve(`解锁成就：${ach.name}\n${ach.desc}`);
      }

      showResult(overlay, r, "用时 " + (elapsed / 1000).toFixed(1) + " 秒", onResult, () => runGame(onResult));
    }

    overlay.querySelector("#mg-skip").onclick = () => { removeOverlay(overlay); onResult("skip"); };
  }

  /* ============================================================
     9. 抢饭（限时点击目标）
     ============================================================ */
   function raceGame(onResult) {
    const TIME_LIMIT = 10;
    // 随机 10-16 个菜品，其中 2-4 个空碗
    const totalDishes = 10 + Math.floor(Math.random() * 7);    // 10-16
    const totalBads = 2 + Math.floor(Math.random() * 3);        // 2-4
    let score = 0;              // 正确点击的菜品数
    let badHit = false;         // 是否点过空碗
    let dishesLeft = totalDishes;
    let spawnedDishes = 0;
    let spawnedBads = 0;
    let timeLeft = TIME_LIMIT;
    let spawnTimer = null, secTimer = null;

    const overlay = document.createElement("div");
    overlay.style.cssText = overlayCss;
    overlay.innerHTML = `
      <div class="mg-card" style="${cardCss};max-width:480px">
        <h3 style="margin:0 0 6px;color:#3a4a3a">食堂抢饭</h3>
        <p style="color:#8a8578;font-size:13px;margin:0 0 12px">
          10 秒内点完所有菜品。点空碗直接扣分。<br>
          <span style="color:#c9a96e;font-size:12px">完美：点完所有菜品 + 不点空碗</span>
        </p>
        <div style="display:flex;justify-content:space-between;font-size:14px;font-weight:bold;margin-bottom:10px;color:#5a4a3a">
          <span>菜品：<span id="mg-score">0</span> / ${totalDishes}</span>
          <span>时间：<span id="mg-time">10.0</span>s</span>
        </div>
        <div style="height:8px;background:#e9e4d8;border-radius:4px;overflow:hidden;margin-bottom:12px">
          <div id="mg-bar" style="height:100%;width:0%;background:linear-gradient(90deg,#d98348,#e7c458);transition:width .2s"></div>
        </div>
        <div id="mg-stage" style="position:relative;width:100%;height:280px;background:#f5ecd8;border-radius:12px;overflow:hidden;cursor:crosshair"></div>
        <div style="display:flex;gap:10px;justify-content:center;margin-top:12px">
          <button class="menu-btn small" id="mg-skip">跳过</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    const stage = overlay.querySelector("#mg-stage");
    const scoreEl = overlay.querySelector("#mg-score");
    const timeEl = overlay.querySelector("#mg-time");
    const barEl = overlay.querySelector("#mg-bar");

    const DISHES = ["🍚","🍜","🍖","🥟","🍲","🥗","🍛","🥘","🍱","🍝"];

    function updateScore() {
      scoreEl.textContent = score;
      barEl.style.width = Math.min(100, (score / totalDishes) * 100) + "%";
    }

    function spawnItem() {
      if (timeLeft <= 0) return;
      // 判断生成菜品还是空碗
      let isBad = false;
      const dishLeft = totalDishes - spawnedDishes;
      const badLeft = totalBads - spawnedBads;
      if (badLeft > 0 && dishLeft > 0) {
        // 按剩余比例随机
        isBad = Math.random() < badLeft / (badLeft + dishLeft);
      } else if (badLeft > 0) {
        isBad = true;
      } else if (dishLeft <= 0) {
        return;
      }
      if (isBad) spawnedBads++; else spawnedDishes++;

      const el = document.createElement("button");
      const x = 8 + Math.random() * 72;
      const y = 8 + Math.random() * 72;
      const size = 46 + Math.random() * 12;
      el.style.cssText = `position:absolute;left:${x}%;top:${y}%;width:${size}px;height:${size}px;border-radius:50%;background:${isBad?"#c62828":"#fff"};border:2px solid ${isBad?"#8a1a1a":"#c9a96e"};font-size:${size*0.5}px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#333;font-weight:900`;
      el.textContent = isBad ? "空" : DISHES[Math.floor(Math.random() * DISHES.length)];
      el.onclick = () => {
        if (isBad) {
          badHit = true;
          score = Math.max(0, score - 2);
          playTone(180, 0.2, "square");
          WF.Toast.show("点到空碗了！-2", "favor", 1200);
        } else {
          score++;
          playTone(700 + score * 15, 0.05);
        }
        updateScore();
        el.remove();
      };
      stage.appendChild(el);
      // 1.4 秒后消失
      setTimeout(() => { if (el.parentNode) el.remove(); }, 1400);
    }

    spawnTimer = setInterval(spawnItem, 350);

    secTimer = setInterval(() => {
      timeLeft -= 0.1;
      if (timeLeft < 0) timeLeft = 0;
      timeEl.textContent = timeLeft.toFixed(1);
      if (timeLeft <= 0) finish();
    }, 100);

    function finish() {
      clearInterval(spawnTimer);
      clearInterval(secTimer);
      stage.innerHTML = "";
      // 判定
      let r = "fail";
      const allDishesHit = (score >= totalDishes) && !badHit;
      if (allDishesHit) r = "perfect";
      else if (!badHit && score >= totalDishes - 2) r = "good";
      else if (score >= 5) r = "normal";
      else r = "fail";

      playTone(r === "perfect" ? 880 : 400, 0.2);

      // 成就：完美通关
      if (allDishesHit && WF.State.unlockAchievement("mg_race_win")) {
        const ach = WF.Achievements.get("mg_race_win");
        if (ach) WF.Toast.achieve(`解锁成就：${ach.name}\n${ach.desc}`);
      }

      const extra = `吃 ${score}/${totalDishes}　${badHit ? "点过空碗" : "没点空碗"}`;
      showResult(overlay, r, extra, onResult, () => raceGame(onResult));
    }

    overlay.querySelector("#mg-skip").onclick = () => {
      clearInterval(spawnTimer); clearInterval(secTimer);
      removeOverlay(overlay);
      onResult("skip");
    };
  }

  /* ============================================================
     导出
     ============================================================ */
  const GAMES = {
    reagent:    { open(cb) { reagentGame(cb); } },
    microscope: { open(cb) { timingGame({ title:"显微镜观察", desc:"调整焦距，等指针走到清晰成像的绿色区域再停下。", action:"锁定焦距", center:50, perfectHalf:5, goodHalf:12, normalHalf:22, speed:1.6 }, cb); } },
    literature: { open(cb) { literatureGame(cb); } },
    guitar:     { open(cb) { guitarGame(cb); } },
    classQuiz:  { open(cb) { classQuiz(cb); } },
    recite:     { open(cb) { reciteGame(cb); } },
    latte:      { open(cb) { latteGame(cb); } },
    run:        { open(cb) { runGame(cb); } },
    race:       { open(cb) { raceGame(cb); } }
  };

  function open(gameId, callback) {
    const g = GAMES[gameId];
    if (!g) { console.warn("[minigame] 未知游戏:", gameId); return; }
    ensureAudio();
    g.open(callback);
  }

  WF.MinigameView = { open };
})();