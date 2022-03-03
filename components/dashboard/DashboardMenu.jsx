import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  IconButton,
  List,
  ListIcon,
  ListItem,
  useDisclosure,
} from "@chakra-ui/react";
import {
  MdMenuOpen,
  MdMenu,
  MdPerson,
  MdPersonOutline,
  MdFace,
  MdMedication,
  MdOutlineMedication,
  MdOutlineFace,
  MdHealthAndSafety,
  MdOutlineHealthAndSafety,
  MdLocalPolice,
  MdOutlineLocalPolice,
  MdAdminPanelSettings,
  MdOutlineAdminPanelSettings,
} from "react-icons/md";
import React from "react";
import useHover from "../../hooks/useHover";
import { useAppContext } from "../../context/AppContext";

export default function DashboardMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAppContext();
  const [allUsersRef, isAllUsersHovered] = useHover();
  const [patientsRef, isPatientsHovered] = useHover();
  const [doctorsRef, isDoctorsHovered] = useHover();
  const [healthOfficialsRef, isHealthOfficialsHovered] = useHover();
  const [immigrationOfficerRef, isImmigrationOfficerHovered] = useHover();
  const [adminRef, isAdminHovered] = useHover();

  const btnRef = React.useRef();

  const options = [
    {
      name: "All users",
      icon: MdPerson,
      hoverIcon: MdPersonOutline,
      ref: allUsersRef,
      hovered: isAllUsersHovered,
    },
    {
      name: "Patients",
      icon: MdFace,
      hoverIcon: MdOutlineFace,
      ref: patientsRef,
      hovered: isPatientsHovered,
    },
    {
      name: "Doctors",
      icon: MdMedication,
      hoverIcon: MdOutlineMedication,
      ref: doctorsRef,
      hovered: isDoctorsHovered,
    },
    {
      name: "Health Officials",
      icon: MdHealthAndSafety,
      hoverIcon: MdOutlineHealthAndSafety,
      ref: healthOfficialsRef,
      hovered: isHealthOfficialsHovered,
    },
    {
      name: "Immigration Officers",
      icon: MdLocalPolice,
      hoverIcon: MdOutlineLocalPolice,
      ref: immigrationOfficerRef,
      hovered: isImmigrationOfficerHovered,
    },
    {
      name: "Adminstrators",
      icon: MdAdminPanelSettings,
      hoverIcon: MdOutlineAdminPanelSettings,
      ref: adminRef,
      hovered: isAdminHovered,
    },
  ];

  return (
    <>
      <IconButton
        w={8}
        h={6}
        as={isOpen ? MdMenuOpen : MdMenu}
        ref={btnRef}
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="xs"
      >
        <DrawerContent marginTop="3.5rem">
          <DrawerCloseButton />
          <DrawerHeader>Select an option</DrawerHeader>

          <DrawerBody>
            <List spacing={3}>
              {user.user_type !== "patient"
                ? options.map((option, idx) => (
                    <ListItem
                      key={idx}
                      borderRadius="30px"
                      p={2}
                      _hover={{ background: "lightgrey", fontWeight: "bold" }}
                      ref={option.ref}
                    >
                      <ListIcon
                        as={option.hovered ? option.hoverIcon : option.icon}
                        w={8}
                        h={6}
                      />
                      {option.name}
                    </ListItem>
                  ))
                : ""}
              {user.user_type !== "patient" ? (
                <Divider height="2px" background="gray.700" />
              ) : (
                ""
              )}
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
