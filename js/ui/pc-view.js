/* ============================================================
   PCView · 电脑系统
   主界面：邮箱 / 研究资料 / 课表 / 奖学金 / 商城 / 背包 / 诗集
   ============================================================ */
(function () {
  "use strict";
  const WF = window.WF || (window.WF = {});

  const _style = document.createElement('style');
  _style.textContent = '::-webkit-scrollbar{width:0;display:none}*{scrollbar-width:none;-ms-overflow-style:none}';
  document.head.appendChild(_style);

  const SUBJECTS = [
    { id:"organic",   name:"有机化学", credit:3, day:"周一", time:"08:00-09:40",  place:"教学楼301", desc:"有机化合物结构、命名与反应机理。" },
    { id:"english",   name:"大学英语", credit:2, day:"周一", time:"10:00-11:40", place:"教学楼205", desc:"英语听说读写与学术文献阅读。" },
    { id:"analysis",  name:"药物分析", credit:3, day:"周二", time:"08:00-09:40",  place:"实验楼203", desc:"药物质量控制、色谱与光谱分析。" },
    { id:"pe",        name:"体育",     credit:1, day:"周二", time:"14:00-15:40", place:"操场",      desc:"体能训练与球类运动。" },
    { id:"intro",     name:"药学导论", credit:2, day:"周三", time:"08:00-09:40",  place:"教学楼102", desc:"药学基础理论与药物发展史。" },
    { id:"litsearch", name:"文献检索", credit:2, day:"周三", time:"10:00-11:40", place:"图书馆305", desc:"文献数据库检索与论文写作。" },
    { id:"biochem",   name:"生物化学", credit:3, day:"周四", time:"14:00-15:40", place:"教学楼205", desc:"蛋白质、酶、核酸与代谢途径。" },
    { id:"mental",    name:"心理健康", credit:1, day:"周四", time:"16:00-17:40", place:"教学楼301", desc:"心理健康知识与自我调适。" },
    { id:"medchem",   name:"药物化学", credit:3, day:"周五", time:"08:00-09:40",  place:"实验楼203", desc:"药物合成、构效关系与新药研发。" }
  ];
  const MAX_PER_TERM = 3;

  const SHOP_ITEMS = [
    { id:"pill",   name:"感冒药", icon:"💊", price:5,     type:"consume",   desc:"感冒时吃，健康+20" },
    { id:"coffee", name:"咖啡券", icon:"☕", price:3,     type:"consume",   desc:"喝一杯，心情+10" },
    { id:"gift",   name:"小礼物", icon:"🎁", price:15,    type:"consume",   desc:"送人可增加亲密度" },
    { id:"book",   name:"参考书", icon:"📚", price:50,    type:"permanent", desc:"拥有越多，学习效率越高" },
    { id:"guitar", name:"吉他",   icon:"🎸", price:200,   type:"permanent", desc:"练琴用" },
    { id:"bike",   name:"自行车", icon:"🚲", price:1000,  type:"permanent", desc:"装配后移动省体力" },
    { id:"ring",   name:"银戒指", icon:"💍", price:20000, type:"permanent", desc:"送人的礼物" }
  ];

  const REF_BOOKS = [
    { title:"有机化学基础", desc:"系统介绍有机化合物的命名、结构与反应机理。",
      topics:["IUPAC命名规则","亲核取代反应（SN1/SN2）","芳香性判据（Hückel规则）"] },
    { title:"药物分析导论", desc:"介绍药物质量控制的基本方法，包括容量分析、色谱与光谱分析。",
      topics:["高效液相色谱（HPLC）原理","紫外-可见分光光度法","药物含量测定方法学验证"] },
    { title:"生物化学原理", desc:"阐述蛋白质、酶、核酸与代谢途径的化学本质。",
      topics:["米氏方程与酶抑制类型","蛋白质二级结构（α-螺旋/β-折叠）","糖酵解与三羧酸循环"] },
    { title:"药物化学纲要", desc:"围绕药物合成、构效关系与新药研发，介绍常见药物分子的设计思路。",
      topics:["构效关系（SAR）","前药设计原理","靶点结合与选择性"] },
    { title:"药理学基础", desc:"系统介绍药物作用机制、药效学与药代动力学。",
      topics:["受体激动剂与拮抗剂","药代动力学（ADME）","治疗窗与半衰期"] }
  ];

  let footerBtn = null;

  function getContent() { return document.getElementById("pc-content"); }

  function setFooter(text, handler) {
    if (!footerBtn) footerBtn = document.getElementById("pc-footer-btn");
    if (!footerBtn) return;
    footerBtn.textContent = text;
    footerBtn.onclick = handler;
  }

  function closePC() {
    document.getElementById("modal-pc").classList.add("hidden");
  }

  /* ==================== 事件委托 ==================== */
  document.addEventListener("click", function (e) {
    const modal = document.getElementById("modal-pc");
    if (!modal || modal.classList.contains("hidden")) return;

    const buyBtn = e.target.closest(".buy-btn");
    if (buyBtn) return handleBuy(buyBtn);

    const useBtn = e.target.closest(".use-btn");
    if (useBtn) return handleUse(useBtn);

    const bikeBtn = e.target.closest(".bike-btn");
    if (bikeBtn) return handleBike();

    const enrollBtn = e.target.closest(".enroll-btn");
    if (enrollBtn) return handleEnroll(enrollBtn);

    const giftBtn = e.target.closest(".gift-btn");
    if (giftBtn) return handleGift(giftBtn);

    const receiveBtn = e.target.closest(".receive-btn");
    if (receiveBtn) return handleReceive(receiveBtn);

    const mailItem = e.target.closest(".mail-item");
    if (mailItem && !e.target.closest("button")) return handleMail(mailItem);

    const poemItem = e.target.closest(".poem-item");
    if (poemItem) return handlePoem(poemItem);
  });

  /* ==================== 主界面 ==================== */
  function openMain() {
    document.getElementById("modal-pc").classList.remove("hidden");
    const d = WF.State.data;
    const content = getContent();
    if (WF.State.unlockAchievement("first_pc")) {
      const ach = WF.Achievements.get("first_pc");
      if (ach) WF.Toast.achieve(`解锁成就：${ach.name}\n${ach.desc}`);
    }
    content.innerHTML = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <button class="ap-btn" id="pc-mail">邮箱</button>
        <button class="ap-btn" id="pc-research">研究资料</button>
        <button class="ap-btn" id="pc-schedule">课表</button>
        <button class="ap-btn" id="pc-scholarship">奖学金申请</button>
        <button class="ap-btn" id="pc-poems" style="display:none">诗集</button>
        <button class="ap-btn" id="pc-shop">商城</button>
        <button class="ap-btn" id="pc-bag">背包</button>
      </div>`;
    if (WF.Poems && WF.Poems.isUnlocked && WF.Poems.isUnlocked()) {
      const pb = document.getElementById("pc-poems");
      if (pb) pb.style.display = "";
    }
    setFooter("关闭", closePC);
    document.getElementById("pc-mail").onclick = openMail;
    document.getElementById("pc-research").onclick = openResearch;
    document.getElementById("pc-schedule").onclick = openSchedule;
    document.getElementById("pc-scholarship").onclick = openScholarship;
    document.getElementById("pc-shop").onclick = openShop;
    document.getElementById("pc-bag").onclick = openBag;
    const pb = document.getElementById("pc-poems");
    if (pb) pb.onclick = openPoems;
  }

  /* ==================== 奖学金申请 ==================== */
  function openScholarship() {
    const d = WF.State.data;
    const applied = WF.State.getFlag("applied_scholarship");

    let html = `<div style="height:430px;overflow-y:auto;padding:15px">
      <h3 style="margin-top:0">奖学金申请</h3>
      <div style="background:#f0f7ff;padding:14px;border-radius:8px;margin-bottom:15px;font-size:13px;color:#666;line-height:1.9">
        <div><b>面向对象：</b>大一新生</div>
        <div><b>申请时间：</b>每学期开学后一周内</div>
        <div><b>申请条件：</b>无（欢迎所有新生申请）</div>
        <div><b>结果时间：</b>申请后约 7 天</div>
      </div>`;

    if (!applied) {
      html += `<p style="color:#444;font-size:14px;line-height:1.9">奖学金办公室现在开放申请。点击下方按钮提交申请。</p>
        <button class="ap-btn" id="apply-scholarship" style="margin-top:12px;padding:10px 24px">提交申请</button>`;
    } else {
      html += `<p style="color:#4caf50;font-size:14px;line-height:1.9">✓ 已提交申请，等待审核。</p>
        <p style="color:#999;font-size:13px;margin-top:10px">结果会发到你的邮箱，请留意「奖学金办公室」的邮件。</p>`;
    }
    html += `</div>`;
    getContent().innerHTML = html;
    setFooter("返回", openMain);

    const applyBtn = document.getElementById("apply-scholarship");
    if (applyBtn) {
      applyBtn.onclick = () => {
        WF.State.flag("applied_scholarship", true);
        WF.State.data.applyScholarshipDay = WF.State.data.day;
        WF.Toast.show("已提交奖学金申请");
        openScholarship();
      };
    }
  }

  /* ==================== 邮箱 ==================== */
  function openMail() {
    const d = WF.State.data;
    if (WF.Emails && WF.Emails.refreshOwned) WF.Emails.refreshOwned();

    // 奖学金结果结算
    if (WF.State.getFlag("applied_scholarship") && !WF.State.getFlag("scholarship_result")) {
      const applyDay = d.applyScholarshipDay || d.day;
      if (d.day - applyDay >= 7) {
        let amount = 200;
        let level = "普通";
        if (d.iq >= 90) { amount = 1000; level = "一等"; }
        else if (d.iq >= 80) { amount = 500; level = "二等"; }
        else if (d.iq >= 60) { amount = 300; level = "三等"; }
        WF.State.flag("scholarship_result", true);
        WF.State.flag("scholarship_level", level);
        WF.State.flag("scholarship_amount", amount);
        d.money += amount;
        WF.Toast.show(`奖学金到账：${level}奖学金 ${amount} 元`);
      }
    }

    const emails = (WF.Emails && WF.Emails.owned) ? WF.Emails.owned() : [];
    let html = `<div style="height:430px;overflow-y:auto;padding:10px">
      <h3 style="margin-top:0">邮箱</h3>
      <p style="color:#999;font-size:13px">共 ${emails.length} 封邮件</p>
      <div style="display:flex;flex-direction:column;gap:10px">`;

    if (!emails.length) {
      html += `<p style="color:#999;font-size:13px;text-align:center;padding:40px 0">还没有收到任何邮件。</p>`;
    }

    emails.forEach(e => {
      const isRead = WF.Emails.isRead(e.id);
      const hasFile = e.hasFile && !d.poemsUnlocked;
      const received = e.hasFile && d.poemsUnlocked;
      html += `<div class="mail-item" data-mail-id="${e.id}" data-ach="${e.ach || ""}" style="background:${isRead ? "#f5f5f5" : "#eef6ff"};padding:12px;border-radius:6px;cursor:pointer;border-left:3px solid ${isRead ? "#999" : "#4a90d9"}">
        <div style="display:flex;justify-content:space-between">
          <span class="mail-from" style="font-weight:bold">${e.from}${isRead ? "" : ' <span class="unread-mark" style="color:#e24a4a;font-size:11px">·未读</span>'}</span>
          <span style="font-size:12px;color:#999">${e.date}</span>
        </div>
        <div style="font-size:14px;color:#333;margin:5px 0">${e.subject}</div>
        <div class="mail-body" style="display:none;margin-top:8px;padding-top:8px;border-top:1px solid #ddd;font-size:13px;color:#666;line-height:1.6">${e.body}
          ${hasFile ? `<button class="ap-btn small receive-btn" style="margin-top:10px">📎 接收文件</button>` : ""}
          ${received ? `<button class="ap-btn small" style="margin-top:10px;opacity:0.6" disabled>✓ 已接收</button>` : ""}
        </div>
      </div>`;
    });
    html += `</div></div>`;
    getContent().innerHTML = html;
    setFooter("返回", openMain);
  }

  function handleMail(item) {
    const body = item.querySelector(".mail-body");
    if (!body) return;
    const mailId = item.dataset.mailId;
    if (body.style.display === "none" || !body.style.display) {
      body.style.display = "block";
      item.style.background = "#e8f0fe";
      item.style.borderLeft = "3px solid #999";
      if (mailId && WF.Emails && WF.Emails.markRead) WF.Emails.markRead(mailId);
      const unreadMark = item.querySelector(".unread-mark");
      if (unreadMark) unreadMark.remove();
      const achId = item.dataset.ach;
      if (achId && WF.State.unlockAchievement(achId)) {
        const ach = WF.Achievements.get(achId);
        if (ach) WF.Toast.achieve(`解锁成就：${ach.name}\n${ach.desc}`);
      }
    } else {
      body.style.display = "none";
      item.style.background = "#f5f5f5";
    }
  }

  function handleReceive(btn) {
    const d = WF.State.data;
    d.poemsUnlocked = true;
    if (WF.Poems && WF.Poems.unlock) WF.Poems.unlock();
    WF.Toast.show("已接收文件：诗集.pdf");
    btn.outerHTML = `<button class="ap-btn small" style="margin-top:10px;opacity:0.6" disabled>✓ 已接收</button>`;
    const pb = document.getElementById("pc-poems");
    if (pb) pb.style.display = "";
  }

  /* ==================== 研究资料 ==================== */
   /* ==================== 研究资料 / 学习笔记 ==================== */
  /* 前期（graduated=false）：展示已选课程的进度条 + 参考书 + 研究笔记
     后期（graduated=true） ：展示研发进度 + 参考书 + 研究笔记
     判断逻辑：优先看 d.graduated（剧本控制），兜底用 chapter >= 12 */
  function openResearch() {
    const d = WF.State.data;
    const ch = d.chapter || 1;
    const isResearchStage = d.graduated === true || ch >= 12;

    const books = (d.itemCounts && d.itemCounts.book) || 0;
    const notes = d.researchNotes || [];

    let html = `<div style="height:430px;overflow-y:auto;padding:10px">
      <h3 style="margin-top:0">${isResearchStage ? "研究资料" : "学习笔记"}</h3>`;

    /* ---------- 阶段判断 ---------- */
    if (isResearchStage) {
      /* 后期：研发进度 */
      const rp = d.researchProgress || 0;
      html += `<div style="background:#f0f7ff;padding:12px;border-radius:8px;margin-bottom:15px">
        <div style="font-size:13px;color:#666;margin-bottom:6px">研发进度（阶段 ${d.research.stage}）</div>
        <div style="height:10px;background:#e0e0e0;border-radius:5px;overflow:hidden;margin-bottom:6px">
          <div style="height:100%;width:${Math.min(100,rp)}%;background:#1976d2;border-radius:5px"></div>
        </div>
        <div style="font-size:22px;font-weight:bold;color:#1976d2">${rp}%</div>
      </div>`;
    } else {
      /* 前期：已选课程进度 */
      const enrolled = d.courses || [];
      html += `<h4 style="margin:10px 0 8px">📚 课程学习进度</h4>`;
      if (!enrolled.length) {
        html += `<p style="color:#999;font-size:13px">还没有选课。打开电脑 → 课表选课。</p>`;
      } else {
        html += `<div style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px">`;
        enrolled.forEach(cid => {
          const name = WF.Course ? WF.Course.getCourseName(cid) : cid;
          const pct = d.courseProgress[cid] || 0;
          const full = pct >= 100;
          html += `<div style="background:${full ? "#fff4d6" : "#f0f7ff"};padding:10px 12px;border-radius:8px;border:1px solid ${full ? "#e6ddc6" : "#d9e7f5"}">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">
              <span style="font-weight:600;color:#333">${name}</span>
              <span style="font-size:12px;color:${full ? "#c9a96e" : "#1976d2"};font-weight:bold">${pct}%${full ? " · 已满" : ""}</span>
            </div>
            <div style="height:8px;background:#e0e0e0;border-radius:4px;overflow:hidden">
              <div style="height:100%;width:${Math.min(100,pct)}%;background:${full ? "#c9a96e" : "linear-gradient(90deg,#4a90d9,#5aa0e9)"};border-radius:4px"></div>
            </div>
          </div>`;
        });
        html += `</div>`;
      }
      /* 预留研发进度入口（后期切换时自然会显示） */
    }

    /* ---------- 参考书 ---------- */
    html += `<h4 style="margin:18px 0 8px">📚 参考书（已拥有 ${books} 本）</h4>`;
    if (books === 0) {
      html += `<p style="color:#999;font-size:13px">还没有参考书。去商城买几本吧，买一本解锁一本。</p>`;
    } else {
      html += `<div style="display:flex;flex-direction:column;gap:12px">`;
      for (let i = 0; i < Math.min(books, REF_BOOKS.length); i++) {
        const book = REF_BOOKS[i];
        html += `<div style="background:#faf8f2;border:1px solid #e8dfc8;border-radius:8px;padding:12px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
            <span style="font-weight:bold;color:#5a4a3a">第 ${i+1} 本 · ${book.title}</span>
            <span style="font-size:11px;background:#c9a96e;color:#fff;padding:2px 8px;border-radius:8px">已解锁</span>
          </div>
          <div style="font-size:13px;color:#666;line-height:1.6;margin-bottom:8px">${book.desc}</div>
          <div style="font-size:12px;color:#555;line-height:1.8">
            <div style="font-weight:600;color:#7a6a4a;margin-bottom:3px">· 主要内容</div>
            ${book.topics.map(t=>`<div style="padding-left:10px">— ${t}</div>`).join("")}
          </div>
        </div>`;
      }
      html += `</div>`;
      if (books > REF_BOOKS.length) {
        html += `<p style="color:#999;font-size:12px;margin-top:8px">还有 ${books - REF_BOOKS.length} 本参考资料待整理中……</p>`;
      }
    }

    /* ---------- 研究笔记 ---------- */
    html += `<h4 style="margin:18px 0 8px">📒 研究笔记</h4>`;
    if (!notes.length) {
      html += `<p style="color:#999;font-size:13px">还没有笔记，做实验 / 查资料可解锁。</p>`;
    } else {
      html += `<div style="display:flex;flex-direction:column;gap:6px">`;
      notes.forEach(n => {
        html += `<div style="background:#fff;border:1px solid #eee;border-radius:6px;padding:8px 10px;font-size:13px;line-height:1.6">${n}</div>`;
      });
      html += `</div>`;
    }

    html += `</div>`;
    getContent().innerHTML = html;
    setFooter("返回", openMain);
  }

  /* ==================== 课表 / 选课 ==================== */
  function openSchedule() {
    const d = WF.State.data;
    if (!d.courses) d.courses = [];
    if (!d.courseProgress) d.courseProgress = {};
    if (!d.courseTerm) d.courseTerm = {};
    const enrolled = d.courses;
    const canEnroll = enrolled.length < MAX_PER_TERM;

    let html = `<div style="height:450px;overflow-y:auto;padding:10px">
      <h3 style="margin-top:0">课表 · 选课</h3>
      <div style="background:#eef6ff;border-left:3px solid #4a90d9;padding:10px 14px;border-radius:0 6px 6px 0;font-size:12px;color:#555;line-height:1.8;margin:10px 0">
        <b style="color:#4a90d9">学习规则</b><br>
        · 每学期最多选 <b>3</b> 门课<br>
        · 每天最多上 <b>4</b> 节课（游戏内教室上课）<br>
        · 每门课进度满 <b>100%</b> 后，可继续上转为"额外学习"<br>
        · 学期末考试：<b>进度 &lt; 80</b> 算挂科<br>
        · 挂科会<b>拖慢大三研发进度</b>，并<b>减少研发资金</b><br>
        · 学期划分：大一上（1-100天）· 大一下（101-200天）· 大二上（201-300天）· 大二下（301-400天）· 大三上（401-500天）· 大三下（501-600天）· 大四（601-700天）
      </div>
      <p style="color:#666;font-size:13px;margin:2px 0 12px">${d.term}　已选 <span id="sched-count">${enrolled.length}</span>/${MAX_PER_TERM} 门</p>
      <h4 style="margin:10px 0 8px">📚 已选课程（按学习顺序）</h4>
      <div id="enrolled-list">${renderEnrolledList()}</div>
      <h4 style="margin:16px 0 8px">📖 可选课程</h4><div style="display:flex;flex-direction:column;gap:8px">`;
    SUBJECTS.forEach(s => {
      const already = enrolled.includes(s.id);
      let right, dim = "";
      if (already) right = `<span style="color:#4caf50;font-size:13px">✓ 已选</span>`;
      else if (canEnroll) right = `<button class="ap-btn small enroll-btn" data-id="${s.id}">选修</button>`;
      else { right = `<span style="color:#bbb;font-size:12px">名额已满</span>`; dim = "opacity:.5;"; }
      html += `<div id="course-row-${s.id}" style="background:#fff;padding:10px;border-radius:7px;border:1px solid #e6e6e6;display:flex;justify-content:space-between;align-items:center;${dim}">
        <div>
          <div style="font-weight:bold">${s.name} <span style="font-size:11px;color:#999;font-weight:normal">${s.credit}学分 · ${s.day} ${s.time}</span></div>
          <div style="font-size:12px;color:#999;margin-top:2px">${s.place} · ${s.desc}</div>
        </div>
        <div class="course-right">${right}</div>
      </div>`;
    });
    html += `</div></div>`;
    getContent().innerHTML = html;
    setFooter("返回", openMain);
  }

  function renderEnrolledList() {
    const d = WF.State.data;
    const enrolled = d.courses || [];
    if (!enrolled.length) {
      return `<p style="color:#999;font-size:13px">还没选课，从下面选修第一门。</p>`;
    }
    let html = `<div style="display:flex;flex-direction:column;gap:10px">`;
    enrolled.forEach((cid, idx) => {
      const s = SUBJECTS.find(x => x.id === cid);
      if (!s) return;
      const pct = d.courseProgress[cid] || 0;
      const grade = d.courseGrade && d.courseGrade[cid];
      const failed = d.failedCourses && d.failedCourses.includes(cid);
      const gradeTag = grade !== undefined
        ? `<span style="font-size:11px;background:${failed ? "#ffcdd2" : "#c8e6c9"};color:${failed ? "#c62828" : "#2e7d32"};padding:2px 8px;border-radius:10px;margin-left:6px">${grade}分 ${failed ? "挂科" : "通过"}</span>`
        : "";
      const progressBg = pct >= 100 ? "#fff4d6" : "#e8f5e9";
      const progressBorder = pct >= 100 ? "#c9a96e" : "#4caf50";
      const progressFill = pct >= 100 ? "#c9a96e" : "#4caf50";
      html += `<div style="background:${progressBg};padding:11px;border-radius:8px;border-left:3px solid ${progressBorder}">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span style="font-weight:bold">${idx+1}. ${s.name}</span>
          <span style="font-size:12px;background:#c8e6c9;color:#2e7d32;padding:2px 8px;border-radius:10px">${s.credit}学分</span>${gradeTag}
        </div>
        <div style="height:8px;background:#d7ecd9;border-radius:4px;overflow:hidden;margin:7px 0 4px">
          <div style="height:100%;width:${Math.min(100, pct)}%;background:${progressFill};border-radius:4px"></div>
        </div>
        <div style="font-size:12px;color:#555">进度 ${pct}%${pct >= 100 ? " · 已满" : ""}　${s.day} · ${s.time} · ${s.place}</div>
        <div style="font-size:12px;color:#777;margin-top:3px;line-height:1.5">${s.desc}</div>
      </div>`;
    });
    html += `</div>`;
    return html;
  }

  function handleEnroll(btn) {
    const d = WF.State.data;
    const id = btn.dataset.id;
    if (d.courses.includes(id)) return;
    if (d.courses.length >= MAX_PER_TERM) { WF.Toast.show("本学期最多选 " + MAX_PER_TERM + " 门"); return; }
    d.courses.push(id);
    d.courseProgress[id] = 0;
    d.courseTerm[id] = d.term;
    WF.Toast.show("已选修，学习顺序第 " + d.courses.length + " 位");

    const countEl = document.getElementById("sched-count");
    if (countEl) countEl.textContent = d.courses.length;

    const listEl = document.getElementById("enrolled-list");
    if (listEl) listEl.innerHTML = renderEnrolledList();

    const courseRow = document.getElementById("course-row-" + id);
    if (courseRow) {
      const rightEl = courseRow.querySelector(".course-right");
      if (rightEl) rightEl.innerHTML = `<span style="color:#4caf50;font-size:13px">✓ 已选</span>`;
    }

    if (d.courses.length >= MAX_PER_TERM) {
      SUBJECTS.forEach(s => {
        if (d.courses.includes(s.id)) return;
        const row = document.getElementById("course-row-" + s.id);
        if (!row) return;
        row.style.opacity = "0.5";
        const rightEl = row.querySelector(".course-right");
        if (rightEl) rightEl.innerHTML = `<span style="color:#bbb;font-size:12px">名额已满</span>`;
      });
    }
  }

  /* ==================== 诗集 ==================== */
  function openPoems() {
    if (!WF.Poems || !WF.Poems.isUnlocked || !WF.Poems.isUnlocked()) {
      getContent().innerHTML = `<div style="padding:20px"><h3>诗集</h3><p style="color:#999;text-align:center;padding:40px 0">这里好像空的……</p></div>`;
      setFooter("返回", openMain);
      return;
    }
    renderPoemList();
  }

  function renderPoemList() {
    const poems = WF.Poems.list();
    let html = `<div style="height:450px;display:flex;flex-direction:column">
      <h3 style="margin:0 0 10px 0">苏挽月的诗集</h3>
      <div style="flex:1;overflow-y:auto;padding-right:5px">`;
    poems.forEach((p, i) => {
      html += `<div class="poem-item" data-idx="${i}" style="padding:12px;margin-bottom:8px;background:#faf5eb;border-radius:8px;cursor:pointer;border-left:3px solid #c9a96e">
        <div style="font-size:15px;font-weight:bold;color:#5a4a3a">${p.title}</div>
        <div style="font-size:12px;color:#999;margin-top:3px">${p.time}</div>
      </div>`;
    });
    html += `</div></div>`;
    getContent().innerHTML = html;
    setFooter("返回", openMain);
  }

  function handlePoem(item) {
    const idx = parseInt(item.dataset.idx);
    const poem = WF.Poems.list()[idx];
    if (!poem) return;
    let html = `<div style="height:450px;display:flex;flex-direction:column">
      <h3 style="margin:0 0 5px 0">${poem.title}</h3>
      <div style="font-size:12px;color:#999;margin-bottom:10px">${poem.time}</div>
      <div style="flex:1;overflow-y:auto;padding:15px;background:#fdfaf3;border-radius:8px;line-height:2;font-size:14px;color:#4a4035">`;
    poem.content.forEach(line => {
      html += `<div style="margin-bottom:4px">${line}</div>`;
    });
    html += `</div>
      <div style="margin-top:10px;padding:10px;background:#f5efe0;border-radius:6px;font-size:12px;color:#7a6a5a;line-height:1.6">
        <strong>解读：</strong>${poem.interpretation}
      </div>
    </div>`;
    getContent().innerHTML = html;
    setFooter("返回", renderPoemList);
  }

  /* ==================== 商城 ==================== */
  function openShop() {
    const d = WF.State.data;
    let html = `<div style="height:430px;overflow-y:auto;padding:10px">
      <h3 style="margin-top:0">商城</h3>
      <p style="color:#999;font-size:13px">我的金钱：<span id="shop-money" style="color:#1976d2;font-weight:600">${d.money}</span> 元</p>
      <div style="display:flex;flex-direction:column;gap:10px">`;
    SHOP_ITEMS.forEach(item => {
      html += `<div id="shop-item-${item.id}" style="background:#fff;padding:12px;border-radius:8px;border:1px solid #e0e0e0;display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:18px">${item.icon} ${item.name}</div>
          <div style="font-size:12px;color:#999;margin-top:4px">${item.desc}</div>
        </div>
        <div style="text-align:right">
          <div style="color:#ff9800;font-weight:bold">${item.price}元</div>
          <div class="buy-btn-wrapper" style="margin-top:5px">${renderBuyBtn(item)}</div>
        </div>
      </div>`;
    });
    html += `</div></div>`;
    getContent().innerHTML = html;
    setFooter("返回", openMain);
  }

  function renderBuyBtn(item) {
    const d = WF.State.data;
    const owned = d.inventory && d.inventory[item.id];
    const count = (d.itemCounts && d.itemCounts[item.id]) || 0;
    if (item.id === "book") {
      return `<button class="ap-btn small buy-btn" data-id="${item.id}">购买</button>`;
    }
    if (item.type === "permanent" && owned) {
      return `<button class="ap-btn small" style="opacity:0.5;cursor:default" disabled>已拥有</button>`;
    }
    if (item.type === "consume" && owned) {
      return `<button class="ap-btn small buy-btn" data-id="${item.id}">购买（已有 ${count}）</button>`;
    }
    return `<button class="ap-btn small buy-btn" data-id="${item.id}">购买</button>`;
  }

  function handleBuy(btn) {
    const d = WF.State.data;
    const id = btn.dataset.id;
    const item = SHOP_ITEMS.find(x => x.id === id);
    if (!item) return;
    if (d.money < item.price) { WF.Toast.show("金钱不足！"); return; }
    d.money -= item.price;
    if (!d.inventory) d.inventory = {};
    if (!d.itemCounts) d.itemCounts = {};
    d.itemCounts[id] = (d.itemCounts[id] || 0) + 1;
    d.inventory[id] = true;
    if (id === "book") {
      WF.Toast.show("购买成功！已拥有参考书 " + d.itemCounts[id] + " 本");
    } else {
      WF.Toast.show("购买成功！");
    }
    WF.eventbus.emit("hud-update");
    const moneyEl = document.getElementById("shop-money");
    if (moneyEl) moneyEl.textContent = d.money;
    const row = document.getElementById("shop-item-" + id);
    if (row) {
      const wrapper = row.querySelector(".buy-btn-wrapper");
      if (wrapper) wrapper.innerHTML = renderBuyBtn(item);
    }
  }

  /* ==================== 背包 ==================== */
  function openBag() {
    const d = WF.State.data;
    let html = `<div style="height:430px;overflow-y:auto;padding:15px">
      <h3 style="margin-top:0">背包</h3>
      <div style="background:#f0f7ff;padding:12px;border-radius:8px;margin-bottom:15px;display:flex;justify-content:space-between">
        <span>💰 现金</span>
        <span id="bag-money" style="font-weight:bold;color:#1976d2">${d.money} 元</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px">`;
    SHOP_ITEMS.forEach(item => {
      html += `<div id="bag-item-${item.id}" style="background:#fff;padding:12px;border-radius:8px;border:1px solid #e0e0e0;display:flex;justify-content:space-between;align-items:center">
        <div style="display:flex;align-items:center;gap:10px">
          <span style="font-size:24px">${item.icon}</span>
          <div>
            <div style="font-weight:bold">${item.name}</div>
            <div style="font-size:12px;color:#999">${item.desc}</div>
          </div>
        </div>
        <div class="bag-right">${renderBagRight(item)}</div>
      </div>`;
    });
    html += `</div></div>`;
    getContent().innerHTML = html;
    setFooter("返回", openMain);
  }

  function renderBagRight(item) {
    const d = WF.State.data;
    const owned = d.inventory && d.inventory[item.id];
    const count = (d.itemCounts && d.itemCounts[item.id]) || 0;
    if (!owned) return `<span style="color:#ccc">未拥有</span>`;
    if (item.type === "consume") {
      return `<div style="display:flex;align-items:center;gap:8px">
        <span style="color:#999;font-size:13px">×${count}</span>
        <button class="ap-btn small use-btn" data-id="${item.id}">使用</button>
      </div>`;
    }
    if (item.id === "bike") {
      const equipped = d.bikeEquipped;
      return `<button class="ap-btn small bike-btn">${equipped ? "卸下" : "装配"}</button>`;
    }
    if (item.id === "book") {
      return `<span style="color:#4caf50;font-size:13px">×${count} 本</span>`;
    }
    return `<span style="color:#4caf50;font-size:13px">已拥有</span>`;
  }

  function handleUse(btn) {
    const d = WF.State.data;
    const id = btn.dataset.id;
    if ((d.itemCounts[id] || 0) <= 0) { WF.Toast.show("数量不足"); return; }
    if (id === "gift") {
      openGiftSelect();
      return;
    }
    if (id === "pill") {
      d.health = Math.min(100, d.health + 20);
      d.mood = Math.min(100, d.mood + 5);
      WF.Toast.show("吃了感冒药，健康+20 心情+5");
    } else if (id === "coffee") {
      d.mood = Math.min(100, d.mood + 10);
      WF.Toast.show("喝了咖啡，心情+10");
    }
    d.itemCounts[id] -= 1;
    if (d.itemCounts[id] <= 0) {
      delete d.inventory[id];
      delete d.itemCounts[id];
    }
    WF.eventbus.emit("hud-update");
    const item = SHOP_ITEMS.find(x => x.id === id);
    const row = document.getElementById("bag-item-" + id);
    if (row && item) {
      const right = row.querySelector(".bag-right");
      if (right) right.innerHTML = renderBagRight(item);
    }
  }

  function handleBike() {
    const d = WF.State.data;
    d.bikeEquipped = !d.bikeEquipped;
    WF.Toast.show(d.bikeEquipped ? "自行车已装配，移动更省体力" : "自行车已卸下");
    WF.eventbus.emit("hud-update");
    const row = document.getElementById("bag-item-bike");
    if (row) {
      const right = row.querySelector(".bag-right");
      const item = SHOP_ITEMS.find(x => x.id === "bike");
      if (right && item) right.innerHTML = renderBagRight(item);
    }
  }

  /* ==================== 送礼物 ==================== */
  function openGiftSelect() {
    const d = WF.State.data;
    const met = WF.Characters.socialList().filter(c => WF.State.peopleOf(c.id).met);
    if (!met.length) {
      WF.Toast.show("还没有认识的人，先认识一些人吧。");
      return;
    }
    const remain = (d.itemCounts && d.itemCounts.gift) || 0;
    let html = `<div style="height:430px;overflow-y:auto;padding:15px">
      <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px">
        <h3 style="margin:0">送礼物</h3>
        <span style="font-size:13px;color:#999">剩余礼物：<span id="gift-remain" style="color:#e0a52e;font-weight:bold">${remain}</span> 个</span>
      </div>
      <p style="color:#999;font-size:13px;margin-top:0">选择一个对象，每送一份小礼物，亲密度 +5。</p>
      <div style="display:flex;flex-direction:column;gap:10px;margin-top:12px">`;
    met.forEach(c => {
      const p = WF.State.peopleOf(c.id);
      html += `<div class="gift-row" data-id="${c.id}" style="background:#fff;padding:12px;border-radius:8px;border:1px solid #e0e0e0;display:flex;justify-content:space-between;align-items:center">
        <div style="display:flex;align-items:center;gap:10px">
          <span style="width:36px;height:36px;border-radius:50%;background:${c.color};color:#fff;display:flex;align-items:center;justify-content:center;font-size:14px">${c.portrait}</span>
          <div>
            <div style="font-weight:bold">${c.name}</div>
            <div class="gift-intimacy" style="font-size:12px;color:#999">亲密度 ${p.intimacy}</div>
          </div>
        </div>
        <button class="ap-btn small gift-btn" data-id="${c.id}"${remain <= 0 ? " disabled style='opacity:0.5;cursor:default'" : ""}>送礼物</button>
      </div>`;
    });
    html += `</div></div>`;
    getContent().innerHTML = html;
    setFooter("返回", openBag);
  }

  function handleGift(btn) {
    const d = WF.State.data;
    const id = btn.dataset.id;
    if ((d.itemCounts.gift || 0) <= 0) { WF.Toast.show("礼物已用完"); return; }
    d.itemCounts.gift -= 1;
    if (d.itemCounts.gift <= 0) {
      delete d.inventory.gift;
      delete d.itemCounts.gift;
    }
    WF.State.addIntimacy(id, 5);
    const c = WF.Characters.get(id);
    WF.Toast.show(`送给 ${c.name} 一份小礼物，亲密度 +5`);
    const remain = (d.itemCounts && d.itemCounts.gift) || 0;
    const remainEl = document.getElementById("gift-remain");
    if (remainEl) remainEl.textContent = remain;
    const row = document.querySelector(`.gift-row[data-id="${id}"]`);
    if (row) {
      const p = WF.State.peopleOf(id);
      const intEl = row.querySelector(".gift-intimacy");
      if (intEl) intEl.textContent = "亲密度 " + p.intimacy;
    }
    if (remain <= 0) {
      document.querySelectorAll(".gift-btn").forEach(b => {
        b.disabled = true;
        b.style.opacity = "0.5";
        b.style.cursor = "default";
      });
    }
  }

  WF.PCView = { open: openMain, openMain };
})();