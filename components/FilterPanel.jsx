import { useAppContext } from "../context/AppContext";
import { PATIENTS_TABLE } from "../utils/types";

const { Flex, HStack, Input, Checkbox, Stack } = require("@chakra-ui/react");

function FilterPanel({ options, optionClicked, searchListener }) {
  const { componentInView } = useAppContext();

  return (
    <Flex
      flexDir={{ base: "column", lg: "row" }}
      justifyContent="space-around"
      bg="white"
      mt={12}
      mx={12}
      p={5}
      gap={2}
      borderRadius={4}
    >
      <HStack m={2}>
        <Input
          placeholder="Generic Search here..."
          onChange={(e) => searchListener(e)}
        />
      </HStack>
      {componentInView === PATIENTS_TABLE && (
        <HStack m={2}>
          <Stack
            w="full"
            spacing={[1, 5]}
            direction={["column", "row"]}
            justifyContent="center"
            alignItems="center"
          >
            {options.map((option) => (
              <Checkbox
                key={option.value}
                value={option.value}
                onChange={(e) => optionClicked(e)}
                isChecked={option.checked}
                colorScheme="teal"
              >
                {option.name}
              </Checkbox>
            ))}
          </Stack>
        </HStack>
      )}
    </Flex>
  );
}

export default FilterPanel;
