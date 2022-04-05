import { ViewIcon } from "@chakra-ui/icons";
import {
  Button,
  createStandaloneToast,
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
import { useAppContext } from "../context/AppContext";

function RequestPatientAppointment({ patientData }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isError, setIsError] = useState(false);
  const [emptyFields, setEmptyFields] = useState({
    location: false,
    subject: false,
    date: false,
    time: false,
  });

  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [subject, setSubject] = useState("");

  const { supabase, setError, user } = useAppContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const submitAppointment = async () => {
    const appointmentDetails = {
      patientId: patientData.id,
      doctorId: user.id,
      subject,
      date: selectedDate,
      location,
      notes,
    };

    const answer = await supabase.scheduleAppointment(appointmentDetails);

    if (answer.error) {
      setError(answer.error);
      return;
    }

    const toast = createStandaloneToast();

    toast({
      title: "Scheduled successfully!",
      description:
        "appointment have been requested successfully, patient will be notified",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const subjectChangeHandler = (e) => {
    const inputValue = e.target.value;
    setSubject(inputValue);
    setEmptyFields({ ...emptyFields, subject: inputValue === "" });
  };

  const notesChangeHandler = (e) => {
    const inputValue = e.target.value;
    setNotes(inputValue);
  };

  const locationChangeHandler = (e) => {
    const inputValue = e.target.value;
    setLocation(inputValue);
    setEmptyFields({ ...emptyFields, location: inputValue === "" });
  };

  const timeChangeHandler = (e) => {
    const time = e.target.value;
    const isValid = time.match("^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$");
    setIsError(isValid === null);
    setEmptyFields({ ...emptyFields, time: time === "" });
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
            <FormControl my={5} isInvalid={emptyFields.subject}>
              <FormLabel>Subject</FormLabel>
              <Input
                id="subject"
                placeholder="Appointment title here ..."
                onChange={(e) => subjectChangeHandler(e)}
                onFocus={(e) => subjectChangeHandler(e)}
                bg="white"
                size="lg"
              />
            </FormControl>
            <FormControl my={5} isInvalid={emptyFields.date}>
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
            <FormControl isInvalid={isError || emptyFields.time} my={5}>
              <FormLabel htmlFor="time">Time</FormLabel>
              <Input
                id="time"
                placeholder="Format must be HH:MM"
                onChange={(e) => timeChangeHandler(e)}
                onFocus={(e) => timeChangeHandler(e)}
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

            <FormControl my={5} isInvalid={emptyFields.location}>
              <FormLabel htmlFor="location">Location</FormLabel>

              <Input
                id="location"
                value={location}
                onChange={(e) => locationChangeHandler(e)}
                onFocus={(e) => locationChangeHandler(e)}
                placeholder="Location of appointment (zoom link, address ..etc)"
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
                placeholder="Write any additional details here"
                size="lg"
              />
              <FormHelperText>
                Add any notes yor would like the patient to know
              </FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={submitAppointment}
              disabled={
                emptyFields.date ||
                emptyFields.location ||
                emptyFields.subject ||
                emptyFields.time ||
                subject === "" ||
                isError
              }
            >
              Schedule Appointment
            </Button>
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
