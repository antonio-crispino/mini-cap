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
  HStack,
} from "@chakra-ui/react";

import styles from "../styles/authForms.module.css";

function AdminForm() {
  return (
    <form
      style={{
        maxWidth: "70%",
        width: "60%",
      }}
    >
      <VStack w="full" h="full" p={0} spacing={10} alignItems="center">
        <VStack spacing={3}>
          <Heading color="white" size="lg">
            Admin Details
          </Heading>
        </VStack>

        <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
          <GridItem w="full" colSpan={2}>
            <FormControl>
              <FormLabel color="white">Admin ID</FormLabel>

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
            <HStack justifyContent="center" gap={3}>
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

export default AdminForm;
