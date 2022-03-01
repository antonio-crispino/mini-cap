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
    // medicalDoctors,
  } = props;

  const findDocName = (patientId) => {
    let docId;
    for (let i = 0; i < doctorsPatients.length; i += 1) {
      if (doctorsPatients[i].patient_id === patientId) {
        docId = doctorsPatients[i].doctor_id;
      }
      // console.log("1st loop docID", i, docId);
      // This loop itterates 3 times which corresponds to the length of the doctorsPatients table
    }

    for (let i = 0; i < users.length; i += 1) {
      if (users[i].id === docId) {
        return users[i].userInfo.firstname;
      }
      // console.log("2nd loop", i);
      // console.log("2nd loop name", users[i].userInfo.firstname);
      // This loop itterates 4 times which corresponds to the length of the Patients table therefore the "users.length" is "patients.length"
      // When it was successfully displaying "hello" as a doctor, that was bc user "hello den" was both a patient and doctor, and user "pop pop" had hello den as their doc
      // so it was checking patient[i].id === docID which was TRUE when helloden === helloden, and it was returning patient[i].id.userInfo.firstname (hello)
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
