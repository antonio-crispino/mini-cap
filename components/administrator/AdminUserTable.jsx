/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { Table, Thead, Tbody, Tr, Th, Td, Box, Button } from "@chakra-ui/react";

function AdminTableRow(props) {
  const {
    user,
    id,
    fullName,
    email,
    phone,
    address,
    dateOfBirth,
    gender,
    setUser,
    setShowUser,
    setShowTable,
  } = props;

  const userClickHandler = () => {
    setUser(user);
    setShowUser(true);
    setShowTable([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ]);
  };

  return (
    <Tr>
      <Td>
        <Button
          onClick={userClickHandler}
          backgroundColor="lightgrey"
          _hover={{
            backgroundColor: "grey",
          }}
        >
          View
        </Button>
      </Td>
      <Td>{id}</Td>
      <Td>{fullName}</Td>
      <Td>{email}</Td>
      <Td>{phone}</Td>
      <Td>{address}</Td>
      <Td>{dateOfBirth}</Td>
      <Td>{gender}</Td>
    </Tr>
  );
}

export default function AdminUserTable(props) {
  const { users, visible, setUser, setShowUser, setShowTable } = props;
  return (
    <Box>
      <Table
        backgroundColor="whitesmoke"
        width="100%"
        variant="striped"
        colorScheme="linkedin"
        display={visible ? "table" : "none"}
      >
        <Thead>
          <Tr>
            <Th />
            <Th>ID</Th>
            <Th>Full Name</Th>
            <Th>Email</Th>
            <Th>Phone</Th>
            <Th>Address</Th>
            <Th>Date of Birth</Th>
            <Th>Gender</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <AdminTableRow
              user={user}
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
              setUser={setUser}
              setShowUser={setShowUser}
              setShowTable={setShowTable}
            />
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
