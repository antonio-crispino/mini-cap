import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { useAppContext } from "../../context/AppContext";
import SinglePatientStatus from "./SinglePatientStatus";
import SinglePatientStatusHistory from "./SinglePatientStatusHistory";

function AllPatientsStatus() {
  const { user: currentUser, supabase, setError } = useAppContext();
  const [patientDetails, setPatientDetails] = useState(() => null);
  const [patientsDetails, setPatientsDetails] = useState(() => null);
  const [patientsStatuses, setPatientsStatuses] = useState(() => null);
  const [patientStatusesVisible, setPatientStatusesVisible] = useState(true);

  useEffect(() => {
    const getPatientsDetails = async () => {
      if (currentUser) {
        const { data: loadedPatientsDetails, error } =
          await supabase.supaGetDoctorPatients(currentUser.id);
        if (error) {
          setError(error);
          return;
        }
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
        return loadedPatientsStatuses;
      }
    };

    const getPatientsInfo = async () => {
      const patientsDetailsNew = await getPatientsDetails();
      const patientsStatusesNew = await getPatientsStatuses();
      setPatientsStatuses(patientsStatusesNew);
      setPatientsDetails(patientsDetailsNew);
    };

    getPatientsInfo();
  }, [currentUser?.id]);

  /**
   * Fill the status components for all patient.
   */
  const patientStatusesItems =
    patientsDetails && patientsStatuses
      ? patientsDetails.map((aPatient) => {
          const thing = { ...aPatient };
          delete thing.requestedUpdatesList;
          Object.keys(thing.userInfo).forEach((info) => {
            thing[info] = thing.userInfo[info];
          });
          delete thing.userInfo;
          const aPatientStatuses = patientsStatuses
            .filter((aStatus) => aStatus.id === thing.id)
            .reverse();
          return (
            <SinglePatientStatus
              key={Math.floor(Math.random() * 1000000)}
              setPatientDetails={setPatientDetails}
              patientDetails={thing}
              patientStatusDetails={aPatientStatuses[0]}
              setPatientStatusesVisible={setPatientStatusesVisible}
            />
          );
        })
      : null;

  /**
   * Fill the status history component for a single selected patient.
   */
  const singlePatientStatusesItems =
    patientDetails && !patientStatusesVisible ? (
      <SinglePatientStatusHistory
        patientDetails={patientDetails}
        allPatientStatuses={patientsStatuses
          .filter((aStatus) => aStatus.id === patientDetails.id)
          .reverse()}
        setPatientStatusesVisible={setPatientStatusesVisible}
      />
    ) : null;

  return (
    <Box>
      <Box display={patientStatusesVisible ? "block" : "none"}>
        <Box
          backgroundColor="var(--chakra-colors-gray-100)"
          borderRadius="1rem"
          padding="1rem"
          margin="1rem"
          width="calc(100% - 2rem)"
        >
          <b style={{ fontSize: "1.25rem" }}>My Patients</b>
        </Box>
      </Box>
      <Box
        display={patientStatusesVisible ? "flex" : "none"}
        margin="1rem"
        gap="1rem"
        flexWrap="wrap"
        justifyContent="left"
      >
        {patientStatusesItems}
      </Box>
      <Box>{singlePatientStatusesItems}</Box>
    </Box>
  );
}

export default AllPatientsStatus;
