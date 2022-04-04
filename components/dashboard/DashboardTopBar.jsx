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
  IconButton,
  Circle,
} from "@chakra-ui/react";
import { MdAccountCircle, MdOutlineAccountCircle } from "react-icons/md";
import { AiFillBell, AiOutlineBell, AiOutlineMessage, AiOutlineMail } from "react-icons/ai";

import { useRouter } from "next/router";
import { useAppContext } from "../../context/AppContext";

import DashboardDrawer from "./DashboardDrawer";
import useHover from "../../hooks/useHover";
import { NOTIFICATION } from "../../utils/types";

export default function DashboardTopBar() {
  const { user, logout, setComponentInView } = useAppContext();
  const [accountIconRef, isAccountIconHovered] = useHover();
  const [notificationIconRef, isNotificationIconHovered] = useHover();

  const router = useRouter();

  const viewChangeHandler = () => {
    setComponentInView(NOTIFICATION);
  };

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
      <IconButton
        display={
          user.userType === "patient" || user.userType === "doctor"
            ? "flex"
            : "none"
        }
        icon={<AiOutlineMail />}
        fontSize="1.4rem"
        onClick={() => router.push("/email")}
        marginRight="0.25rem"
        alignItems="center"
      />
      <IconButton
        icon={<AiOutlineMessage />}
        fontSize="1.4rem"
        onClick={() => router.push("/messenger")}
        marginRight="0.25rem"
        alignItems="center"
      />
      <Box position="relative" mr={1}>
        <IconButton
          ref={notificationIconRef}
          icon={isNotificationIconHovered ? <AiFillBell /> : <AiOutlineBell />}
          fontSize="1.5rem"
          onClick={() => {
            viewChangeHandler();
          }}
        />
        <Circle
          size="12px"
          bg="purple.400"
          color="white"
          position="absolute"
          top="30px"
          left="25px"
          zIndex="10"
        />
      </Box>
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
