import {
  VStack,
  Button,
  Flex,
  Box,
  createStandaloneToast,
  Text,
} from "@chakra-ui/react";

import { useAppContext } from "../context/AppContext";

function PasswordResetForm() {
  const { sendResetPassEmail, user } = useAppContext();

  const resetPassword = async () => {
    const response = await sendResetPassEmail(user.email);
    if (!response) {
      const toast = createStandaloneToast();
      toast({
        title: "Reset Email Sent",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
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
            Once you request a reset, you will receive an email with
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
            Reset Password
          </Button>
        </Box>
      </Flex>
    </VStack>
  );
}

export default PasswordResetForm;
