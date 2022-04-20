import { Box, List, ListItem } from "@chakra-ui/react";
import SinglePatientStatus from "./SinglePatientStatus";

function SinglePatientStatusHistory({
  patientDetails,
  allPatientStatuses,
  setPatientStatusesVisible,
}) {
  if (!patientDetails) {
    return null;
  }

  const patientListItems = Object.keys(patientDetails).map((detail) => {
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
      detail === "isPriority" ||
      detail === "address" ||
      detail === "dateofbirth" ||
      detail === "sex"
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
          <b>{`${patientDetails.firstname} ${patientDetails.middlename || ""} ${
            patientDetails.lastname
          }`}</b>
          {` (${patientDetails.id})`}
        </ListItem>
      );
    return (
      <ListItem key={Math.floor(Math.random() * 1000000)}>
        <b>{newDetail || detail}</b>: {patientDetails[detail] || "n/a"}
      </ListItem>
    );
  });

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

  const onClickHandler = () => {
    setPatientStatusesVisible(true);
  };

  return (
    <Box>
      <Box>
        <Box
          backgroundColor="var(--chakra-colors-gray-100)"
          borderRadius="1rem"
          padding="1rem"
          margin="1rem"
          width="calc(100% - 2rem)"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            fontSize="1.25rem"
            paddingBottom="0.5rem"
          >
            <Box>
              <b>
                Patient
                {patientDetails.status !== null &&
                patientDetails.status !== "none"
                  ? ` (${patientDetails.status})`
                  : ""}
              </b>
            </Box>
            <Box
              _hover={{ backgroundColor: "gray" }}
              backgroundColor="lightgray"
              borderRadius="0.5rem"
              padding="0.1rem 0.5rem"
              fontWeight="bold"
              cursor="pointer"
              onClick={onClickHandler}
            >
              Back
            </Box>
          </Box>
          <List>{patientListItems}</List>
        </Box>
      </Box>
      <Box
        display="flex"
        margin="1rem"
        gap="1rem"
        flexWrap="wrap"
        justifyContent="left"
      >
        {patientStatuses}
      </Box>
    </Box>
  );
}

export default SinglePatientStatusHistory;
