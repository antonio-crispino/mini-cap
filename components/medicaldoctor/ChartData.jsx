import ChartTest from "./ChartTest";

function ChartData({
  // patientDetails,
  patientStatusDetails,
  // setPatientDetails,
  // setPatientStatusesVisible,
}) {
  if (!patientStatusDetails) {
    return null;
  }
  /*
  let patientName = null;

  if (patientDetails !== null) {
    patientName = Object.keys(patientDetails.firstname[0]).map(() => (
      <b>{`${patientDetails.firstname} ${patientDetails.middlename || ""} ${
        patientDetails.lastname
      }`}</b>
    ));
  }
*/

  /*
  const statusColumns = Object.keys(patientStatusDetails).map((detail) => {
    if (
      detail === "created_at" ||
      detail === "recordedOn" ||
      detail === "medicalCard" ||
      detail === "id" ||
      detail === "doctorId"
    )
      return null;
    return patientStatusDetails[detail];
  });
*/

  /*
  const onClickHandler = () => {
    setPatientDetails(patientDetails);
    setPatientStatusesVisible(false);
  };
*/
  return (
    <ChartTest
      key={Math.floor(Math.random() * 1000000)}
      StatusData={[34, 35, 36, 37, 38, 39, 36]}
    />
  );
}

export default ChartData;
