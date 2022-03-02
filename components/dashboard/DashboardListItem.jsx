import { ListItem, Box } from "@chakra-ui/react";

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
      <Box
        className={`material-icons${
          outline[index] && !showTable[index] ? "-outlined" : ""
        }`}
      >
        {icon}
      </Box>
      <Box>{name}</Box>
    </ListItem>
  );
}
