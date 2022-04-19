import {
  Container,
  VStack,
  Flex,
  Button,
  Link,
  createStandaloneToast,
  Popover,
  initialFocusRef,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverBody,
  PopoverFooter,
  ButtonGroup,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import SideSection from "../components/SideSection";
import CredentialsForm from "../components/CredentialsForm";
import PasswordResetForm from "../components/PasswordResetForm";
import withAuth from "../components/WithAuth";
import { RightArrow } from "../components/CustomIcons";
import { useAppContext } from "../context/AppContext";

function ModifyCredentials() {
  const { logout, user, setToInactive } = useAppContext();
  const router = useRouter();
  const deleteAccount = async () => {
    const response = await setToInactive(user.email, "users");
    if (!response) {
      const toast = createStandaloneToast();
      toast({
        title: "Account set for deletion. Will be deleted in 14 days.",
        description: "Loging Out",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      router.push("/");
      await logout();
    }
  };
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
            <RightArrow
              style={{
                fontSize: "25px",
                margin: "5px",
              }}
            />
          </Button>
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
          style={{
            marginTop: "100px",
          }}
        >
          <PasswordResetForm />
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
          style={{
            marginTop: "80px",
          }}
        >
          <Popover
            initialFocusRef={initialFocusRef}
            placement="bottom"
            closeOnBlur={false}
          >
            {({ onClose }) => (
              <>
                <PopoverTrigger>
                  <Button
                    variant="solid"
                    color="teal"
                    size="lg"
                    w="full"
                    type="submit"
                    maxWidth="50%"
                  >
                    Delete Account
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  color="white"
                  bg="blue.600"
                  borderColor="purple.700"
                >
                  <PopoverHeader pt={4} fontWeight="bold" border="0">
                    Comfirm Account Deletion
                  </PopoverHeader>

                  <PopoverArrow />
                  <PopoverBody>
                    Once you confirm, your account will set to INACTIVE and it
                    will be permanently DELETED in 14 days.
                  </PopoverBody>
                  <PopoverFooter
                    border="0"
                    d="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    pb={4}
                  >
                    <ButtonGroup size="sm">
                      <Button
                        colorScheme="green"
                        onClick={async () => deleteAccount()}
                      >
                        Delete Acount
                      </Button>
                      <Button colorScheme="red" onClick={onClose}>
                        Cancel
                      </Button>
                    </ButtonGroup>
                  </PopoverFooter>
                </PopoverContent>
              </>
            )}
          </Popover>
        </VStack>
      </Flex>
    </Container>
  );
}

export default withAuth(ModifyCredentials);
