# 🔐 SilentPass Chrome Extension

**SilentPass** is an AI-powered Chrome extension built to quietly assist with solving coding problems during exams, practice sessions, or coding tests. It provides a sleek chat interface powered by Gemini, with text selection, crop-and-copy, and draggable UI features.

---

## 📁 Project Structure

```
SilentPass/
├── src/
│   ├── content.js          # Main frontend logic: chat UI, AI calls, cropping
│   ├── image.png           # Optional icon for send button
├── background.js           # Chrome service worker for popup handling
├── manifest.json           # Extension configuration file
├── README.md               # This file
```

---

## 🚀 Features

* 🤖 Floating "SilentPass" button when selecting text
* 💬 Draggable chat UI with persistent history
* 🧠 Gemini AI integration via backend server
* ✂️ Smart crop-and-copy full-page OCR-like feature
* 📤 Auto-paste selected/cropped text into chat input
* ➕ Open a browser popup window on demand
* ❌ Close and auto-clear chat
* 📋 Copy AI answers with one click

---

## ⚙️ How to Use

### Step 1: Clone the Repository

```bash
git clone https://github.com/Mohan-0001/SilentPass.git
cd SilentPass
```

### Step 2: Set Up the Installation

1. Navigate to the client folder:

   ```bash
   cd client
   npm install
   ```

   *This will install all client-side dependencies.*

2. Navigate to the server folder:

   ```bash
   cd ..
   cd server
   npm install
   ```

   *This will install backend dependencies.*

### Step 3: Run the Setup

1. Start the client in development mode:

   ```bash
   cd client
   npm run dev
   ```

2. In a new terminal, start the server:

   ```bash
   cd server
   node server.js
   ```

3. Go to `SilentPass/client/dist/manifest.json`

   * If the `service_worker` path is `service-worker-loader.js`, change it to:

     ```json
     "service_worker": "background.js"
     ```
   * If it's already `background.js`, no action needed.

### Step 4: Load the Extension into Chrome

1. Open Chrome and go to `chrome://extensions`
2. Enable **Developer Mode** (toggle in the top right)
3. Click **Load Unpacked**
4. Select the `dist` folder inside `SilentPass/client`

Done! You’ll now see the 🤖 button when you select text on a webpage.

---

## 💡 Usage Flow

* Select any question or text on a webpage
* "🤖 SilentPass" button appears → Click it
* Chat UI opens with pre-filled text
* Click ➤ to get an AI answer
* Use ✂️ to crop and extract full-page visible text
* Use 📋 to copy answers or 📁 to open a helper window
* Close UI with ✖ and optionally reset history

---

## 🎹 Keyboard Shortcuts

* `Ctrl + B` → Open Chat UI manually
* `Ctrl + A` → Clear chat history
* `Ctrl + M` → Minimize/Hide UI
* `Ctrl + Arrow Keys` → Move chat window

---

## 📜 License

MIT License — free to use, modify, and distribute with credit.

---

> Made with 🔥 by Mohan Gupta — built to assist coding preparation silently and smartly. 🧠


## 🧭 How to Use

1. Click on the 🤖 icon floating on any webpage
2. Use the chatbox to ask programming questions or paste LeetCode/HackerRank problems
3. Click ✂️ to crop and auto-copy question text to the input box
4. Click Browse to open a helper window
5. Click ✖ to close and wipe history

---

## 💻 Code Walkthrough

### 🔸 content.js (Frontend Logic)

* using keyboard keys the ui part is shown 
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
* Or contact: \[[mohangupta110706@gmail.com]]

---

## 📜 License

MIT License. Do whatever you want but don’t forget to give credit ❤️

---

> Made with 🔥 by Mohan Gupta for efficient and ethical exam preparation 🧠

> Using this you can pass your exam if it prohibite screen-optimization, some special keys like   ctrl+c/v.

> the UI part is overflow on the webite so its easy to drag and drop 