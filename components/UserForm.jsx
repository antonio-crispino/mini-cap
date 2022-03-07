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
  InputLeftAddon,
  InputGroup,
  Select,
  HStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { useAppContext } from "../context/AppContext";
import styles from "../styles/authForms.module.css";

function UserForm() {
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
      className={styles.formWidth}
    >
      <VStack w="full" h="full" p={0} spacing={10} alignItems="center">
        <VStack spacing={3}>
          <Heading color="white" size="lg">
            User Details
          </Heading>
        </VStack>

        <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
          <GridItem w="full" colSpan={2}>
            <FormControl isInvalid={errors.id}>
              <FormLabel color="white">User ID</FormLabel>

              <Input
                id="id"
                placeholder="Id string"
                bg="white"
                size="lg"
                disabled
              />
              <FormErrorMessage>
                {errors.id && errors.id.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem w="full" colSpan={{ base: 2, md: 1 }}>
            <FormControl isInvalid={errors.firstname}>
              <FormLabel color="white">First Name</FormLabel>
              <Input
                id="firstname"
                placeholder="John"
                bg="white"
                size="lg"
                {...register("firstname", {
                  required: "Must enter a valid first name",
                  minLength: {
                    value: 2,
                    message: "Minimum length should be 2",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.firstname && errors.firstname.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>
          <GridItem w="full" colSpan={{ base: 2, md: 1 }}>
            <FormControl isInvalid={errors.lastname}>
              <FormLabel color="white">Last Name</FormLabel>
              <Input
                id="lastname"
                placeholder="Doe"
                bg="white"
                size="lg"
                {...register("lastname", {
                  required: "Must enter a valid last name",
                  minLength: {
                    value: 2,
                    message: "Minimum length should be 2",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.lastname && errors.lastname.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>
          <GridItem w="full" colSpan={2}>
            <FormControl isInvalid={errors.middlename}>
              <FormLabel color="white">Middle Name</FormLabel>
              <Input
                id="middlename"
                placeholder="James"
                bg="white"
                size="lg"
                {...register("middlename", {
                  required: "Please enter a valid middle name",
                })}
              />
              <FormErrorMessage>
                {errors.middlename && errors.middlename.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>
          <GridItem w="full" colSpan={2}>
            <FormControl isInvalid={errors.email}>
              <FormLabel color="white">Email</FormLabel>
              <Input
                id="email"
                placeholder="johndoe@test.com"
                type="email"
                bg="white"
                size="lg"
                {...register("email", {
                  required: "Please enter a valid email",
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>
          <GridItem w="full" colSpan={2}>
            <FormControl isInvalid={errors.address}>
              <FormLabel color="white">Address</FormLabel>
              <Input
                id="address"
                placeholder="781 Hacker St."
                bg="white"
                size="lg"
                {...register("address", {
                  required: "Please enter a valid address",
                })}
              />
              <FormErrorMessage>
                {errors.address && errors.address.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>
          <GridItem w="full" colSpan={2}>
            <FormControl isInvalid={errors.phonenumber}>
              <FormLabel color="white">Phone</FormLabel>
              <InputGroup size="lg">
                <InputLeftAddon>+1</InputLeftAddon>
                <Input
                  id="phonenumber"
                  placeholder="4381232897"
                  bg="white"
                  {...register("phonenumber", {
                    minLength: {
                      value: 10,
                      message: "Minimum length should be 2",
                    },
                  })}
                />
              </InputGroup>

              <FormErrorMessage>
                {errors.phonenumber && errors.phonenumber.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>
          <GridItem w="full" colSpan={{ base: 2, md: 1 }}>
            <FormControl isInvalid={errors.dateofbirth}>
              <FormLabel color="white">Date Of Birth</FormLabel>
              <Input
                id="dateofbirth"
                placeholder="YYYY-MM-DD"
                bg="white"
                size="lg"
                {...register("dateofbirth", {
                  required: "Must enter a valid last name",
                  valueAsDate: true,
                })}
              />
              <FormErrorMessage>
                {errors.dateofbirth && errors.dateofbirth.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>
          <GridItem w="full" colSpan={{ base: 2, md: 1 }}>
            <FormControl isInvalid={errors.sex}>
              <FormLabel color="white">Gender</FormLabel>
              <Select
                id="sex"
                placeholder="Select option"
                color="gray.400"
                fontFamily="opensans-regular"
                bg="white"
                size="lg"
                defaultValue={null}
                {...register("sex")}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
              <FormErrorMessage>
                {errors.sex && errors.sex.message}
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

export default UserForm;
