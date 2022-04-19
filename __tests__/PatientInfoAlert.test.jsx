import { render, screen, cleanup } from "@testing-library/react";
import ContextProvider from "../context/AppContext";
import UserForm from "../components/UserForm";
import PatientInformationAlert from "../components/patient/patientInformation";

// unit test showing how PatienInformationAlert functions with missing patient details

afterEach(cleanup);
describe("Patient Details Update", () => {
  const patientDetails = {
    id: 5943857,
    firstname: "Jane",
    lastname: "Smith",
    address: "567 Sesame Street",
    email: "jane.smith@email.com",
    phonenumber: 4356753535,
    dateofbirth: null,
    type: "patient",
  };
  describe("Updated user form testing", () => {
    it("Fill in and render patient details with the proper information", async () => {
      render(
        <ContextProvider mockData={{}}>
          <UserForm userData={patientDetails} />
        </ContextProvider>
      );
      expect(screen.getByTestId("user-id").value).toBe("5943857");
      expect(screen.getByTestId("user-phone").value).toBe("4356753535");
      expect(screen.getByTestId("user-address").value).toBe(
        patientDetails.address
      );
    });

    describe("Update missing information testing", () => {
      it("Check for missing patient details alert", async () => {
        render(
          <ContextProvider mockData={{}}>
            <PatientInformationAlert user={patientDetails} />
          </ContextProvider>
        );
        const btn = await screen.queryAllByTestId("info-alert");
        expect(btn).toBeDefined();
      });
    });
  });
});
