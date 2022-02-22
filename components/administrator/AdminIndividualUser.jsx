import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Input,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SupaClient from "../../utils/supabase";

export default function AdminIndividualUser(props) {
  const { user, visible } = props;
  const {
    id,
    firstname,
    middlename,
    lastname,
    email,
    phone,
    address,
    dateOfBirth,
    gender,
  } = user;

  return (
    <Box position="relative">
      <Table
        /* backgroundColor="#e5e5e5"
        width="100%"
        position="absolute"
        display={visible ? "table" : "none"} */
        backgroundColor="whitesmoke"
        width="100%"
        variant="striped"
        colorScheme="linkedin"
        display={visible ? "table" : "none"}
      >
        <Thead backgroundColor="lightgray">
          <Tr>
            <Th colSpan={3}>{id}</Th>
          </Tr>
        </Thead>
        <Tbody>
          <TableRow
            id={id}
            attr="firstname"
            title="First Name"
            value={firstname}
          />
          <TableRow
            id={id}
            attr="middlename"
            title="Middle Name"
            value={middlename}
          />
          <TableRow
            id={id}
            attr="lastname"
            title="Last Name"
            value={lastname}
          />
          <TableRow
            id={id}
            attr="email"
            title="Email"
            value={email}
            cannotEdit
          />
          <TableRow id={id} attr="phone" title="Phone" value={phone} />
          <TableRow id={id} attr="address" title="Address" value={address} />
          <TableRow
            id={id}
            attr="dateofbirth"
            title="Date of Birth"
            value={dateOfBirth}
          />
          <TableRow id={id} attr="sex" title="Gender" value={gender} />
        </Tbody>
      </Table>
    </Box>
  );
}

function TableRow(props) {
  const { id, title, attr, value, cannotEdit } = props; // props object destructuring

  // Function to update a specified user's info in the database
  async function updateUser(uid, attribute, attrValue) {
    const client = new SupaClient();
    return client.supaSetUserInfo(uid, attribute, attrValue);
  }

  const [edit, setEdit] = useState(false); // hook to toggle edit/save button
  const [inputVal, setInputVal] = useState(value); // hook to store input field value
  useEffect(() => setInputVal(value), [value]); // Will ensure re-render of value (due to passed down hooks)

  // Function to show save button
  const handleEditClick = () => setEdit(true);
  // Function to show edit button and to send updated user data to the database
  const handleSaveClick = () => {
    setEdit(false);
    updateUser(id, attr, inputVal);
  };
  // Function to hide save button
  const handleCancelClick = () => {
    setEdit(false);
    setInputVal(value);
  };
  // Function to store input value in hook variable as a user types into the field
  const handleInputValChange = (e) => setInputVal(e.target.value);

  return (
    <Tr>
      <Th backgroundColor="lightgray" minWidth="9rem" width="20%">
        {title}
      </Th>
      <Td>
        {edit ? (
          <Input
            value={inputVal}
            onChange={handleInputValChange}
            backgroundColor="white"
          />
        ) : (
          inputVal || "None"
        )}
      </Td>
      <Td display="flex" justifyContent="right">
        <Button
          onClick={handleEditClick}
          display={edit ? "None" : "Block"}
          disabled={cannotEdit}
          backgroundColor="lightgrey"
          _hover={{
            backgroundColor: "grey",
          }}
        >
          Edit
        </Button>
        <Button
          onClick={handleSaveClick}
          display={edit ? "inline-block" : "None"}
          backgroundColor="#80c904"
          _hover={{
            backgroundColor: "#66a103",
          }}
        >
          Save
        </Button>
        <Button
          onClick={handleCancelClick}
          display={edit ? "inline-block" : "None"}
          marginLeft="1rem"
          backgroundColor="#fa82a7"
          _hover={{
            backgroundColor: "#f85084",
          }}
        >
          Cancel
        </Button>
      </Td>
    </Tr>
  );
}
