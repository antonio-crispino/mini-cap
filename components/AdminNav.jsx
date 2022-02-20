/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { Box, List, ListItem } from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
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
      <Box
        width="100%"
        position="sticky"
        top="0"
        zIndex={9999}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        background="whitesmoke"
        borderBottom="solid grey 1px"
        opacity="1"
        padding="1rem 2rem"
        color="black"
        // eslint-disable-next-line react/jsx-no-comment-textnodes
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      >
        <Box display="flex" gap="1.9rem">
          <div
            style={{ cursor: "pointer" }}
            className="material-icons"
            onMouseOver={() => outlineOnHandler(8)}
            onMouseLeave={() => outlineLeaveHandler(8)}
            onClick={() => setMenuView(!menuView)}
          >
            {outline[8] ? "menu" : "menu_open"}
          </div>
          <div style={{ fontWeight: "bold" }}>ANTI-COVID</div>
        </Box>
        <Box
          cursor="pointer"
          display="flex"
          gap="1rem"
          padding="0.25rem 1rem"
          borderRadius="50rem"
          transition="background-color 0.25s"
          _hover={{
            background: "lightgrey",
          }}
          onMouseOver={() => outlineOnHandler(7)}
          onMouseLeave={() => outlineLeaveHandler(7)}
        >
          <div className={`material-icons${outline[7] ? "-outlined" : ""}`}>
            {`${"account_circle"}`}
          </div>
          <div>John Doe</div>
        </Box>
      </Box>
      <Box
        width="25%"
        minWidth="19rem"
        height="100vh"
        maxHeight="100vh"
        position="fixed"
        top="0"
        overflow="auto"
        background="whitesmoke"
        borderRight="solid grey 1px"
        opacity="1"
        padding="5.25rem 2rem 2rem 2rem"
        color="black"
        transform={`translateX(${menuView ? "-30rem" : "0"})`}
        transition="transform 0.5s"
      >
        <AdminList
          outline={outline}
          outlineOverHandler={outlineOnHandler}
          outlineLeaveHandler={outlineLeaveHandler}
        />
      </Box>
    </Box>
  );
}

function AdminList(props) {
  const { outline, outlineOverHandler, outlineLeaveHandler } = props;
  const icons = {
    user: "person",
    administrator: "admin_panel_settings",
    health_official: "health_and_safety",
    immigration_officer: "local_police",
    business: "store",
    medical_doctor: "medication",
    patient: "face",
  };
  const names = {
    user: "Users",
    administrator: "Administrator",
    health_official: "Health Officials",
    immigration_officer: "Immigration Officers",
    business: "Businesses",
    medical_doctor: "Medical Doctors",
    patient: "Patients",
  };
  return (
    <List>
      <AdminListItem
        icon={icons.user}
        name={names.user}
        outline={outline}
        index={0}
        outlineOverHandler={outlineOverHandler}
        outlineLeaveHandler={outlineLeaveHandler}
      />
      <AdminListItem
        icon={icons.administrator}
        name={names.administrator}
        outline={outline}
        index={1}
        outlineOverHandler={outlineOverHandler}
        outlineLeaveHandler={outlineLeaveHandler}
      />
      <AdminListItem
        icon={icons.health_official}
        name={names.health_official}
        outline={outline}
        index={2}
        outlineOverHandler={outlineOverHandler}
        outlineLeaveHandler={outlineLeaveHandler}
      />
      <AdminListItem
        icon={icons.immigration_officer}
        name={names.immigration_officer}
        outline={outline}
        index={3}
        outlineOverHandler={outlineOverHandler}
        outlineLeaveHandler={outlineLeaveHandler}
      />
      <AdminListItem
        icon={icons.business}
        name={names.business}
        outline={outline}
        index={4}
        outlineOverHandler={outlineOverHandler}
        outlineLeaveHandler={outlineLeaveHandler}
      />
      <AdminListItem
        icon={icons.medical_doctor}
        name={names.medical_doctor}
        outline={outline}
        index={5}
        outlineOverHandler={outlineOverHandler}
        outlineLeaveHandler={outlineLeaveHandler}
      />
      <AdminListItem
        icon={icons.patient}
        name={names.patient}
        outline={outline}
        index={6}
        outlineOverHandler={outlineOverHandler}
        outlineLeaveHandler={outlineLeaveHandler}
      />
    </List>
  );
}

function AdminListItem(props) {
  const {
    icon,
    name,
    outline,
    index,
    outlineOverHandler,
    outlineLeaveHandler,
  } = props;
  return (
    <ListItem
      cursor="pointer"
      padding="1rem"
      display="flex"
      gap="1rem"
      borderRadius={50}
      transition="background-color 0.25s, font-weight 0.25s"
      _hover={{
        background: "lightgrey",
        fontWeight: "bold",
      }}
      onMouseOver={() => outlineOverHandler(index)}
      onMouseLeave={() => outlineLeaveHandler(index)}
    >
      <div className={`material-icons${outline[index] ? "-outlined" : ""}`}>
        {icon}
      </div>
      <div>{name}</div>
    </ListItem>
  );
}
