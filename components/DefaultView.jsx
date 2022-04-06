import { Flex, Heading, Stack, Text } from "@chakra-ui/react";
import PatientInformationAlert from "./patient/PatientInformation";

function DefaultView({ user }) {
  return (
    <Flex
      justifyContent="center"
      minH="90vh"
      minW="90vw"
      p={{ base: 1, md: 10 }}
    >
      <Stack
        direction="column"
        width="100%"
        justifyContent="center"
        alignItems="center"
        p={{ base: 1, md: 5 }}
        bg="linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.55))"
      >
        <PatientInformationAlert user={user} />
        <Heading
          textAlign="center"
          color="white"
        >{`Welcome ${user.firstname} ${user.lastname}!`}</Heading>
        <Text fontSize="2xl" textAlign="center" color="white">
          Please access the navigation drawer on the left for navigation. You
          can also access notification from the icon on the nav bar above
        </Text>
      </Stack>
    </Flex>
  );
}
export default DefaultView;
