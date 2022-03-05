import { Box, Grid } from "@chakra-ui/react";
import { useCallback } from "react";
import { useAppContext } from "../../context/AppContext";
import { useDataContext } from "../../context/DataContext";
import {
  ALL_USERS_TABLE,
  PATIENTS_TABLE,
  DOCTORS_TABLE,
  HEALTH_OFFICIALS_TABLE,
  IMMIGRATION_OFFICERS_TABLE,
  ADMINS_TABLE,
  CARD_DETAILS,
  BUSINESSES_TABLE,
} from "../../utils/types";
import CardGrid from "../CardsGrid";

export default function MainDashView() {
  const { componentInView } = useAppContext();
  const {
    users,
    patients,
    administrators,
    healthOfficials,
    immigrationOfficers,
    businesses,
    doctors,
  } = useDataContext();
  console.log({
    users,
    patients,
    administrators,
    healthOfficials,
    immigrationOfficers,
    businesses,
    doctors,
  });

  const renderComponent = useCallback(() => {
    switch (componentInView) {
      case ALL_USERS_TABLE:
        return <CardGrid payload={users} />;
      case PATIENTS_TABLE:
        return <CardGrid payload={patients} />;
      case DOCTORS_TABLE:
        return <CardGrid payload={doctors} />;
      case HEALTH_OFFICIALS_TABLE:
        return <CardGrid payload={healthOfficials} />;
      case IMMIGRATION_OFFICERS_TABLE:
        return <CardGrid payload={immigrationOfficers} />;
      case ADMINS_TABLE:
        return <CardGrid payload={administrators} />;
      case BUSINESSES_TABLE:
        return <CardGrid payload={businesses} />;
      case CARD_DETAILS:
        return <Box />; // TODO: implement card details page
      default:
        return <CardGrid payload={patients} />;
    }
  }, [componentInView]);

  return (
    <Grid
      templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
      gap={2}
      alignItems="center"
      justifyContent="center"
      padding={10}
      borderRadius={5}
      bg="white"
    >
      {renderComponent()}
    </Grid>
  );
}
