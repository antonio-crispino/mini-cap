import { Flex } from "@chakra-ui/react";
import { useCallback } from "react";
import { useAppContext } from "../../context/AppContext";
import { ALL_USERS_TABLE } from "../../utils/types";
import CustomTable from "../CustomTable";

export default function MainDashView() {
  const { componentInView } = useAppContext();

  const renderComponent = useCallback(() => {
    switch (componentInView) {
      case ALL_USERS_TABLE:
        return <CustomTable />;
      default:
        return "";
    }
  }, [componentInView]);

  return (
    <Flex
      w="100%"
      height="90%"
      background="white"
      justifyContent="center"
      borderRadius={10}
    >
      {renderComponent()}
    </Flex>
  );
}
