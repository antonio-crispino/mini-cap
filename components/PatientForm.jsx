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
  Select,
  HStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { useAppContext } from "../context/AppContext";
import { useDataContext } from "../context/DataContext";
import styles from "../styles/authForms.module.css";

function PatientForm({ patientData }) {
  const { doctors } = useDataContext();
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
      style={{
        maxWidth: "70%",
        width: "60%",
      }}
    >
      <VStack w="full" h="full" p={0} spacing={10} alignItems="center">
        <VStack spacing={3}>
          <Heading color="white" size="lg">
            Patient Details
          </Heading>
        </VStack>

        <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
          <GridItem w="full" colSpan={2}>
            <FormControl isInvalid={errors.id}>
              <FormLabel color="white">Patient ID</FormLabel>

              <Input
                id="id"
                placeholder="Id string"
                bg="white"
                size="lg"
                value={patientData.id}
                {...register("id")}
              />
              <FormErrorMessage>
                {errors.id && errors.id.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>
          <GridItem w="full" colSpan={{ base: 2, md: 1 }}>
            <FormControl isInvalid={errors.medicalCardNum}>
              <FormLabel color="white">Medical Card</FormLabel>

              <Input
                id="medicalCardNum"
                placeholder="Enter health insurance number"
                bg="white"
                size="lg"
                defaultValue={patientData.medicalCardNum}
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
            <FormControl isInvalid={errors.doctorId}>
              <FormLabel color="white">Doctor</FormLabel>
              <Select
                id="doctorId"
                placeholder="Select option"
                fontFamily="opensans-regular"
                bg="white"
                size="lg"
                defaultValue={patientData.doctorId || null}
                {...register("doctorId")}
              >
                {doctors.map((doc) => (
                  <option
                    value={doc.id}
                  >{`${doc.userInfo.firstname} ${doc.userInfo.lastname}`}</option>
                ))}
              </Select>
              <FormErrorMessage>
                {errors.doctorId && errors.doctorId.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem w="full" colSpan={2}>
            <FormControl isInvalid={errors.symptoms}>
              <FormLabel color="white">Has Symptoms</FormLabel>
              <Select
                id="symptoms"
                placeholder="Select option"
                color="gray.400"
                fontFamily="opensans-regular"
                bg="white"
                size="lg"
                defaultValue={patientData.symptoms}
                {...register("symptoms")}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Select>
              <FormErrorMessage>
                {errors.symptoms && errors.symptoms.message}
              </FormErrorMessage>
            </FormControl>
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
              <Button variant="solid" size="lg" color="white" colorScheme="red">
                Cancel
              </Button>
            </HStack>
          </GridItem>
          <GridItem w="full" colSpan={2}>
            <Divider
              orientation="horizontal"
              size="lg"
              className={styles.line}
            />
          </GridItem>
        </SimpleGrid>
      </VStack>
    </form>
  );
}

export default PatientForm;
