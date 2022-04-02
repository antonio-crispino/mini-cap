import { Grid, Box } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
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
  CARD_DETAILS,
  BUSINESSES_TABLE,
  PATIENT_UPDATE_INFO,
  PATIENTS_STATUS,
  DEFAULT_VIEW,
  NOTIFICATION,
  HISTORY_TABLE,
} from "../../utils/types";
import CardGrid from "../CardsGrid";
import CardDetails from "../CardDetails";
import FilterPanel from "../FilterPanel";
import GenericForm from "../GenericForm";
import DefaultView from "../DefaultView";
import NotificationList from "../NotificationList";
import AllPatientsStatus from "../medicaldoctor/AllPatientsStatus";
import StatusesHistory from "../medicaldoctor/StatusesHistory";

export default function MainDashView() {
  const { componentInView, user } = useAppContext();
  const {
    users,
    patients,
    administrators,
    healthOfficials,
    immigrationOfficers,
    businesses,
    doctors,
  } = useDataContext();

  const [checkedItems, setCheckedItems] = useState({
    hasDoc: false,
    noDoc: false,
    symptoms: false,
  });

  const [filteredPatients, setFilteredPatients] = useState([...patients]);
  const [filteredUsers, setFilteredUsers] = useState([...users]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([...businesses]);
  const [filteredImmOfficers, setFilteredImmOfficers] = useState([
    ...immigrationOfficers,
  ]);
  const [filteredHealthOfficials, setFilteredHealthOfficials] = useState([
    ...healthOfficials,
  ]);
  const [filteredAdmins, setFilteredAdmins] = useState([...administrators]);
  const [filteredDoctors, setFilteredDoctors] = useState([...doctors]);
  const [searchedString, setSearchedString] = useState([]);

  useEffect(() => {
    const filterState = () => {
      const { hasDoc, noDoc, symptoms } = checkedItems;
      const filteredState = patients.filter((patient) => {
        if (hasDoc && !patient.doctorId) {
          return false;
        }
        if (noDoc && patient.doctorId) {
          return false;
        }
        if (symptoms && !patient.symptoms) {
          return false;
        }
        if (user.userType === "doctor" && patient.doctorId !== user.id) {
          return false;
        }
        return true;
      });
      setFilteredPatients(filteredState);
    };
    filterState();
  }, [checkedItems.hasDoc, checkedItems.noDoc, checkedItems.symptoms]);

  const searchFilter = (userArray, strArray) => {
    let result = 0;
    const answer = userArray.filter((obj) => {
      const objectStr = JSON.stringify(obj).toLowerCase();
      strArray.forEach((str) => {
        if (objectStr.includes(str)) {
          result++;
        } else {
          result *= 0;
        }
      });

      return result > 0;
    });
    return answer;
  };

  useEffect(() => {
    let filteredArray;
    if (searchedString.length > 0) {
      switch (componentInView) {
        case ALL_USERS_TABLE:
          filteredArray = searchFilter(users, searchedString);
          setFilteredUsers(filteredArray);
          break;
        case PATIENTS_TABLE:
        case STATUSES_TABLE:
          filteredArray = searchFilter(patients, searchedString);
          setFilteredPatients(filteredArray);
          break;
        case HISTORY_TABLE:
          filteredArray = searchFilter(patients, searchedString);
          setFilteredPatients(filteredArray);
          break;
        case DOCTORS_TABLE:
          filteredArray = searchFilter(doctors, searchedString);
          setFilteredDoctors(filteredArray);
          break;
        case HEALTH_OFFICIALS_TABLE:
          filteredArray = searchFilter(healthOfficials, searchedString);
          setFilteredHealthOfficials(filteredArray);
          break;
        case IMMIGRATION_OFFICERS_TABLE:
          filteredArray = searchFilter(immigrationOfficers, searchedString);
          setFilteredImmOfficers(filteredArray);
          break;
        case ADMINS_TABLE:
          filteredArray = searchFilter(administrators, searchedString);
          setFilteredAdmins(filteredArray);
          break;
        case BUSINESSES_TABLE:
          filteredArray = searchFilter(businesses, searchedString);
          setFilteredBusinesses(filteredArray);
          break;
        default:
          filteredArray = null;
          break;
      }
    }
  }, [componentInView, searchedString]);

  const checkedHandler = (e) => {
    switch (e.target.value) {
      case "hasDoc":
        setCheckedItems((oldChecked) => ({
          ...oldChecked,
          hasDoc: !oldChecked.hasDoc,
        }));
        break;
      case "noDoc":
        setCheckedItems((oldChecked) => ({
          ...oldChecked,
          noDoc: !oldChecked.noDoc,
        }));
        break;
      case "symptoms":
        setCheckedItems((oldChecked) => ({
          ...oldChecked,
          symptoms: !oldChecked.symptoms,
        }));
        break;
      default:
        break;
    }
  };

  const searchHandler = (e) => {
    let keywords = e.target.value.toLowerCase();
    if (keywords.length > 0) {
      keywords = keywords.split(" ");
      setSearchedString(keywords);
    }
  };

  const patientCheckboxOptions = [
    {
      name: "Assigned Doctor",
      value: "hasDoc",
      checked: checkedItems.hasDoc,
    },
    {
      name: "No Doctor",
      value: "noDoc",
      checked: checkedItems.noDoc,
    },
    {
      name: "Symptomatic",
      value: "symptoms",
      checked: checkedItems.symptoms,
    },
  ];

  const renderComponent = useCallback(() => {
    switch (componentInView) {
      case ALL_USERS_TABLE:
        return <CardGrid payload={filteredUsers} />;
      case PATIENTS_TABLE:
        return <CardGrid payload={filteredPatients} />;
      case STATUSES_TABLE:
        return <AllPatientsStatus />;
      case HISTORY_TABLE:
        return <StatusesHistory />;
      case DOCTORS_TABLE:
        return <CardGrid payload={filteredDoctors} />;
      case HEALTH_OFFICIALS_TABLE:
        return <CardGrid payload={filteredHealthOfficials} />;
      case IMMIGRATION_OFFICERS_TABLE:
        return <CardGrid payload={filteredImmOfficers} />;
      case ADMINS_TABLE:
        return <CardGrid payload={filteredAdmins} />;
      case BUSINESSES_TABLE:
        return <CardGrid payload={filteredBusinesses} />;
      case CARD_DETAILS:
        return <CardDetails />;
      case PATIENT_UPDATE_INFO:
        return <GenericForm userId={user.id} viewType="userInfo" />;
      case PATIENTS_STATUS:
        return <GenericForm userId={user.id} viewType="patientStatus" />;
      case NOTIFICATION:
        return <NotificationList />;
      case DEFAULT_VIEW:
        return <DefaultView user={user} />;

      default:
        return <DefaultView user={user} />;
    }
  }, [
    filteredPatients,
    componentInView,
    filteredAdmins,
    filteredBusinesses,
    filteredUsers,
    filteredDoctors,
    filteredHealthOfficials,
    filteredImmOfficers,
  ]);

  return componentInView === HISTORY_TABLE ||
    componentInView === CARD_DETAILS ||
    componentInView === PATIENT_UPDATE_INFO ||
    componentInView === PATIENTS_STATUS ||
    componentInView === DEFAULT_VIEW ||
    componentInView === NOTIFICATION ? (
    <>{renderComponent()}</>
  ) : (
    <>
      <FilterPanel
        options={patientCheckboxOptions}
        optionClicked={(e) => checkedHandler(e)}
        searchListener={(e) => searchHandler(e)}
      />
      {componentInView === STATUSES_TABLE ? (
        <Box margin="2rem">{renderComponent()}</Box>
      ) : (
        <Grid
          templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
          gap={2}
          alignItems="center"
          justifyContent="center"
          padding={10}
          borderRadius={5}
          minW="100%"
        >
          {renderComponent()}
        </Grid>
      )}
    </>
  );
}
