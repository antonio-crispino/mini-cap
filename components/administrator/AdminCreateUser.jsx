/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
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

export default function AdminCreateUser(props) {
  const { visible, setVisible } = props;

  const [userType, setUserType] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userMiddleName, setUserMiddleName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const handleCancelButton = () => {
    setVisible(false);
    setUserType("");
    setUserFirstName("");
    setUserMiddleName("");
    setUserLastName("");
    setUserEmail("");
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
            <Th>User Type</Th>
            <Td>
              <Input
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                backgroundColor="white"
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
            <Td>
              <Button
                backgroundColor="#80c904"
                _hover={{
                  backgroundColor: "#66a103",
                }}
              >
                Save
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
