/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { Box } from "@chakra-ui/react";
import AdminList from "./AdminList";

export default function AdminNavSidebar(props) {
  const {
    outline,
    showTable,
    outlineOverHandler,
    outlineLeaveHandler,
    tableClickHandler,
    menuView,
  } = props;
  return (
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
      transform={`translateX(${menuView ? "0" : "-30rem"})`}
      transition="transform 0.5s"
    >
      <AdminList
        outline={outline}
        showTable={showTable}
        outlineOverHandler={outlineOverHandler}
        outlineLeaveHandler={outlineLeaveHandler}
        tableClickHandler={tableClickHandler}
      />
    </Box>
  );
}
