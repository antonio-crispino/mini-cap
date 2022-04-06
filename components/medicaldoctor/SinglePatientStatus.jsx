import { Box, List, ListItem } from "@chakra-ui/react";

function SinglePatientStatus({
  patientDetails,
  patientStatusDetails,
  setPatientDetails,
  setPatientStatusesVisible,
}) {
  if (!patientStatusDetails) {
    return null;
  }

  let patientListItems = null;
  let patientStatus = null;

  if (patientDetails !== null) {
    patientListItems = Object.keys(patientDetails).map((detail) => {
      if (
        detail === "symptoms" ||
        detail === "doctorId" ||
        detail === "updatesRequested" ||
        detail === "updatesRequestEnd" ||
        detail === "status" ||
        detail === "updated_at" ||
        detail === "firstname" ||
        detail === "middlename" ||
        detail === "lastname" ||
        detail === "userType" ||
        detail === "inactive" ||
        detail === "isPriority"
      )
        return null;
      if (detail === "id")
        return (
          <ListItem key={Math.floor(Math.random() * 1000000)}>
            <b>{`${patientDetails.firstname} ${
              patientDetails.middlename || ""
            } ${patientDetails.lastname}`}</b>
            {` (${patientDetails.id})`}
          </ListItem>
        );
      return (
        <ListItem key={Math.floor(Math.random() * 1000000)}>
          <b>{detail}</b>: {`${patientDetails[detail]}` || "n/a"}
        </ListItem>
      );
    });
    patientStatus =
      patientDetails !== null &&
      patientDetails.status !== null &&
      patientDetails.status !== "none"
        ? `(${patientDetails.status})`
        : "";
  }

  const statusDate = patientStatusDetails.created_at;
  const statusListItems = Object.keys(patientStatusDetails).map((detail) => {
    if (
      detail === "created_at" ||
      detail === "recordedOn" ||
      detail === "medicalCard" ||
      detail === "id" ||
      detail === "doctorId"
    )
      return null;
    return (
      <ListItem key={Math.floor(Math.random() * 1000000)}>
        <b>{detail}:</b> {patientStatusDetails[detail] || "n/a"}
      </ListItem>
    );
  });

  const onClickHandler = () => {
    setPatientDetails(patientDetails);
    setPatientStatusesVisible(false);
  };

  return (
    <Box
      backgroundColor="var(--chakra-colors-gray-100)"
      borderRadius="1rem"
      padding="1rem"
      width="20rem"
      display="flex"
      flexDirection="column"
      gap="1rem"
      onClick={patientListItems !== null ? onClickHandler : null}
    >
      {patientListItems !== null ? (
        <Box>
          <Box display="flex" justifyContent="center" marginBottom="0.5rem">
            <p>
              <b>Patient</b> {patientStatus}
            </p>
          </Box>
          <List
            backgroundColor="var(--chakra-colors-gray-300)"
            borderRadius="1rem"
            padding="1rem"
          >
            {patientListItems}
          </List>
        </Box>
      ) : null}
      <Box>
        <Box display="flex" justifyContent="center" marginBottom="0.5rem">
          <b>Status</b>
        </Box>
        <List
          backgroundColor="var(--chakra-colors-gray-300)"
          borderRadius="1rem"
          padding="1rem"
        >
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
