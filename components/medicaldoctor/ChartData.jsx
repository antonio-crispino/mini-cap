import { Box, List, ListItem } from "@chakra-ui/react";
import React from "react";
import ChartTest from "./ChartTest";

function ChartData({
  patientDetails,
  patientStatusDetails,
  // setPatientDetails,
  // setPatientStatusesVisible,
}) {
  if (!patientStatusDetails) {
    return null;
  }
  if (!patientDetails) {
    return null;
  }

  let patientName = null;

  if (patientDetails !== null) {
    patientName = Object.keys(patientDetails.firstname[0]).map(
      () => patientDetails.firstname
    );
  }

  const tempertureChart = Object.keys(patientStatusDetails).map((detail) => {
    if (
      detail === "created_at" ||
      detail === "recordedOn" ||
      detail === "medicalCard" ||
      detail === "id" ||
      detail === "doctorId"
    )
      return null;

    const chartData = [];
    let i = 0;

    for (let u = 0; u < patientStatusDetails.length; u++) {
      chartData[i] = patientStatusDetails[u].temperature;
      i++;
    }

    const tempertureData = {
      label: patientName,
      fill: false,
      backgroundColor: "#edf2f7",
      borderColor: "#edf2f7",
      data: chartData,
    };

    return (
      <ListItem mx={12} key={Math.floor(Math.random() * 1000000)}>
        <ChartTest
          key={Math.floor(Math.random() * 1000000)}
          StatusData={tempertureData}
        />
      </ListItem>
    );
  });

  return (
    <Box
      borderRadius="1rem"
      padding="1rem"
      width="20rem"
      display="flex"
      flexDirection="column"
      gap="1rem"
    >
      <List borderRadius="1rem" padding="1rem">
        {tempertureChart}
      </List>
    </Box>
  );
}

export default ChartData;
