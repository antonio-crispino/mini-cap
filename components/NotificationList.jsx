import { Box, Text, Flex, Heading, HStack } from "@chakra-ui/react";
import { useAppContext } from "../context/AppContext";
import Flag from "./NotifFlag";
import NotifViewButton from "./NotifViewButton";

// TODO: button changes view to the corresponding update
// TODO Check priority to organize Notifications

function NotificationList() {
  const { notifications } = useAppContext();
  const toDate = (dateStr) => dateStr.split("T")[0];

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

      {/* <Heading
        alignSelf="left"
        mb={4}
        color="white"
        fontSize="4xl"
        fontFamily="opensans-extrabold"
      >
        Priority
      </Heading> */}

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
            <HStack>
              <Heading> </Heading>
              <NotifViewButton {...notification} />
              <Flag {...notification} />
            </HStack>
          </Flex>
        </Box>
      ))}
    </Flex>
  );
}

export default NotificationList;
