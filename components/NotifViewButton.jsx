import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Button,
  useControllableState,
} from "@chakra-ui/react";
import { useAppContext } from "../context/AppContext";

function NotifViewButton({ ...notification }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { supabase } = useAppContext();
  const [readValue = notification.read, setState] = useControllableState(
    notification.read
  );
  const viewed = () => {
    onClose();
    setState(true);

    const readUpdate = {
      read: true,
    };
    const matchId = {
      id: notification.id,
    };
    supabase.updateTableBy("notifications", readUpdate, matchId);
  };
  const unread = () => {
    onClose();
    setState(false);

    const readUpdate = {
      read: false,
    };
    const matchId = {
      id: notification.id,
    };
    supabase.updateTableBy("notifications", readUpdate, matchId);
  };

  return (
    <>
      <Button
        colorScheme="blue"
        variant={readValue ? "outline" : "solid"}
        onClick={onOpen}
        type="button"
        data-testid="notif-view-btn"
      >
        {readValue ? "Viewed" : "View"}
      </Button>
      <Modal isOpen={isOpen} onClose={viewed}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{notification.info}</ModalHeader>
          <ModalCloseButton />

          <ModalFooter>
            <Button mr={3} onClick={viewed}>
              Close
            </Button>
            <Button onClick={unread}>Mark as Unread</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NotifViewButton;
