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
import { HEALTH_OFFICIALS_TABLE } from "../utils/types";

function HealthOfficialForm({ healthOfficialData }) {
  const { setComponentInView, setExpandedCard } = useAppContext();

  const moveBackHandler = () => {
    setExpandedCard({});
    setComponentInView(HEALTH_OFFICIALS_TABLE);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setError, supabase } = useAppContext();

  const updateHealthOfficialInfo = async (data) => {
    const answer = await supabase.updateTableById("health_officials", data);
    if (answer.error) {
      setError(answer.error);
      return;
    }

    const toast = createStandaloneToast();

    toast({
      title: "Update Successful!",
      description: "Health Official data updated!",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <form
      onSubmit={handleSubmit((data) => updateHealthOfficialInfo(data))}
      style={{ maxWidth: "100%", width: "65%", marginTop: "25px" }}
    >
      <VStack w="full" h="full" p={0} spacing={10} alignItems="center">
        <VStack spacing={3}>
          <Heading color="white" size="lg">
            Health Official Details
          </Heading>
        </VStack>

        <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
          <GridItem w="full" colSpan={2}>
            <FormControl>
              <FormLabel color="white">Health Official ID</FormLabel>

              <Input
                id="id"
                placeholder="Id string"
                bg="white"
                size="lg"
                value={healthOfficialData.id}
                readOnly
                {...register("id")}
              />
            </FormControl>
          </GridItem>
          <GridItem w="full" colSpan={2}>
            <FormControl isInvalid={errors.licenseNumber}>
              <FormLabel color="white">License Number</FormLabel>

              <Input
                id="licenseNumber"
                placeholder="EX. 56584878"
                bg="white"
                size="lg"
                defaultValue={healthOfficialData.licenseNumber}
                {...register("licenseNumber", {
                  required: "Must enter license number",
                  minLength: {
                    value: 8,
                    message: "Minimum length should be 8",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.licenseNumber && errors.licenseNumber.message}
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

export default HealthOfficialForm;
