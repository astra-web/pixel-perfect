

chrome.action.onClicked.addListener(function(tab) {
    chrome.scripting
    .executeScript({
      target : {tabId : tab.id},
      files : ["build-dev/content.js"],
    });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request && request.action === "resizeWindow") {
    chrome.windows.getCurrent(function (window) {
      var updateInfo = { width: parseInt(request.width), height: parseInt(request.height) };
      (updateInfo.state = "normal"), chrome.windows.update(window.id, updateInfo);
    });
  }
});