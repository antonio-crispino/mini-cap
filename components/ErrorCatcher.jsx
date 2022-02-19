/* eslint-disable react/display-name */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";
import { useAppContext } from "../context/context";

export default function ErrorCatcher(props) {
  const { error, setError } = useAppContext();
  const { callback } = props;
  let { message } = props;

  const Close = () => {
    if (message) {
      callback();
      message = null;
      return;
    }
    setError(null);
  };

  if (error || message) {
    return (
      <Modal isOpen={error || message} onClose={Close}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{error?.message || message}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={Close}>
              Close
            </Button>
            <Button variant="ghost" onClick={Close}>
              Secondary Action
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }

  return "";
}
