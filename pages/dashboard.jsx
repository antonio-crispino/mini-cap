import { Container, GridItem, SimpleGrid } from "@chakra-ui/react";
import DashboardTopBar from "../components/dashboard/DashboardTopBar";
import MainDashView from "../components/dashboard/MainDashView";
import withAdminAuth from "../components/WithAdminAuth";

function AdminDashboard() {
  return (
    <Container
      backgroundImage="url('/images/Background_Light.png')"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundAttachment="fixed"
      backgroundSize="cover"
      minHeight="100vh"
      fontSize="1rem"
      minW="full"
      p="0px"
    >
      <SimpleGrid w="100%">
        <GridItem w="full" h="full">
          <DashboardTopBar />
        </GridItem>
        <GridItem w="100%">
          <MainDashView />
        </GridItem>
      </SimpleGrid>
    </Container>
  );
}

export default withAdminAuth(AdminDashboard);
