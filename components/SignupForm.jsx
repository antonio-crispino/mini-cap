import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  SimpleGrid,
  GridItem,
  Button,
  Center,
  Box,
  Link,
  Divider,
  createStandaloneToast,
  FormErrorMessage,
  Text,
  Switch,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { RightArrow } from "./CustomIcons";

import { useAppContext } from "../context/AppContext";
import styles from "../styles/authForms.module.css";

function SignupForm() {
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
          <Heading color="white" size="2xl">
            Sign Up
          </Heading>
        </VStack>

        <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
          <GridItem w="full" colSpan={{ base: 2, md: 1 }}>
            <FormControl isInvalid={errors.firstname}>
              <FormLabel color="white">First Name</FormLabel>

              <Input
                id="firstname"
                placeholder="John"
                bg="white"
                size="lg"
                {...register("firstname", {
                  required: "Must enter a valid name",
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
            <FormControl isInvalid={errors.password}>
              <FormLabel color="white">Password</FormLabel>
              <Input
                id="password"
                placeholder="Create your password"
                type="password"
                bg="white"
                size="lg"
                {...register("password", {
                  required: "Please set a valid password",
                  minLength: {
                    value: 8,
                    message: "Minimum length should be 8",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>
          <GridItem w="full" colSpan={2} pt={4}>
            <FormControl
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <FormLabel htmlFor="business" mb="0" color="white">
                Registering for a business?
              </FormLabel>
              <Switch id="business" size="lg" {...register("business")} />
            </FormControl>
          </GridItem>

          <GridItem w="full" colSpan={2}>
            <Center>
              <Button
                variant="ghost"
                _hover={{ textDecoration: "underline" }}
                size="lg"
                type="submit"
                color="white"
              >
                <Box>Sign Up</Box>
                <RightArrow className={styles.loginIcon} />
              </Button>
            </Center>
          </GridItem>
          <GridItem w="full" colSpan={2}>
            <Divider
              orientation="horizontal"
              size="lg"
              className={styles.line}
            />
            <Center mt={4}>
              <Text color="white">
                Already have an account?
                <NextLink href="/login">
                  <Link ml={1} textDecor="underline">
                    Sign In
                  </Link>
                </NextLink>
              </Text>
            </Center>
          </GridItem>
        </SimpleGrid>
      </VStack>
    </form>
  );
}

export default SignupForm;
