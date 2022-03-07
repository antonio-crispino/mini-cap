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
import { useRouter } from "next/router";

import { useAppContext } from "../context/AppContext";
import styles from "../styles/authForms.module.css";

function BusinessForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setError, supabase } = useAppContext();

  const router = useRouter();

  const signup = async ({ email, password, firstname, lastname, business }) => {
    const error = await supabase.supaSignUp({
      email,
      password,
      firstname,
      lastname,
      business,
    });
    if (error) {
      setError(error);
      return;
    }
    await router.push("/login");

    const toast = createStandaloneToast();

    toast({
      title: "Account created.",
      description: "You can now login",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <form
      onSubmit={handleSubmit((data) => signup(data))}
      style={{
        maxWidth: "70%",
        width: "60%",
      }}
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
                disabled
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
                disabled
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
            <HStack justifyContent="center" gap={3}>
              <Button
                variant="solid"
                size="lg"
                color="white"
                colorScheme="green"
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

export default BusinessForm;
