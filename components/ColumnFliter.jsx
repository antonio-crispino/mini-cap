import { Input, Box } from "@chakra-ui/react";

function ColumnFilter({ column }) {
  const { filterValue, setFilter } = column;
  return (
    <Box maxW="50%" alignSelf="start">
      Search:{" "}
      <Input
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </Box>
  );
}

export default ColumnFilter;
