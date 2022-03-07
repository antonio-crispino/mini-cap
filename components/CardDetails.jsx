import { Flex, Stack } from "@chakra-ui/react";
import { useCallback } from "react";
import UserForm from "./UserForm";
import { useAppContext } from "../context/AppContext";
import PatientForm from "./PatientForm";
import BusinessForm from "./BusinessForm";
import DoctorForm from "./DoctorForm";
import AdminForm from "./AdminForm";
import HealthOfficialForm from "./HealthOfficialForm";
import ImmigrationOfficerForm from "./ImmigrationOfficerForm";
import FormSideMessage from "./FormSideMessage";

function CardDetails() {
  const { expandedCard } = useAppContext();

  const { userType } = expandedCard.userInfo;

  const renderForm = useCallback(() => {
    if (expandedCard.userType) {
      return <FormSideMessage />;
    }

    switch (userType) {
      case "patient":
        return <PatientForm patientData={expandedCard} />;
      case "doctor":
        return <DoctorForm />;
      case "health_official":
        return <HealthOfficialForm />;
      case "immigration_officer":
        return <ImmigrationOfficerForm />;
      case "business":
        return <BusinessForm />;
      case "admin":
        return <AdminForm />;

      default:
        return <FormSideMessage />;
    }
  }, [expandedCard.userType, userType]);

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
          mb={{ base: 10, lg: 1 }}
        >
          {renderForm()}
        </Flex>
        <Flex w="full" justifyContent="center" alignItems="center">
          <UserForm />
        </Flex>
      </Stack>
    </Flex>
  );
}
export default CardDetails;
