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
  Center,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useAppContext } from "../context/context";
import { RightArrow } from "./CustomIcons";
import styles from "../styles/LoginForm.module.css";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useAppContext();
  const router = useRouter();

  const signIn = async ({ email, password }) => {
    const error = await login(email, password);

    if (!error) {
      const toast = createStandaloneToast();
      toast({
        title: "logged in successful.",
        description: "redirecting you to your profile",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      router.push("/main");
    }
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        signIn(data);
      })}
      className={styles.formWidth}
    >
      <VStack w="full" h="full" p={0} spacing={10} alignItems="center">
        <VStack spacing={3}>
          <Heading size="xl" color="white">
            Login
          </Heading>
        </VStack>
        <SimpleGrid columns={2} columnGap={2} rowGap={10} w="100%">
          <GridItem w="100%" colSpan={2} display="block">
            <FormControl isInvalid={errors.email}>
              <FormLabel
                color="white"
                style={{
                  margin: "5px 45px 0px 0px",
                }}
              >
                Email
              </FormLabel>

              <Box w="100%">
                <Input
                  id="email"
                  placeholder="johndoe@test.com"
                  type="email"
                  bg="#fff"
                  size="lg"
                  {...register("email", {
                    required: "This is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </Box>
            </FormControl>
          </GridItem>

          <GridItem w="100%" colSpan={2} display="block">
            <FormControl isInvalid={errors.password}>
              <FormLabel
                color="white"
                style={{
                  margin: "5px 20px 0px 0px",
                }}
              >
                Password
              </FormLabel>
              <Box w="100%">
                <Input
                  id="password"
                  placeholder="shhh! This is super secret"
                  type="password"
                  bg="#fff"
                  size="lg"
                  {...register("password", {
                    required: "This is required",
                    minLength: {
                      value: 8,
                      message: "Minimum length should be 8",
                    },
                  })}
                />

                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </Box>
            </FormControl>
          </GridItem>
          <GridItem w="100%" colSpan={2}>
            <Center>
              <Button
                variant="ghost"
                _hover={{ textDecoration: "underline" }}
                size="lg"
                type="submit"
                color="white"
              >
                <Box>Sign In</Box>
                <RightArrow className={styles.loginIcon} />
              </Button>
            </Center>
          </GridItem>
          <GridItem w="full" colSpan={2}>
            <Center>
              <Divider
                orientation="horizontal"
                size="lg"
                className={styles.line}
              />
            </Center>

            <Flex justifyContent="space-around">
              <Button
                variant="ghost"
                _hover={{ textDecoration: "underline" }}
                size="lg"
                type="submit"
                color="white"
              >
                Forgot My Password
              </Button>
              <Button
                variant="ghost"
                _hover={{ textDecoration: "underline" }}
                size="lg"
                type="submit"
                color="white"
              >
                Sign Up
              </Button>
            </Flex>
          </GridItem>
        </SimpleGrid>
      </VStack>
    </form>
  );
}

export default LoginForm;
