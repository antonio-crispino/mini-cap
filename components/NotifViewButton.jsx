import { useControllableState, Button } from "@chakra-ui/react";

function NotifViewButton() {
  const [value, setValue] = useControllableState(false);
  const viewed = () => {
    setValue(!value);
  };

  return (
    <Button onClick={viewed} type="button" colorScheme={value ? "blue" : "red"}>
      {value ? "Mark as Unread" : "View"}
    </Button>
  );
}
export default NotifViewButton;
