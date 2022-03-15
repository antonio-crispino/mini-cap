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
  MdOutlineAddBusiness,
  MdAddBusiness,
} from "react-icons/md";
import React from "react";
import useHover from "../../hooks/useHover";
import { useAppContext } from "../../context/AppContext";
import {
  ALL_USERS_TABLE,
  PATIENTS_TABLE,
  DOCTORS_TABLE,
  HEALTH_OFFICIALS_TABLE,
  IMMIGRATION_OFFICERS_TABLE,
  ADMINS_TABLE,
  BUSINESSES_TABLE,
} from "../../utils/types";

export default function DashboardDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, setComponentInView } = useAppContext();
  const [allUsersRef, isAllUsersHovered] = useHover();
  const [patientsRef, isPatientsHovered] = useHover();
  const [doctorsRef, isDoctorsHovered] = useHover();
  const [healthOfficialsRef, isHealthOfficialsHovered] = useHover();
  const [immigrationOfficerRef, isImmigrationOfficerHovered] = useHover();
  const [businessRef, isBusinessRef] = useHover();
  const [adminRef, isAdminHovered] = useHover();

  const btnRef = React.useRef();

  const options = [
    {
      name: "All users",
      icon: MdPerson,
      hoverIcon: MdPersonOutline,
      ref: allUsersRef,
      hovered: isAllUsersHovered,
      onClick: () => setComponentInView(ALL_USERS_TABLE),
    },
    {
      name: "Patients",
      icon: MdFace,
      hoverIcon: MdOutlineFace,
      ref: patientsRef,
      hovered: isPatientsHovered,
      onClick: () => setComponentInView(PATIENTS_TABLE),
    },
    {
      name: "Doctors",
      icon: MdMedication,
      hoverIcon: MdOutlineMedication,
      ref: doctorsRef,
      hovered: isDoctorsHovered,
      onClick: () => setComponentInView(DOCTORS_TABLE),
    },
    {
      name: "Health Officials",
      icon: MdHealthAndSafety,
      hoverIcon: MdOutlineHealthAndSafety,
      ref: healthOfficialsRef,
      hovered: isHealthOfficialsHovered,
      onClick: () => setComponentInView(HEALTH_OFFICIALS_TABLE),
    },
    {
      name: "Businesses",
      icon: MdAddBusiness,
      hoverIcon: MdOutlineAddBusiness,
      ref: businessRef,
      hovered: isBusinessRef,
      onClick: () => setComponentInView(BUSINESSES_TABLE),
    },
    {
      name: "Immigration Officers",
      icon: MdLocalPolice,
      hoverIcon: MdOutlineLocalPolice,
      ref: immigrationOfficerRef,
      hovered: isImmigrationOfficerHovered,
      onClick: () => setComponentInView(IMMIGRATION_OFFICERS_TABLE),
    },
    {
      name: "Adminstrators",
      icon: MdAdminPanelSettings,
      hoverIcon: MdOutlineAdminPanelSettings,
      ref: adminRef,
      hovered: isAdminHovered,
      onClick: () => setComponentInView(ADMINS_TABLE),
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
              {user?.userType !== "patient"
                ? options.map((option, idx) => (
                    <ListItem
                      key={idx}
                      borderRadius="30px"
                      p={2}
                      _hover={{
                        background: "lightgrey",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                      ref={option.ref}
                      onClick={option.onClick}
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
              {user?.userType !== "patient" ? (
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
