import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import SupaClient from "../utils/supabase";

export default function AdminDashboard() {
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

    /* console.log(
      userArray,
      administratorArray,
      healthOfficialArray,
      immigrationOfficerArray,
      businessArray,
      medicalDoctorArray,
      patientArray
    ); */

    setUsers(userArray);
    setAdministrators(administratorArray);
    setHealthOfficials(healthOfficialArray);
    setImmigrationOfficers(immigrationOfficerArray);
    setBusinesses(businessArray);
    setMedicalDoctors(medicalDoctorArray);
    setPatients(patientArray);
    setDoctorsPatients(doctorsPatientArray);
    // setDoctorsPatients([
    //   {
    //     doctor_id: "c2ea4438-1826-4035-a50d-0fdcee3b3e0d",
    //     patient_id: "8ca5febc-fada-4d74-8fb5-371f7f2c1703",
    //   },
    // ]);
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);

  // console.log("dash-admin", administrators);
  console.log("dash", doctorsPatients);
  return (
    <AdminNav
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
