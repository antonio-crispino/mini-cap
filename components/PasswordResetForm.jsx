import {
  VStack,
  Button,
  Flex,
  Box,
  createStandaloneToast,
  Text,
} from "@chakra-ui/react";
// import { useForm } from "react-hook-form";
// import { useRouter } from "next/router";
import { useAppContext } from "../context/context";
// import styles from "../styles/sideSection.module.css";

function PasswordResetForm() {
  /* const {
    // register,
    // handleSubmit,
    // formState: { errors },
  } = useForm();
  */
  const { sendRestToEmail, user } = useAppContext();
  // const router = useRouter();

  const resetPassword = async () => {
    const response = await sendRestToEmail(user.email);
    if (!response) {
      const toast = createStandaloneToast();
      toast({
        title: "Resset Email Sent",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    // <form style={{ width: "100%" }}>

    <VStack h="100%" w="full" py={20} px={10}>
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        w="50%"
        h="50%"
      >
        <Box m={0} p={0} h="0vh" w="0vw" />

        <Box justifySelf="end">
          <Text color="#fff" alignSelf="start" justifySelf="flex-end">
            Once you request a resset, you will receive an email with
            instructions.
          </Text>
          <Button
            variant="ghost"
            _hover={{ textDecoration: "underline" }}
            size="lg"
            type="submit"
            color="white"
            onClick={async () => resetPassword()}
          >
            Resset Password
          </Button>
        </Box>
      </Flex>
    </VStack>

    // </form>
  );
}

export default PasswordResetForm;
