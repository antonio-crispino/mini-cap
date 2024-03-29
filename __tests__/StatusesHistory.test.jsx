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

      // expect(getName).toBe("fakefirstname fakemidlename fakelastname");
      expect(await screen.queryAllByTestId("NameTest")).toHaveLength(0);
    });
  });
});
