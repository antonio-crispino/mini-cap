import { Container, VStack, Flex } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";

function LoginPage() {
  return (
    <Container
      maxW="full"
      p={0}
      bgGradient="linear(to-br, blue.600, purple.700)"
    >
      <Flex h="100vh" py={25} w="full">
        <VStack bg="blue.50" w="full" h="full" alignItems="flex-start" />
        <VStack w="full" h="full" p={0} justifyContent="center">
          <LoginForm />
        </VStack>
      </Flex>
    </Container>
  );
}

export default LoginPage;
