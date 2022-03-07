// import { useState, useCallback, useEffect } from "react";
// import { useAppContext } from "../context/AppContext";
// import { useDataContext } from "../context/DataContext";
// import {
//   ALL_USERS_TABLE,
//   PATIENTS_TABLE,
//   DOCTORS_TABLE,
//   HEALTH_OFFICIALS_TABLE,
//   IMMIGRATION_OFFICERS_TABLE,
//   ADMINS_TABLE,
//   CARD_DETAILS,
//   BUSINESSES_TABLE,
// } from "../utils/types";

// const {
//   Box,
//   Flex,
//   HStack,
//   StackDivider,
//   Input,
//   Checkbox,
//   Stack,
//   CheckboxGroup,
// } = require("@chakra-ui/react");

// function FilterPanel({ optionClicked }) {
//   const { componentInView } = useAppContext();
//   const {
//     setUsers,
//     setPatients,
//     setAdministrators,
//     setHealthOfficials,
//     setImmigrationOfficers,
//     setBusinesses,
//     setDoctors,
//     users,
//     patients,
//     administrators,
//     healthOfficials,
//     immigrationOfficers,
//     businesses,
//     doctors,
//   } = useDataContext();

//   return (
//     <Flex
//       flexDir={{ base: "column", lg: "row" }}
//       justifyContent="space-around"
//       bg="white"
//       mt={12}
//       mx={12}
//       p={5}
//       gap={2}
//       borderRadius={4}
//     >
//       <HStack m={2}>
//         <Input placeholder="Generic Search here..." />
//       </HStack>
//       <HStack m={2}>
//         <CheckboxGroup colorScheme="teal">
//           <Stack
//             w="full"
//             spacing={[1, 5]}
//             direction={["column", "row"]}
//             justifyContent="center"
//             alignItems="center"
//           >
//             <Checkbox value="hasDoc" onChange={(e) => optionClicked(e)}>
//               Assigned Doctor
//             </Checkbox>
//             <Checkbox value="noDoc" onChange={(e) => optionClicked(e)}>
//               No Doctor
//             </Checkbox>
//             <Checkbox value="symptoms" onChange={(e) => optionClicked(e)}>
//               Symptomatic
//             </Checkbox>
//           </Stack>
//         </CheckboxGroup>
//       </HStack>
//     </Flex>
//   );
// }

// export default FilterPanel;
