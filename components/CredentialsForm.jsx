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
  useBoolean,
  Popover,
  PopoverAnchor,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  HStack,
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
    console.log(newfirstname);
    await update(user.email, newfirstname, newlastname);
    return Router.reload(window.location.pathname);
  };
  const reset = async () => Router.reload(window.location.pathname);

  const [isEditingFirstName, setIsEditingFirstName] = useBoolean();
  const [isEditingLastName, setIsEditingLastName] = useBoolean();

  return (
    <form
      style={{
        maxwidth: "100%",
        width: "100%",
      }}
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
              <FormLabel color="white" htmlFor="newfirstname">
                Change First Name
              </FormLabel>
              <Popover
                isOpen={isEditingFirstName}
                onOpen={setIsEditingFirstName.on}
                onClose={setIsEditingFirstName.off}
                closeOnBlur={false}
                isLazy
                lazyBehavior="keepMounted"
              >
                <HStack>
                  <PopoverAnchor>
                    <Input
                      color="white"
                      w="auto"
                      display="inline-flex"
                      isDisabled={!isEditingFirstName}
                      id="newfirstname"
                      // placeholder={user.firstname}
                      {...register("newfirstname", {
                        minLength: {
                          value: 2,
                          message: "Minimum length should be 2",
                        },
                      })}
                    />
                  </PopoverAnchor>
                  <FormErrorMessage data-testid="firstname-error-msg">
                    {errors.firstname && errors.firstname.message}
                  </FormErrorMessage>
                  <PopoverTrigger>
                    <Button h="40px" colorScheme="red" variant="ghost">
                      {isEditingFirstName ? (
                        <PopoverTrigger>
                          <Button
                            onClick={reset}
                            h="40px"
                            colorScheme="red"
                            type="submit"
                            variant="ghost"
                          >
                            Cancel
                          </Button>
                        </PopoverTrigger>
                      ) : (
                        "Edit"
                      )}
                    </Button>
                  </PopoverTrigger>
                  {isEditingFirstName ? (
                    <PopoverTrigger>
                      <Button
                        onClick={handleSubmit(submitChange)}
                        h="40px"
                        colorScheme="red"
                        type="submit"
                        variant="ghost"
                        data-testid="saveFnameBtn"
                      >
                        Save
                      </Button>
                    </PopoverTrigger>
                  ) : null}
                </HStack>
                <PopoverContent>
                  <PopoverBody>Type a new First Name</PopoverBody>
                </PopoverContent>
              </Popover>
              <FormErrorMessage>
                {errors.firstname && errors.firstname.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem w="100%" colSpan={2}>
            <FormControl isInvalid={errors.lastname}>
              <FormLabel color="white">Change Last Name</FormLabel>
              <Popover
                isOpen={isEditingLastName}
                onOpen={setIsEditingLastName.on}
                onClose={setIsEditingLastName.off}
                closeOnBlur={false}
                isLazy
                lazyBehavior="keepMounted"
              >
                <HStack>
                  <PopoverAnchor>
                    <Input
                      color="white"
                      w="auto"
                      display="inline-flex"
                      isDisabled={!isEditingLastName}
                      id="newlastname"
                      // placeholder={user.lastname}
                      {...register("newlastname", {
                        minLength: {
                          value: 2,
                          message: "Minimum length should be 2",
                        },
                      })}
                    />
                  </PopoverAnchor>
                  <PopoverTrigger>
                    <Button h="40px" colorScheme="red" variant="ghost">
                      {isEditingLastName ? (
                        <PopoverTrigger>
                          <Button
                            onClick={reset}
                            h="40px"
                            colorScheme="red"
                            type="submit"
                            variant="ghost"
                          >
                            Cancel
                          </Button>
                        </PopoverTrigger>
                      ) : (
                        "Edit"
                      )}
                    </Button>
                  </PopoverTrigger>
                  {isEditingLastName ? (
                    <PopoverTrigger>
                      <Button
                        onClick={handleSubmit(submitChange)}
                        h="40px"
                        colorScheme="red"
                        type="submit"
                        variant="ghost"
                      >
                        Save
                      </Button>
                    </PopoverTrigger>
                  ) : null}
                </HStack>
                <PopoverContent>
                  <PopoverBody>Type a new Last Name</PopoverBody>
                </PopoverContent>
              </Popover>
              <FormErrorMessage>
                {errors.lastname && errors.lastname.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>
        </SimpleGrid>
      </VStack>
    </form>
  );
}

export default CredentialsForm;
