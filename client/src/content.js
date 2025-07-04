// let chatHistory = JSON.parse(localStorage.getItem("chatHistory") || "[]");

let selectedText = "";
let chatHistory = JSON.parse(localStorage.getItem("chatHistory") || "[]");

document.addEventListener("mouseup", (e) => {
  const selection = window.getSelection();
  selectedText = selection?.toString().trim();
  if (selectedText) {
  localStorage.setItem("silentpass_selected", selectedText);
  }

  if (!selectedText) return;

  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  showSilentPassButton(rect);
});

function showSilentPassButton(rect) {
  removeAskGPTButton();

  const askBtn = document.createElement("div");
  askBtn.innerText = "🤖 SilentPass";
  askBtn.id = "ask-gpt-copy-float";
  askBtn.style.cssText = `
    position: absolute;
    top: ${rect.bottom + window.scrollY + 10}px;
    left: ${rect.right + window.scrollX + 10}px;
    background: rgba(30,30,30,0.4);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    color: white;
    padding: 6px 10px;
    font-size: 13px;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    z-index: 999999;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    transition: transform 0.2s ease;
  `;
  askBtn.onmouseenter = () => (askBtn.style.transform = "scale(1.05)");
  askBtn.onmouseleave = () => (askBtn.style.transform = "scale(1)");

  askBtn.onclick = () => {
    removeAskGPTButton();

    if (!document.getElementById("ai-chat-wrapper")) {
      createChatUI(); // You must define this
      setTimeout(() => injectTextToInput(), 200);
    } else {
      injectTextToInput();
    }
  };

  document.body.appendChild(askBtn);

  setTimeout(() => {
    window.addEventListener("scroll", removeAskGPTButton, { once: true });
    document.addEventListener("click", removeAskGPTButton, { once: true });
  }, 100);
}

function injectTextToInput() {
  const inputBox = document.getElementById("ai-input-box");
  const text = localStorage.getItem("silentpass_selected") || selectedText;

  if (inputBox && text) {
    inputBox.value = text;
    inputBox.focus();
    inputBox.style.height = "auto";
    inputBox.style.height = `${inputBox.scrollHeight}px`;
    showToast("📋 Text sent to GPT!");
  }
}


function removeAskGPTButton() {
  const oldBtn = document.getElementById("ask-gpt-copy-float");
  if (oldBtn) oldBtn.remove();
}

document.addEventListener("keydown", (e) => {
  const tag = e.target.tagName;
  const isInputActive =
    tag === "INPUT" || tag === "TEXTAREA" || e.target.isContentEditable;
  if (isInputActive) return;

  const wrapper = document.getElementById("ai-chat-wrapper");
  const movementAmount = 20;

  // 🎯 Move chat UI using arrow keys (Ctrl + ArrowKey)
  if (
    wrapper &&
    e.ctrlKey &&
    ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)
  ) {
    e.preventDefault();
    const currentTop = parseInt(
      wrapper.style.top || wrapper.getBoundingClientRect().top
    );
    const currentLeft = parseInt(
      wrapper.style.left || wrapper.getBoundingClientRect().left
    );

    if (e.key === "ArrowUp")
      wrapper.style.top = `${currentTop - movementAmount}px`;
    if (e.key === "ArrowDown")
      wrapper.style.top = `${currentTop + movementAmount}px`;
    if (e.key === "ArrowLeft")
      wrapper.style.left = `${currentLeft - movementAmount}px`;
    if (e.key === "ArrowRight")
      wrapper.style.left = `${currentLeft + movementAmount}px`;
  }

  // Ctrl + A => Clear chat
  if (e.ctrlKey && e.key.toLowerCase() === "a") {
    e.preventDefault();
    if (wrapper) wrapper.remove();
    chatHistory = [];
    localStorage.removeItem("chatHistory");
  }

  // Ctrl + B => Open Chat UI
  if (e.ctrlKey && e.key.toLowerCase() === "b") {
    e.preventDefault();
    if (!wrapper) createChatUI();
  }

  // Ctrl + M => Hide UI only
  if (e.ctrlKey && e.key.toLowerCase() === "m") {
    e.preventDefault();
    if (wrapper) wrapper.remove();
  }
});

function createChatUI() {
  if (document.getElementById("ai-chat-wrapper")) return;
  const wrapper = document.createElement("div");
  wrapper.id = "ai-chat-wrapper";
  wrapper.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    font-family: sans-serif;
    width: 400px;
    height: 95vh;
    background-color: transparent;
    color: white;
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    box-shadow: 0 0 15px rgba(0,0,0,0.3);
    z-index: 999999;
    scrollbar-width: none;  /* Firefox */
    -ms-overflow-style: none;  /* IE 10+ */
  `;

  // Close button
  const closeButton = document.createElement("button");
  closeButton.innerText = "✖";
  closeButton.title = "Close Chat";
  closeButton.style.cssText = `
    position: absolute;
    top: 8px;
    right: 8px;
    background: rgb(32, 31, 31);
    color: white;
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    font-size: 16px;
    cursor: pointer;
    z-index: 1000000;
  `;
  closeButton.addEventListener("click", () => {
    localStorage.removeItem("chatHistory"); // Clear from storage
    chatHistory = []; // Clear in-memory array
    wrapper.remove(); // Remove chat UI
  });

  wrapper.appendChild(closeButton);

  let isDragging = false,
    offsetX,
    offsetY;
  wrapper.addEventListener("mousedown", (e) => {
    if (
      e.target.closest(".chat-message") ||
      e.target.tagName === "TEXTAREA" ||
      e.target.tagName === "BUTTON" ||
      e.target.tagName === "IMG"
    )
      return;
    isDragging = true;
    offsetX = e.clientX - wrapper.offsetLeft;
    offsetY = e.clientY - wrapper.offsetTop;
  });
  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    wrapper.style.left = `${e.clientX - offsetX}px`;
    wrapper.style.top = `${e.clientY - offsetY}px`;
  });
  document.addEventListener("mouseup", () => (isDragging = false));

  const messages = document.createElement("div");
  messages.id = "ai-chat-messages";
  messages.style.cssText = `
    flex-grow: 1;
    overflow-y: auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
    font-size: 14px;
    scrollbar-width: none;  /* Firefox */
    -ms-overflow-style: none;  /* IE 10+ */
  `;

  // Re-add messages from localStorage
  chatHistory.forEach(({ text, sender }) => {
    const m = document.createElement("div");
    m.className = "chat-message";
    m.style.cssText = `
      align-self: ${sender === "user" ? "flex-start" : "flex-end"};
      background-color: rgba(39, 39, 39, 0.4545);
      color: white;
      padding: 8px 14px;
      border-radius: 12px;
      margin: 6px;
      white-space: pre-wrap;
      max-width: 75%;
    `;
    m.innerText = text;
    messages.appendChild(m);
  });

  wrapper.appendChild(messages);

  const inputWrapper = document.createElement("div");
  inputWrapper.style.cssText = `
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 8px;
    border-top: 1px solid #444;
    background-color: rgb(65, 63, 63,0.4545);
    border-radius: 12px;
  `;

  const inputBox = document.createElement("textarea");
  inputBox.id = "ai-input-box";
  inputBox.placeholder = "Type your message...";
  inputBox.rows = 1;
  inputBox.style.cssText = `
    flex-grow: 1;
    border-radius: 8px;
    padding: 10px;
    background-color: transparent;
    color: white;
    resize: none;
    font-size: 14px;
    border: none;
    outline: none;
    line-height: 20px;
    max-height: 120px;
    overflow-y: auto;
  `;

  function autoResizeInputBox() {
    inputBox.style.height = "auto";
    const newHeight = inputBox.scrollHeight;
    inputBox.style.height = newHeight <= 120 ? `${newHeight}px` : `120px`;
  }

  inputBox.addEventListener("input", autoResizeInputBox);
  // Hide scrollbar for Chrome, Edge, Safari
  inputBox.style.setProperty("scrollbar-width", "none");
  inputBox.style.setProperty("overflow", "auto");
  inputBox.style.setProperty("max-height", "120px");
  inputBox.style.setProperty("overflow-y", "scroll");

  inputBox.addEventListener("input", () => {
    inputBox.style.height = "auto";
    inputBox.style.height = `${inputBox.scrollHeight}px`;
  });

  // Hide scrollbar using ::-webkit-scrollbar (only for WebKit browsers)
  const style = document.createElement("style");
  style.innerHTML = `
    #ai-input-box::-webkit-scrollbar {
      display: none;
    }
  `;
  document.head.appendChild(style);

  const Sendicon = document.createElement("div"); // ✅ changed from "img" to "div"
  Sendicon.innerText = "➤";
  Sendicon.style.cssText = `
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: rgba(100, 100, 100, 0.6);
  border: 2px solid white;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.3s ease;
`;

  Sendicon.addEventListener("mouseenter", () => {
    Sendicon.style.transform = "scale(1.1)";
    Sendicon.style.backgroundColor = "rgba(100, 100, 100, 0.8)";
  });

  Sendicon.addEventListener("mouseleave", () => {
    Sendicon.style.transform = "scale(1)";
    Sendicon.style.backgroundColor = "rgba(100, 100, 100, 0.6)";
  });
  Sendicon.onclick = async () => {
    const msg = inputBox.value.trim();
    if (!msg) return;
    appendMessage(msg, "user");
    inputBox.value = "";
    inputBox.style.height = "auto";
    const thinkingId = appendMessage("🤖 is thinking...", "ai", true);
    const aiText = await generateAIResponse(msg, true);
    document.getElementById(thinkingId)?.remove();
    appendMessage(aiText, "ai");
  };

  const cropButton = document.createElement("button");
  cropButton.innerText = "✂️";
  cropButton.title = "Crop & Ask";
  cropButton.style.cssText = `
    padding: 8px;
    background-color: rgb(65, 63, 63,0.4545);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.2s;
  `;
  cropButton.onmouseenter = () => (cropButton.style.backgroundColor = "#222");
  cropButton.onmouseleave = () =>
    (cropButton.style.backgroundColor = "rgb(65, 63, 63,0.4545)");
  cropButton.onclick = enableTextCropper;

  const openWindowButton = document.createElement("button");
  openWindowButton.innerText = "Browse";
  openWindowButton.title = "Open in new window";
  openWindowButton.style.cssText = `
    padding: 8px;
    background-color: transparent;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.2s;
  `;
  openWindowButton.onmouseenter = () =>
    (openWindowButton.style.backgroundColor = "#222");
  openWindowButton.onmouseleave = () =>
    (cropButton.style.backgroundColor = "rgb(65, 63, 63,0.4545)");
  openWindowButton.onclick = () =>
    chrome.runtime.sendMessage({ action: "open-new-window" });

  const inputArea = document.createElement("div");
  inputArea.style.cssText = `display: flex; gap: 8px;`;
  inputArea.appendChild(inputBox);

  const featureRow = document.createElement("div");
  featureRow.style.cssText = `display: flex; justify-content: space-between; align-items: center; gap: 8px;`;

  const leftButtons = document.createElement("div");
  leftButtons.style.cssText = `display: flex; gap: 8px;`;
  leftButtons.appendChild(cropButton);
  leftButtons.appendChild(openWindowButton);

  const rightButtons = document.createElement("div");
  rightButtons.style.cssText = `display: flex; gap: 8px;`;
  rightButtons.appendChild(Sendicon);

  featureRow.appendChild(leftButtons);
  featureRow.appendChild(rightButtons);

  inputWrapper.appendChild(inputArea);
  inputWrapper.appendChild(featureRow);

  wrapper.appendChild(messages);
  wrapper.appendChild(inputWrapper);
  document.body.appendChild(wrapper);
}

// function showToast(msg) {
//   const toast = document.createElement("div");
//   toast.innerText = msg;
//   toast.style.cssText = `
//     position: fixed;
//     bottom: 100px;
//     left: 50%;
//     transform: translateX(-50%);
//     background: #00bcd4;
//     color: white;
//     padding: 10px 20px;
//     border-radius: 8px;
//     z-index: 999999;
//     font-weight: bold;
//     font-family: sans-serif;
//   `;
//   document.body.appendChild(toast);
//   setTimeout(() => toast.remove(), 3000);
// }

// function appendMessage(text, sender, returnId = false) {
//   const messages = document.getElementById("ai-chat-messages");
//   const message = document.createElement("div");
//   const messageId = `msg-${Date.now()}`;
//   if (returnId) message.id = messageId;
//   message.className = "chat-message";
//   message.style.cssText = `
//     align-self: ${sender === "user" ? "flex-start" : "flex-end"};
//     background-color: rgba(39, 39, 39, 0.4545);
//     color: white;
//     padding: 8px 14px;
//     border-radius: 12px;
//     margin: 6px;
//     white-space: pre-wrap;
//     max-width: 75%;
//   `;
//   message.innerText = text;
//   messages.appendChild(message);
//   messages.scrollTop = messages.scrollHeight;

//   // Save to memory and localStorage
//   chatHistory.push({ text, sender });
//   localStorage.setItem("chatHistory", JSON.stringify(chatHistory));

//   return returnId ? messageId : undefined;
// }

function appendMessage(text, sender, returnId = false) {
  const messages = document.getElementById("ai-chat-messages");
  const message = document.createElement("div");
  const messageId = `msg-${Date.now()}`;
  if (returnId) message.id = messageId;

  message.className = "chat-message";
  message.style.cssText = `
    align-self: ${sender === "user" ? "flex-start" : "flex-end"};
    background-color: rgba(39, 39, 39, 0.4545);
    color: white;
    padding: 8px 14px;
    border-radius: 12px;
    margin: 6px;
    white-space: pre-wrap;
    max-width: 75%;
    position: relative;
  `;

  // Message text span
  const textSpan = document.createElement("span");
  textSpan.innerText = text;

  // Copy icon
  const copyIcon = document.createElement("span");
  copyIcon.innerText = "🗐"; // Or use an SVG/image
  copyIcon.title = "Copy to clipboard";
  copyIcon.style.cssText = `
    position: absolute;
    bottom: 6px;
    right: 10px;
    font-size: 12px;
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.2s;
  `;
  copyIcon.onmouseenter = () => (copyIcon.style.opacity = "1");
  copyIcon.onmouseleave = () => (copyIcon.style.opacity = "0.6");
  copyIcon.onclick = () => {
    navigator.clipboard.writeText(text);
  };

  message.appendChild(textSpan);
  message.appendChild(copyIcon);
  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;

  // Save to memory and localStorage
  chatHistory.push({ text, sender });
  localStorage.setItem("chatHistory", JSON.stringify(chatHistory));

  return returnId ? messageId : undefined;
}

function generateAIResponse(prompt, isProblem = false) {
  const userPrompt = isProblem
    ? `You are SilentPass, an expert-level coding assistant helping a student during a university quiz or exam. Your goal is to **quickly** and **accurately** provide solutions without lengthy explanations unless explicitly asked.

Given a programming question (usually from platforms like LeetCode, HackerRank, or internal university portals), return:

1. ✅ A clean, working **code solution** in the **same language as the input**, or **Python** if not specified.
2. 💬 **Brief 1-2 line explanation** of the logic (optional unless asked).
3. 🚫 Avoid any generic advice, greetings, or prompts like "Let me help you" — just be quick and precise.
4. 🤫 Keep formatting minimal — no markdown if not supported, just clean plain text or formatted code block.
5. 👨‍💻 Prioritize optimal code with comments if the question is complex.
6. 🧪 If test cases are mentioned, ensure your code passes all of them.

Always act as a silent but smart friend helping during a time-sensitive exam or coding test.

Use this input carefully and respond efficiently:
"""
${prompt}
"""
`
    : prompt;

  // Convert flat chatHistory into Gemini-friendly messages array
  const messages = chatHistory.map((msg) => ({
    role: msg.sender === "user" ? "user" : "assistant",
    content: msg.text,
  }));

  // Add current user prompt to message history
  messages.push({ role: "user", content: userPrompt });

  return fetch("http://localhost:5000/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }), // IMPORTANT CHANGE
  })
    .then((res) => res.json())
    .then((data) => {
      const aiText =
        data?.text?.parts?.[0]?.text || data?.text || "🤖: No response.";
      // Save AI response to chat history
      chatHistory.push({ text: aiText, sender: "ai" });
      localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
      return aiText;
    })
    .catch((err) => (console.error(err), "🤖: Error occurred."));
}

function enableTextCropper() {
  let startX,
    startY,
    selectionBox,
    isSelecting = false;
  const scrollX = window.scrollX,
    scrollY = window.scrollY;
  const style = document.createElement("style");
  style.innerHTML = `* { cursor: crosshair !important; }`;
  document.head.appendChild(style);

  function createBox(x, y) {
    const box = document.createElement("div");
    Object.assign(box.style, {
      position: "absolute",
      left: `${x + scrollX}px`,
      top: `${y + scrollY}px`,
      width: "0",
      height: "0",
      border: "2px dashed #00bcd4",
      backgroundColor: "rgba(0,188,212,0.1)",
      zIndex: "999999",
    });
    box.id = "crop-box";
    document.body.appendChild(box);
    return box;
  }

  function onMouseDown(e) {
    if (e.button !== 0) return;
    isSelecting = true;
    startX = e.pageX;
    startY = e.pageY;
    selectionBox = createBox(startX, startY);
  }

  function onMouseMove(e) {
    if (!isSelecting) return;
    const x = Math.min(e.pageX, startX),
      y = Math.min(e.pageY, startY);
    const w = Math.abs(e.pageX - startX),
      h = Math.abs(e.pageY - startY);
    Object.assign(selectionBox.style, {
      left: `${x}px`,
      top: `${y}px`,
      width: `${w}px`,
      height: `${h}px`,
    });
  }

  function onMouseUp() {
    isSelecting = false;
    const rect = selectionBox.getBoundingClientRect();
    const text = getTextInRect(rect);
    selectionBox.remove();
    style.remove();
    document.removeEventListener("mousedown", onMouseDown);
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    const inputBox = document.getElementById("ai-input-box");
    if (text.trim()) {
      inputBox.value = inputBox.value.trim()
        ? `${inputBox.value}\n${text.trim()}`
        : text.trim();
      navigator.clipboard.writeText(text);
    }
  }

  function getTextInRect(rect) {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT
    );
    let text = "";
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const range = document.createRange();
      range.selectNodeContents(node);
      const nodeRect = range.getBoundingClientRect();
      if (
        nodeRect.bottom >= rect.top &&
        nodeRect.top <= rect.bottom &&
        nodeRect.right >= rect.left &&
        nodeRect.left <= rect.right
      ) {
        text += node.textContent.trim() + "\n";
      }
    }
    return text;
  }

  document.addEventListener("mousedown", onMouseDown);
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
}

