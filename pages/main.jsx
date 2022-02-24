import NextLink from "next/link";
import {
  Link,
  VStack,
  Button,
  Heading,
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
import { useRouter } from "next/router";
import withAuth from "../components/WithAuth";
import { useAppContext } from "../context/context";

function Main() {
  const { logout, user, setToInactive } = useAppContext();
  const router = useRouter();

  const signout = async () => {
    router.push("/");
    const error = await logout();
    if (!error) {
      const toast = createStandaloneToast();
      toast({
        title: "logout successful.",
        description: "redirecting you to home page",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
    }
  };

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
    <VStack gap={3} alignItems="center">
      <Heading as="h2">
        {" "}
        Hello {user.firstname} {user.lastname}
      </Heading>
      <Button
        variant="solid"
        color="teal"
        size="lg"
        w="full"
        type="submit"
        maxWidth="25%"
        onClick={() => router.push("/admindash")}
      >
        Admin Dashboard
      </Button>
      <Button
        variant="solid"
        color="teal"
        size="lg"
        w="full"
        type="submit"
        maxWidth="25%"
        onClick={async () => signout()}
      >
        Logout
      </Button>

      <Button
        variant="solid"
        color="teal"
        size="lg"
        w="full"
        type="submit"
        maxWidth="25%"
      >
        <NextLink href="/modifyCredentials">
          <Link>Modify Credentials</Link>
        </NextLink>
      </Button>

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
                maxWidth="25%"
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
                Once you confirm, you will have 14 days to reactivate your
                account, after which your account will be permananteley deleted.
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
  );
}

export default withAuth(Main);
