import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import axios from 'axios';


const Translator = () => {
  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");

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

  return (
    <Box p="5">
      <FormControl id="word">
        <FormLabel>Enter a word to translate:</FormLabel>
        <Input type="text" value={word} onChange={handleChange} />
      </FormControl>
      <Button colorScheme="blue" onClick={translate} mt="3">Translate</Button>
      {translation && (
        <Text mt="5">
          <strong>Translation:</strong> {translation}
        </Text>
      )}
    </Box>
  );
};

export default Translator;