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
    doctorsPatientsCount,
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

      {userType === "medicalDoctors" ? (
        <Td>{doctorsPatientsCount[user.id]}</Td>
      ) : (
        ""
      )}

      {userType === "patient" ? <Td>hi</Td> : ""}
    </Tr>
  );
}

function getDoctorObj(doctorsPatients) {
  const doctorsObjs = {};
  for (let index = 0; index < doctorsPatients.length; index += 1) {
    const element = doctorsPatients[index];
    if (element.doctor_id in doctorsObjs) {
      doctorsObjs[element.doctor_id] += 1;
    } else {
      doctorsObjs[element.doctor_id] = 1;
    }
  }

  return doctorsObjs;
}

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
            {userType === "medicalDoctors" ? <Th>Number of Patients</Th> : ""}
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
              doctorsPatientsCount={getDoctorObj(doctorsPatients)}
              userDoctor={
                doctorsPatients[
                  doctorsPatients.find(
                    (element) => element.patient_id === user.id
                  )
                ]
              }
            />
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
