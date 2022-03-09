import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import SupaClient from "../utils/supabase";
import withAdminAuth from "../components/WithAdminAuth";
import { useAppContext } from "../context/context";

function AdminDashboard() {
  const { user: currentUser } = useAppContext();
  const [users, setUsers] = useState([]);
  const [administrators, setAdministrators] = useState([]);
  const [healthOfficials, setHealthOfficials] = useState([]);
  const [immigrationOfficers, setImmigrationOfficers] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [medicalDoctors, setMedicalDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctorsPatients, setDoctorsPatients] = useState([]);

  async function fetchAllUsers() {
    const client = new SupaClient();
    const { data: userArray } = await client.supaGetUsers();
    const { data: administratorArray } = await client.supaGetAdministrators();
    const { data: healthOfficialArray } = await client.supaGetHealthOfficials();
    const { data: immigrationOfficerArray } =
      await client.supaGetImmigrationOfficers();
    const { data: businessArray } = await client.supaGetBusinesses();
    const { data: medicalDoctorArray } = await client.supaGetMedicalDoctors();
    const { data: patientArray } = await client.supaGetPatients();
    const { data: doctorsPatientArray } = await client.supaGetDoctorsPatients();

    setUsers(userArray);
    setAdministrators(administratorArray);
    setHealthOfficials(healthOfficialArray);
    setImmigrationOfficers(immigrationOfficerArray);
    setBusinesses(businessArray);
    setMedicalDoctors(medicalDoctorArray);
    setPatients(patientArray);
    setDoctorsPatients(doctorsPatientArray);
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <AdminNav
      currentUser={currentUser}
      users={users}
      administrators={administrators}
      healthOfficials={healthOfficials}
      immigrationOfficers={immigrationOfficers}
      businesses={businesses}
      medicalDoctors={medicalDoctors}
      patients={patients}
      doctorsPatients={doctorsPatients}
    />
  );
}

export default withAdminAuth(AdminDashboard);
