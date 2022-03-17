import { Flex, Stack, useId } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import UserForm from "./UserForm";
import StatusForm from "./StatusForm";
import FormSideMessage from "./FormSideMessage";
import { useAppContext } from "../context/AppContext";

function GenericForm({ userId, viewType }) {
  const { supabase, setError } = useAppContext();

  const [userInfo, setUserInfo] = useState();
  const [patientInfo, setPatientInfo] = useState();

  const getUserInfo = async () => {
    const info = await supabase.getResourceById(userId, "users");
    if (info.error) {
      setError(info.error);
    }
    setUserInfo(info.data[0]);
  };
  const getPatientInfo = async () => {
    const info = await supabase.getResourceById(userId, "patients");
    if (info.error) {
      setError(info.error);
    }
    setPatientInfo(info.data[0]);
  };

  useEffect(() => {
    if (viewType === "userInfo") {
      getUserInfo();
    } else {
      getPatientInfo();
    }
  }, [useId, viewType]);
  return (
    <Flex justifyContent="center" minH="90vh" p={{ base: 1, md: 10 }}>
      <Stack
        direction={{ base: "column", lg: "row" }}
        width="100%"
        p={{ base: 1, md: 5 }}
        bg="linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.55))"
      >
        <Flex
          w="full"
          justifyContent="center"
          alignItems="center"
          mt={{ base: 10, lg: 1 }}
        >
          <FormSideMessage />
        </Flex>
        <Flex w="full" justifyContent="center" alignItems="center">
          {viewType === "userInfo"
            ? userInfo && <UserForm userData={userInfo} />
            : patientInfo && (
                <StatusForm patientData={patientInfo} testing={false} />
              )}
        </Flex>
      </Stack>
    </Flex>
  );
}
export default GenericForm;
