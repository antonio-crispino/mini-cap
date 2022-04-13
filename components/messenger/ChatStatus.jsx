import { Button, ButtonGroup } from "@chakra-ui/react";
import { useAppContext } from "../../context/AppContext";

export default function ChatStatus({ chatID }) {
  const { supabase, setError, user } = useAppContext();
  const changeFlagStatus = async (val) => {
    const answer = await supabase.updateChatFlag(chatID, user.userType, val);
    if (answer.error) {
      setError(answer.error);
    }
  };

  return (
    <ButtonGroup marginBottom="0.5rem">
      <Button colorScheme="red" onClick={() => changeFlagStatus(true)}>
        Flag
      </Button>
      <Button onClick={() => changeFlagStatus(false)}>Unflag</Button>
    </ButtonGroup>
  );
}
