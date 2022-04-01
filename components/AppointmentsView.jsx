/* eslint-disable no-param-reassign */
import { Box, Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useDataContext } from "../context/DataContext";
import Appointment from "./Appointment";

function AppointmentsView() {
  const { supabase, user } = useAppContext();
  const { patients } = useDataContext();

  const [myAppointments, setMyAppointments] = useState();

  const retrieveAppointments = async () => {
    let myPatients;
    const appointments = await supabase.getAppointments(user.id, user.userType);
    if (user.userType === "doctor") {
      myPatients = patients.filter((patient) => patient.doctorId === user.id);
      appointments.data.forEach((app) => {
        const patient = myPatients.filter((el) => el.id === app.patientId)[0];
        app.firstname = patient.userInfo.firstname;
        app.lastname = patient.userInfo.lastname;
      });
    }
    return appointments;
  };

  useEffect(async () => {
    const response = await retrieveAppointments();
    setMyAppointments(response.data);
  }, [user.id]);

  return (
    <Box w="full" p={{ base: 2, lg: 10 }}>
      <Grid
        templateColumns="repeat(auto-fill, minmax(50vw, 1fr))"
        gap={{ base: 2, lg: 8 }}
        alignItems="center"
        justifyContent="center"
        justifyItems="center"
        padding={{ base: 4, lg: 10 }}
        borderRadius={5}
        minW="100%"
        bg="linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.55))"
      >
        {myAppointments &&
          myAppointments.map((appointment, index) => (
            <Appointment
              key={`app${appointment.patientId}${appointment.subject}${index}`}
              appointment={appointment}
            />
          ))}
      </Grid>
    </Box>
  );
}

export default AppointmentsView;
