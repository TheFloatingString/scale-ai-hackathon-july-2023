/* global chrome */

let highlightedText = '';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'text') {
        highlightedText = message.content;
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'getHighlightedText') {
        sendResponse({ highlightedText });
    }
});