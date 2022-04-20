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
      let newDetail = null;
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
      ) {
        return null;
      }
      switch (detail) {
        case "medicalCardNum":
          newDetail = "Medical Card Number";
          break;
        case "healthFlag":
          newDetail = "Health Flag";
          break;
        case "email":
          newDetail = "Email";
          break;
        case "address":
          newDetail = "Address";
          break;
        case "phonenumber":
          newDetail = "Phone Number";
          break;
        case "dateofbirth":
          newDetail = "Date of Birth";
          break;
        case "sex":
          newDetail = "Sex";
          break;
        case "contacted_with_covid":
          newDetail = "Contacted with Covid";
          break;
        case "quarantine":
          newDetail = "Quarantine";
          break;
        default:
          newDetail = null;
          break;
      }
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
          <b>{newDetail || detail}</b>: {`${patientDetails[detail]}` || "n/a"}
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
    let newDetail = null;
    if (
      detail === "created_at" ||
      detail === "recordedOn" ||
      detail === "medicalCard" ||
      detail === "id" ||
      detail === "doctorId"
    ) {
      return null;
    }
    switch (detail) {
      case "soreThroat":
        newDetail = "Sore Throat";
        break;
      case "nasalCongestion":
        newDetail = "Nasal Congestion";
        break;
      case "chestPain":
        newDetail = "Chest Pain";
        break;
      case "weight":
        newDetail = "Weight";
        break;
      case "temperature":
        newDetail = "Temperature";
        break;
      case "nausea":
        newDetail = "Nausea";
        break;
      case "headache":
        newDetail = "Headache";
        break;
      case "lethargy":
        newDetail = "Lethargy";
        break;
      case "vomiting":
        newDetail = "Vomiting";
        break;
      case "fever":
        newDetail = "Fever";
        break;
      default:
        newDetail = null;
        break;
    }
    return (
      <ListItem key={Math.floor(Math.random() * 1000000)}>
        <b>{newDetail || detail}:</b> {patientStatusDetails[detail] || "n/a"}
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
