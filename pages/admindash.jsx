import AdminNav from "../components/AdminNav";
import withAdminAuth from "../components/WithAdminAuth";
import { useAppContext } from "../context/AppContext";
import { useDataContext } from "../context/DataContext";

function AdminDashboard() {
  const { user: currentUser } = useAppContext();
  const {
    users,
    administrators,
    healthOfficials,
    patients,
    businesses,
    immigrationOfficers,
    doctors,
  } = useDataContext();

  return (
    <AdminNav
      currentUser={currentUser}
      users={users}
      administrators={administrators}
      healthOfficials={healthOfficials}
      immigrationOfficers={immigrationOfficers}
      businesses={businesses}
      medicalDoctors={doctors}
      patients={patients}
    />
  );
}

export default withAdminAuth(AdminDashboard);
