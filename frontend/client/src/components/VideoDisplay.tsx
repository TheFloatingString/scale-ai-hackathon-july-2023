import { AspectRatio, Card, Text } from "@chakra-ui/react";
import React from "react";

function VideoDisplay({ video }: { video: any }) {
  return (
    <Card width="600px">
      <Text textAlign="left" m="10px" fontSize={"md"} color={"gray.300"}>
        Welcome to our project! To
      </Text>
      <AspectRatio maxW="560px" ratio={1.9} ml='20px' mb='15px'>
        <iframe
          title="random"
          src="https://www.youtube.com/watch?v=aircAruvnKk"
        />
      </AspectRatio>
    </Card>
  );
}

export default VideoDisplay;
