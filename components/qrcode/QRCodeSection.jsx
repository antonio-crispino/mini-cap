import { VStack, Text } from "@chakra-ui/react";
import QRCode from "qrcode.react";
import { useRouter } from "next/router";
import { useAppContext } from "../../context/AppContext";

function QRCodeSection() {
  const { user } = useAppContext();
  const router = useRouter();
  const { query } = router;
  const { id } = query;

  const url = `${window.location.href}?id=${user.id}`;

  const generateQR = (
    <QRCode size={300} value={url} bgColor="white" fgColor="black" level="H" />
  );

  return (
    <VStack>
      <Text fontSize="5xl" fontFamily="opensans-extrabold" color="#fff">
        {user?.firstname} {user?.lastname}
      </Text>
      {user.userType === "patient" ? generateQR : <Text>{id}</Text>}
    </VStack>
  );
}

export default QRCodeSection;
