import { Box, List, ListItem } from "@chakra-ui/react";

function SinglePatientStatus({
  patientDetails,
  patientStatusDetails,
  setPatientDetails,
}) {
  if (patientStatusDetails === null) {
    return null;
  }

  let patientListItems = null;
  let patientStatus = null;

  if (patientDetails !== null) {
    patientListItems = Object.keys(patientDetails).map((detail) => (
      // check for null !!!
      <ListItem>
        {detail}: {patientDetails[detail]}
      </ListItem>
    ));
    patientStatus =
      patientDetails !== null &&
      patientDetails.status !== null &&
      patientDetails.status !== "none"
        ? `(${patientDetails.status})`
        : "";
  }

  const statusDate = patientStatusDetails.created_at;
  const statusListItems = Object.keys(patientStatusDetails).map((detail) => (
    // check for null !!!
    <ListItem>
      {detail}: {patientStatusDetails[detail]}
    </ListItem>
  ));

  const onClickHandler = () => {
    setPatientDetails(patientDetails);
  };

  return (
    <Box onClick={onClickHandler}>
      {patientListItems !== null ? (
        <Box>
          <Box>Patient {patientStatus}</Box>
          <List>{patientListItems}</List>
        </Box>
      ) : null}
      <Box>
        <Box>Date: {statusDate.substring(0, 10)}</Box>
        <Box>Time: {statusDate.substring(11, 19)}</Box>
      </Box>
      <Box>
        <Box>Status</Box>
        <List>{statusListItems}</List>
      </Box>
    </Box>
  );
}

export default SinglePatientStatus;
