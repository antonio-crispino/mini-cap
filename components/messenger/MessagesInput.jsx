import { Icon, Input, InputGroup, InputRightAddon } from "@chakra-ui/react";
import { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useAppContext } from "../../context/AppContext";
import ChatStatus from "./ChatStatus";

export default function MessagesInput({ chatId }) {
  const { supabase, user } = useAppContext();
  const [text, setText] = useState("");

  const sendMessage = async () => {
    if (text.length === 0) return;
    await supabase.supaSendMessage(chatId, user.id, text);
    setText("");
  };
  return (
    <>
      <InputGroup size="lg" paddingBottom={4}>
        <Input
          placeholder="write your message here"
          onChange={(e) => setText(e.target.value)}
          w="80%"
          value={text}
          bg="gray.200"
          color="gray.700"
          _placeholder={{ color: "gray.600" }}
        />
        <InputRightAddon _hover={{ cursor: "pointer" }} onClick={sendMessage}>
          <Icon as={IoIosSend} />
        </InputRightAddon>
      </InputGroup>
      <ChatStatus chatID={chatId} />
    </>
  );
}
