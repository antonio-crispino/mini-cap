import { Button, Flex, Icon, Spacer } from "@chakra-ui/react";
import { useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import Chats from "../components/messenger/Chats";
import Messages from "../components/messenger/Messages";
import ChatStatus from "../components/messenger/ChatStatus";
import MessagesInput from "../components/messenger/MessagesInput";
import { useAppContext } from "../context/AppContext";
import { useDataContext } from "../context/DataContext";
import useSetupMessages from "../hooks/useSetupMessages";
import useSetupChats from "../hooks/useSetupChats";

export default function Messenger() {
  const { user, supabase } = useAppContext();
  const { patients } = useDataContext();
  const chats = useSetupChats();
  const messages = useSetupMessages(chats.map((chat) => chat.id));
  const [currentChatId, setCurrentChatId] = useState(-1);
  const router = useRouter();

  return (
    <Flex
      height="100vh"
      width="100vw"
      gap={4}
      bgGradient="linear(to-br, blue.600, purple.700)"
      backgroundImage="url('/images/Background_Light.png')"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      flexDirection={["column", "colum", "row"]}
    >
      <Chats
        chats={chats}
        currentChatId={currentChatId}
        onChatChanged={setCurrentChatId}
        patients={patients}
        currentUser={user}
        supabase={supabase}
      />
      <Flex
        direction="column"
        width="100%"
        height="100%"
        paddingLeft={["0.5rem", "0.5rem", "0rem"]}
        overflow="hidden"
      >
        <Messages messages={messages[currentChatId] || []} userId={user?.id} />
        <ChatStatus chatID={currentChatId} />
        <Spacer />
        <MessagesInput chatId={currentChatId} userId={user?.id} />

        <Button
          bg="none"
          color="white"
          transition="transform 0.7s"
          transform=""
          onClick={() => router.push("/dashboard")}
          p={1}
          borderRadius={9}
          _hover={{
            transform: "scale(1.05)",
            transition: "transform 0.7s",
          }}
          _active={{ backgroundColor: "none" }}
        >
          <Icon fontSize={35} as={IoArrowBackCircleOutline} />
          Back
        </Button>
      </Flex>
    </Flex>
  );
}
