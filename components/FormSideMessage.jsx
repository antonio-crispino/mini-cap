import {
  VStack,
  Heading,
  Text,
  Button,
  Box,
  Flex,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { RightArrow } from "./CustomIcons";
import styles from "../styles/sideSection.module.css";
import { useAppContext } from "../context/AppContext";
import { ALL_USERS_TABLE } from "../utils/types";

/**
 * This component is a generic placeholder for the admin edit forms
 * Can be replaced to add more features later on
 */
function FormSideMessage() {
  const { setComponentInView, setExpandedCard } = useAppContext();

  const moveBackHandler = () => {
    setExpandedCard({});
    setComponentInView(ALL_USERS_TABLE);
  };
  return (
    <VStack h="100%" w="full" py={20} px={10} className={styles.sideStack}>
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        h="100%"
      >
        <HStack
          alignSelf="start"
          justifySelf="start"
          w="full"
          color="white"
          fontWeight="bold"
        >
          <Button
            bg="none"
            color="white"
            transition="transform 0.7s"
            transform=""
            onClick={moveBackHandler}
            p={1}
            borderRadius={9}
            _hover={{
              transform: "scale(1.05)",
              transition: "transform 0.7s",
            }}
            _active={{ backgroundColor: "none" }}
          >
            <Icon fontSize={35} as={IoArrowBackCircleOutline} />
            Back
          </Button>
          <Text />
        </HStack>

        <Box justifySelf="end">
          <Heading
            as="h1"
            size="2xl"
            fontFamily="opensans-extrabold"
            color="#fff"
          >
            The
            <br /> Anti-Covid
            <br /> Web app
          </Heading>

          <Button
            variant="ghost"
            _hover={{ textDecoration: "underline" }}
            size="lg"
            color="white"
            outline="none"
          >
            <Box fontSize={25}>QR-code</Box>
            <RightArrow className={styles.qrBtnIcon} />
          </Button>
        </Box>
        <Text fontSize={15} color="white" textAlign="center">
          Please use the side drawer to choose specific user type if you need to
          modify role details
        </Text>
      </Flex>
    </VStack>
  );
}

export default FormSideMessage;
