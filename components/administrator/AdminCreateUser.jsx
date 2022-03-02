import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Button,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import SupaClient from "../../utils/supabase";

export default function AdminCreateUser(props) {
  const { visible, setVisible } = props;

  const [userType, setUserType] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userMiddleName, setUserMiddleName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleCancelButton = () => {
    setVisible(false);
    setUserType("");
    setUserFirstName("");
    setUserMiddleName("");
    setUserLastName("");
    setUserEmail("");
    setUserPassword("");
  };

  // Function to update a specified user's info in the database
  async function addUser(
    type,
    firstName,
    middleName,
    lastName,
    email,
    password
  ) {
    const client = new SupaClient();
    return client.supaAddUser(
      type,
      firstName,
      middleName,
      lastName,
      email,
      password
    );
  }

  // Function to close create user and to send updated user data to the database
  const handleCreateClick = async () => {
    await addUser(
      userType,
      userFirstName,
      userMiddleName,
      userLastName,
      userEmail,
      userPassword
    );
    handleCancelButton();
  };

  return (
    <Box position="relative">
      <Table
        backgroundColor="whitesmoke"
        width="100%"
        display={visible ? "table" : "none"}
      >
        <Thead backgroundColor="gray">
          <Tr>
            <Th color="white" colSpan={3}>
              New User
            </Th>
          </Tr>
        </Thead>
        <Tbody backgroundColor="lightgray">
          <Tr>
            <Th minWidth="16rem" width="20%">
              User Type
            </Th>
            <Td>
              <Input
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                backgroundColor="white"
                minWidth="16rem"
              />
            </Td>
          </Tr>
          <Tr>
            <Th>First Name</Th>
            <Td>
              <Input
                value={userFirstName}
                onChange={(e) => setUserFirstName(e.target.value)}
                backgroundColor="white"
              />
            </Td>
          </Tr>
          <Tr>
            <Th>Middle Name</Th>
            <Td>
              <Input
                value={userMiddleName}
                onChange={(e) => setUserMiddleName(e.target.value)}
                backgroundColor="white"
              />
            </Td>
          </Tr>
          <Tr>
            <Th>Last Name</Th>
            <Td>
              <Input
                value={userLastName}
                onChange={(e) => setUserLastName(e.target.value)}
                backgroundColor="white"
              />
            </Td>
          </Tr>
          <Tr>
            <Th>Email</Th>
            <Td>
              <Input
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                backgroundColor="white"
              />
            </Td>
          </Tr>
          <Tr>
            <Th>Temporary Password</Th>
            <Td>
              <Input
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                backgroundColor="white"
              />
            </Td>
          </Tr>
          <Tr>
            <Td>
              <Button
                onClick={handleCreateClick}
                backgroundColor="#80c904"
                _hover={{
                  backgroundColor: "#66a103",
                }}
              >
                Create
              </Button>
              <Button
                onClick={handleCancelButton}
                marginLeft="1rem"
                backgroundColor="#fa82a7"
                _hover={{
                  backgroundColor: "#f85084",
                }}
              >
                Cancel
              </Button>
            </Td>
            <Td />
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
}
