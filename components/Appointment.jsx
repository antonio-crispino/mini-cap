import {
  Box,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";

import { useAppContext } from "../context/AppContext";

function Appointment() {
  const { user } = useAppContext();
  return (
    <Box
      w={{
        sm: "100%",
        md: "48em",
        lg: "62em",
        xl: "80em",
        "2xl": "96em",
      }}
      bg="gray.200"
      overflow="hidden"
      boxShadow="sm"
      rounded="10px"
      maxW="100%"
      p={4}
    >
      <TableContainer p={3}>
        <Table variant="striped">
          <Tbody>
            <Tr>
              <Td fontWeight="extrabold">Patient</Td>
              <Td>Khairo Khatib</Td>
            </Tr>
            <Tr>
              <Td fontWeight="extrabold">Subject</Td>
              <Td>Checkup</Td>
            </Tr>
            <Tr>
              <Td fontWeight="extrabold">Location</Td>
              <Td>
                https://us04web.zoom.us/j/78402130339?pwd=1kYn6Po3qrH9RWgTy0sbDLWUJFFZV5.1
              </Td>
            </Tr>
            <Tr>
              <Td fontWeight="extrabold">When</Td>
              <Td>Thu Mar 31 2022 22:13:07</Td>
            </Tr>
            <Tr>
              <Td fontWeight="extrabold">Notes</Td>
              <Td>Masks are mandatory</Td>
            </Tr>
            <Tr>
              <Td fontWeight="extrabold">Status</Td>
              <Td>Confirmed</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Button m={5} colorScheme="red">
        Cancel
      </Button>
      {user.userType === "patient" && (
        <Button m={5} colorScheme="purple">
          Reject
        </Button>
      )}
    </Box>
  );
}

export default Appointment;
