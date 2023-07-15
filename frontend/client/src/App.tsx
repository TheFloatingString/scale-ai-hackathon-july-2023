import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Heading,
  HStack,
  Card,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";
import TextEntry from "./components/TextEntry";
import VideoDisplay from "./components/VideoDisplay";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Heading>Edknights: Video Generation for explaining problems</Heading>
      <HStack mt="50px" justify={"space-between"} mx="200px" align={'start'}>
        {/* Chatbot */}
        <VStack spacing="50px">
          <VideoDisplay video={undefined} />
          <VideoDisplay video={"dummy"} />
          <VideoDisplay video={"dummy"} />
          <VideoDisplay video={"dummy"} />
          <VideoDisplay video={"dummy"} />
        </VStack>

        {/* Prompting */}
        <VStack spacing="50px">
          <TextEntry />
          <TextEntry />
          <TextEntry />
          <TextEntry />
          <TextEntry />
        </VStack>
      </HStack>
    </Box>
  </ChakraProvider>
);
