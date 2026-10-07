/* ============================================================
   PC · 邮件数据
   每封邮件独立 ID，按解锁条件逐步显示
   - unlockFlag: 需要某个 flag 才显示
   - unlockChapter: 需要章节数达到才显示
   - hasFile: 是否有附件
   ============================================================ */
(function () {
  "use strict";
  const WF = window.WF || (window.WF = {});

  const EMAILS = [
    { id: "mail_001", from: "教务处", subject: "开学通知", date: "9月1日",
      body: "各位同学：新学期开始，请按时报到。",
      unlockFlag: "at_campus" },

    { id: "mail_002", from: "奖学金办公室", subject: "奖学金申请已收到", date: "9月5日",
      body: "你提交的奖学金申请已收到，正在审核中。",
      unlockFlag: "applied_scholarship" },

    { id: "mail_002b", from: "奖学金办公室", subject: "奖学金审核结果", date: "9月12日",
      body: "你的奖学金申请已审核通过。具体等级与金额已发放至校园卡账户，请注意查收。",
      unlockFlag: "scholarship_result" },

    { id: "mail_003", from: "风的馈赠", subject: "匿名汇款", date: "9月10日",
      body: "汇款 500 元已到账。备注：风的馈赠。",
      unlockFlag: "first_gift_flag",
      ach: "first_gift" },

    { id: "mail_004", from: "药学院", subject: "实验室开放通知", date: "9月12日",
      body: "实验室每周二、四下午开放，凭学生证进入。",
      unlockFlag: "at_campus" },

    { id: "mail_005", from: "图书馆", subject: "借书提醒", date: "9月15日",
      body: "你有3本书即将到期，请及时归还。",
      unlockFlag: "at_campus" },

    { id: "mail_006", from: "学生会", subject: "社团招新", date: "9月18日",
      body: "各社团正在招新，欢迎报名参加。",
      unlockFlag: "at_campus" },

    { id: "mail_007", from: "苏挽月", subject: "一些旧东西", date: "终章",
      body: "这是我留下的一些东西，你看看吧。<br><br>附件：诗集.pdf",
      unlockChapter: 20,
      hasFile: true }
  ];

  WF.Emails = {
    list() { return EMAILS; },
    get(id) { return EMAILS.find(e => e.id === id); },

    shouldOwn(email) {
      if (email.unlockFlag) {
        return !!WF.State.getFlag(email.unlockFlag);
      }
      if (email.unlockChapter) {
        return (WF.State.data.chapter || 1) >= email.unlockChapter;
      }
      return true;
    },

    refreshOwned() {
      const d = WF.State.data;
      if (!d.ownedEmails) d.ownedEmails = [];
      EMAILS.forEach(e => {
        if (this.shouldOwn(e) && d.ownedEmails.indexOf(e.id) < 0) {
          d.ownedEmails.push(e.id);
        }
      });
      return d.ownedEmails;
    },

    owned() {
      const d = WF.State.data;
      const ids = d.ownedEmails || [];
      return EMAILS.filter(e => ids.indexOf(e.id) >= 0);
    },

    markRead(id) {
      const d = WF.State.data;
      if (!d.readMails) d.readMails = [];
      if (d.readMails.indexOf(id) < 0) d.readMails.push(id);
    },
    isRead(id) {
      const d = WF.State.data;
      return (d.readMails || []).indexOf(id) >= 0;
    }
  };
})();