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
import { ADMINS_TABLE } from "../utils/types";
import { useAppContext } from "../context/AppContext";

function AdminForm({ adminData }) {
  const { setComponentInView, setExpandedCard } = useAppContext();

  const moveBackHandler = () => {
    setExpandedCard({});
    setComponentInView(ADMINS_TABLE);
  };
  return (
    <form style={{ maxWidth: "100%", width: "65%", marginTop: "25px" }}>
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
                value={adminData.id}
                readOnly
              />
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
                colorScheme="red"
                px={9}
                onClick={() => moveBackHandler()}
              >
                Back
              </Button>
            </HStack>
          </GridItem>
        </SimpleGrid>
      </VStack>
    </form>
  );
}

export default AdminForm;
