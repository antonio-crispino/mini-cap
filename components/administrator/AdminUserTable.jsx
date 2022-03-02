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
    allUsers,
  } = props;

  const findDocName = (patientId) => {
    let docId;
    for (let i = 0; i < doctorsPatients.length; i += 1) {
      if (doctorsPatients[i].patient_id === patientId) {
        docId = doctorsPatients[i].doctor_id;
      }
    }

    for (let i = 0; i < allUsers.length; i += 1) {
      if (allUsers[i].id === docId) {
        return allUsers[i].firstname;
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
              email={user.userInfo?.email || user.email}
              phone={user.userInfo?.phonenumber || user.phonenumber}
              address={user.userInfo?.address || user.address}
              dateOfBirth={user.userInfo?.dateofbirth || user.dateofbirth}
              gender={user.userInfo?.sex || user.sex}
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
