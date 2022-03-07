import { Badge, Box, Button, Center, Image, Text } from "@chakra-ui/react";

import { useAppContext } from "../context/AppContext";
import { CARD_DETAILS } from "../utils/types";

function Card({ fullObj }) {
  const { setExpandedCard, setComponentInView } = useAppContext();
  const { userInfo } = fullObj;
  const { userType, firstname, lastname, email } = userInfo || fullObj;
  const { symptoms, doctorInfo } = fullObj || {
    symptoms: false,
    doctorInfo: false,
  };

  const viewDetailsHandler = (userObj) => {
    let passedCardDetails = { ...userObj };
    if (!userInfo) {
      passedCardDetails = {
        ...userObj,
        userInfo: { userType: userObj.userType },
      };
    }
    setExpandedCard(passedCardDetails);
    setComponentInView(CARD_DETAILS);
  };
  return (
    <Box
      w="280px"
      bg="gray.200"
      overflow="hidden"
      boxShadow="sm"
      rounded="20px"
      maxW="100%"
    >
      <Image src="/images/card.png" alt="cover image" />
      <Box p={2}>
        <Badge variant="solid" px={2} mx={2} colorScheme="blue" rounded="full">
          {userType}
        </Badge>

        <Badge
          variant="solid"
          px={2}
          mx={1}
          colorScheme="red"
          rounded="full"
          display={symptoms ? "default" : "none"}
        >
          symptoms
        </Badge>

        <Badge
          variant="solid"
          px={2}
          colorScheme="purple"
          rounded="full"
          display={doctorInfo ? "default" : "none"}
        >
          has doc
        </Badge>
      </Box>
      <Box p={5}>
        <Center flexDir="column">
          <Text>Name: {`${firstname} ${lastname}`}</Text>
          <Text>{email}</Text>
        </Center>
      </Box>
      <Box p={5}>
        <Center>
          <Button
            variant="solid"
            size="sm"
            colorScheme="teal"
            w="full"
            onClick={() => viewDetailsHandler(fullObj)}
          >
            Details
          </Button>
        </Center>
      </Box>
    </Box>
  );
}

export default Card;
