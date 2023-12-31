/* global chrome */
import React, { useState, useEffect } from "react";
import { Box, Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import axios from 'axios';


const Translator = () => {
  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [img, setImage] = useState("")
  const [sent, setSentence] = useState("")

  useEffect(() => {
    // Send a message to background.js to get the highlighted text
    try {
      chrome.runtime.sendMessage({ type: 'getHighlightedText' }, response => {
        setWord(response.highlightedText);
      });
    } catch (error) {
      console.log(error)
    }
  }, []);

  const handleChange = (event) => {
    setWord(event.target.value);
  };

  const translate = async () => {
    try {
      const response = await axios.post('https://libretranslate.de/translate', {
        q: word,
        source: 'en',
        target: 'es',
      });
      setTranslation(response.data.translatedText);
    } catch (error) {
      console.error("Error translating word: ", error);
    }
  };

  const config = {
    headers:{
      "Content-Type": "application/json"
    }
  };
  const image = async () => { 
    try {
      const response = await axios.post('http://localhost:8080/api/sentence_to_image', {
        message: word,
      }, config);
      setImage(response.data.data);
    } catch (error) {
      console.error("Error getting image: ", error);
    }
  }

  const sentence = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/word_to_sentence', {
        message: translation,
      }, config);
      setSentence(response.data.data);
    } catch (error) {
      console.error("Error getting image: ", error);
    }
  }

  const saveFlashcard = async () => {
    console.log("saving flashcard")
    try {
      const response = axios.post('http://localhost:8080/api/db/item', 
        {
          frontWord: translation,
          frontSentence: sent,
          frontImage: img,
          backWord: word,
          backSentence: "",
        }, config);
      setImage("")
      setSentence("")
      setTranslation("")
    } catch (error) {
      console.error("Error publishing flashcard:", error)
    }
  }

  return (
    <Box p="5">
      <FormControl id="word">
        <FormLabel>Enter a word to translate:</FormLabel>
        <Input type="text" value={word} onChange={handleChange} />
      </FormControl>

      <Button colorScheme="blue" onClick={() => {
        translate()
      }} mt="3">Get Translation</Button>

      {translation && (
        <>
        <Text mt="5">
          <strong>Translation:</strong>
        </Text>
        <Text>{translation}</Text>
        </>
      )}

      <Button colorScheme="green" onClick={image} mt="3">See Image</Button>
      {img && (
        <>
        <Text mt="5">
        <strong>Image:</strong>
        </Text>
          <img src={img} alt="Translated Image" mt="2" />
        </>
      )}

    <Button colorScheme="green" onClick={sentence} mt="3">See Sentence</Button>
      { sent && (
        <>
        <Text mt="5">
          <strong>{sent}</strong>
        </Text>
        </>
      )}
       {(sent && translation && img) && (
          <Button colorScheme="green" onClick={saveFlashcard} mt='3'>Save Flashcard</Button>
        )}
    </Box>
  );
};

export default Translator;
