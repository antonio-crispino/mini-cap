import { Button, useControllableState } from "@chakra-ui/react";
import { useAppContext } from "../context/AppContext";

function Flag ({ ... card_details }) {
  const { supabase } = useAppContext();
  const [flagValue = card_details.healthFlag, setState] = useControllableState(
    card_details.healthFlag
  );
  const updateFlag = () => {
    setState(!flagValue);

    const flagUpdate = {
      healthFlag: !flagValue,
    };
    const matchId = {
      id: card_details.id,
    };
    supabase.updateTableBy("card_details", flagUpdate, matchId);
  };

  return (
    <Button
      colorScheme={flagValue ? "blue" : "red"}
      onClick={updateFlag}
      type="button"
    >
      {flagValue ? "Unflag" : "Flag"}
    </Button>
  );
}

export default HealthOfficialFlag;