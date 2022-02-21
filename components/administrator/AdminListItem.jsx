/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { ListItem } from "@chakra-ui/react";

export default function AdminListItem(props) {
  const {
    icon,
    name,
    outline,
    showTable,
    index,
    outlineOverHandler,
    outlineLeaveHandler,
    tableClickHandler,
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
      onClick={() => tableClickHandler(index)}
    >
      <div
        className={`material-icons${
          outline[index] && !showTable[index] ? "-outlined" : ""
        }`}
      >
        {icon}
      </div>
      <div>{name}</div>
    </ListItem>
  );
}
