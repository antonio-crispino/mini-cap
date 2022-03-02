import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spacer,
  Icon,
} from "@chakra-ui/react";
import { MdAccountCircle, MdOutlineAccountCircle } from "react-icons/md";
import { useAppContext } from "../../context/context";

import DashboardMenu from "./DashboardMenu";
import useHover from "../../hooks/useHover";

export default function DashboardTopBar() {
  const { user, logout } = useAppContext();
  const [accountIconRef, isAccountIconHovered] = useHover();

  return (
    <Flex
      as="header"
      position="fixed"
      backgroundColor="whitesmoke"
      backdropFilter="saturate(180%) blur(5px)"
      w="100%"
      px={2}
      py={3}
    >
      <DashboardMenu />

      <Spacer />

      <Box>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            ref={accountIconRef}
          >
            <Flex alignItems="center" gap={1} justifyContent="center">
              <Icon
                as={
                  isAccountIconHovered
                    ? MdAccountCircle
                    : MdOutlineAccountCircle
                }
                w={8}
                h={6}
              />
              {user?.firstname} {user?.lastname}
            </Flex>
          </MenuButton>
          <MenuList>
            <MenuItem justifyContent="center" onClick={async () => logout()}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
}
