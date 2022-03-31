import { ViewIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";

import { useState } from "react";
// import { useAppContext } from "../context/AppContext";

function RequestPatientAppointment({ patientData }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [isError, setIsError] = useState(false);
  console.log({ selectedTime, patientData });
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { supabase, setError, user } = useAppContext();

  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  const notesChangeHandler = (e) => {
    const inputValue = e.target.value;
    setNotes(inputValue);
  };

  const locationChangeHandler = (e) => {
    const inputValue = e.target.value;
    setLocation(inputValue);
  };

  const timeChangeHandler = (e) => {
    const time = e.target.value;
    const isValid = time.match("^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$");
    setIsError(isValid === null);
    setSelectedTime(time);
    if (isValid) {
      const timeArray = time.split(":");
      selectedDate.setHours(timeArray[0], timeArray[1]);
      setSelectedDate(selectedDate);
    }
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="purple" leftIcon={<ViewIcon />}>
        Schedule Appointment
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Specify Appointment Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl my={5}>
              <FormLabel>Subject</FormLabel>
              <Input
                id="subject"
                placeholder="Appointment title here ..."
                bg="white"
                size="lg"
              />
            </FormControl>
            <FormControl my={5}>
              <FormLabel htmlFor="date-input" placeholder="date">
                Date
              </FormLabel>

              <SingleDatepicker
                name="date-input"
                date={selectedDate}
                onDateChange={setSelectedDate}
                propsConfigs={{
                  dateNavBtnProps: {
                    colorScheme: "blue",
                    variant: "outline",
                  },
                  dayOfMonthBtnProps: {
                    borderColor: "red.300",
                    selectedBg: "blue.200",
                    _hover: {
                      bg: "blue.400",
                    },
                  },
                  inputProps: {
                    size: "lg",
                    placeholder: "date",
                  },
                }}
              />
            </FormControl>
            <FormControl isInvalid={isError} my={5}>
              <FormLabel htmlFor="time">Time</FormLabel>
              <Input
                id="time"
                placeholder="Format must be HH:MM"
                onChange={(e) => timeChangeHandler(e)}
                bg="white"
                size="lg"
              />
              {!isError ? (
                <FormHelperText>
                  Please make sure the format is HH:MM for example 20:45
                </FormHelperText>
              ) : (
                <FormErrorMessage>Wrong format! must be HH:MM</FormErrorMessage>
              )}
            </FormControl>

            <FormControl my={5}>
              <FormLabel htmlFor="location">Location</FormLabel>

              <Input
                id="location"
                value={location}
                onChange={(e) => locationChangeHandler(e)}
                placeholder="Here is a sample placeholder"
                size="lg"
              />
              <FormHelperText>
                Location can be a physical address or an online conferencing
                link
              </FormHelperText>
            </FormControl>

            <FormControl my={5}>
              <FormLabel htmlFor="notes">Notes</FormLabel>

              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => notesChangeHandler(e)}
                placeholder="Here is a sample placeholder"
                size="lg"
              />
              <FormHelperText>
                Add any notes yor would like the patient to know
              </FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue">Schedule Appointment</Button>
            <Button colorScheme="red" ml={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default RequestPatientAppointment;
