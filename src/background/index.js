

chrome.action.onClicked.addListener(function(tab) {
    chrome.scripting
    .executeScript({
      target : {tabId : tab.id},
      files : ["build-dev/content.js"],
    });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request && request.type === "resizeWindow") {
    chrome.windows.getCurrent(function (window) {
      var updateInfo = { width: parseInt(request.width), height: parseInt(request.height) };
      chrome.windows.update(window.id, updateInfo);
    });
  }
});