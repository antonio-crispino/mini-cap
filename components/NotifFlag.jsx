import { Checkbox, useControllableState } from "@chakra-ui/react";
import { useAppContext } from "../context/AppContext";

function Flag({ ...notification }) {
  const { supabase } = useAppContext();
  const [flagValue, setState] = useControllableState(notification.flag);
  const updateFlag = () => {
    setState(!flagValue);
    console.log(!flagValue, notification.id);

    const flagUpdate = {
      flag: !flagValue,
    };
    const matchId = {
      id: notification.id,
    };
    supabase.updateTableBy("notifications", flagUpdate, matchId);
  };

  return (
    <Checkbox colorScheme="red" onChange={updateFlag}>
      FLAG
    </Checkbox>
  );
}
export default Flag;
