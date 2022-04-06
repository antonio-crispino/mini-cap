import { render, screen, cleanup } from "@testing-library/react";

import ContextProvider from "../context/AppContext";
import PatientTableRow from "../components/medicaldoctor/PatientTableRow";

afterEach(cleanup);

describe("Update status testing", () => {
  const patientsDetails = {
    firstname: "fakefirstname",
    middlename: "fakemidlename",
    lastname: "fakelastname",
  };
  describe("Check that the general UI components are rendering with correct", () => {
    it("renders the names of the patient in the patient's name field", async () => {
      render(
        <ContextProvider mockData={{}}>
          <PatientTableRow patientsDetails={patientsDetails} testing />
        </ContextProvider>
      );
      const getfirstName = await screen.findAllByTestId("NameTest");

      expect(getfirstName).toBe("fakefirstname fakemidlename fakelastname");
    });
  });
});
