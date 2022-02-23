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
    userType,
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
      {userType === "patient" ? (
        <Td>
          {/* <Button
            onClick={userClickHandler}
            backgroundColor="lightgrey"
            _hover={{
              backgroundColor: "grey",
            }}
          >
            Assign doctor
          </Button> */}

          {/* could not find a chakra component, so used normal JS one */}
          {/* <label htmlFor="choice-of-doctors">All Doctors</label> */}
          <label htmlFor="choice-of-doctors">
            All Docs
            <input
              list="doctor-select"
              id="choice-of-doctors"
              name="choice-of-doctors"
            />
          </label>

          <datalist id="doctor-select">
            <option value="Doc 1"> </option>
            <option value="Doc 2"> </option>
            <option value="Doc 3"> </option>
            <option value="Doc 4"> </option>
            <option value="Doc 5"> </option>
          </datalist>
        </Td>
      ) : (
        ""
      )}
    </Tr>
  );
}

export default function AdminUserTable(props) {
  const { users, userType, visible, setUser, setShowUser, setShowTable } =
    props;
  // console.log("header", userType);
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
            {userType === "patient" ? <Th>My Doctor</Th> : ""}
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
              userType={userType || "None"}
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
