import { Container, VStack, Flex, Button, Icon } from "@chakra-ui/react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useRouter } from "next/router";

import withAuth from "../components/WithAuth";
import EmailForm from "../components/EmailFrom";
import SideSection from "../components/SideSection";

function EmailPage() {
  const router = useRouter();
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
            lg: "60%",
          }}
          h="full"
          px={{ base: "0", xl: "20px" }}
          justifyContent="center"
          alignItems="center"
        >
          <EmailForm />
          <Button
            bg="none"
            color="white"
            transition="transform 0.7s"
            transform=""
            onClick={() => router.push("/dashboard")}
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
        </VStack>
      </Flex>
    </Container>
  );
}

export default withAuth(EmailPage);
