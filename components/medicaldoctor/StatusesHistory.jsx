import { useState, useEffect } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { useAppContext } from "../../context/AppContext";
import PatientTableRow from "./PatientTableRow";
import SinglePatientStatusHistory from "./SinglePatientStatusHistory";
// import PatientTableColumnHeads from "./PatientTableColumnHeads";
import ChartData from "./ChartData";

function StatusesHistory() {
  const { user: currentUser, supabase, setError } = useAppContext();
  const [patientDetails, setPatientDetails] = useState(() => null);
  const [patientsDetails, setPatientsDetails] = useState(() => null);
  const [patientsStatuses, setPatientsStatuses] = useState(() => null);
  const [patientStatusesVisible, setPatientStatusesVisible] = useState(true);

  useEffect(() => {
    const getPatientsDetails = async () => {
      if (currentUser) {
        const { data: loadedPatientsDetails, error } =
          currentUser.userType === "doctor"
            ? await supabase.supaGetPatients()
            : await supabase.supaGetDoctorPatients(currentUser.id);
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
          currentUser.userType === "doctor"
            ? await supabase.supaGetPatientsStatuses()
            : await supabase.supaGetDoctorPatientsStatuses(currentUser.id);
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
   * Fill the statuses rows for each patient.
   */
  const patientStatusesRow =
    patientsDetails && patientsStatuses
      ? patientsDetails.map((aPatient) => {
          const thing = { ...aPatient };
          delete thing.requestedUpdatesList;
          Object.keys(thing.userInfo).forEach((info) => {
            thing[info] = thing.userInfo[info];
          });
          delete thing.userInfo;
          delete thing.doctorInfo;
          const aPatientStatuses = patientsStatuses
            .filter((aStatus) => aStatus.id === thing.id)
            .reverse();
          return (
            <PatientTableRow
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
   * Export datat to charts.
   */

  const chart =
    patientsDetails && patientsStatuses
      ? patientsDetails.map((aPatient) => {
          const thing = { ...aPatient };
          delete thing.requestedUpdatesList;
          Object.keys(thing.userInfo).forEach((info) => {
            thing[info] = thing.userInfo[info];
          });
          delete thing.userInfo;
          delete thing.doctorInfo;
          const aPatientStatuses = patientsStatuses
            .filter((aStatus) => aStatus.id === thing.id)
            .reverse();
          return (
            <ChartData
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
   * Fill the headings of the columns.
   */
  /*
  const columnHeadings =
    patientsDetails && patientsStatuses
      ? patientsDetails.map((aPatient) => {
          const thing = { ...aPatient };
          delete thing.requestedUpdatesList;
          delete thing.userInfo;
          delete thing.doctorInfo;
          const aPatientStatuses = patientsStatuses
            .filter((aStatus) => aStatus.id === thing.id)
            .reverse();
          return (
            <PatientTableColumnHeads
              key={Math.floor(Math.random() * 1000000)}
              patientStatusDetails={aPatientStatuses[0]}
              setPatientStatusesVisible={setPatientStatusesVisible}
            />
          );
        })
      : null;
      */

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
    <Box margin="2rem">
      <Box
        backgroundColor="var(--chakra-colors-gray-100)"
        borderRadius="1rem"
        padding="1rem"
        margin="1rem"
        width="calc(30% -1rem)"
      >
        <b style={{ fontSize: "1.25rem" }} justifyContent="left">
          My Patients History
        </b>
      </Box>
      <Box
        width="calc(80% - 1rem)"
        margin="3rem"
        gap="1rem"
        flexWrap="wrap"
        justifyContent="left"
      >
        <TableContainer>
          <Table variant="striped" colorScheme="purple" color="black">
            <TableCaption placement="top" color="black">
              Lastest Status Update
            </TableCaption>
            <Thead>
              <Tr>
                <Th color="black">Name</Th>
                <Th color="black">Weight</Th>
                <Th color="black">Temperture</Th>
                <Th color="black">Nausea</Th>
                <Th color="black">Headache</Th>
                <Th color="black">Lethargy</Th>
                <Th color="black">Vomiting</Th>
                <Th color="black">Sore Throat</Th>
                <Th color="black">Nasal Congestion</Th>
                <Th color="black">Fever</Th>
                <Th color="black">Chest Pain</Th>
              </Tr>
            </Thead>
            <Tbody>{patientStatusesRow}</Tbody>
            <Tfoot>
              <Tr>
                <Th color="black">Name</Th>
                <Th color="black">Weight</Th>
                <Th color="black">Temperture</Th>
                <Th color="black">Nausea</Th>
                <Th color="black">Headache</Th>
                <Th color="black">Lethargy</Th>
                <Th color="black">Vomiting</Th>
                <Th color="black">Sore Throat</Th>
                <Th color="black">Nasal Congestion</Th>
                <Th color="black">Fever</Th>
                <Th color="black">Chest Pain</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
      <Box
        display={patientStatusesVisible ? "flex" : "none"}
        margin="1rem"
        gap="1rem"
        flexWrap="wrap"
        justifyContent="left"
      >
        {chart}
      </Box>
      <Box margin="1rem" gap="1rem" flexWrap="wrap" justifyContent="left">
        {singlePatientStatusesItems}
      </Box>
    </Box>
  );
}

export default StatusesHistory;
