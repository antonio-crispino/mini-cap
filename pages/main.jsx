import {
  VStack,
  Button,
  Heading,
  createStandaloneToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import withAuth from "../components/WithAuth";
import { useAppContext } from "../context/context";

function Main() {
  const { logout, user } = useAppContext();
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
    </VStack>
  );
}

export default withAuth(Main);
