/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import AdminNavMenu from "./administrator/AdminNavMenu";
import AdminNavSidebar from "./administrator/AdminNavSidebar";
import AdminUserTable from "./administrator/AdminUserTable";
// import styles from "../styles/adminnav.module.css";
// className={styles.formWidth}

export default function AdminNav() {
  // const { name } = props;
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
            outlineOverHandler={outlineOnHandler}
            outlineLeaveHandler={outlineLeaveHandler}
            menuView={menuView}
          />
        </Box>
        <Box
          padding="2rem"
          width={menuView ? "75%" : "100%"}
          transition="width 0.5s"
          overflow="auto"
          height="calc(100vh - 4.075rem)"
        >
          <AdminUserTable />
        </Box>
      </Box>
    </Box>
  );
}
