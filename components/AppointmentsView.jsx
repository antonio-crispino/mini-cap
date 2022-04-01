import { Box, Grid } from "@chakra-ui/react";
import Appointment from "./Appointment";

function AppointmentsView() {
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
        <Appointment />
        <Appointment />
        <Appointment />
        <Appointment />
        <Appointment />
        <Appointment />
        <Appointment />
        <Appointment />
        <Appointment />
        <Appointment />
        <Appointment />
        <Appointment />
        <Appointment />
        <Appointment />
        <Appointment />
        <Appointment />
        <Appointment />
        <Appointment />
        <Appointment />
        <Appointment />
      </Grid>
    </Box>
  );
}

export default AppointmentsView;
