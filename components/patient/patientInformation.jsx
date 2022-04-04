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

function PatientInformationAlert(user) {
  const { setComponentInView } = useAppContext();
  const updateButtonHandler = () => {
    setComponentInView(PATIENT_UPDATE_INFO);
  };
  const { address, phonenumber, dateofbirth, userType } = user;

  if (
    userType === "patient" &&
    (address === "" ||
      address === null ||
      phonenumber === "" ||
      address === null ||
      dateofbirth === "" ||
      dateofbirth == null)
  ) {
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
        <AlertTitle mr={2}>IMPORTANT!</AlertTitle>
        <AlertDescription>
          For contact tracing and identification, please complete and update
          your user details.
        </AlertDescription>
        <Spacer />
        <Button colorScheme="red" onClick={updateButtonHandler}>
          Update
        </Button>
      </Alert>
    );
  }
}

export default PatientInformationAlert;
