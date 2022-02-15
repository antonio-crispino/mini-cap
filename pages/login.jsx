import { Container, VStack, Flex, Box } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";
import SideSection from "../components/SideSection";

const LoginPage = () => {
  return (
    <Container
      maxW="full"
      p={0}
      bgGradient="linear(to-br, blue.600, purple.700)"
      backgroundImage="url('/images/Background_Light.png')"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    >
      <Flex h="100vh"  w="100vw">
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
          p={0}
          justifyContent="center"
          alignItems="center"
        >
          <LoginForm />
        </VStack>
      </Flex>
    </Container>
  );
};

export default LoginPage;
