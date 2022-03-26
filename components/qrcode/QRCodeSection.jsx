import { VStack, Text } from "@chakra-ui/react";
import QRCode from "qrcode.react";
import { useAppContext } from "../../context/AppContext";

function QRCodeSection() {
  const { user } = useAppContext();

  const generateQR = (
    <QRCode
      size={300}
      value={user.id}
      bgColor="white"
      fgColor="black"
      level="H"
    />
  );

  return (
    <VStack>
      <Text fontSize="5xl" fontFamily="opensans-extrabold" color="#fff">
        {user?.firstname} {user?.lastname}
      </Text>
      {generateQR}
    </VStack>
  );
}

export default QRCodeSection;
