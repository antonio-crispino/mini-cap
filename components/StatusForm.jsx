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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

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
    formState: { errors },
  } = useForm();
  const { setError, supabase } = useAppContext();

  const updatePatientInfo = async (data) => {
    const formData = { ...data };
    if (formData.doctorId === "") {
      formData.doctorId = null;
    }
    const error = await supabase.updateTableById("patients", formData);
    if (error.error) {
      setError(error);
      return;
    }

    const toast = createStandaloneToast();

    toast({
      title: "Updated successfully!",
      description: "Patient details have been updated successfully ",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <form
      onSubmit={handleSubmit((data) => updatePatientInfo(data))}
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
                readOnly
                value={patientData.temperature}
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
              <Stack
                direction={{ base: "column", lg: "row" }}
                bg="white"
                h="100%"
              >
                <VStack>
                  <Checkbox size="md" colorScheme="red">
                    nausea
                  </Checkbox>
                  <Checkbox size="md" colorScheme="green" defaultChecked>
                    headache
                  </Checkbox>
                  <Checkbox size="md" colorScheme="orange" defaultChecked>
                    lethargy
                  </Checkbox>
                  <Checkbox size="md" colorScheme="orange" defaultChecked>
                    vomiting
                  </Checkbox>
                  <Checkbox size="md" colorScheme="orange" defaultChecked>
                    soreThroat
                  </Checkbox>
                  <Checkbox size="md" colorScheme="orange" defaultChecked>
                    nasalCongestion
                  </Checkbox>
                  <Checkbox size="md" colorScheme="orange" defaultChecked>
                    fever
                  </Checkbox>
                </VStack>
                <VStack>adsasd</VStack>
              </Stack>
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
