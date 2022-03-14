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
  FormErrorMessage,
  HStack,
  Stack,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useAppContext } from "../context/AppContext";
import { PATIENTS_TABLE } from "../utils/types";

function StatusForm({ patientData }) {
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

  const checkboxHandler = (e) => {
    const event = e.target.value;
    const optionsObj = { ...checkboxOptions };
    switch (event) {
      case "nausea":
        optionsObj.nausea = !optionsObj.nausea;
        setCheckboxOptions(optionsObj);
        break;
      case "headache":
        optionsObj.headache = !optionsObj.headache;
        setCheckboxOptions(optionsObj);
        break;
      case "chestPain":
        optionsObj.chestPain = !optionsObj.chestPain;
        setCheckboxOptions(optionsObj);
        break;
      case "nasalCongestion":
        optionsObj.nasalCongestion = !optionsObj.nasalCongestion;
        setCheckboxOptions(optionsObj);
        break;
      case "soreThroat":
        optionsObj.soreThroat = !optionsObj.soreThroat;
        setCheckboxOptions(optionsObj);
        break;
      case "lethargy":
        optionsObj.lethargy = !optionsObj.lethargy;
        setCheckboxOptions(optionsObj);
        break;
      case "fever":
        optionsObj.fever = !optionsObj.fever;
        setCheckboxOptions(optionsObj);
        break;
      case "vomiting":
        optionsObj.vomiting = !optionsObj.vomiting;
        setCheckboxOptions(optionsObj);
        break;

      default:
        break;
    }
  };
  const { setComponentInView, setExpandedCard, setError, supabase, user } =
    useAppContext();

  const moveBackHandler = () => {
    setExpandedCard({});
    setComponentInView(PATIENTS_TABLE);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleStatusUpdate = async (error, dataObj, toast) => {
    if (error.message.includes("violates unique constraint")) {
      const dateObj = new Date();
      const recordedOn = dateObj.toJSON().split("T")[0];
      // recordedOn = recordedOn.split("-").reverse().join("/");

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
        toast({
          title: "Success! 🎉",
          description: "You successfully updated your status!",
          status: "success",
          duration: 10000,
          isClosable: true,
        });
      }
    } else {
      setError(
        new Error(
          "An error occurred while processing your request. Please Contact an administrator"
        )
      );
    }
  };

  const uploadPatientStatus = async (data) => {
    // Get the current patient info
    const currentPatient = await supabase.getResourceById(user.id, "patients");
    if (currentPatient.error) {
      setError(new Error(currentPatient.error.message));
      return;
    }

    // Check if doctor asked for updates
    if (!currentPatient.data[0].updatesRequested) {
      setError(
        new Error(
          "Your doctor did not request any updates at the current time!"
        )
      );
      return;
    }
    const dataObj = { ...data, ...checkboxOptions };

    const toast = createStandaloneToast();
    const { error } = await supabase.insertPatientStatus(dataObj);
    if (error) {
      handleStatusUpdate(error, dataObj, toast);
    } else {
      toast({
        title: "Success! 🎉",
        description: "You successfully submitted your status!",
        status: "success",
        duration: 10000,
        isClosable: true,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit((data) => uploadPatientStatus(data))}
      style={{ maxWidth: "100%", width: "65%", marginTop: "25px" }}
    >
      <VStack w="full" h="full" p={0} spacing={10} alignItems="center">
        <VStack spacing={3}>
          <Heading color="white" size="lg">
            Patient Updates
          </Heading>
        </VStack>

        <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
          <GridItem w="full" colSpan={2} hidden>
            <FormControl isInvalid={errors.id}>
              <FormLabel color="white">Patient ID</FormLabel>

              <Input
                id="id"
                placeholder="Id string"
                bg="white"
                size="lg"
                value={patientData.id}
                readOnly
                {...register("id")}
              />
              <FormErrorMessage>
                {errors.id && errors.id.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>
          <GridItem w="full" colSpan={2}>
            <FormControl isInvalid={errors.medicalCard}>
              <FormLabel color="white">Medical Card</FormLabel>

              <Input
                id="medicalCard"
                placeholder="Enter health insurance number"
                bg="white"
                size="lg"
                readOnly
                value={patientData.medicalCardNum}
                {...register("medicalCard", {
                  required: "Must enter a medical card number",
                  minLength: {
                    value: 8,
                    message: "Minimum length should be 8",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.medicalCard && errors.medicalCard.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem w="full" colSpan={{ base: 2, md: 1 }}>
            <FormControl isInvalid={errors.weight}>
              <FormLabel color="white">Weight</FormLabel>
              <Input
                id="weight"
                placeholder="Enter weight"
                bg="white"
                size="lg"
                {...register("weight", {
                  required: "Must enter a weight",
                })}
              />
              <FormErrorMessage>
                {errors.weight && errors.weight.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>
          <GridItem w="full" colSpan={{ base: 2, md: 1 }}>
            <FormControl isInvalid={errors.temperature}>
              <FormLabel color="white">Temperature</FormLabel>
              <Input
                id="temperature"
                placeholder="Enter temperature"
                bg="white"
                size="lg"
                {...register("temperature", {
                  required: "Must enter a temperature",
                })}
              />
              <FormErrorMessage>
                {errors.temperature && errors.temperature.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem w="full" colSpan={2}>
            <FormControl isInvalid={errors.symptoms}>
              <FormLabel color="white">Symptoms List</FormLabel>

              <CheckboxGroup colorScheme="teal">
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
                      value="nausea"
                      onChange={(e) => checkboxHandler(e)}
                    >
                      Nausea
                    </Checkbox>
                    <Checkbox
                      size="md"
                      value="headache"
                      onChange={(e) => checkboxHandler(e)}
                    >
                      Headache
                    </Checkbox>
                    <Checkbox
                      size="md"
                      value="chestPain"
                      onChange={(e) => checkboxHandler(e)}
                    >
                      Chest Pain
                    </Checkbox>
                    <Checkbox
                      size="md"
                      value="nasalCongestion"
                      onChange={(e) => checkboxHandler(e)}
                    >
                      Nasal Congestion
                    </Checkbox>
                  </VStack>
                  <VStack p={2} alignItems="start">
                    <Checkbox
                      size="md"
                      value="soreThroat"
                      onChange={(e) => checkboxHandler(e)}
                    >
                      Sore Throat
                    </Checkbox>
                    <Checkbox
                      size="md"
                      value="lethargy"
                      onChange={(e) => checkboxHandler(e)}
                    >
                      Lethargy
                    </Checkbox>
                    <Checkbox
                      size="md"
                      value="fever"
                      onChange={(e) => checkboxHandler(e)}
                    >
                      Fever
                    </Checkbox>
                    <Checkbox
                      size="md"
                      value="vomiting"
                      onChange={(e) => checkboxHandler(e)}
                    >
                      Vomiting
                    </Checkbox>
                  </VStack>
                </Stack>
              </CheckboxGroup>

              <FormErrorMessage>
                {errors.symptoms && errors.symptoms.message}
              </FormErrorMessage>
            </FormControl>
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
