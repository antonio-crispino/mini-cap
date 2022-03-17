import { Flex, Stack } from "@chakra-ui/react";
import { useCallback } from "react";
import UserForm from "./UserForm";
import { useAppContext } from "../context/AppContext";
import { useDataContext } from "../context/DataContext";
import PatientForm from "./PatientForm";
import BusinessForm from "./BusinessForm";
import DoctorForm from "./DoctorForm";
import AdminForm from "./AdminForm";
import HealthOfficialForm from "./HealthOfficialForm";
import ImmigrationOfficerForm from "./ImmigrationOfficerForm";
import FormSideMessage from "./FormSideMessage";

function CardDetails() {
  const { expandedCard } = useAppContext();
  const { users } = useDataContext();
  const { userType } = expandedCard.userInfo;
  const userObj = !expandedCard.userType
    ? users.filter((user) => user.id === expandedCard.userInfo.id)[0]
    : expandedCard;

  const renderForm = useCallback(() => {
    if (expandedCard.userType) {
      return <FormSideMessage />;
    }

    switch (userType) {
      case "patient":
        return <PatientForm patientData={expandedCard} />;
      case "doctor":
        return <DoctorForm doctorData={expandedCard} />;
      case "health_official":
        return <HealthOfficialForm healthOfficialData={expandedCard} />;
      case "immigration_officer":
        return <ImmigrationOfficerForm immOfficerData={expandedCard} />;
      case "business":
        return <BusinessForm businessData={expandedCard} />;
      case "admin":
        return <AdminForm adminData={expandedCard} />;

      default:
        return <FormSideMessage />;
    }
  }, [expandedCard, userType]);

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
          {renderForm()}
        </Flex>
        <Flex w="full" justifyContent="center" alignItems="center">
          <UserForm userData={userObj} />
        </Flex>
      </Stack>
    </Flex>
  );
}
export default CardDetails;
