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

function DoctorForm() {
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
                disabled
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

export default DoctorForm;
