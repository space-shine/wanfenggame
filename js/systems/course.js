/* ============================================================
   Course · 学期 / 选课 / 考试系统
   - 每天最多上 4 次课
   - 学期末自动考试
   - 每门课 < 80 进度 = 挂科
   - 挂科惩罚：大三研发进度慢 + 资金少
   ============================================================ */
(function () {
  "use strict";
  const WF = window.WF || (window.WF = {});

  const MAX_DAILY_CLASSES = 4;
  const PASS_THRESHOLD = 80;
  const TERM_MAP = {
    "大一上": { end: 100 },
    "大一下": { end: 200 },
    "大二上": { end: 300 },
    "大二下": { end: 400 },
    "大三上": { end: 500 },
    "大三下": { end: 600 },
    "大四":   { end: 700 }
  };

  function getTermByDay(day) {
    if (day <= 100) return "大一上";
    if (day <= 200) return "大一下";
    if (day <= 300) return "大二上";
    if (day <= 400) return "大二下";
    if (day <= 500) return "大三上";
    if (day <= 600) return "大三下";
    return "大四";
  }

  function getTermEndDay(term) {
    return (TERM_MAP[term] && TERM_MAP[term].end) || 100;
  }

  WF.Course = {
    MAX_DAILY_CLASSES,
    PASS_THRESHOLD,
    getTermByDay,
    getTermEndDay,

    canStudyToday() {
      const d = WF.State.data;
      if (d.studyCountDay !== d.day) return true;
      return (d.studyCountToday || 0) < MAX_DAILY_CLASSES;
    },

    remainingToday() {
      const d = WF.State.data;
      if (d.studyCountDay !== d.day) return MAX_DAILY_CLASSES;
      return Math.max(0, MAX_DAILY_CLASSES - (d.studyCountToday || 0));
    },

    recordStudy() {
      const d = WF.State.data;
      if (d.studyCountDay !== d.day) {
        d.studyCountDay = d.day;
        d.studyCountToday = 0;
      }
      d.studyCountToday = (d.studyCountToday || 0) + 1;
    },

    /* 加课程进度，满了自动转额外学习 */
    addProgress(courseId, amount) {
      const d = WF.State.data;
      const cur = d.courseProgress[courseId] || 0;
      if (cur >= 100) {
        // 已满，加额外学习点数
        d.extraStudy = (d.extraStudy || 0) + Math.round(amount / 2);
        return { over: true, extra: Math.round(amount / 2) };
      }
      const add = Math.min(100 - cur, amount);
      d.courseProgress[courseId] = cur + add;
      const leftover = amount - add;
      if (leftover > 0) {
        d.extraStudy = (d.extraStudy || 0) + Math.round(leftover / 2);
      }
      return { over: false, progress: d.courseProgress[courseId], extra: leftover > 0 ? Math.round(leftover / 2) : 0 };
    },

    /* 学期末检查 */
    checkTermEnd() {
      const d = WF.State.data;
      Object.keys(TERM_MAP).forEach(term => {
        const endDay = TERM_MAP[term].end;
        if (d.day > endDay && !d.termEnded[term]) {
          this.examTerm(term);
          d.termEnded[term] = true;
        }
      });
    },

    /* 某学期考试 */
    examTerm(term) {
      const d = WF.State.data;
      const termCourses = Object.keys(d.courseTerm || {}).filter(cid => d.courseTerm[cid] === term);
      if (!termCourses.length) return;

      const results = [];
      let failed = 0;
      termCourses.forEach(cid => {
        const progress = d.courseProgress[cid] || 0;
        const grade = Math.round(progress);
        d.courseGrade[cid] = grade;
        const passed = progress >= PASS_THRESHOLD;
        results.push({ courseId: cid, grade, passed });
        if (!passed) {
          failed++;
          if (!d.failedCourses.includes(cid)) d.failedCourses.push(cid);
        }
      });

      // 弹窗显示成绩
      this.showExamResult(term, results, failed);
    },

    showExamResult(term, results, failed) {
      const overlay = document.createElement("div");
      overlay.style.cssText = "position:fixed;inset:0;z-index:999;background:rgba(20,28,24,.85);display:flex;align-items:center;justify-content:center;";
      let listHtml = "";
      results.forEach(r => {
        const name = this.getCourseName(r.courseId);
        const color = r.passed ? "#4caf50" : "#c62828";
        listHtml += `<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #eee">
          <span>${name}</span>
          <span style="color:${color};font-weight:bold">${r.grade} 分 ${r.passed ? "✓ 通过" : "✗ 挂科"}</span>
        </div>`;
      });
      const failMsg = failed > 0
        ? `<p style="color:#c62828;font-size:13px;margin-top:12px">挂科 ${failed} 门。大三研发进度与资金将受影响。</p>`
        : `<p style="color:#4caf50;font-size:13px;margin-top:12px">全部通过！</p>`;

      overlay.innerHTML = `
        <div style="background:#fbf8f1;padding:24px 28px;border-radius:16px;max-width:420px;width:92%;box-shadow:0 18px 50px rgba(0,0,0,.35)">
          <h3 style="margin:0 0 6px;color:#3a4a3a;text-align:center">${term} 期末考试</h3>
          <p style="color:#999;font-size:12px;margin:0 0 16px;text-align:center">通过门槛：80 分</p>
          <div style="font-size:14px;color:#333">${listHtml}</div>
          ${failMsg}
          <div style="text-align:center;margin-top:18px">
            <button class="ap-btn" id="exam-ok" style="padding:10px 32px">知道了</button>
          </div>
        </div>`;
      document.body.appendChild(overlay);
      overlay.querySelector("#exam-ok").onclick = () => overlay.remove();
    },

    getCourseName(id) {
      const map = {
        organic: "有机化学", english: "大学英语", analysis: "药物分析",
        pe: "体育", intro: "药学导论", litsearch: "文献检索",
        biochem: "生物化学", mental: "心理健康", medchem: "药物化学"
      };
      return map[id] || id;
    },

    /* 挂科惩罚系数
       - 大三大四研发阶段调用：每点研究进度增益 × speedMul
       - 大三大四科研资金发放：每次拨款 × fundMul
       - 目前未接入，仅预留接口，等大三大四章节实现时使用 */
    getPenalty() {
      const d = WF.State.data;
      const failCount = (d.failedCourses || []).length;
      return {
        failCount,
        speedMul: Math.max(0.5, 1 - failCount * 0.1),
        fundMul: Math.max(0.5, 1 - failCount * 0.15)
      };
    }
  };
})();