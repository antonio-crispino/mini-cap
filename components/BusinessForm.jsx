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
import { BUSINESSES_TABLE } from "../utils/types";

function BusinessForm({ businessData }) {
  const { setComponentInView, setExpandedCard } = useAppContext();

  const moveBackHandler = () => {
    setExpandedCard({});
    setComponentInView(BUSINESSES_TABLE);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setError, supabase } = useAppContext();

  const updateBusinessInfo = async (data) => {
    const error = await supabase.updateTableById("businesses", data);
    if (error.error) {
      setError(error);
      return;
    }

    const toast = createStandaloneToast();

    toast({
      title: "Updated successfully!",
      description: "Business details have been updated successfully ",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <form
      onSubmit={handleSubmit((data) => updateBusinessInfo(data))}
      style={{ maxWidth: "100%", width: "65%", marginTop: "25px" }}
    >
      <VStack w="full" h="full" p={0} spacing={10} alignItems="center">
        <VStack spacing={3}>
          <Heading color="white" size="lg">
            Business Details
          </Heading>
        </VStack>

        <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
          <GridItem w="full" colSpan={2}>
            <FormControl>
              <FormLabel color="white">Business ID</FormLabel>

              <Input
                id="id"
                placeholder="Id string"
                bg="white"
                size="lg"
                readOnly
                defaultValue={businessData.id}
                {...register("id")}
              />
            </FormControl>
          </GridItem>
          <GridItem w="full" colSpan={2}>
            <FormControl>
              <FormLabel color="white">Owner ID</FormLabel>

              <Input
                id="ownerId"
                placeholder="Id string"
                bg="white"
                size="lg"
                readOnly
                defaultValue={businessData.ownerId}
                {...register("ownerId")}
              />
            </FormControl>
          </GridItem>
          <GridItem w="full" colSpan={{ base: 2, md: 1 }}>
            <FormControl isInvalid={errors.businessName}>
              <FormLabel color="white">Business Name</FormLabel>

              <Input
                id="businessName"
                placeholder="Business Name"
                bg="white"
                size="lg"
                defaultValue={businessData.businessName}
                {...register("businessName", {
                  required: "Must enter a business name",
                  minLength: {
                    value: 2,
                    message: "Minimum length should be 2",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.businessName && errors.businessName.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>
          <GridItem w="full" colSpan={{ base: 2, md: 1 }}>
            <FormControl isInvalid={errors.businessGovId}>
              <FormLabel color="white">Business Gov ID</FormLabel>

              <Input
                id="businessGovId"
                placeholder="Government ID"
                bg="white"
                size="lg"
                defaultValue={businessData.businessGovId}
                {...register("businessGovId", {
                  required: "Must enter a business government id",
                  minLength: {
                    value: 8,
                    message: "Minimum length should be 8",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.businessGovId && errors.businessGovId.message}
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

export default BusinessForm;
