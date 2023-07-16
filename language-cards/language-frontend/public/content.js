// import axios from 'axios';

function getRandomIndices(count, max) {
    let indices = new Set();
  
    while (indices.size < count) {
      const randomIndex = Math.floor(Math.random() * max);
      indices.add(randomIndex);
    }
  
    return Array.from(indices);
  }
  
  function replaceTextNodes(node, indices, translations) {
    let indexCount = 0;
  
    if (node.nodeType === Node.TEXT_NODE) {
      if (indices.includes(indexCount)) {
        if (node.textContent.trim() !== '') {
          node.textContent = translations[indexCount] || node.textContent;
        }
      }
      indexCount++;
    } else {
      for (let child of node.childNodes) {
        indexCount = replaceTextNodes(child, indices, translations);
      }
    }
  
    return indexCount;
  }
  
  async function translateWords(words, targetLanguage) {
    try {
      // Create an array of fetch Promises
      const translationPromises = words.map(word =>
        fetch('https://libretranslate.com/translate', {
          method: 'POST',
          body: JSON.stringify({
            q: word,
            source: 'en',
            target: 'es'
          }),
          headers: {"Content-Type": "application/json"}
        })
        .then(response => {
          if (!response.ok) {
            console.log(response)
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => data.translatedText)
      );
  
      // Use Promise.all to wait for all Promises to resolve
      const translations = await Promise.all(translationPromises);
      return translations;

    } catch (error) {
      console.error('Error:', error);
      return words; // If there's an error, return the original words
    }
  }
  
  function randomTranslate() {
    console.log('random translating')
    const bodyText = document.body.innerText.split(' ');
    console.log(bodyText)
    const totalWords = bodyText.length;
    console.log('totalWords', totalWords)
    const wordsToTranslateCount = Math.floor(totalWords * 0.005);
    console.log('translating num words', wordsToTranslateCount)
  
    const indicesToTranslate = getRandomIndices(wordsToTranslateCount, totalWords);
    const wordsToTranslate = indicesToTranslate.map(index => bodyText[index]);
  
    translateWords(wordsToTranslate, 'es').then(translations => {
        console.log('replacing text nodes')
      replaceTextNodes(document.body, indicesToTranslate, translations);
      console.log('replaced text nodes')
    });
  }
  
  randomTranslate();