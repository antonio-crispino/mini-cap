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
import { useAppContext } from "../context/AppContext";

function UserForm({ userData }) {
  const { setError, supabase } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const updateUserInfo = async (data) => {
    const answer = await supabase.updateTableById("users", data);
    if (answer.error) {
      setError(answer.error);
      return;
    }

    const toast = createStandaloneToast();

    toast({
      title: "Update Successful!",
      description: "User details have been updated!",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <form
      onSubmit={handleSubmit((data) => updateUserInfo(data))}
      style={{ maxWidth: "100%", width: "65%", marginTop: "25px" }}
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
                value={userData.id}
                {...register("id")}
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
                defaultValue={userData.firstname}
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
                defaultValue={userData.lastname}
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
                placeholder="middle name"
                bg="white"
                size="lg"
                defaultValue={userData.middlename}
                {...register("middlename")}
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
                defaultValue={userData.email}
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
                color="black.500"
                defaultValue={userData.address}
                {...register("address")}
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
                  color="black.500"
                  defaultValue={userData.phonenumber}
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
                color="black.500"
                defaultValue={userData.dateofbirth}
                {...register("dateofbirth", {
                  required: "Must enter a valid birth date",
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
                color="black.500"
                fontFamily="opensans-regular"
                bg="white"
                size="lg"
                defaultValue={userData.sex}
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
                px={9}
              >
                Update
              </Button>
            </HStack>
          </GridItem>
        </SimpleGrid>
      </VStack>
    </form>
  );
}

export default UserForm;
