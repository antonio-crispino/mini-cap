import { useState } from "react";
import { Box } from "@chakra-ui/react";
import SinglePatientStatus from "./SinglePatientStatus";
import SinglePatientStatusHistory from "./SinglePatientStatusHistory";

// patientsInfo = [{details: {}, latestStatus: {}, allStatuses: [{}, {}, ...]}, {...}, ...]
function AllPatientsStatus({ patientsInfo }) {
  const [patientDetails, setPatientDetails] = useState(() => null);

  if (patientsInfo === null) {
    return null;
  }

  const patientStatusesItems = patientsInfo.map((aPatient) => (
    <SinglePatientStatus
      setPatientDetails={setPatientDetails}
      patientDetails={aPatient.details}
      patientStatusDetails={aPatient.latestStatus}
    />
  ));

  const singlePatientStatusesItems = patientDetails ? (
    <SinglePatientStatusHistory
      patientDetails={patientDetails}
      allPatientStatuses={
        patientsInfo.find(
          (aPatient) => aPatient.details.id === patientDetails.id
        )?.allStatuses || null
      }
    />
  ) : null;

  return (
    <Box>
      <Box>
        {/* This should change, depending on show/hide. */}
        <Box>My Patients</Box>
      </Box>
      <Box display="flex" gap="1rem" flexWrap="wrap" justifyContent="center">
        {patientStatusesItems}
      </Box>
      <Box>{singlePatientStatusesItems}</Box>
    </Box>
  );
}

export default AllPatientsStatus;
