import { Box, Button } from "@chakra-ui/react";
import { useState } from "react";
import AdminNavMenu from "./dashboard/DashboardTopBar";
import AdminIndividualUser from "./administrator/AdminIndividualUser";
import AdminCreateUser from "./administrator/AdminCreateUser";

export default function AdminNav(props) {
  const { currentUser } = props;

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

  const [user] = useState({});
  const [showUser] = useState(false);
  const [createUser, setCreateUser] = useState(false);

  const createClickHandler = () => {
    const arr = [false, false, false, false, false, false, false, false, false];
    setShowTable(arr);
    setCreateUser(true);
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
      <AdminNavMenu
        currentUser={currentUser}
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
        />
        <Box
          padding="2rem"
          width={menuView ? "75%" : "100%"}
          transition="width 0.5s"
          overflow="auto"
          height="calc(100vh - 4.075rem)"
          /* position="relative" */
        >
          <Button
            display={showTable[0] ? "block" : "none"}
            marginBottom="1rem"
            onClick={createClickHandler}
          >
            + Create New User
          </Button>
          <AdminCreateUser visible={createUser} setVisible={setCreateUser} />

          <AdminIndividualUser
            user={user}
            /* add user type */
            visible={showUser}
            /* setVisible={setShowUser} */
          />
        </Box>
      </Box>
    </Box>
  );
}
