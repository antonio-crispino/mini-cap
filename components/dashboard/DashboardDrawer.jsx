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
  MdOutlineEmail,
  MdEmail,
} from "react-icons/md";

import { BsFileMedical, BsFileMedicalFill } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import useHover from "../../hooks/useHover";
import { useAppContext } from "../../context/AppContext";
import { useDataContext } from "../../context/DataContext";
import {
  ALL_USERS_TABLE,
  PATIENTS_TABLE,
  STATUSES_TABLE,
  DOCTORS_TABLE,
  HEALTH_OFFICIALS_TABLE,
  IMMIGRATION_OFFICERS_TABLE,
  ADMINS_TABLE,
  BUSINESSES_TABLE,
  PATIENT_UPDATE_INFO,
  PATIENTS_STATUS,
} from "../../utils/types";

export default function DashboardDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, setComponentInView } = useAppContext();
  const { patients } = useDataContext();
  const [currentOpt, setCurrentOpt] = useState();
  const [allUsersRef, isAllUsersHovered] = useHover();
  const [patientsRef, isPatientsHovered] = useHover();
  const [statusesRef, isStatusesHovered] = useHover();
  const [doctorsRef, isDoctorsHovered] = useHover();
  const [healthOfficialsRef, isHealthOfficialsHovered] = useHover();
  const [immigrationOfficerRef, isImmigrationOfficerHovered] = useHover();
  const [businessRef, isBusinessRef] = useHover();
  const [adminRef, isAdminHovered] = useHover();
  const [updateStatusRef, isUpdateStatusHovered] = useHover();
  const [updateInfoRef, isUpdateInfoRef] = useHover();
  const [emailDoctorRef, isEmailDoctorRef] = useHover();

  const btnRef = React.useRef();

  const loggedInUserFullName = `${user.firstname}${
    user.middlename ? ` ${user.middlename}` : ""
  } ${user.lastname}`;

  const loggedInPatient =
    user.userType === "patient"
      ? patients.find((patient) => patient.id === user.id)
      : null;

  const loggedInPatientDoctorFullName = `${
    loggedInPatient?.doctorInfo?.firstname
  }${
    loggedInPatient?.doctorInfo?.middlename
      ? ` ${loggedInPatient?.doctorInfo?.middlename}`
      : ""
  } ${loggedInPatient?.doctorInfo?.lastname}`;

  const generalEmail = () => `
      mailto:${loggedInPatient?.doctorInfo?.email}?
      &subject=-- ENTER SUBJECT HERE --
      &body=Dear Dr. ${loggedInPatientDoctorFullName},
      %0D%0A
      %0D%0A-- ENTER MESSAGE HERE --
      %0D%0A
      %0D%0ABest regards,
      %0D%0A${loggedInUserFullName}
      %0D%0A.
    `;

  const adminOptions = [
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

  const patientOptions = [
    {
      name: "Update my info",
      icon: BsFileMedical,
      hoverIcon: BsFileMedicalFill,
      ref: updateStatusRef,
      hovered: isUpdateStatusHovered,
      onClick: () => setComponentInView(PATIENT_UPDATE_INFO),
    },
    {
      name: "Update Status",
      icon: MdFace,
      hoverIcon: MdOutlineFace,
      ref: updateInfoRef,
      hovered: isUpdateInfoRef,
      onClick: () => setComponentInView(PATIENTS_STATUS),
    },
    {
      name: "Email Doctor",
      icon: MdEmail,
      hoverIcon: MdOutlineEmail,
      ref: emailDoctorRef,
      hovered: isEmailDoctorRef,
      onClick: () => window.open(generalEmail()),
    },
  ];

  const doctorOptions = [
    {
      name: "Patients",
      icon: MdFace,
      hoverIcon: MdOutlineFace,
      ref: patientsRef,
      hovered: isPatientsHovered,
      onClick: () => setComponentInView(PATIENTS_TABLE),
    },
    {
      name: "Statuses",
      icon: MdFace,
      hoverIcon: MdOutlineFace,
      ref: statusesRef,
      hovered: isStatusesHovered,
      onClick: () => setComponentInView(STATUSES_TABLE),
    },
  ];

  const healthOfficialOptions = [
    {
      name: "Patients",
      icon: MdFace,
      hoverIcon: MdOutlineFace,
      ref: patientsRef,
      hovered: isPatientsHovered,
      onClick: () => setComponentInView(PATIENTS_TABLE),
    },
    {
      name: "Statuses",
      icon: MdFace,
      hoverIcon: MdOutlineFace,
      ref: statusesRef,
      hovered: isStatusesHovered,
      onClick: () => setComponentInView(STATUSES_TABLE),
    },
  ];

  useEffect(() => {
    switch (user.userType) {
      case "admin":
        setCurrentOpt(adminOptions);
        break;
      case "patient":
        setCurrentOpt(patientOptions);
        break;
      case "doctor":
        setCurrentOpt(doctorOptions);
        break;
      case "health_official":
        setCurrentOpt(healthOfficialOptions);
        break;
      default:
        break;
    }
  }, [user]);

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
              {currentOpt &&
                currentOpt.map((option, idx) => (
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
                ))}
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
