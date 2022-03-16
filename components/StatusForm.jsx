import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  SimpleGrid,
  GridItem,
  Button,
  Divider,
  createStandaloneToast,
  HStack,
  Stack,
  Checkbox,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

import { useAppContext } from "../context/AppContext";
import { DEFAULT_VIEW } from "../utils/types";

function StatusForm({ patientData }) {
  const { setComponentInView, setExpandedCard, setError, supabase, user } =
    useAppContext();

  const [checkboxOptions, setCheckboxOptions] = useState({
    nausea: false,
    headache: false,
    chestPain: false,
    nasalCongestion: false,
    soreThroat: false,
    lethargy: false,
    fever: false,
    vomiting: false,
  });

  const [inputOptions, setInputOptions] = useState({
    temperature: "",
    weight: "",
  });

  const [submittedUpdate, setSubmittedUpdate] = useState();
  const [statusString, setStatusString] = useState("");

  const inputFieldsHandler = (e) => {
    const field = e.target.id;
    const currentOpt = { ...inputOptions };
    switch (field) {
      case "weight":
        currentOpt.weight = e.target.value;
        setInputOptions(currentOpt);
        break;
      case "temperature":
        currentOpt.temperature = e.target.value;
        setInputOptions(currentOpt);
        break;

      default:
        break;
    }
  };

  const moveBackHandler = () => {
    setExpandedCard({});
    setComponentInView(DEFAULT_VIEW);
  };

  const stringifySymptoms = (symptomsObj) => {
    let statusStr = "";
    Object.keys(symptomsObj).forEach((key) => {
      if (Object.keys(checkboxOptions).join(" ").includes(key)) {
        if (symptomsObj[`${key}`]) {
          statusStr = `${statusStr} ${key},`;
        }
      }
    });
    return statusStr;
  };

  const getSubmittedUpdate = async () => {
    const dateObj = new Date();
    const recordedOn = dateObj.toJSON().split("T")[0];
    const update = await supabase.fetchTableBy("patient_updates", {
      id: user.id,
      recordedOn,
    });
    if (update.error) {
      setError(update.error);
    }
    const response = update.data[0];
    setSubmittedUpdate(response);
    if (response) {
      const symptomsStr = stringifySymptoms(response);
      setStatusString(symptomsStr);
    }
  };

  const handleStatusUpdate = async (error, dataObj, toast, notification) => {
    if (error.message.includes("violates unique constraint")) {
      const dateObj = new Date();
      const recordedOn = dateObj.toJSON().split("T")[0];

      const criteria = {
        recordedOn,
        id: user.id,
        medicalCard: dataObj.medicalCard,
      };
      const response = await supabase.updateTableBy(
        "patient_updates",
        dataObj,
        criteria
      );
      if (response.error) {
        setError(
          new Error(
            "An error occurred while processing your request. Please Contact an administrator"
          )
        );
      } else {
        const notifyMessage = `Patient ${notification.patientName} has just modified their status for date ${notification.date}`;
        const notifyErr = await supabase.supaAddNotification(
          notification.doctorId,
          notification.id,
          notifyMessage,
          notification.priority
        );
        if (notifyErr) {
          setError(notifyErr);
        }

        toast({
          title: "Success! 🎉",
          description: "You successfully updated your status!",
          status: "success",
          duration: 10000,
          isClosable: true,
        });
        return response.data;
      }
    } else {
      setError(
        new Error(
          "An error occurred while processing your request. Please Contact an administrator"
        )
      );
    }
  };

  const uploadPatientStatus = async (e) => {
    e.preventDefault();

    const dateObj = new Date();
    const dateToday = dateObj.toJSON().split("T")[0];

    const patientStatus = {
      ...inputOptions,
      ...checkboxOptions,
      id: patientData.id,
      medicalCard: patientData.medicalCardNum,
    };

    const notification = {
      id: patientData.id,
      doctorId: patientData.doctorId,
      priority: patientData.isPriority,
      date: dateToday,
      patientName: `${user.firstname} ${user.lastname}`,
    };

    // Check if doctor asked for updates
    if (!patientData.updatesRequested) {
      setError(
        new Error(
          "Your doctor did not request any updates at the current time!"
        )
      );
      return;
    }

    const toast = createStandaloneToast();
    const { error, response } = await supabase.insertPatientStatus(
      patientStatus,
      notification
    );
    if (error) {
      const updatedStatus = await handleStatusUpdate(
        error,
        patientStatus,
        toast,
        notification
      );
      setSubmittedUpdate(updatedStatus[0]);
      setStatusString(stringifySymptoms(updatedStatus[0]));
    } else {
      setSubmittedUpdate(response[0]);
      setStatusString(stringifySymptoms(response[0]));

      toast({
        title: "Success! 🎉",
        description: "You successfully submitted your status!",
        status: "success",
        duration: 10000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getSubmittedUpdate();
  }, [user.id]);

  return (
    <form
      onSubmit={(e) => uploadPatientStatus(e)}
      style={{ maxWidth: "100%", width: "65%", marginTop: "25px" }}
    >
      <VStack w="full" h="full" p={0} spacing={10} alignItems="center">
        <VStack spacing={3}>
          <Heading color="white" size="lg">
            Patient Updates
          </Heading>
        </VStack>

        <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
          <GridItem w="full" colSpan={2}>
            <FormControl>
              <FormLabel color="white">Medical Card</FormLabel>

              <Input
                id="medicalCard"
                placeholder="Enter health insurance number"
                bg="white"
                size="lg"
                readOnly
                value={patientData.medicalCardNum}
              />
            </FormControl>
          </GridItem>

          <GridItem w="full" colSpan={2}>
            <FormControl>
              <FormLabel color="white">Weight</FormLabel>
              <Input
                id="weight"
                placeholder="Enter weight"
                bg="white"
                size="lg"
                onChange={(e) => inputFieldsHandler(e)}
              />
            </FormControl>
          </GridItem>
          <GridItem w="full" colSpan={2}>
            <FormControl>
              <FormLabel color="white">Temperature</FormLabel>
              <Input
                id="temperature"
                placeholder="Enter temperature"
                bg="white"
                size="lg"
                onChange={(e) => inputFieldsHandler(e)}
              />
            </FormControl>
          </GridItem>

          <GridItem w="full" colSpan={2}>
            <FormControl>
              <FormLabel color="white">Symptoms List</FormLabel>

              <Stack
                direction={{ base: "column", md: "row" }}
                bg="white"
                borderRadius={5}
                h="100%"
                p={5}
              >
                <VStack p={2} alignItems="start">
                  <Checkbox
                    size="md"
                    name="nausea"
                    isDisabled={!patientData.requestedUpdatesList.nausea}
                    onChange={(e) =>
                      setCheckboxOptions({
                        ...checkboxOptions,
                        [e.target.name]: e.target.checked,
                      })
                    }
                  >
                    Nausea
                  </Checkbox>
                  <Checkbox
                    size="md"
                    name="headache"
                    isDisabled={!patientData.requestedUpdatesList.headache}
                    onChange={(e) =>
                      setCheckboxOptions({
                        ...checkboxOptions,
                        [e.target.name]: e.target.checked,
                      })
                    }
                  >
                    Headache
                  </Checkbox>
                  <Checkbox
                    size="md"
                    name="chestPain"
                    isDisabled={!patientData.requestedUpdatesList.chestPain}
                    onChange={(e) =>
                      setCheckboxOptions({
                        ...checkboxOptions,
                        [e.target.name]: e.target.checked,
                      })
                    }
                  >
                    Chest Pain
                  </Checkbox>
                  <Checkbox
                    size="md"
                    name="nasalCongestion"
                    isDisabled={
                      !patientData.requestedUpdatesList.nasalCongestion
                    }
                    onChange={(e) =>
                      setCheckboxOptions({
                        ...checkboxOptions,
                        [e.target.name]: e.target.checked,
                      })
                    }
                  >
                    Nasal Congestion
                  </Checkbox>
                </VStack>
                <VStack p={2} alignItems="start">
                  <Checkbox
                    size="md"
                    name="soreThroat"
                    isDisabled={!patientData.requestedUpdatesList.soreThroat}
                    onChange={(e) =>
                      setCheckboxOptions({
                        ...checkboxOptions,
                        [e.target.name]: e.target.checked,
                      })
                    }
                  >
                    Sore Throat
                  </Checkbox>
                  <Checkbox
                    size="md"
                    name="lethargy"
                    isDisabled={!patientData.requestedUpdatesList.lethargy}
                    onChange={(e) =>
                      setCheckboxOptions({
                        ...checkboxOptions,
                        [e.target.name]: e.target.checked,
                      })
                    }
                  >
                    Lethargy
                  </Checkbox>
                  <Checkbox
                    size="md"
                    name="fever"
                    isDisabled={!patientData.requestedUpdatesList.fever}
                    onChange={(e) =>
                      setCheckboxOptions({
                        ...checkboxOptions,
                        [e.target.name]: e.target.checked,
                      })
                    }
                  >
                    Fever
                  </Checkbox>
                  <Checkbox
                    size="md"
                    name="vomiting"
                    isDisabled={!patientData.requestedUpdatesList.vomiting}
                    onChange={(e) =>
                      setCheckboxOptions({
                        ...checkboxOptions,
                        [e.target.name]: e.target.checked,
                      })
                    }
                  >
                    Vomiting
                  </Checkbox>
                </VStack>
              </Stack>
            </FormControl>
          </GridItem>
          <GridItem w="full" colSpan={2}>
            {submittedUpdate && (
              <VStack bg="white" borderRadius={5} h="100%" p={5}>
                <Heading size="sm">Status Submitted Today</Heading>
                <Text textAlign="center">{`Temperature: ${submittedUpdate?.temperature} Weight: ${submittedUpdate?.weight}`}</Text>
                <Text textAlign="center">{`Symptoms: ${statusString}`}</Text>
                <Text
                  textAlign="center"
                  textDecor="underline"
                  fontStyle="italic"
                >
                  Please Submit a new update if you would like to modify your
                  status for today
                </Text>
              </VStack>
            )}
          </GridItem>
          <GridItem w="full" colSpan={2}>
            <Divider orientation="horizontal" size="lg" className="line" />
          </GridItem>
          <GridItem w="full" colSpan={2}>
            <HStack justifyContent="center" gap={3}>
              <Button
                variant="solid"
                size="lg"
                color="white"
                colorScheme="green"
                type="submit"
              >
                Update
              </Button>
              <Button
                variant="solid"
                size="lg"
                color="white"
                colorScheme="red"
                px={9}
                onClick={() => moveBackHandler()}
              >
                Back
              </Button>
            </HStack>
          </GridItem>
        </SimpleGrid>
      </VStack>
    </form>
  );
}

export default StatusForm;
