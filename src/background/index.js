

chrome.action.onClicked.addListener(function(tab) {
    chrome.scripting
    .executeScript({
      target : {tabId : tab.id},
      files : ["build-dev/content.js"],
    });
});