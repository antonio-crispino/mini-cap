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
  // createStandaloneToast,
  FormErrorMessage,
  HStack,
  Stack,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";

import { useAppContext } from "../context/AppContext";
import { PATIENTS_TABLE } from "../utils/types";

function StatusForm({ patientData }) {
  const { setComponentInView, setExpandedCard } = useAppContext();

  const moveBackHandler = () => {
    setExpandedCard({});
    setComponentInView(PATIENTS_TABLE);
  };
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  // const { setError, supabase } = useAppContext();

  const uploadPatientStatus = (data) => {
    const dataObj = { ...data };
    const { symptoms } = data;
    // Adding boolean values to prepare to push to db
    symptoms.forEach((sym) => {
      dataObj[sym] = true;
    });

    // Deleting unnecessary symptoms array
    delete dataObj.symptoms;
    console.log("dataa", dataObj);
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
            <FormControl isInvalid={errors.medicalCardNum}>
              <FormLabel color="white">Medical Card</FormLabel>

              <Input
                id="medicalCardNum"
                placeholder="Enter health insurance number"
                bg="white"
                size="lg"
                readOnly
                value={patientData.medicalCardNum}
                {...register("medicalCardNum", {
                  required: "Must enter a medical card number",
                  minLength: {
                    value: 8,
                    message: "Minimum length should be 8",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.medicalCardNum && errors.medicalCardNum.message}
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
              <Controller
                name="symptoms"
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <CheckboxGroup colorScheme="teal" {...rest}>
                    <Stack
                      direction={{ base: "column", md: "row" }}
                      bg="white"
                      borderRadius={5}
                      h="100%"
                      p={5}
                    >
                      <VStack p={2} alignItems="start">
                        <Checkbox size="md" value="nausea">
                          Nausea
                        </Checkbox>
                        <Checkbox size="md" value="headache">
                          Headache
                        </Checkbox>
                        <Checkbox size="md" value="chestPain">
                          Chest Pain
                        </Checkbox>
                        <Checkbox size="md" value="nasalCongestion">
                          Nasal Congestion
                        </Checkbox>
                      </VStack>
                      <VStack p={2} alignItems="start">
                        <Checkbox size="md" value="soreThroat">
                          Sore Throat
                        </Checkbox>
                        <Checkbox size="md" value="lethargy">
                          Lethargy
                        </Checkbox>
                        <Checkbox size="md" value="fever">
                          Fever
                        </Checkbox>
                        <Checkbox size="md" value="vomiting">
                          Vomiting
                        </Checkbox>
                      </VStack>
                    </Stack>
                  </CheckboxGroup>
                )}
              />

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
