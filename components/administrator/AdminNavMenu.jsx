/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { Box } from "@chakra-ui/react";

export default function AdminNavMenu(props) {
  const {
    outline,
    outlineOverHandler,
    outlineLeaveHandler,
    menuView,
    setMenuView,
  } = props;
  return (
    <Box
      width="100%"
      height="4.075rem"
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
    >
      <Box display="flex" gap="1.9rem">
        <div
          style={{ cursor: "pointer" }}
          className="material-icons"
          onMouseOver={() => outlineOverHandler(8)}
          onMouseLeave={() => outlineLeaveHandler(8)}
          onClick={() => setMenuView(!menuView)}
        >
          {/* {(outline[8] && !menuView) || (!outline[8] && menuView)
            ? "menu"
          : "menu_open"} */}
          {menuView ? "menu_open" : "menu"}
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
        onMouseOver={() => outlineOverHandler(7)}
        onMouseLeave={() => outlineLeaveHandler(7)}
      >
        <div className={`material-icons${outline[7] ? "-outlined" : ""}`}>
          {`${"account_circle"}`}
        </div>
        <div>John Doe</div>
      </Box>
    </Box>
  );
}
