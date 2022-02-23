import NextLink from "next/link";
import { Container, Link, Flex, VStack, Button } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import withAuth from "../components/WithAuth";
import CredentialsForm from "../components/CredentialsForm";

function ModifyCredentials() {
  return (
    <Container
      maxW="full"
      centerContent
      bgGradient="linear(to-br, blue.600, purple.700)"
    >
      <Flex flexDir="row" h="100vh" maxW="full">
        {/* Sidebar column(1) */}
        <Flex flexDir="column" w="15%" alignItems="center">
          <Sidebar />
        </Flex>

        {/* Form and Back button column(2) */}
        <Flex
          flexDir="column"
          maxW="full"
          alignItems="center"
          // justifyContent="space-between"
        >
          {/* Form row */}
          <Flex
            maxW="full"
            // backgroundColor="purple.700"
            alignItems="center"
          >
            <VStack w="full" h="full" p={0} justifyContent="center">
              <CredentialsForm />
            </VStack>
          </Flex>

          {/* Back button row */}
          <Flex maxW="full" alignItems="center">
            <Button colorScheme="teal" mr="4">
              <NextLink href="/main">
                <Link>Back</Link>
              </NextLink>
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
}
export default withAuth(ModifyCredentials);
