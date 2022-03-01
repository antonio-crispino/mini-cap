/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { Table, Thead, Tbody, Tr, Th, Box } from "@chakra-ui/react";
import AdminTableRow from "./AdminTableRow";

export default function AdminUserTable(props) {
  const {
    users,
    userType,
    visible,
    setUser,
    setShowUser,
    setShowTable,
    doctorsPatients,
  } = props;

  const findDocName = (patientId) => {
    let docId;
    for (let i = 0; i < doctorsPatients.length; i += 1) {
      if (doctorsPatients[i].patient_id === patientId) {
        docId = doctorsPatients[i].doctor_id;
      }
    }

    for (let i = 0; i < users.length; i += 1) {
      if (users[i].id === docId) {
        return users[i].userInfo.firstname;
      }
    }
  };

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
              fullName={`${user.userInfo?.firstname || user.firstname} ${
                user.userInfo?.lastname || user.lastname
              }`}
              email={user.email || "None"}
              phone={user.phone || "None"}
              address={user.address || "None"}
              dateOfBirth={user.dateOfBirth || "None"}
              gender={user.sex || "None"}
              userType={userType || "None"}
              setUser={setUser}
              setShowUser={setShowUser}
              setShowTable={setShowTable}
              userDoctor={userType === "patient" ? findDocName(user.id) : ""}
            />
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
