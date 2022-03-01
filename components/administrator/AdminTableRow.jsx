import { Tr, Td, Button } from "@chakra-ui/react";

export default function AdminTableRow(props) {
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
    userDoctor,
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
      {userType === "patient" ? <Td>{userDoctor}</Td> : ""}
    </Tr>
  );
}
