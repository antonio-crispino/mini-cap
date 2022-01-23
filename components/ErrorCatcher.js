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
  Text
} from '@chakra-ui/react'
import { useAppContext } from '../context/context';

export default function ErrorCatcher() {
  const { error, setError } = useAppContext()
  if (error){
    return (
      <Modal isOpen={error} onClose={() => setError(null)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{error.message}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => setError(null)}>
              Close
            </Button>
            <Button variant='ghost' onClick={() => setError(null)}>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    );
  }

    return ''
}
