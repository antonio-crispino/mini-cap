import { Button, useControllableState } from "@chakra-ui/react";
import { useAppContext } from "../context/AppContext";

function NotifViewButton({ ...notification }) {
  const { supabase } = useAppContext();
  const [readValue = notification.read, setState] = useControllableState(
    notification.read
  );
  console.log(notification.read);
  const viewed = () => {
    setState(!readValue);

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
      colorScheme={readValue ? "blue" : "red"}
      onClick={viewed}
      type="button"
    >
      {readValue ? "Mark as Unread" : "View"}
    </Button>
  );
}

export default NotifViewButton;
