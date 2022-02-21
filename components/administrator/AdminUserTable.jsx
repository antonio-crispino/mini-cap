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
  Button,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";

export default function AdminListItem() {
  const [edit, setEdit] = useState([true, true, true, true]);
  const editClickHandler = (i) => {
    const arr = [...edit];
    const bool = edit[i];
    arr[i] = !bool;
    setEdit(arr);
  };
  return (
    <Table
      backgroundColor="whitesmoke"
      width="100%"
      variant="striped"
      colorScheme="linkedin"
      borderRadius="1rem"
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
        <Tr>
          <Td padding="0 0.5rem">
            <Button
              colorScheme="linkedin"
              variant="ghost"
              marginX="0"
              marginY="0.25rem"
              width="4rem"
              borderRadius="50rem"
              onClick={() => editClickHandler(0)}
            >
              {edit[0] ? "Edit" : "Save"}
            </Button>
          </Td>
          <Td paddingY="0">
            {edit[0] ? (
              "null"
            ) : (
              <Input
                value="null"
                width="100%"
                backgroundColor="white"
                borderRadius="50rem"
                size="sm"
              />
            )}
          </Td>
          <Td paddingY="0">
            {edit[0] ? (
              "null"
            ) : (
              <Input
                value="null"
                width="100%"
                backgroundColor="white"
                borderRadius="50rem"
                size="sm"
              />
            )}
          </Td>
          <Td paddingY="0">
            {edit[0] ? (
              "null"
            ) : (
              <Input
                value="null"
                width="100%"
                backgroundColor="white"
                borderRadius="50rem"
                size="sm"
              />
            )}
          </Td>
          <Td paddingY="0">
            {edit[0] ? (
              "null"
            ) : (
              <Input
                value="null"
                width="100%"
                backgroundColor="white"
                borderRadius="50rem"
                size="sm"
              />
            )}
          </Td>
          <Td paddingY="0">
            {edit[0] ? (
              "null"
            ) : (
              <Input
                value="null"
                width="100%"
                backgroundColor="white"
                borderRadius="50rem"
                size="sm"
              />
            )}
          </Td>
          <Td paddingY="0">
            {edit[0] ? (
              "null"
            ) : (
              <Input
                value="null"
                width="100%"
                backgroundColor="white"
                borderRadius="50rem"
                size="sm"
              />
            )}
          </Td>
          <Td paddingY="0">
            {edit[0] ? (
              "null"
            ) : (
              <Input
                value="null"
                width="100%"
                backgroundColor="white"
                borderRadius="50rem"
                size="sm"
              />
            )}
          </Td>
        </Tr>
        <Tr>
          <Td padding="0 0.5rem">
            <Button
              colorScheme="linkedin"
              variant="ghost"
              marginX="0"
              marginY="0.25rem"
              width="4rem"
              borderRadius="50rem"
              onClick={() => editClickHandler(1)}
            >
              {edit[1] ? "Edit" : "Save"}
            </Button>
          </Td>
          <Td>null</Td>
          <Td>null</Td>
          <Td>null</Td>
          <Td>null</Td>
          <Td>null</Td>
          <Td>null</Td>
          <Td>null</Td>
        </Tr>
        <Tr>
          <Td padding="0 0.5rem">
            <Button
              colorScheme="linkedin"
              variant="ghost"
              marginX="0"
              marginY="0.25rem"
              width="4rem"
              borderRadius="50rem"
              onClick={() => editClickHandler(2)}
            >
              {edit[2] ? "Edit" : "Save"}
            </Button>
          </Td>
          <Td>null</Td>
          <Td>null</Td>
          <Td>null</Td>
          <Td>null</Td>
          <Td>null</Td>
          <Td>null</Td>
          <Td>null</Td>
        </Tr>
        <Tr>
          <Td borderBottomStyle="none" padding="0 0.5rem">
            <Button
              colorScheme="linkedin"
              variant="ghost"
              marginX="0"
              marginY="0.25rem"
              width="4rem"
              borderRadius="50rem"
              onClick={() => editClickHandler(3)}
            >
              {edit[3] ? "Edit" : "Save"}
            </Button>
          </Td>
          <Td borderBottomStyle="none">null</Td>
          <Td borderBottomStyle="none">null</Td>
          <Td borderBottomStyle="none">null</Td>
          <Td borderBottomStyle="none">null</Td>
          <Td borderBottomStyle="none">null</Td>
          <Td borderBottomStyle="none">null</Td>
          <Td borderBottomStyle="none">null</Td>
        </Tr>
      </Tbody>
    </Table>
  );
}
