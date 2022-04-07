import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Spacer,
  Box,
} from "@chakra-ui/react";
import { useAppContext } from "../../context/AppContext";
import { PATIENT_UPDATE_INFO } from "../../utils/types";

function PatientInformationAlert({ user }) {
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
      dateofbirth === null)
  ) {
    return (
      <Box maxWidth="50%" opacity={0.9} mb={5}>
        <Alert
          data-testid="info-alert"
          status="warning"
          borderRadius={20}
          p={3}
          flexDirection="column"
          justifyContent="center"
          textAlign="center"
          colorScheme="blue"
        >
          <AlertIcon />
          <AlertTitle mr={2} mt={4} mb={1}>
            IMPORTANT!
          </AlertTitle>
          <AlertDescription m={1}>
            For contact tracing and identification, please complete and update
            your user details.
          </AlertDescription>
          <Spacer />
          <Button
            minWidth="70px"
            colorScheme="blue"
            onClick={updateButtonHandler}
          >
            Update
          </Button>
        </Alert>
      </Box>
    );
  }
  return null;
}
export default PatientInformationAlert;
