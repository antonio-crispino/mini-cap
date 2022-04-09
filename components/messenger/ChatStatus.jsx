import { Text, Flex, Switch } from "@chakra-ui/react";
import { useAppContext } from "../../context/AppContext";

export default function ChatStatus({ chatID }) {
  const { supabase, setError, user } = useAppContext();
  const changeFlagStatus = async () => {
    const answer = await supabase.updateChatFlag(chatID, user.userType, true);
    if (answer.error) {
      setError(answer.error);
    }
  };

  const getFlagStatus = async () => {
    const answer = await supabase.getFlagStatus(chatID);

    console.log("flag stat", answer);
  };

  return (
    <Flex>
      <Text>Is Urgent?</Text>
      {getFlagStatus() ? (
        <Switch
          paddingLeft="1rem"
          paddingTop="0.2rem"
          colorScheme="red"
          onChange={() => changeFlagStatus()}
          defaultChecked
        />
      ) : (
        <Switch
          paddingLeft="1rem"
          paddingTop="0.2rem"
          colorScheme="red"
          onChange={() => changeFlagStatus()}
          defaultChecked={false}
        />
      )}
      {/* <Switch
        paddingLeft="1rem"
        paddingTop="0.2rem"
        colorScheme="red"
        onChange={() => changeFlagStatus()}
        defaultChecked={getFlagStatus}
      /> */}
    </Flex>
  );
}
