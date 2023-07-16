import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import axios from 'axios';


const Translator = () => {
  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [img, setImage] = useState("")
  const [sent, setSentence] = useState("")

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

  return (
    <Box p="5">
      <FormControl id="word">
        <FormLabel>Enter a word to translate:</FormLabel>
        <Input type="text" value={word} onChange={handleChange} />
      </FormControl>
      <Button colorScheme="blue" onClick={translate} mt="3">Translate</Button>
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

<Button colorScheme="green" onClick={sentence} mt="4">See Sentence</Button>
      { sent && (
        <>
        <Text mt="5">
        <strong>{sent}</strong>
        </Text>
        </>
      )}

    </Box>
  );
};

export default Translator;
