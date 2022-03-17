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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { useAppContext } from "../context/AppContext";
import { DOCTORS_TABLE } from "../utils/types";

function DoctorForm({ doctorData }) {
  const { setComponentInView, setExpandedCard } = useAppContext();

  const moveBackHandler = () => {
    setExpandedCard({});
    setComponentInView(DOCTORS_TABLE);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setError, supabase } = useAppContext();

  const updateDoctorInfo = async (data) => {
    const answer = await supabase.updateTableById("medical_doctors", data);
    if (answer.error) {
      setError(answer.error);
      return;
    }

    const toast = createStandaloneToast();

    toast({
      title: "Update Successful!",
      description: "Doctor info has been updated!",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <form
      onSubmit={handleSubmit((data) => updateDoctorInfo(data))}
      style={{ maxWidth: "100%", width: "65%", marginTop: "25px" }}
    >
      <VStack w="full" h="full" p={0} spacing={10} alignItems="center">
        <VStack spacing={3}>
          <Heading color="white" size="lg">
            Doctor Details
          </Heading>
        </VStack>

        <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
          <GridItem w="full" colSpan={2}>
            <FormControl>
              <FormLabel color="white">Doctor ID</FormLabel>
              <Input
                id="id"
                placeholder="Id string"
                bg="white"
                size="lg"
                value={doctorData.id}
                readOnly
                {...register("id")}
              />
            </FormControl>
          </GridItem>
          <GridItem w="full" colSpan={2}>
            <FormControl isInvalid={errors.minc}>
              <FormLabel color="white">
                Medical ID Number Canada (MINC)
              </FormLabel>

              <Input
                id="minc"
                placeholder="EX. 56584878"
                bg="white"
                size="lg"
                defaultValue={doctorData.minc}
                {...register("minc", {
                  required: "Must enter MINC number",
                  minLength: {
                    value: 8,
                    message: "Minimum length should be 8",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.minc && errors.minc.message}
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

export default DoctorForm;
