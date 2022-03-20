import { Button, useControllableState } from "@chakra-ui/react";
import { useAppContext } from "../context/AppContext";

function NotifViewButton({ ...notification }) {
  const { supabase } = useAppContext();
  const [readValue, setState] = useControllableState(notification.read);
  const viewed = () => {
    setState(!readValue);
    console.log(!readValue, notification.id);

    const readUpdate = {
      read: !readValue,
    };
    const matchId = {
      id: notification.id,
    };
    supabase.updateTableBy("notifications", readUpdate, matchId);
  };

  return (
    <Button
      onClick={viewed}
      type="button"
      colorScheme={readValue ? "blue" : "red"}
    >
      {readValue ? "Mark as Unread" : "View"}
    </Button>
  );
}

export default NotifViewButton;
