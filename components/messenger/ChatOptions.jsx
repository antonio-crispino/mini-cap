import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

export default function ChatOptions({ options, onOptionClicked }) {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        New
      </MenuButton>
      <MenuList>
        {options.map((item) => (
          <MenuItem onClick={() => onOptionClicked(item.id)} key={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
