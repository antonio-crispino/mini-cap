// import { useState, useCallback } from "react";
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

// function FilterPanel() {
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
//   console.log({
//     users,
//     patients,
//     administrators,
//     healthOfficials,
//     immigrationOfficers,
//     businesses,
//     doctors,
//   });
//   const [checkedItems, setCheckedItems] = useState({
//     hasDoc: null,
//     noDoc: null,
//     symptoms: null,
//   });

//   //   const filterState = useCallback(() => {
//   //     const { hasDoc, noDoc, symptoms } = checkedItems;

//   //     const filteredState = patients.filter((patient) => {
//   //       if (hasDoc && patient.doctorId) {
//   //         return patient;
//   //       }
//   //       if (noDoc && !patient.doctorId) {
//   //         return patient;
//   //       }
//   //       if (symptoms && patient.symptoms) {
//   //         return patient;
//   //       }
//   //     });
//   //     console.log("asdasdasd ", filteredState);
//   //     setPatients(filteredState);
//   //   }, [checkedItems]);

//   const checkedHandler = (e) => {
//     switch (e.target.value) {
//       case "hasDoc":
//         setCheckedItems({
//           ...checkedItems,
//           hasDoc: checkedItems.hasDoc ? null : !checkedItems.hasDoc,
//         });
//         break;
//       case "noDoc":
//         setCheckedItems({
//           ...checkedItems,
//           noDoc: checkedItems.noDoc ? null : !checkedItems.noDoc,
//         });
//         break;
//       case "symptoms":
//         setCheckedItems({
//           ...checkedItems,
//           symptoms: checkedItems.symptoms ? null : !checkedItems.symptoms,
//         });
//         break;
//       default:
//         break;
//     }
//     filterState();
//     console.log(checkedItems);
//   };

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
//             <Checkbox value="hasDoc" onChange={(e) => checkedHandler(e)}>
//               Assigned Doctor
//             </Checkbox>
//             <Checkbox value="noDoc" onChange={(e) => checkedHandler(e)}>
//               No Doctor
//             </Checkbox>
//             <Checkbox value="symptoms" onChange={(e) => checkedHandler(e)}>
//               Symptomatic
//             </Checkbox>
//           </Stack>
//         </CheckboxGroup>
//       </HStack>
//     </Flex>
//   );
// }

// export default FilterPanel;
