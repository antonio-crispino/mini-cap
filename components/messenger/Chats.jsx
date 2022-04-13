/* eslint-disable no-restricted-syntax */
import { Flex, Box, Badge } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ChatOptions from "./ChatOptions";

export default function Chats({
  chats,
  onChatChanged,
  patients,
  currentUser,
  supabase,
  currentChatId,
}) {
  const [patientOptions, setPatientOptions] = useState([]);

  const checkChatAlreadyExists = (personId) => {
    for (const c of chats) {
      if (c.patientId === personId) return true;
    }
    return false;
  };
  useEffect(() => {
    const newOptions = patients
      .filter((p) => {
        if (
          currentUser.userType === "patient" &&
          currentUser.id === p.userInfo?.id &&
          !checkChatAlreadyExists(p.doctorInfo.id)
        )
          return true;

        if (
          currentUser.userType === "doctor" &&
          p.doctorInfo?.id === currentUser.id &&
          !checkChatAlreadyExists(p.userInfo.id)
        )
          return true;

        return false;
      })
      .map((p) => {
        if (currentUser.userType === "patient") {
          return {
            name: `${p.doctorInfo.firstname} ${p.doctorInfo.lastname}`,
            id: p.doctorInfo?.id,
          };
        }
        return {
          name: `${p.userInfo.firstname} ${p.userInfo.lastname}`,
          id: p.userInfo.id,
        };
      });
    setPatientOptions(newOptions);
  }, [chats, patients, currentUser]);

  const handleNewChat = async (IdOfPersonToChat) => {
    const patientId =
      currentUser.userType === "patient" ? currentUser.id : IdOfPersonToChat;
    const doctorId =
      currentUser.userType === "doctor" ? currentUser.id : IdOfPersonToChat;

    await supabase.supaCreateNewConversation(patientId, doctorId);
  };
  return (
    <Flex
      direction={["row", "row", "column"]}
      maxWidth={["100%", "100%", "15%"]}
      justifyContent="flex-start"
      alignItems="center"
      bg="gray.200"
      margin="1rem 1rem 1rem 0.25rem"
      borderRadius="20px"
      boxSizing="content-box"
    >
      <ChatOptions options={patientOptions} onOptionClicked={handleNewChat} />
      <Flex
        direction={["row-reverse", "row-reverse", "column-reverse"]}
        justifyContent="center"
        alignItems="flex-start"
      >
        {chats.map((chat) => (
          <Box
            padding="1rem"
            onClick={() => onChatChanged(chat.id)}
            key={chat.id}
            width="100%"
            cursor="pointer"
            fontWeight={chat.id === currentChatId ? "bold" : "inherit"}
          >
            {chat.info.firstname} {chat.info.lastname}
            {chat.doctorFlagged ? (
              <Badge
                variant="solid"
                px={2}
                mx={1}
                colorScheme="red"
                rounded="full"
              >
                urgent
              </Badge>
            ) : null}
          </Box>
        ))}
      </Flex>
    </Flex>
  );
}
