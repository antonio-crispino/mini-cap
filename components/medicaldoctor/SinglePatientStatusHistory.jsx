import { Box, List, ListItem } from "@chakra-ui/react";
import SinglePatientStatus from "./SinglePatientStatus";

function SinglePatientStatusHistory({ patientDetails, allPatientStatuses }) {
  if (patientDetails === null) {
    return null;
  }

  const patientListItems = Object.keys(patientDetails).map((detail) => (
    // check for null !!!
    <ListItem>
      {detail}: {patientDetails[detail]}
    </ListItem>
  ));

  let patientStatuses = null;

  if (allPatientStatuses !== null) {
    patientStatuses = Object.keys(allPatientStatuses).map((status) => (
      <SinglePatientStatus
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
      <Box>{patientStatuses}</Box>
    </Box>
  );
}

export default SinglePatientStatusHistory;
