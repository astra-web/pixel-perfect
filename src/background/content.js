
import '@webcomponents/custom-elements';

chrome.action.onClicked.addListener(function(tab) {
    function loadRes(res) {
        return new Promise(
          function(resolve, reject) {
            var link = document.createElement('link');
            link.setAttribute('rel', 'import');
            link.setAttribute('href', res);
            link.onload = function() {
              resolve(res);
            };
            document.head.appendChild(link);
          });
      }
    
      loadRes( chrome.runtime.getURL("src/dialog/component.js") ) // You may/may not need webcomponents.js here
        .then( loadRes( chrome.runtime.getURL("src/dialog/insert.js") ) )
        .then(function(){
          // code that depends on web components 
    });
});