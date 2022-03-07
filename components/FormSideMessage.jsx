import { VStack, Heading, Text, Button, Box, Flex } from "@chakra-ui/react";
import { RightArrow } from "./CustomIcons";
import styles from "../styles/sideSection.module.css";

/**
 * This component is a generic placeholder for the admin edit forms
 * Can be replaced to add more features later on
 */
function FormSideMessage() {
  return (
    <VStack h="100%" w="full" py={20} px={10} className={styles.sideStack}>
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        h="100%"
      >
        <Box m={0} p={0} h="0vh" w="0vw" />

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
