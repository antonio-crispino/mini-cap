import { VStack, Text, Button, Stack } from "@chakra-ui/react";
import QRCode from "qrcode.react";
import { useRouter } from "next/router";
import { useAppContext } from "../../context/AppContext";

function QRCodeSection() {
  const { user } = useAppContext();
  const router = useRouter();
  const { query } = router;
  const { firstname, lastname } = query;

  const url = `${window.location.href}?id=${user.id}`;
  const generateQR = (
    <QRCode size={300} value={url} bgColor="white" fgColor="black" level="H" />
  );

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
