import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

export default function Messages({ messages, userId }) {
  const messagesEndRef = useRef(null);
  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    scrollToBottom();
  }, [messages]);
  return (
    <Flex
      maxWidth="95%"
      height="80%"
      overflowY="scroll"
      direction="column"
      bg="gray.200"
      my="20px"
      borderRadius="lg"
    >
      {messages.map((msg) => (
        <Flex
          justifyContent={msg.senderId === userId ? "flex-end" : "flex-start"}
          key={`${msg.id}-${Math.floor(Math.random() * 1000)}`}
        >
          <Box
            borderRadius="10px"
            margin="0.5rem"
            padding="0.5rem"
            display="inline-block"
            backgroundColor={msg.senderId === userId ? "green.400" : "gray.300"}
            color={msg.senderId === userId ? "white" : "black"}
          >
            {msg.text}
          </Box>
          <div ref={messagesEndRef} />
        </Flex>
      ))}
    </Flex>
  );
}
