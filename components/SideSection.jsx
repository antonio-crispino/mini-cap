import { VStack, Heading, Text, Button, Box, Flex } from "@chakra-ui/react";
import { RightArrow } from "./CustomIcons";
import styles from "../styles/SideSection.module.css";

function SideSection() {
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
            size="4xl"
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
            type="submit"
            color="white"
          >
            <Box fontSize={25}>QR-code</Box>
            <RightArrow className={styles.qrBtnIcon} />
          </Button>
        </Box>

        <Text color="#fff" alignSelf="start" justifySelf="flex-end">
          www.anti-covid.com
        </Text>
      </Flex>
    </VStack>
  );
}

export default SideSection;
