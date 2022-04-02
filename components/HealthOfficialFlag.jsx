import { Button, useControllableState } from "@chakra-ui/react";
import { useAppContext } from "../context/AppContext";

function HealthOfficialFlag ({ ... card_details }) {
  const { supabase } = useAppContext();
  const [healthFlagValue = card_details.healthFlag, setState] = useControllableState(
    card_details.healthFlag
  );
  const updateHealthFlag = () => {
    setState(!healthFlagValue);

    const healthFlagUpdate = {
      healthFlag: !healthFlagValue,
    };
    const matchId = {
      id: card_details.id,
    };
    supabase.updateTableBy("card_details", healthFlagUpdate, matchId);
  };

  return (
    <Button
      colorScheme={healthFlagValue ? "blue" : "red"}
      onClick={updateHealthFlag}
      type="button"
    >
      {healthFlagValue ? "Unflag" : "Flag"}
    </Button>
  );
}

export default HealthOfficialFlag;