import { useState, useLayoutEffect } from "react";
import { Box } from "@chakra-ui/react";
import { useAppContext } from "../../context/AppContext";
import SinglePatientStatus from "./SinglePatientStatus";
import SinglePatientStatusHistory from "./SinglePatientStatusHistory";

function AllPatientsStatus() {
  const { user: currentUser, supabase, setError } = useAppContext();
  const [patientDetails, setPatientDetails] = useState(() => null);
  const [patientsDetails, setPatientsDetails] = useState(() => null);
  const [patientsStatuses, setPatientsStatuses] = useState(() => null);

  useLayoutEffect(() => {
    const getPatientsDetails = async () => {
      if (currentUser) {
        const { data: loadedPatientsDetails, error } =
          await supabase.supaGetDoctorPatients(currentUser.id);
        if (error) {
          setError(error);
          return;
        }
        console.log(loadedPatientsDetails);
        return loadedPatientsDetails;
      }
    };

    const getPatientsStatuses = async () => {
      if (currentUser) {
        const { data: loadedPatientsStatuses, error } =
          await supabase.supaGetDoctorPatientsStatuses(currentUser.id);
        if (error) {
          setError(error);
          return;
        }
        console.log(loadedPatientsStatuses);
        return loadedPatientsStatuses;
      }
    };

    const getPatientsInfo = async () => {
      const patientsDetailsNew = await getPatientsDetails();
      const patientsStatusesNew = await getPatientsStatuses();
      setPatientsStatuses(patientsStatusesNew);
      setPatientsDetails(patientsDetailsNew);
      console.log(patientsStatusesNew);
      console.log(patientsDetailsNew);
    };

    getPatientsInfo();
  }, [currentUser?.id]);

  /**
   * Fill the status components for all patient.
   */
  const patientStatusesItems =
    patientsDetails && patientsStatuses
      ? patientsDetails.map((aPatient) => {
          const aPatientStatuses = patientsStatuses.filter(
            (aStatus) => aStatus.id === aPatient.id
          );
          console.log(aPatient);
          console.log(aPatientStatuses);
          return (
            <SinglePatientStatus
              key={Math.floor(Math.random() * 1000000)}
              setPatientDetails={setPatientDetails}
              patientDetails={aPatient}
              patientStatusDetails={aPatientStatuses[0]}
            />
          );
        })
      : null;

  /**
   * Fill the status history component for a single selected patient.
   */
  const singlePatientStatusesItems = patientDetails ? (
    <SinglePatientStatusHistory
      patientDetails={patientDetails}
      allPatientStatuses={patientsStatuses.filter(
        (aStatus) => aStatus.id === patientDetails.id
      )}
    />
  ) : null;

  return (
    <Box>
      <Box>
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
