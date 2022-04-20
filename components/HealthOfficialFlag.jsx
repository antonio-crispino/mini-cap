import { Button, useControllableState } from "@chakra-ui/react";
import { useAppContext } from "../context/AppContext";

function HealthOfficialFlag({ patients }) {
  console.log(patients, "Health flag error");
  const { supabase } = useAppContext();
  const [healthFlagValue = patients.healthFlag, setState] =
    useControllableState(patients.healthFlag);

  const updateHealthFlag = async () => {
    setState(!healthFlagValue);

    const healthFlagUpdate = {
      healthFlag: !healthFlagValue,
    };
    const matchId = {
      id: patients.id,
    };
    await supabase.updateTableBy("patients", healthFlagUpdate, matchId);
  };

  return (
    <Button
      colorScheme={healthFlagValue ? "red" : "blue"}
      onClick={updateHealthFlag}
      type="button"
    >
      {healthFlagValue ? "Unflag" : "Flag"}
    </Button>
  );
}

export default HealthOfficialFlag;
