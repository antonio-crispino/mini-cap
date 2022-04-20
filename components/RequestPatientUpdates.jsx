/* eslint-disable no-restricted-syntax */
import { ViewIcon } from "@chakra-ui/icons";
import {
  Button,
  Checkbox,
  createStandaloneToast,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";

export default function RequestPatientUpdates({ patientData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { supabase, setError, user } = useAppContext();

  const [hasPriority, setHasPriority] = useState(
    patientData?.isPriority || false
  );
  const [updatesList, setUpdatesList] = useState([
    { val: false, name: "temperature", json: "temperature" },
    { val: false, name: "weight", json: "weight" },
    { val: false, name: "nausea", json: "nausea" },
    { val: false, name: "headache", json: "headache" },
    { val: false, name: "lethargy", json: "lethargy" },
    { val: false, name: "vomiting", json: "vomiting" },
    { val: false, name: "sore throat", json: "soreThroat" },
    { val: false, name: "nasal congestion", json: "nasalCongestion" },
    { val: false, name: "fever", json: "fever" },
    { val: false, name: "chest pain", json: "chestPain" },
  ]);

  const sendUpdateRequest = async () => {
    const doctorRequestedList = {};
    for (const el of updatesList) {
      doctorRequestedList[el.json] = el.val;
    }
    const error = await supabase.supaRequestPatientUpdate(
      patientData.id,
      user.id,
      doctorRequestedList,
      hasPriority
    );
    if (error) {
      setError(error);
    }
    const toast = createStandaloneToast();

    toast({
      title: "Requested successfully!",
      description: "Patient updates have been requested successfully ",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };
  const handleUpdateList = (idx, val) => {
    const newList = [...updatesList];
    newList[idx].val = val;
    setUpdatesList(newList);
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue" leftIcon={<ViewIcon />}>
        Request Followup
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>What Updates do you want to know about ?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={5} direction="column">
              {updatesList.map((el, idx) => (
                <Checkbox
                  name={el.name}
                  key={el.name}
                  isChecked={updatesList[idx].val}
                  onChange={(e) => handleUpdateList(idx, e.target.checked)}
                >
                  {el.name}
                </Checkbox>
              ))}
              <Checkbox
                isChecked={hasPriority}
                colorScheme="red"
                onChange={(e) => setHasPriority(e.target.checked)}
                color="red.400"
                fontWeight="bold"
              >
                Mark as Priority
              </Checkbox>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={sendUpdateRequest}>
              Request
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
