import {
  Box,
  Card,
  HStack,
  IconButton,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { RiSendPlaneFill } from "react-icons/ri";
import React, { useState } from "react";

function TextEntry() {
  const [difficultyValue, setdifficultyValue] = useState(3);

  return (
    <Card width="600px" height="300px">
      <HStack mx="15px">
        <Textarea
          mt="15px"
          w="570px"
          placeholder="Insert your problem or ask clarifications here!"
        />
        <IconButton
          aria-label="Send Message"
          colorScheme="blue"
          icon={<RiSendPlaneFill />}
        />
      </HStack>

      <Box m="15px" textAlign={"left"}>
        <Text fontSize='md' color={'gray.300'}>Explanation Complexity:</Text>
        <Slider
          aria-label="slider-ex-1"
          defaultValue={3}
          min={1}
          max={5}
          step={1}
          onChange={(val) => setdifficultyValue(val)}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>
    </Card>
  );
}

export default TextEntry;
