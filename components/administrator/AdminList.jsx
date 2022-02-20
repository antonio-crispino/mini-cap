/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { List } from "@chakra-ui/react";
import AdminListItem from "./AdminListItem";

export default function AdminList(props) {
  const { outline, outlineOverHandler, outlineLeaveHandler } = props;
  const icons = {
    user: "person",
    administrator: "admin_panel_settings",
    health_official: "health_and_safety",
    immigration_officer: "local_police",
    business: "store",
    medical_doctor: "medication",
    patient: "face",
  };
  const names = {
    user: "All Users",
    administrator: "Administrator",
    health_official: "Health Officials",
    immigration_officer: "Immigration Officers",
    business: "Businesses",
    medical_doctor: "Medical Doctors",
    patient: "Patients",
  };
  return (
    <List>
      <AdminListItem
        icon={icons.user}
        name={names.user}
        outline={outline}
        index={0}
        outlineOverHandler={outlineOverHandler}
        outlineLeaveHandler={outlineLeaveHandler}
      />
      <AdminListItem
        icon={icons.administrator}
        name={names.administrator}
        outline={outline}
        index={1}
        outlineOverHandler={outlineOverHandler}
        outlineLeaveHandler={outlineLeaveHandler}
      />
      <AdminListItem
        icon={icons.health_official}
        name={names.health_official}
        outline={outline}
        index={2}
        outlineOverHandler={outlineOverHandler}
        outlineLeaveHandler={outlineLeaveHandler}
      />
      <AdminListItem
        icon={icons.immigration_officer}
        name={names.immigration_officer}
        outline={outline}
        index={3}
        outlineOverHandler={outlineOverHandler}
        outlineLeaveHandler={outlineLeaveHandler}
      />
      <AdminListItem
        icon={icons.business}
        name={names.business}
        outline={outline}
        index={4}
        outlineOverHandler={outlineOverHandler}
        outlineLeaveHandler={outlineLeaveHandler}
      />
      <AdminListItem
        icon={icons.medical_doctor}
        name={names.medical_doctor}
        outline={outline}
        index={5}
        outlineOverHandler={outlineOverHandler}
        outlineLeaveHandler={outlineLeaveHandler}
      />
      <AdminListItem
        icon={icons.patient}
        name={names.patient}
        outline={outline}
        index={6}
        outlineOverHandler={outlineOverHandler}
        outlineLeaveHandler={outlineLeaveHandler}
      />
    </List>
  );
}
