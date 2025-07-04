chrome.runtime.onInstalled.addListener(() => {
    console.log("Service Worker loaded 🚀");
  });
  
//   // Listen for messages from other parts of the extension
//   chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     console.log('Message received from:', sender);
    
//     if (message.action === 'someAction') {
//       console.log('Handling someAction');
//       sendResponse({ success: true });
//     }
    
//     // Return true to indicate asynchronous response
//     return true;
//   });
  

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "open-new-window") {
    chrome.windows.create({
      url: "https://google.com",  // Replace with your custom page
      type: "popup",
      width: 400,
      height: 600,
      top: 100,
      left: 100
    });
  }
});
