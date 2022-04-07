import { render, screen, cleanup } from "@testing-library/react";
import ContextProvider from "../context/AppContext";
import UserForm from "../components/UserForm";
import PatientInformationAlert from "../components/patient/patientInformation";

// unit test showing how PatienInformationAlert functions with missing patient details

afterEach(cleanup);
describe("Update details testing", () => {
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
  describe("Update details testing", () => {
    it("Check for important patient details", async () => {
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

    describe("Update details testing", () => {
      it("Check for important patient details", async () => {
        render(
          <ContextProvider mockData={{}}>
            <PatientInformationAlert user={patientDetails} />
          </ContextProvider>
        );
        expect(screen.findAllByTestId("info-alert")).toBeDefined();
      });
    });
  });
});
