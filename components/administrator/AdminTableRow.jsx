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
    allDoctors,
  } = props;

  const displayDoctors = (allDoctorsInfo) => (
    // console.log("DOCTORS", allDoctorsInfo);
    // for (let i = 0; i < allDoctorsInfo.length; i += 1) {
    //   const doctor = allDoctorsInfo[i];
    //   <option value={doctor.id}> </option>;
    // }

    <>
      {allDoctorsInfo.map((doc) => (
        <option value={`${doc.firstname} ${doc.lastname}`}> </option>
      ))}
    </>
  );
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
      {/* {userType === "patient" ? <Td>{userDoctor}</Td> : ""} */}
      {/* {userType === "patient" ? displayDoctors(allDoctors) : ""} */}
      {userType === "patient" && userDoctor === "undefined" ? (
        <Td>
          <label htmlFor="choice-of-doctors">
            All Docs
            <input
              list="doctor-select"
              id="choice-of-doctors"
              name="choice-of-doctors"
            />
          </label>

          <datalist id="doctor-select">{displayDoctors(allDoctors)}</datalist>
        </Td>
      ) : (
        ""
      )}
    </Tr>
  );
}
