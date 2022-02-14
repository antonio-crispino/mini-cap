import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  GridItem,
  Button,
  useBreakpointValue,
  HStack,
  Link,
  createStandaloneToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAppContext } from "../context/context";
import NextLink from "next/link";
import { useRouter } from "next/router";

const Details = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { setError, login } = useAppContext();
  const router = useRouter();

  const colSpan = useBreakpointValue({ base: 2, md: 1 });

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
    >
      <VStack w="full" h="full" p={0} spacing={10} alignItems="center">
        <VStack spacing={3}>
          <Heading size="xl" color="white">
            Login
          </Heading>
        </VStack>
        <SimpleGrid columns={2} columnGap={2} rowGap={2}>
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
                type={"password"}
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
};

export default Details;
