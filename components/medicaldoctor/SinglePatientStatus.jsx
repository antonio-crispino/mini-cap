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
    <Box
      backgroundColor="lightblue"
      borderRadius="1rem"
      padding="1rem"
      width="15rem"
      display="flex"
      flexDirection="column"
      gap="1rem"
      onClick={onClickHandler}
    >
      {patientListItems !== null ? (
        <Box>
          <Box display="flex" justifyContent="center" marginBottom="0.5rem">
            Patient {patientStatus}
          </Box>
          <List backgroundColor="lightgreen" borderRadius="1rem" padding="1rem">
            {patientListItems}
          </List>
        </Box>
      ) : null}
      <Box>
        <Box display="flex" justifyContent="center" marginBottom="0.5rem">
          Status
        </Box>
        <List backgroundColor="lightgreen" borderRadius="1rem" padding="1rem">
          {statusListItems}
        </List>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box>Date: {statusDate?.substring(0, 10)}</Box>
        <Box>Time: {statusDate?.substring(11, 19)}</Box>
      </Box>
    </Box>
  );
}

export default SinglePatientStatus;
