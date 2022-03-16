import {Box, Text, Flex, Heading, Button, useControllableState} from "@chakra-ui/react";
import { useAppContext } from "../context/AppContext";

// TODO: button changes view to the corresponding update
function NotificationList() {
  const { notifications } = useAppContext();
  const toDate = (dateStr) => dateStr.split("T")[0];
  const [value, setState] = useControllableState(false);
  const viewed = () => {
    setState(!value);
  };

  return (
    <Flex flexDir="column" mt={5} p={5}>
      <Heading
        alignSelf="center"
        mb={4}
        color="white"
        fontSize="4xl"
        fontFamily="opensans-extrabold"
      >
        Notifications
      </Heading>
      {notifications.map((notification, index) => (
        <Box
          w="100%"
          bg="white"
          boxShadow="sm"
          rounded="15px"
          maxW="100%"
          py={4}
          px={10}
          key={`${index}-${notification.userId}`}
          my={1}
          opacity={0.8}
        >
          <Flex justifyContent="space-between">
            <Box alignContent="space-between">
              <Text fontFamily="opensans-bold" fontSize={[16, 20]}>
                {notification.info}
              </Text>
              <Text fontSize={[16, 20]}>{` Received On: ${toDate(
                notification.created_at
              )}`}</Text>
            </Box>

            <Button
              onClick={viewed}
              type="button"
              colorScheme={value ? "blue" : "red"}
            >
              {value ? "Mark as Unread" : "View"}
            </Button>
          </Flex>
        </Box>
      ))}
    </Flex>
  );
}

export default NotificationList;
