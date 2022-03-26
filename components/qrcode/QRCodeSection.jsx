import { VStack, Text } from "@chakra-ui/react";
import { useAppContext } from "../../context/AppContext";

function QRCodeSection() {
  const { user } = useAppContext();

  return (
    <VStack>
      <Text fontSize="5xl" fontFamily="opensans-extrabold" color="#fff">
        {user?.firstname} {user?.lastname}
      </Text>
      <Text>Here will be a qrcode</Text>
    </VStack>
  );
}

export default QRCodeSection;
