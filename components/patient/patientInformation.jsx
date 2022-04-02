import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Spacer,
} from "@chakra-ui/react";
import { useAppContext } from "../../context/AppContext";
import { PATIENT_UPDATE_INFO } from "../../utils/types";

function PatientInformationAlert() {
  const { setComponentInView } = useAppContext();
  const updateButtonHandler = () => {
    setComponentInView(PATIENT_UPDATE_INFO);
  };

  return (
    <Alert
      status="error"
      alignItems="center"
      justifyContent="center"
      height="70px"
      width="70%"
      borderRadius={10}
    >
      <AlertIcon />
      <AlertTitle mr={2}>IMPORTANT! Update Personal Information.</AlertTitle>
      <AlertDescription>
        For contact tracing and identification, please complete the user details
        form on your account.
      </AlertDescription>
      <Spacer />
      <Button colorScheme="red" onClick={updateButtonHandler}>
        Update
      </Button>
    </Alert>
  );
}

export default PatientInformationAlert;
