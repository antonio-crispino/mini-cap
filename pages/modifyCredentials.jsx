import { Container, VStack, Flex, Button, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import SideSection from "../components/SideSection";
import CredentialsForm from "../components/CredentialsForm";
import withAuth from "../components/WithAuth";
import { RightArrow } from "../components/CustomIcons";
import styles from "../styles/authForms.module.css";

function ModifyCredentials() {
  return (
    <Container
      maxW="full"
      p={0}
      bgGradient="linear(to-br, blue.600, purple.700)"
      backgroundImage="url('/images/Background_Light.png')"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    >
      <Flex h="100vh" w="100vw">
        <VStack
          display={{ base: "none", lg: "block" }}
          w={{
            lg: "45%",
          }}
          h="full"
        >
          <SideSection />
        </VStack>
        <VStack
          w={{
            base: "100%", // 0-48em
            lg: "55%",
          }}
          h="full"
          px={{ base: "0", xl: "20px" }}
          justifyContent="center"
          alignItems="center"
        >
          <CredentialsForm />
          <Button
            variant="ghost"
            _hover={{ textDecoration: "underline" }}
            size="lg"
            type="submit"
            color="white"
          >
            <NextLink href="/main">
              <Link>Back</Link>
            </NextLink>
            <RightArrow className={styles.loginIcon} />
          </Button>
        </VStack>
      </Flex>
    </Container>
  );
}

export default withAuth(ModifyCredentials);
