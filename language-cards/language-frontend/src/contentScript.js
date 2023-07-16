// contentScript.js
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.message === "getSelectedText") {
        sendResponse({data: window.getSelection().toString()});
      }
    }
  );