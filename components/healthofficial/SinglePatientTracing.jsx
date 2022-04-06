/* eslint-disable no-nested-ternary */
import React from "react";
import {
  Box,
  List,
  ListItem,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy } from "react-table";
import { useAppContext } from "../../context/AppContext";
import { useDataContext } from "../../context/DataContext";
import { PATIENTS_TRACING_TABLE } from "../../utils/types";

function SinglePatientTracing() {
  const {
    user: currentUser,
    supabase,
    setError,
    patient,
    setComponentInView,
    setTracedPatients,
  } = useAppContext();
  const { patients } = useDataContext();
  const [patientTraces, setPatientTraces] = React.useState([]);

  const viewPatientsInBusiness = async (businessId, enteredAt, exitedAt) => {
    const { data: filteredPatientQrs, error } =
      await supabase.supaGetTracedPatients(businessId);

    if (error) {
      setError(error);
      return;
    }

    const patientQrsInContact = filteredPatientQrs
      .filter(
        (visitor) =>
          ((visitor.entered_at >= enteredAt &&
            visitor.entered_at <= exitedAt) ||
            (visitor.exited_at >= enteredAt &&
              visitor.exited_at <= exitedAt)) &&
          visitor.id_patient !== patient.id
      )
      .map((visitor) => visitor.id_patient);

    const patientsInContact = [...patients].filter((aPatient) =>
      patientQrsInContact.includes(aPatient.id)
    );

    setTracedPatients(patientsInContact);
    setComponentInView(PATIENTS_TRACING_TABLE);
  };

  React.useEffect(() => {
    const getPatientsTracingDetails = async () => {
      if (currentUser) {
        const { data: tracingDetails, error } =
          await supabase.supaGetPatientTraces(patient.id);
        if (error) {
          setError(error);
          return;
        }
        setPatientTraces(tracingDetails);
      }
    };
    getPatientsTracingDetails();
  }, [currentUser?.id]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Business",
        accessor: "id_business",
      },
      {
        Header: "Entered",
        accessor: "entered_at",
      },
      {
        Header: "Exited",
        accessor: "exited_at",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: patientTraces }, useSortBy);

  return (
    <Box>
      <Box
        backgroundColor="var(--chakra-colors-gray-100)"
        borderRadius="0.25rem"
        padding="1rem"
        margin="1rem"
        marginTop="-1rem"
        width="calc(100% - 2rem)"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          paddingBottom="0.5rem"
          flexDirection="column"
        >
          <List>
            <ListItem fontSize="1.25rem">
              <b>{`${patient.userInfo.firstname} ${
                patient.userInfo.middlename || ""
              } ${patient.userInfo.lastname}`}</b>
              {` (${patient.id})`}
            </ListItem>
            <ListItem>
              <b>Medical Card Number: </b>
              {patient.medicalCardNum}
            </ListItem>
            <ListItem>
              <b>Email: </b>
              {patient.userInfo.email}
            </ListItem>
            <ListItem>
              <b>Phone Number: </b>
              {patient.userInfo.phonenumber}
            </ListItem>
            <ListItem paddingTop="1rem">
              <i>
                Click on a row below to see all patients that were in a business
                between the specified times.
              </i>
            </ListItem>
          </List>
        </Box>
      </Box>
      <Table
        {...getTableProps()}
        backgroundColor="var(--chakra-colors-gray-100)"
        variant="simple"
        width="calc(100% - 2rem)"
        margin="1rem"
        borderRadius="0.25rem"
      >
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  isNumeric={column.isNumeric}
                >
                  {column.render("Header")}
                  <chakra.span pl="4">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr
                {...row.getRowProps()}
                cursor="pointer"
                onClick={() =>
                  viewPatientsInBusiness(
                    row?.cells[0]?.value,
                    row?.cells[1]?.value,
                    row?.cells[2]?.value
                  )
                }
              >
                {row.cells.map((cell) => (
                  <Td
                    {...cell.getCellProps()}
                    isNumeric={cell.column.isNumeric}
                  >
                    {cell.render("Cell")}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}

export default SinglePatientTracing;
