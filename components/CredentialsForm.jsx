import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  SimpleGrid,
  GridItem,
  Button,
  FormErrorMessage,
  Center,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Router from "next/router";
import { useAppContext } from "../context/AppContext";

function CredentialsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { update, user } = useAppContext();

  const submitChange = async ({ newfirstname, newlastname }) => {
    await update(user.email, newfirstname, newlastname);
    return Router.reload(window.location.pathname);
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        submitChange(data);
      })}
      style={{ width: "100%" }}
    >
      <VStack w="full" h="full" p={0} spacing={10} alignItems="center">
        <VStack spacing={3}>
          <Heading size="xl" color="white">
            Modify your credentials
          </Heading>
        </VStack>
        <SimpleGrid columns={2} columnGap={2} rowGap={2} w="70%">
          <GridItem w="100%" colSpan={2}>
            <FormControl isInvalid={errors.firstname}>
              <FormLabel color="white">Change First Name</FormLabel>
              <Input
                bg="white"
                id="newfirstname"
                placeholder={user.firstname}
                defaultValue={user.firstname}
                {...register("newfirstname", {
                  // required: "This is required",
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

          <GridItem w="100%" colSpan={2}>
            <FormControl isInvalid={errors.lastname}>
              <FormLabel color="white">Change Last Name</FormLabel>
              <Input
                bg="white"
                id="newlastname"
                placeholder={user.lastname}
                defaultValue={user.lastname}
                {...register("newlastname", {
                  // required: "This is required",
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

          <GridItem w="100%" colSpan={2} spacing={4}>
            <FormControl isInvalid={errors.password}>
              <FormLabel color="white">
                Before Submiting, enter your current password.
              </FormLabel>
              <Input
                bg="white"
                id="password"
                placeholder="Enter your password"
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
            <Center>
              <Button
                variant="ghost"
                _hover={{ textDecoration: "underline" }}
                size="lg"
                type="submit"
                color="white"
              >
                Submit
              </Button>
            </Center>
          </GridItem>
        </SimpleGrid>
      </VStack>
    </form>
  );
}

export default CredentialsForm;
