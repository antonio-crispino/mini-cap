import {
  Box,
  Button,
  createStandaloneToast,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";

import { useAppContext } from "../context/AppContext";

function Appointment({ appointment }) {
  const { user, supabase, setError } = useAppContext();
  const [buttonAction, setButtonAction] = useState(appointment.status);
  const [localAppointment, setLocalAppointment] = useState({ ...appointment });
  const handleAppointmentStatus = async (e) => {
    const response = await supabase.setAppointmentStatus(
      appointment.id,
      e.target.id
    );
    if (response.error) {
      setError(response.error);
    } else {
      const toast = createStandaloneToast();
      toast({
        title: "Appointment answer sent!",
        description: "successfully updated the status of the appointment",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setButtonAction(e.target.id);

      setLocalAppointment({ ...localAppointment, status: e.target.id });
    }
  };
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
              <Td>{`${localAppointment.firstname || user.firstname} ${
                localAppointment.lastname || user.lastname
              }`}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="extrabold">Subject</Td>
              <Td>{localAppointment.subject}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="extrabold">Location</Td>
              <Td>{localAppointment.location}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="extrabold">When</Td>
              <Td>{localAppointment.date}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="extrabold">Notes</Td>
              <Td>{localAppointment.notes}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="extrabold">Status</Td>
              <Td>{localAppointment.status}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      {buttonAction !== "Canceled" && (
        <Button
          id="Canceled"
          m={4}
          colorScheme="red"
          data-testid="cancel-btn"
          onClick={(e) => handleAppointmentStatus(e)}
        >
          Cancel
        </Button>
      )}

      {user.userType === "patient" && buttonAction === "Not-Confirmed" && (
        <>
          <Button
            id="Rejected"
            m={4}
            colorScheme="purple"
            onClick={(e) => handleAppointmentStatus(e)}
            data-testid="reject-btn"
          >
            Reject
          </Button>
          <Button
            id="Confirmed"
            data-testid="accept-btn"
            m={4}
            colorScheme="green"
            onClick={(e) => handleAppointmentStatus(e)}
          >
            Accept
          </Button>
        </>
      )}
    </Box>
  );
}

export default Appointment;
