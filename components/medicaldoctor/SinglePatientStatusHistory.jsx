import { Box, List, ListItem } from "@chakra-ui/react";
import SinglePatientStatus from "./SinglePatientStatus";

function SinglePatientStatusHistory({ patientDetails, allPatientStatuses }) {
  if (patientDetails === null) {
    return null;
  }

  const patientListItems = Object.keys(patientDetails).map((detail) => (
    // check for null !!!
    <ListItem key={Math.floor(Math.random() * 1000000)}>
      {detail}: {patientDetails[detail]}
    </ListItem>
  ));

  let patientStatuses = null;

  if (allPatientStatuses !== null) {
    patientStatuses = Object.values(allPatientStatuses).map((status) => (
      <SinglePatientStatus
        key={Math.floor(Math.random() * 1000000)}
        patientDetails={null}
        patientStatusDetails={status}
      />
    ));
  }

  return (
    <Box>
      <Box>
        <Box>
          Patient
          {patientDetails.status !== null && patientDetails.status !== "none"
            ? ` (${patientDetails.status})`
            : ""}
        </Box>
        <List>{patientListItems}</List>
      </Box>
      <Box display="flex" gap="1rem" flexWrap="wrap" justifyContent="center">
        {patientStatuses}
      </Box>
    </Box>
  );
}

export default SinglePatientStatusHistory;
