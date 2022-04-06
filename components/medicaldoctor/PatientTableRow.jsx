import { Tr, Td } from "@chakra-ui/react";

function PatientTableRow({
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

  const statusColumns = Object.keys(patientStatusDetails).map((detail) => {
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
        {patientStatusDetails[detail] || "n/a"}
      </Td>
    );
  });

  const onClickHandler = () => {
    setPatientDetails(patientDetails);
    setPatientStatusesVisible(false);
  };

  return (
    <Tr
      data-testid="NameTest"
      onClick={patientName !== null ? onClickHandler : null}
    >
      {patientName} {statusColumns}
    </Tr>
  );
}

export default PatientTableRow;
