const {
  Flex,
  HStack,
  Input,
  Checkbox,
  Stack,
  CheckboxGroup,
} = require("@chakra-ui/react");

function FilterPanel({ optionClicked, options }) {
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
        <Input placeholder="Generic Search here..." />
      </HStack>
      <HStack m={2}>
        <CheckboxGroup colorScheme="teal">
          <Stack
            w="full"
            spacing={[1, 5]}
            direction={["column", "row"]}
            justifyContent="center"
            alignItems="center"
          >
            {options.map((option) => (
              <Checkbox
                value={option.value}
                isChecked={option.checked}
                onChange={(e) => optionClicked(e)}
              >
                {option.name}
              </Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>
      </HStack>
    </Flex>
  );
}

export default FilterPanel;
