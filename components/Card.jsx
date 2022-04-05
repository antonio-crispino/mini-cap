import { Badge, Box, Button, Center, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { CARD_DETAILS, TRACING_TABLE } from "../utils/types";

function Card({ fullObj }) {
  const { setExpandedCard, setComponentInView, setPatient, supabase, user } =
    useAppContext();
  const { userInfo } = fullObj;
  const { userType, firstname, middlename, lastname, email } =
    userInfo || fullObj;
  const userFullName = `${firstname}${
    middlename ? ` ${middlename}` : ""
  } ${lastname}`;
  const loggedInUserFullName = `${user.firstname}${
    user.middlename ? ` ${user.middlename}` : ""
  } ${user.lastname}`;
  const { symptoms, doctorId } = fullObj || {
    symptoms: false,
    doctorId: false,
  };
  const [contactedPrecaution, setContactedPrecaution] = useState(false);
  const [contactedQuarantine, setContactedQuarantine] = useState(
    userInfo?.quarantine
  );

  const viewDetailsHandler = (userObj) => {
    let passedCardDetails = { ...userObj };
    if (!userInfo) {
      passedCardDetails = {
        ...userObj,
        userInfo: { userType: userObj.userType },
      };
    }
    setExpandedCard(passedCardDetails);
    setComponentInView(CARD_DETAILS);
  };

  const precautionEmail = () => `
      mailto:${email}?
      &subject=${userFullName} - Please Take Precaution
      &body=Dear ${userFullName},
      %0D%0A
      %0D%0AYou have come into contact with someone who tested positive for COVID-19.
      %0D%0APlease take the necessary precautions.
      %0D%0AYou may contact your doctor for any questions.
      %0D%0A
      %0D%0ABest regards,
      %0D%0AThe Anti-Covid Web App Team
      %0D%0A.
    `;

  const setCovidContactedPrecautionStatus = async () => {
    if (!contactedPrecaution) {
      await supabase.supaSetUserInfo(
        userInfo?.id,
        "contacted_with_covid",
        !contactedPrecaution
      );
      window.open(precautionEmail());
      setContactedPrecaution((prevVal) => !prevVal);
    }
  };

  const quarantineEmail = (startOrEnd) => {
    const quarantineEndDateTime = new Date(Date.now() + 12096e5);
    const quarantineEndDate = `${quarantineEndDateTime.getDate()}/${
      quarantineEndDateTime.getMonth() + 1
    }/${quarantineEndDateTime.getFullYear()}`;
    return `
      mailto:${email}?
      &subject=${userFullName} - ${
      startOrEnd === "start"
        ? "You Must Begin Quarantine"
        : "Your Quarantine is Over"
    }
      &body=Dear ${userFullName},
      %0D%0A
      %0D%0A${
        startOrEnd === "start"
          ? `Please quarantine for 14 days (until ${quarantineEndDate}) and take the necessary precautions.`
          : `Your quarantine period is over.`
      }
      %0D%0AYou may contact your doctor for any questions.
      %0D%0A
      %0D%0ABest regards,
      %0D%0AThe Anti-Covid Web App Team
      %0D%0A.
    `;
  };

  const setCovidContactedQuarantineStatus = async () => {
    await supabase.supaSetUserInfo(
      userInfo?.id,
      "quarantine",
      !contactedQuarantine
    );
    if (!contactedQuarantine) {
      window.open(quarantineEmail("start"));
    } else {
      window.open(quarantineEmail("end"));
    }
    setContactedQuarantine((prevVal) => !prevVal);
  };

  const generalEmail = () => `
      mailto:${email}?
      &subject=-- ENTER SUBJECT HERE --
      &body=Dear ${userFullName},
      %0D%0A
      %0D%0A-- ENTER MESSAGE HERE --
      %0D%0A
      %0D%0ABest regards,
      %0D%0ADr. ${loggedInUserFullName}
      %0D%0AThe Anti-Covid Web App Team
      %0D%0A.
    `;

  const openEmailWindow = () => window.open(generalEmail());

  const viewTracingDetails = (userObj) => {
    setPatient(userObj);
    setComponentInView(TRACING_TABLE);
  };

  return (
    <Box
      w="280px"
      bg="gray.200"
      overflow="hidden"
      boxShadow="sm"
      rounded="20px"
      maxW="100%"
    >
      <Image src="/images/card.png" alt="cover image" />
      <Box p={2}>
        <Badge variant="solid" px={2} mx={2} colorScheme="blue" rounded="full">
          {userType}
        </Badge>

        <Badge
          variant="solid"
          px={2}
          mx={1}
          colorScheme="red"
          rounded="full"
          display={symptoms ? "default" : "none"}
        >
          symptoms
        </Badge>

        <Badge
          variant="solid"
          px={2}
          colorScheme="purple"
          rounded="full"
          display={doctorId ? "default" : "none"}
        >
          has doc
        </Badge>
      </Box>
      <Box p={5}>
        <Center flexDir="column">
          <Text>Name: {`${firstname} ${lastname}`}</Text>
          <Text>{email}</Text>
        </Center>
      </Box>
      <Box p={5}>
        <Center>
          <Button
            variant="solid"
            size="sm"
            colorScheme="teal"
            w="full"
            onClick={() => viewDetailsHandler(fullObj)}
          >
            Details
          </Button>
        </Center>
        <Center>
          <Button
            marginTop="0.5rem"
            display={
              user.userType === "health_official" && userType === "patient"
                ? "block"
                : "none"
            }
            variant="solid"
            size="sm"
            colorScheme="teal"
            w="full"
            onClick={() => viewTracingDetails(fullObj)}
          >
            Contact Trace
          </Button>
        </Center>
        <Center>
          <Button
            marginTop="1.5rem"
            display={
              user.userType === "health_official" && userType === "patient"
                ? "block"
                : "none"
            }
            variant="solid"
            size="sm"
            colorScheme="yellow"
            w="full"
            onClick={() => setCovidContactedPrecautionStatus()}
            disabled={contactedPrecaution}
          >
            {contactedPrecaution
              ? "Precaution Email Sent!"
              : "Send Precaution Email"}
          </Button>
        </Center>
        <Center>
          <Button
            marginTop="0.5rem"
            display={
              user.userType === "health_official" && userType === "patient"
                ? "block"
                : "none"
            }
            variant="solid"
            size="sm"
            colorScheme="yellow"
            w="full"
            onClick={() => setCovidContactedQuarantineStatus()}
          >
            {contactedQuarantine
              ? "End Quarantine Email"
              : "Start Quarantine Email"}
          </Button>
        </Center>
        <Center>
          <Button
            marginTop="0.5rem"
            display={user.userType === "doctor" ? "block" : "none"}
            variant="solid"
            size="sm"
            colorScheme="yellow"
            w="full"
            onClick={() => openEmailWindow()}
          >
            Send Email
          </Button>
        </Center>
      </Box>
    </Box>
  );
}

export default Card;
