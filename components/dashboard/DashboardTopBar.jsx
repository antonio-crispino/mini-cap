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
import { useRouter } from "next/router";
import { useAppContext } from "../../context/AppContext";

import DashboardDrawer from "./DashboardDrawer";
import useHover from "../../hooks/useHover";

export default function DashboardTopBar() {
  const { user, logout } = useAppContext();
  const [accountIconRef, isAccountIconHovered] = useHover();
  const router = useRouter();

  return (
    <Flex
      as="header"
      position="sticky"
      backgroundColor="whitesmoke"
      backdropFilter="saturate(180%) blur(5px)"
      w="100%"
      px={2}
      py={2}
      left={0}
      alignItems="center"
      justifyContent="center"
    >
      <DashboardDrawer />
      <Box marginLeft={3}>ANTI COVID</Box>

      <Spacer />

      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          ref={accountIconRef}
          borderRadius="30px"
          _hover={{ fontWeight: "bold" }}
        >
          <Flex alignItems="center" gap={1} justifyContent="center">
            <Icon
              as={
                isAccountIconHovered ? MdAccountCircle : MdOutlineAccountCircle
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
          <MenuItem
            justifyContent="center"
            onClick={() => router.push("/account")}
          >
            Account
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
