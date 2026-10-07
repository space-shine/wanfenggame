/* ============================================================
   DialogueView · 旁白 / 对话 / 选项 渲染
   - 打字机效果（速度受设置控制）
   - 点击/按键推进；选项出现时等待选择
   ============================================================ */
(function () {
  "use strict";
  const WF = window.WF || (window.WF = {});

  const el = {
    area:     document.getElementById("dialogue-area"),
    narrationBox: document.getElementById("narration-box"),
    narrationText: document.getElementById("narration-text"),
    dialogueBox: document.getElementById("dialogue-box"),
    speakerName: document.getElementById("speaker-name"),
    speakerPortrait: document.getElementById("speaker-portrait"),
    dialogueText: document.getElementById("dialogue-text"),
    choiceBox: document.getElementById("choice-box"),
    hint: document.getElementById("continue-hint")
  };

  let typeTimer = null;
  let typing = false;
  let fullText = "";
  let onTypedDone = null;
  let textSpeed = 60;           // 0-100
  let waitingChoice = false;

  function typeInto(target, text, done) {
    clearInterval(typeTimer);
    fullText = text;
    target.textContent = "";
    typing = true;
    onTypedDone = done;
    el.hint.classList.add("hidden");

    // 速度 100 => 间隔 8ms；0 => 间隔 90ms
    const interval = Math.max(8, 90 - textSpeed * 0.82);
    let i = 0;
    typeTimer = setInterval(() => {
      i++;
      target.textContent = text.slice(0, i);
      if (i >= text.length) finishTyping();
    }, interval);
  }

  function finishTyping() {
    clearInterval(typeTimer);
    typing = false;
    if (el.dialogueText.textContent !== fullText) { /* narration target */ }
    // 确保完整
    if (el.narrationBox.classList.contains("hidden") === false) el.narrationText.textContent = fullText;
    else el.dialogueText.textContent = fullText;
    el.hint.classList.remove("hidden");
    const cb = onTypedDone; onTypedDone = null;
    cb && cb();
  }

  /** 立即显示完整文本（点击加速） */
  function skipTyping() {
    if (!typing) return false;
    clearInterval(typeTimer);
    typing = false;
    if (!el.narrationBox.classList.contains("hidden")) el.narrationText.textContent = fullText;
    else el.dialogueText.textContent = fullText;
    el.hint.classList.remove("hidden");
    const cb = onTypedDone; onTypedDone = null;
    cb && cb();
    return true;
  }

  WF.DialogueView = {
    setTextSpeed(v) { textSpeed = v; },

    showArea(show) { el.area.classList.toggle("hidden", !show); },

    showNarration(text, done) {
      waitingChoice = false;
      el.dialogueBox.classList.add("hidden");
      el.choiceBox.classList.add("hidden");
      el.choiceBox.innerHTML = "";
      el.narrationBox.classList.remove("hidden");
      typeInto(el.narrationText, text, done);
    },

    showDialogue(speaker, portrait, text, done) {
      waitingChoice = false;
      el.narrationBox.classList.add("hidden");
      el.choiceBox.classList.add("hidden");
      el.choiceBox.innerHTML = "";
      el.dialogueBox.classList.remove("hidden");
      el.speakerName.textContent = speaker || "";
      el.speakerPortrait.textContent = portrait || "·";
      typeInto(el.dialogueText, text, done);
    },

    /** 渲染选项；onSelect(option) */
    showChoices(options, onSelect) {
      waitingChoice = true;
      el.hint.classList.add("hidden");
      el.narrationBox.classList.add("hidden");
      el.dialogueBox.classList.add("hidden");
      el.choiceBox.classList.remove("hidden");
      el.choiceBox.innerHTML = "";

      options.forEach(opt => {
        const b = document.createElement("button");
        b.className = "choice-btn" + (opt.locked ? " locked" : "");
        b.textContent = opt.text;
        b.disabled = !!opt.locked;
        b.addEventListener("click", () => {
          if (waitingChoice === false) return;
          waitingChoice = false;
          el.choiceBox.classList.add("hidden");
          onSelect(opt);
        });
        el.choiceBox.appendChild(b);
      });
    },

    clear() {
      clearInterval(typeTimer);
      typing = false; waitingChoice = false;
      el.narrationBox.classList.add("hidden");
      el.dialogueBox.classList.add("hidden");
      el.choiceBox.classList.add("hidden");
      el.hint.classList.add("hidden");
    },

    isTyping() { return typing; },
    isWaitingChoice() { return waitingChoice; },
    skipTyping
  };
})();
