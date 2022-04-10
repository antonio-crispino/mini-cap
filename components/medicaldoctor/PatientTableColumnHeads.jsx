import { Tr, Th } from "@chakra-ui/react";

function PatientTableColumnHeads({ patientStatusDetails }) {
  if (!patientStatusDetails) {
    return null;
  }

  const columnHead = Object.keys(patientStatusDetails).map((detail) => {
    if (
      detail === "created_at" ||
      detail === "recordedOn" ||
      detail === "medicalCard" ||
      detail === "id" ||
      detail === "doctorId"
    )
      return null;
    return <Th>{detail}</Th>;
  });

  return <Tr>{columnHead}</Tr>;
}

export default PatientTableColumnHeads;
