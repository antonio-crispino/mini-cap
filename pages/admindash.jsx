import { Grid, GridItem } from "@chakra-ui/react";
import DashboardTopBar from "../components/dashboard/DashboardTopBar";
import MainDashView from "../components/dashboard/MainDashView";
import withAdminAuth from "../components/WithAdminAuth";

function AdminDashboard() {
  return (
    <Grid
      backgroundImage="url('/images/Background_Light.png')"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundAttachment="fixed"
      backgroundSize="cover"
      minHeight="100vh"
      fontSize="1rem"
      gridTemplateColumns="23% auto"
    >
      <GridItem>
        <DashboardTopBar />
      </GridItem>
      <GridItem marginTop="5rem" marginRight="3rem">
        <MainDashView />
      </GridItem>
    </Grid>
  );
}

export default withAdminAuth(AdminDashboard);
