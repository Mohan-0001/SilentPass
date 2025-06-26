//  function AskAIButton() {
//     if (document.getElementById("ai-sider-icon")) return;

//     const icon = document.createElement("div");
//     icon.id = "ai-sider-icon";
//     icon.innerHTML = "🤖";
//     icon.style.cssText = `
//       position: fixed;
//       top: 50%;
//       right: 0;
//       transform: translateY(-50%);
//       width: 40px;
//       height: 40px;
//       background-color: #2c2a27;
//       color: white;
//       font-size: 24px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       border-radius: 8px 0 0 8px;
//       cursor: pointer;
//       z-index: 999999;
//       box-shadow: -2px 2px 6px rgba(0,0,0,0.2);
//       transition: background 0.3s;
//     `;

//     icon.addEventListener("mouseenter", () => {
//       icon.style.backgroundColor = "#00bcd4";
//     });
//     icon.addEventListener("mouseleave", () => {
//       icon.style.backgroundColor = "#2c2a27";
//     });

//     icon.addEventListener("click", () => {
//       const existingChat = document.getElementById("ai-chat-wrapper");
//       if (existingChat) {
//         existingChat.remove();
//       } else {
//         const chat = createChatUI();
//         chat.style.display = "flex";
//       }
//     });

//     document.body.appendChild(icon);
//   }


// function createChatUI() {
//   if (document.getElementById("ai-chat-wrapper")) return;

//   const wrapper = document.createElement("div");
//   wrapper.id = "ai-chat-wrapper";

//   wrapper.style.cssText = `
//   position: fixed;
//   bottom: 20px;
//   right: 20px;
//   font-family: sans-serif;
//   width: 400px;
//   height: 95vh;
//   background-color: transparent;
//   color: white;
//   display: flex;
//   flex-direction: column;
//   border-radius: 12px;
//   box-shadow: 0 0 15px rgba(0,0,0,0.3);
//   z-index: 999999;
// `;


//   // Drag logic
//   let isDragging = false, offsetX, offsetY;

//   wrapper.addEventListener("mousedown", (e) => {
//     const isInMessage = e.target.closest(".chat-message");
//     const isInput = e.target.tagName === "TEXTAREA";
//     const isButton = e.target.tagName === "BUTTON";

//     // Prevent dragging if clicking on a message, input, or button
//     if (isInMessage || isInput || isButton) return;

//     isDragging = true;
//     offsetX = e.clientX - wrapper.offsetLeft;
//     offsetY = e.clientY - wrapper.offsetTop;
//   });

//   document.addEventListener("mousemove", (e) => {
//     if (!isDragging) return;
//     wrapper.style.left = `${e.clientX - offsetX}px`;
//     wrapper.style.top = `${e.clientY - offsetY}px`;
//   });
//   document.addEventListener("mouseup", () => isDragging = false);

//   const messages = document.createElement("div");
//   messages.id = "ai-chat-messages";
//   messages.style.cssText = `
//     flex-grow: 1;
//     overflow-y: auto;
//     padding: 10px;
//     display: flex;
//     flex-direction: column;
//     font-size: 14px;
//     cursor: text;
//   `;


//   const inputWrapper = document.createElement("div");
//   inputWrapper.style.cssText = `
//     display: flex;
//     padding: 10px;
//     border-top: 1px solid #444;
//     background-color: rgba(0,0,0,0.5);
//     border-radius: 12px;
//   `;


//   const inputBox = document.createElement("textarea");
//   inputBox.id = "ai-input-box";
//   inputBox.placeholder = "Type your message...";
//   inputBox.rows = 1;
//   inputBox.style.cssText = `
//     flex-grow: 1;
//     border-radius: 8px;
//     padding: 10px;
//     background-color: rgba(0,0,0,0.5);
//     color: white;
//     resize: none;
//     font-size: 14px;
//     border: none;
//     outline: none;
//     line-height: 20px;
//     max-height: 120px;
//     overflow-y: auto;
//     scrollbar-width: none;  /* Firefox */
//     -ms-overflow-style: none;  /* IE 10+ */
//   `;

  // // Hide scrollbar for Chrome, Edge, Safari
  // inputBox.style.setProperty("scrollbar-width", "none");
  // inputBox.style.setProperty("overflow", "auto");
  // inputBox.style.setProperty("max-height", "120px");
  // inputBox.style.setProperty("overflow-y", "scroll");

  // inputBox.addEventListener("input", () => {
  //   inputBox.style.height = "auto";
  //   inputBox.style.height = `${inputBox.scrollHeight}px`;
  // });

  // // Hide scrollbar using ::-webkit-scrollbar (only for WebKit browsers)
  // const style = document.createElement("style");
  // style.innerHTML = `
  //   #ai-input-box::-webkit-scrollbar {
  //     display: none;
  //   }
  // `;
  // document.head.appendChild(style);


//   const imageUrl = chrome.runtime.getURL("src/image.png");
//   const Sendicon = document.createElement("img");
//   Sendicon.src = imageUrl;
//   Sendicon.alt = "-->";

//   // Style it as a circular icon
//   Sendicon.style.cssText = `
//     width: 20px;
//     height: 20px;
//     border-radius: 50%;
//     object-fit: cover;
//     border: 2px solid white;
//     box-shadow: 0 2px 6px rgba(0,0,0,0.3);
//     cursor: pointer;
//     background-color: rgb(219, 216, 216);
//     color: white;
//   `;


//   // const sendButton = document.createElement("button");
//   // sendButton.innerText = Sendicon
//   // sendButton.style.cssText = `
//   //   padding: 10px 16px;
//   //   background-color: #00bcd4;
//   //   color: white;
//   //   border: none;
//   //   border-radius: 8px;
//   //   cursor: pointer;
//   //   font-weight: bold;
//   // `;

//   const cropButton = document.createElement("button");
//   cropButton.innerText = "✂️";
//   cropButton.title = "Crop & Ask";
//   cropButton.style.cssText = `
//     padding: 2px;
//     background-color: #444;
//     color: white;
//     border: none;
//     border-radius: 2rem;
//     cursor: crosshair;
//     font-weight: bold;
//   `;
//   cropButton.onclick = enableTextCropper;

//   Sendicon.onclick = async () => {
//     const msg = inputBox.value.trim();
//     if (!msg) return;
//     appendMessage(msg, "user");
//     inputBox.value = "";
//     const thinkingId = appendMessage("🤖 is thinking...", "ai", true);
//     const aiText = await generateAIResponse(msg, true);
//     document.getElementById(thinkingId)?.remove();
//     appendMessage(aiText, "ai");
//   };

//   // open new window button
//   const openWindowButton = document.createElement("button");
//   openWindowButton.innerText = "🪟";
//   openWindowButton.title = "Open in new window";
//   openWindowButton.style.cssText = `
//     padding: 10px;
//     background-color: #888;
//     color: white;
//     border: none;
//     border-radius: 8px;
//     cursor: pointer;
//     font-weight: bold;
//   `;

//   // inputWrapper.appendChild(openWindowButton);

//   // op-ening new window through background script
//   openWindowButton.onclick = () => {
//     chrome.runtime.sendMessage({ action: "open-new-window" });
//   };


//   // === Message Input Area (Textarea + Send Button)
// const inputArea = document.createElement("div");
// inputArea.style.cssText = `
//   display: flex;
//   gap: 8px;
  
// `;

// inputArea.appendChild(inputBox);

// // === Feature Buttons Row (Crop + Open Window)
// const featureButtons = document.createElement("div");
// featureButtons.style.cssText = `
//   display: flex;
//   justify-content: flex-start;
//   gap: 8px;
//   margin-top: 3.5px;
// `;
// inputWrapper.style.backgroundColor = "black"; // or "rgba(0,0,0,0.5)"

// inputBox.style.backgroundColor = "transparent";
// Sendicon.style.backgroundColor = "transparent";
// cropButton.style.backgroundColor = "transparent";
// openWindowButton.style.backgroundColor = "transparent";

// featureButtons.appendChild(cropButton);
// featureButtons.appendChild(openWindowButton);
// featureButtons.appendChild(Sendicon);

// // === Combine both in inputWrapper (Column Layout)
// inputWrapper.style.flexDirection = "column";
// inputWrapper.appendChild(inputArea);
// inputWrapper.appendChild(featureButtons);

// // === Add to main chat wrapper
// wrapper.appendChild(messages);
// wrapper.appendChild(inputWrapper);
// document.body.appendChild(wrapper);

//   // inputWrapper.appendChild(inputBox);
//   // inputWrapper.appendChild(sendButton);
//   // inputWrapper.appendChild(cropButton);
//   // wrapper.appendChild(messages);
//   // wrapper.appendChild(inputWrapper);
//   // document.body.appendChild(wrapper);
// }


// function appendMessage(text, sender, returnId = false) {
//   const messages = document.getElementById("ai-chat-messages");
//   const message = document.createElement("div");

//   const messageId = `msg-${Date.now()}`;
//   if (returnId) message.id = messageId;

//   message.className = "chat-message"; // ✅ So we can detect clicks on it

//   message.style.cssText = `
//     align-self: ${sender === "user" ? "flex-start" : "flex-end"};
//     background-color: rgba(39, 39, 39, 0.8);
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

//   return returnId ? messageId : undefined;
// }


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

// async function generateAIResponse(userPrompt, isProblem = false) {
//   const fullPrompt = isProblem
//     ? `You are a helpful and supportive Java programming assistant.
// Rank 1 LeetCoder. Solve this in Java with the best time complexity and no comments.

// Problem:
// ${userPrompt}`
//     : userPrompt;

//   try {
//     const res = await fetch("http://localhost:5000/api/gemini", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ prompt: fullPrompt }),
//     });
//     const data = await res.json();
//     return data?.text?.parts?.[0]?.text || data?.text || "🤖: No response received.";
//   } catch (error) {
//     console.error("AI Error:", error);
//     return "🤖: Server error. Please try again.";
//   }
// }

// function enableTextCropper() {
//   let startX, startY, selectionBox;
//   let isSelecting = false;

//   const scrollX = window.scrollX;
//   const scrollY = window.scrollY;

//   const style = document.createElement("style");
//   style.innerHTML = `* { cursor: crosshair !important; }`;
//   document.head.appendChild(style);

//   function createBox(x, y) {
//     const box = document.createElement("div");
//     box.style.position = "absolute";
//     box.style.left = `${x + scrollX}px`;
//     box.style.top = `${y + scrollY}px`;
//     box.style.width = "0";
//     box.style.height = "0";
//     box.style.border = "2px dashed #00bcd4";
//     box.style.backgroundColor = "rgba(0,188,212,0.1)";
//     box.style.zIndex = "999999";
//     box.id = "crop-box";
//     document.body.appendChild(box);
//     return box;
//   }

//   function onMouseDown(e) {
//     if (e.button !== 0) return;
//     isSelecting = true;
//     startX = e.pageX;
//     startY = e.pageY;
//     selectionBox = createBox(startX, startY);
//   }

//   function onMouseMove(e) {
//     if (!isSelecting) return;
//     const x = Math.min(e.pageX, startX);
//     const y = Math.min(e.pageY, startY);
//     const w = Math.abs(e.pageX - startX);
//     const h = Math.abs(e.pageY - startY);

//     Object.assign(selectionBox.style, {
//       left: `${x}px`,
//       top: `${y}px`,
//       width: `${w}px`,
//       height: `${h}px`,
//     });
//   }

// function onMouseUp(e) {
//   isSelecting = false;
//   const rect = selectionBox.getBoundingClientRect();
//   const text = getTextInRect(rect);
//   document.getElementById("crop-box")?.remove();
//   style.remove();
//   document.removeEventListener("mousedown", onMouseDown);
//   document.removeEventListener("mousemove", onMouseMove);
//   document.removeEventListener("mouseup", onMouseUp);

//   const inputBox = document.getElementById("ai-input-box");

//   if (text.trim()) {
//     // Append to existing text
//     inputBox.value = inputBox.value.trim()
//       ? inputBox.value + "\n" + text.trim()
//       : text.trim();

//     navigator.clipboard.writeText(text).then(() => {
//       showToast("📋 Cropped text copied & added to input box!");
//     });
//   } else {
//     showToast("⚠️ No text detected in selection.");
//   }
// }



//   function getTextInRect(rect) {
//     const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
//     let text = "";
//     while (walker.nextNode()) {
//       const node = walker.currentNode;
//       const range = document.createRange();
//       range.selectNodeContents(node);
//       const nodeRect = range.getBoundingClientRect();
//       if (
//         nodeRect.bottom >= rect.top &&
//         nodeRect.top <= rect.bottom &&
//         nodeRect.right >= rect.left &&
//         nodeRect.left <= rect.right
//       ) {
//         text += node.textContent.trim() + "\n";
//       }
//     }
//     return text;
//   }

//   document.addEventListener("mousedown", onMouseDown);
//   document.addEventListener("mousemove", onMouseMove);
//   document.addEventListener("mouseup", onMouseUp);
// }

// if (document.readyState === "loading") {
//   document.addEventListener("DOMContentLoaded", AskAIButton);
// } else {
//   AskAIButton();
// }




let chatHistory = JSON.parse(localStorage.getItem("chatHistory") || "[]");

// AI Chat UI with Fixed Textarea Reset and Enhanced Button Layout
function AskAIButton() {
  if (document.getElementById("ai-sider-icon")) return;

  const icon = document.createElement("div");
  icon.id = "ai-sider-icon";
  icon.innerHTML = "🤖";
  icon.style.cssText = `
    position: fixed;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    background-color: #2c2a27;
    color: white;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px 0 0 8px;
    cursor: pointer;
    z-index: 999999;
    box-shadow: -2px 2px 6px rgba(0,0,0,0.2);
    transition: background 0.3s;
  `;
  icon.addEventListener("mouseenter", () => icon.style.backgroundColor = "#00bcd4");
  icon.addEventListener("mouseleave", () => icon.style.backgroundColor = "#2c2a27");

  icon.addEventListener("click", () => {
    const existingChat = document.getElementById("ai-chat-wrapper");
    if (existingChat) existingChat.remove();
    else createChatUI();
  });
  document.body.appendChild(icon);
}

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
    chatHistory = [];                       // Clear in-memory array
    wrapper.remove();                       // Remove chat UI
  });

  wrapper.appendChild(closeButton);

  let isDragging = false, offsetX, offsetY;
  wrapper.addEventListener("mousedown", (e) => {
    if (e.target.closest(".chat-message") || e.target.tagName === "TEXTAREA" || e.target.tagName === "BUTTON" || e.target.tagName === "IMG") return;
    isDragging = true;
    offsetX = e.clientX - wrapper.offsetLeft;
    offsetY = e.clientY - wrapper.offsetTop;
  });
  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    wrapper.style.left = `${e.clientX - offsetX}px`;
    wrapper.style.top = `${e.clientY - offsetY}px`;
  });
  document.addEventListener("mouseup", () => isDragging = false);

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
    background-color: black;
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
    background-color: black;
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


  const imageUrl = chrome.runtime.getURL("src/image.png");
  const Sendicon = document.createElement("img");
  Sendicon.src = imageUrl;
  Sendicon.alt = "Send";
  Sendicon.style.cssText = `
    color: white;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid white;
    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    cursor: pointer;
    background-color: white;
    transition: transform 0.2s;
  `;
  Sendicon.addEventListener("mouseenter", () => Sendicon.style.transform = "scale(1.1)");
  // Sendicon.addEventListener("mouseleave", () => Sendicon.style.transform = "scale(1)");
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
    background-color: black;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.2s;
  `;
  cropButton.onmouseenter = () => cropButton.style.backgroundColor = "#222";
  cropButton.onmouseleave = () => cropButton.style.backgroundColor = "black";
  cropButton.onclick = enableTextCropper;

  const openWindowButton = document.createElement("button");
  openWindowButton.innerText = "Browse";
  openWindowButton.title = "Open in new window";
  openWindowButton.style.cssText = `
    padding: 8px;
    background-color: black;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.2s;
  `;
  openWindowButton.onmouseenter = () => openWindowButton.style.backgroundColor = "#222";
  openWindowButton.onmouseleave = () => openWindowButton.style.backgroundColor = "black";
  openWindowButton.onclick = () => chrome.runtime.sendMessage({ action: "open-new-window" });

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

function showToast(msg) {
  const toast = document.createElement("div");
  toast.innerText = msg;
  toast.style.cssText = `
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    background: #00bcd4;
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
    z-index: 999999;
    font-weight: bold;
    font-family: sans-serif;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}


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
  `;
  message.innerText = text;
  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;

  // Save to memory and localStorage
  chatHistory.push({ text, sender });
  localStorage.setItem("chatHistory", JSON.stringify(chatHistory));

  return returnId ? messageId : undefined;
}


function generateAIResponse(prompt, isProblem = false) {
  const fullPrompt = isProblem ? `You are SilentPass, an expert-level coding assistant helping a student during a university quiz or exam. Your goal is to **quickly** and **accurately** provide solutions without lengthy explanations unless explicitly asked.

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
  {user_question_or_cropped_text}
  """
  \nProblem:\n${prompt}` : prompt;
  return fetch("http://localhost:5000/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: fullPrompt })
  })
    .then(res => res.json())
    .then(data => data?.text?.parts?.[0]?.text || data?.text || "🤖: No response.")
    .catch(err => (console.error(err), "🤖: Error occurred."));
}

function enableTextCropper() {
  let startX, startY, selectionBox, isSelecting = false;
  const scrollX = window.scrollX, scrollY = window.scrollY;
  const style = document.createElement("style");
  style.innerHTML = `* { cursor: crosshair !important; }`;
  document.head.appendChild(style);

  function createBox(x, y) {
    const box = document.createElement("div");
    Object.assign(box.style, {
      position: "absolute", left: `${x + scrollX}px`, top: `${y + scrollY}px`,
      width: "0", height: "0", border: "2px dashed #00bcd4",
      backgroundColor: "rgba(0,188,212,0.1)", zIndex: "999999"
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
    const x = Math.min(e.pageX, startX), y = Math.min(e.pageY, startY);
    const w = Math.abs(e.pageX - startX), h = Math.abs(e.pageY - startY);
    Object.assign(selectionBox.style, { left: `${x}px`, top: `${y}px`, width: `${w}px`, height: `${h}px` });
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
      inputBox.value = inputBox.value.trim() ? `${inputBox.value}\n${text.trim()}` : text.trim();
      navigator.clipboard.writeText(text).then(() => showToast("📋 Cropped text copied & added to input box!"));
    } else showToast("⚠️ No text detected in selection.");
  }

  function getTextInRect(rect) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let text = "";
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const range = document.createRange();
      range.selectNodeContents(node);
      const nodeRect = range.getBoundingClientRect();
      if (nodeRect.bottom >= rect.top && nodeRect.top <= rect.bottom && nodeRect.right >= rect.left && nodeRect.left <= rect.right) {
        text += node.textContent.trim() + "\n";
      }
    }
    return text;
  }

  document.addEventListener("mousedown", onMouseDown);
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", AskAIButton);
} else {
  AskAIButton();
}
