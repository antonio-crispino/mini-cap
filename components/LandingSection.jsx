import { VStack, Flex, Text, Container } from "@chakra-ui/react";
import { VirusGreen } from "./CustomIcons";
import styles from "../styles/landing.module.css";
import Navbar from "./NavBar";

function LandingSection() {
  return (
    <Container w="full" h="full">
      <Navbar bg="#fff" />
      <VStack h="full" w="full">
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDir="column"
          h="full"
          w="full"
        >
          <VirusGreen
            className={styles.virusIcon}
            fontSize={{ base: "250px", lg: "350px", xl: "400px" }}
          />
          <Text fontSize="2xl" fontFamily="opensans-bold" color="white">
            COVID-19 Tracking & Contact Tracing
          </Text>
          <Text fontSize="xl" fontFamily="opensans-bold" color="white">
            Sign up today!
          </Text>
        </Flex>
      </VStack>
    </Container>
  );
}

export default LandingSection;
