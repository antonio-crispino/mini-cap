import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  SimpleGrid,
  GridItem,
  Button,
  createStandaloneToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useAppContext } from "../context/context";

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
      style={{ width: "100%" }}
    >
      <VStack w="full" h="full" p={0} spacing={10} alignItems="center">
        <VStack spacing={3}>
          <Heading size="xl" color="white">
            Login
          </Heading>
        </VStack>
        <SimpleGrid columns={2} columnGap={2} rowGap={2} w="70%">
          <GridItem w="100%" colSpan={2}>
            <FormControl isInvalid={errors.email}>
              <FormLabel color="white">Email</FormLabel>
              <Input
                id="email"
                placeholder="johndoe@test.com"
                type="email"
                {...register("email", {
                  required: "This is required",
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem w="100%" colSpan={2}>
            <FormControl isInvalid={errors.password}>
              <FormLabel color="white">Password</FormLabel>
              <Input
                id="password"
                placeholder=""
                type="password"
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
            </FormControl>
          </GridItem>
          <GridItem w="100%" colSpan={2}>
            <Button
              variant="ghost"
              _hover={{ textDecoration: "underline" }}
              size="lg"
              type="submit"
              color="white"
            >
              Sign In
            </Button>
          </GridItem>
        </SimpleGrid>
      </VStack>
    </form>
  );
}

export default LoginForm;