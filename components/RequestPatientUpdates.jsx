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

export default function RequestPatientUpdates({ patientId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { supabase, setError, user } = useAppContext();

  const [updatesList, setUpdatesList] = useState({
    temperature: false,
    weight: false,
    nausea: false,
    headache: false,
    lethargy: false,
    vomiting: false,
    soreThroat: false,
    nasalCongestion: false,
    fever: false,
    chestPain: false,
  });

  const sendUpdateRequest = async () => {
    const error = await supabase.supaRequestPatientUpdate(
      patientId,
      user.id,
      updatesList
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
              {Object.keys(updatesList).map((el) => (
                <Checkbox
                  name={el}
                  isChecked={updatesList[el].val}
                  onChange={(e) =>
                    setUpdatesList({
                      ...updatesList,
                      [e.target.name]: e.target.checked,
                    })
                  }
                >
                  {el}
                </Checkbox>
              ))}
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
