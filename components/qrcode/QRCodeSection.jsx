import {
  VStack,
  Text,
  Button,
  Stack,
  createStandaloneToast,
} from "@chakra-ui/react";
import QRCode from "qrcode.react";
import { useRouter } from "next/router";
import { useAppContext } from "../../context/AppContext";

function QRCodeSection() {
  const { user, setError, supabase } = useAppContext();
  const router = useRouter();
  const { query } = router;
  const { id, firstname, lastname } = query;

  const url = `${window.location.href}?id=${user.id}&firstname=${user?.firstname}&lastname=${user?.lastname}`;

  const generateQR = (
    <QRCode size={300} value={url} bgColor="white" fgColor="black" level="H" />
  );

  const createVisitEntry = async (businessID, visitorID) => {
    const answer = await supabase.addQRCodeEntry(businessID, visitorID);
    if (answer.error) {
      setError(answer.error);
      return;
    }

    const toast = createStandaloneToast();

    toast({
      title: "Entry Creation Successful!",
      description: "Visitor details have been created",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const updateVisitEntry = async (businessID, visitorID) => {
    const answer = await supabase.updateQRCodeEntry(businessID, visitorID);
    if (answer.error) {
      setError(answer.error);
      return;
    }

    const toast = createStandaloneToast();

    toast({
      title: "Visitor Exited!",
      description: "Visitor details have been updated",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <VStack>
      {user.userType === "patient" ? (
        <Text
          textAlign="center"
          fontSize="5xl"
          fontFamily="opensans-extrabold"
          color="#fff"
        >
          {user?.firstname} {user?.lastname}
        </Text>
      ) : null}

      {user.userType === "patient" ? generateQR : null}
      {user.userType === "business" ? (
        <VStack>
          <Text
            textAlign="center"
            fontSize="4xl"
            fontFamily="opensans-extrabold"
            color="#fff"
          >
            Visitor:
            <br />
            {firstname} &nbsp;
            {lastname}
          </Text>
          <Stack direction="row" spacing={4}>
            <Button
              variant="solid"
              size="lg"
              color="white"
              colorScheme="green"
              type="submit"
              onClick={() => createVisitEntry(user.id, id)}
              px={9}
            >
              Entered
            </Button>
            <Button
              variant="solid"
              size="lg"
              color="white"
              colorScheme="red"
              type="submit"
              onClick={() => updateVisitEntry(user.id, id)}
              px={9}
            >
              Exited
            </Button>
          </Stack>
        </VStack>
      ) : null}
    </VStack>
  );
}

export default QRCodeSection;
