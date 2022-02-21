/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { Table, Thead, Tbody, Tr, Th, Td, Box } from "@chakra-ui/react";

function AdminTableRow(props) {
  const { id, fullName, email, phone, address, dateOfBirth, gender } = props;
  return (
    <Tr>
      <Td borderStyle="none">{id}</Td>
      <Td borderStyle="none">{fullName}</Td>
      <Td borderStyle="none">{email}</Td>
      <Td borderStyle="none">{phone}</Td>
      <Td borderStyle="none">{address}</Td>
      <Td borderStyle="none">{dateOfBirth}</Td>
      <Td borderStyle="none">{gender}</Td>
    </Tr>
  );
}

export default function AdminUserTable(props) {
  const { users, visible } = props;

  return (
    <Box
      /* display={visible ? "block" : "none"} */
      opacity={visible ? "1" : "0"}
      transition="opacity 0.5s"
      position="relative"
      /* transform={`translateX(${visible ? "0" : "110%"})`}
      transition="transform 0.5s" */
    >
      <Table
        backgroundColor="whitesmoke"
        width="100%"
        variant="striped"
        colorScheme="linkedin"
        borderRadius="1rem"
        position="absolute"
      >
        <Thead>
          <Tr>
            <Th borderStyle="none">ID</Th>
            <Th borderStyle="none">Full Name</Th>
            <Th borderStyle="none">Email</Th>
            <Th borderStyle="none">Phone</Th>
            <Th borderStyle="none">Address</Th>
            <Th borderStyle="none">Date of Birth</Th>
            <Th borderStyle="none">Gender</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <AdminTableRow
              id={user.id || "None"}
              fullName={
                user.firstname
                  ? `${user.firstname || ""} ${user.middlename || ""} ${
                      user.lastname || ""
                    }`
                  : "None"
              }
              email={user.email || "None"}
              phone={user.phone || "None"}
              address={user.address || "None"}
              dateOfBirth={user.dateOfBirth || "None"}
              gender={user.sex || "None"}
            />
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
