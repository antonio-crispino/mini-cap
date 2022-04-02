import { Tr, Td } from "@chakra-ui/react";

function SinglePatientStatus({
  patientDetails,
  patientStatusDetails,
  setPatientDetails,
  setPatientStatusesVisible,
}) {
  if (!patientStatusDetails) {
    return null;
  }

  let patientName = null;

  if (patientDetails !== null) {
    patientName = Object.keys(patientDetails.firstname[0]).map(() => (
      <Td key={Math.floor(Math.random() * 1000000)}>
        <b>{`${patientDetails.firstname} ${patientDetails.middlename || ""} ${
          patientDetails.lastname
        }`}</b>
      </Td>
    ));
  }

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
      <Td key={Math.floor(Math.random() * 1000000)}>
        <b>{detail}:</b> {patientStatusDetails[detail] || "n/a"}
      </Td>
    );
  });

  /*
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
*/
  const onClickHandler = () => {
    setPatientDetails(patientDetails);
    setPatientStatusesVisible(false);
  };

  return (
    <Tr onClick={patientName !== null ? onClickHandler : null}>
      <b>{patientName}</b> {statusListItems}
    </Tr>
  );
}

/*
<Tr>
      <Td onClick={patientName !== null ? onClickHandler : null}>
        {patientName}
      </Td>
      <Td>{statusListItems}</Td>
    </Tr>
    */

/*
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
    */

export default SinglePatientStatus;
