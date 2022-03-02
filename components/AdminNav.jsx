/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import AdminNavMenu from "./administrator/AdminNavMenu";
import AdminNavSidebar from "./administrator/AdminNavSidebar";
import AdminUserTable from "./administrator/AdminUserTable";
import AdminIndividualUser from "./administrator/AdminIndividualUser";

export default function AdminNav(props) {
  const {
    users,
    administrators,
    healthOfficials,
    immigrationOfficers,
    businesses,
    medicalDoctors,
    patients,
    doctorsPatients,
  } = props;

  // console.log("hello", doctorsPatients);

  const [outline, setOutline] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ]);

  const outlineOnHandler = (i) => {
    const arr = [...outline];
    arr[i] = false;
    setOutline(arr);
  };

  const outlineLeaveHandler = (i) => {
    const arr = [...outline];
    arr[i] = true;
    setOutline(arr);
  };

  const [showTable, setShowTable] = useState([
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

  const [user, setUser] = useState({});
  const [showUser, setShowUser] = useState(false);

  const tableClickHandler = (i) => {
    const arr = [false, false, false, false, false, false, false, false, false];
    arr[i] = !showTable[i];
    setShowTable(arr);
    setShowUser(false);
  };

  const [menuView, setMenuView] = useState(false);

  return (
    <Box
      backgroundImage="url('/images/Background_Light.png')"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundAttachment="fixed"
      backgroundSize="cover"
      /* backgroundImage="linear-gradient(to right, #d290f1, #3c9cff)" */
      minHeight="100vh"
      fontSize="1rem"
    >
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
          rel="stylesheet"
        />
      </Head>
      <AdminNavMenu
        outline={outline}
        outlineOverHandler={outlineOnHandler}
        outlineLeaveHandler={outlineLeaveHandler}
        menuView={menuView}
        setMenuView={setMenuView}
      />
      <Box display="flex" justifyContent="space-between" width="100%">
        <Box
          width={menuView ? "25%" : "0"}
          minWidth={menuView ? "19rem" : "0"}
          transition="width 0.5s, min-width 0.5s"
        >
          <AdminNavSidebar
            outline={outline}
            showTable={showTable}
            outlineOverHandler={outlineOnHandler}
            outlineLeaveHandler={outlineLeaveHandler}
            tableClickHandler={tableClickHandler}
            menuView={menuView}
          />
        </Box>
        <Box
          padding="2rem"
          width={menuView ? "75%" : "100%"}
          transition="width 0.5s"
          overflow="auto"
          height="calc(100vh - 4.075rem)"
          /* position="relative" */
        >
          <AdminUserTable
            visible={showTable[0]}
            users={users}
            userType="users"
            setUser={setUser}
            setShowUser={setShowUser}
            setShowTable={setShowTable}
            doctorsPatients={doctorsPatients}
          />
          <AdminUserTable
            visible={showTable[1]}
            users={administrators}
            userType="administrators"
            setUser={setUser}
            setShowUser={setShowUser}
            setShowTable={setShowTable}
            doctorsPatients={doctorsPatients}
          />
          <AdminUserTable
            visible={showTable[2]}
            users={healthOfficials}
            userType="healthOfficials"
            setUser={setUser}
            setShowUser={setShowUser}
            setShowTable={setShowTable}
            doctorsPatients={doctorsPatients}
          />
          <AdminUserTable
            visible={showTable[3]}
            users={immigrationOfficers}
            userType="immigrationOfficers"
            setUser={setUser}
            setShowUser={setShowUser}
            setShowTable={setShowTable}
            doctorsPatients={doctorsPatients}
          />
          <AdminUserTable
            visible={showTable[4]}
            users={businesses}
            userType="businesses"
            setUser={setUser}
            setShowUser={setShowUser}
            setShowTable={setShowTable}
            doctorsPatients={doctorsPatients}
          />
          <AdminUserTable
            visible={showTable[5]}
            users={medicalDoctors}
            userType="medicalDoctors"
            setUser={setUser}
            setShowUser={setShowUser}
            setShowTable={setShowTable}
            doctorsPatients={doctorsPatients}
          />
          <AdminUserTable
            visible={showTable[6]}
            users={patients}
            allUsers={users}
            userType="patient"
            setUser={setUser}
            setShowUser={setShowUser}
            setShowTable={setShowTable}
            doctorsPatients={doctorsPatients}
          />
          <AdminIndividualUser
            user={user}
            /* add user type */
            visible={showUser}
          />
        </Box>
      </Box>
    </Box>
  );
}
