import { Button, ButtonGroup } from "@chakra-ui/react";

export default function ChatStatus({ chatID, supabase, user }) {
  const changeFlagStatus = async (val) => {
    const answer = await supabase.updateChatFlag(chatID, user.userType, val);
    if (answer.error) {
      return "there wa an error";
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
