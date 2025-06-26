# SilentPass Chrome Extension

SilentPass is a Chrome extension that provides a sleek, AI-powered assistant that silently helps you solve programming problems during exams, quizzes, and practice sessions. With features like a draggable chat UI, persistent chat history, smart cropping, and a popup window for searching or loading questions, it's your silent coding companion.

---

## 📁 Project Structure

```
SilentPass/
├── src/
│   ├── content.js          # Main logic for UI, chat, cropping, and interaction
│   ├── image.png           # Send button icon
├── background.js           # Background service worker handling window creation
├── manifest.json           # Chrome extension configuration
├── README.md               # Documentation (this file)
```

---

## 🚀 Features

* 🤖 Floating "Ask AI" button that toggles a draggable chatbox
* 🧠 AI assistant powered by Gemini API (via local backend)
* 💬 Persistent chat history using `localStorage`
* ✂️ Crop text from any webpage and send to AI instantly
* 🧭 Button to open a popup browser window for browsing or loading question sources
* 🧹 Close button that also clears history

---

## 🧩 Installation Guide

### 🔧 1. Clone the Repository

```bash
git clone https://github.com/your-username/SilentPass.git
cd SilentPass
```

### 🌐 2. Load as Chrome Extension

1. Open Chrome and go to `chrome://extensions`
2. Enable **Developer Mode** (top-right corner)
3. Click **"Load Unpacked"**
4. Select the project root folder (e.g., `SilentPass/`)

You're all set! You’ll see a small 🤖 button on the right side of pages.

---

## 🧠 Backend Setup (Gemini API)

Your `content.js` communicates with a backend on `http://localhost:5000/api/gemini`. To get this working:

### 🔁 1. Create a Node/Express Backend (sample):

```js
// server.js
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/gemini', async (req, res) => {
  const { prompt } = req.body;
  // Use Google GenAI SDK or Gemini API here to respond
  const result = await yourGeminiFunction(prompt);
  res.json({ text: result });
});

app.listen(5000, () => console.log("Backend running on port 5000"));
```

### 🧪 2. Run it

```bash
npm install express cors
node server.js
```

Ensure this is running before using the AI features in the extension.

---

## 🧭 How to Use

1. Click on the 🤖 icon floating on any webpage
2. Use the chatbox to ask programming questions or paste LeetCode/HackerRank problems
3. Click ✂️ to crop and auto-copy question text to the input box
4. Click Browse to open a helper window
5. Click ✖ to close and wipe history

---

## 💻 Code Walkthrough

### 🔸 content.js (Frontend Logic)

* `AskAIButton()` – injects the floating button
* `createChatUI()` – builds the draggable chat interface
* `appendMessage()` – appends messages and persists to `localStorage`
* `generateAIResponse()` – sends the input to your backend (Gemini API)
* `enableTextCropper()` – allows user to crop text on screen

### 🔸 background.js (Backend Chrome Logic)

Handles `chrome.windows.create` popup logic:

```js
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "open-new-window") {
    chrome.windows.create({
      url: "https://google.com",
      type: "popup",
      width: 400,
      height: 600,
      top: 100,
      left: 100
    });
  }
});
```

### 🔸 manifest.json

Describes the extension, permissions, and scripts.

```json
{
  "manifest_version": 3,
  "name": "SilentPass",
  "version": "1.0.0",
  "permissions": ["storage", "activeTab", "scripting", "windows"],
  "background": { "service_worker": "background.js" },
  "host_permissions": ["<all_urls>"],
  "content_scripts": [{ "matches": ["<all_urls>"], "js": ["src/content.js"] }],
  "web_accessible_resources": [
    { "resources": ["src/image.png"], "matches": ["<all_urls>"] }
  ]
}
```

---

## 🛠️ Development & Contribution

### 🏃‍♀️ Frontend (content.js)

Make your changes inside `src/content.js`. Chrome will auto-refresh the extension when reloaded.

### 🔁 Backend

Modify your `server.js` (or similar) with the AI response logic using Gemini or your own API logic.

### 🧪 Testing Changes

1. Reload the extension in `chrome://extensions`
2. Refresh the target website
3. Interact using the 🤖 button

---

## 🧑‍💻 How to Contribute

1. Fork this repository
2. Clone it locally:

```bash
git clone https://github.com/your-username/SilentPass.git
```

3. Create a new branch:

```bash
git checkout -b feature/your-feature-name
```

4. Make your changes and test
5. Commit and push:

```bash
git add .
git commit -m "Add your feature"
git push origin feature/your-feature-name
```

6. Open a Pull Request 🚀

---

## 📩 Contact / Issues

Found a bug? Want to request a feature?

* Open an issue on GitHub
* Or contact: \[[your-email@example.com](mailto:your-email@example.com)]

---

## 📜 License

MIT License. Do whatever you want but don’t forget to give credit ❤️

---

> Made with 🔥 by Mohan Gupta for efficient and ethical exam preparation 🧠
