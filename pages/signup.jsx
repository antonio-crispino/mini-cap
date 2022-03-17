import { Container, VStack, Flex } from "@chakra-ui/react";
import SideSection from "../components/SideSection";
import SignupForm from "../components/SignupForm";

function SignupPage() {
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
            base: "100%",
            lg: "55%",
          }}
          h="full"
          px={{ base: "0", xl: "20px" }}
          justifyContent="center"
          alignItems="center"
        >
          <SignupForm />
        </VStack>
      </Flex>
    </Container>
  );
}

export default SignupPage;
