import { render, screen, cleanup } from "@testing-library/react";
import AppContextProvider from "../context/AppContext";
import DataContextProvider from "../context/DataContext";
import Card from "../components/Card";

afterEach(cleanup);

describe("Single card testing", () => {
  const mockPatientInfo = {
    doctorId: "3511f1cb-e3a5-4222-b14d-ada2b55cf3c4",
    doctorInfo: {
      address: null,
      contacted_with_covid: false,
      dateofbirth: null,
      email: "doctor@supamail.com",
      firstname: "doctor",
      id: "3511f1cb-e3a5-4222-b14d-ada2b55cf3c4",
      inactive: null,
      lastname: "doctor",
      middlename: null,
      phonenumber: null,
      quarantine: false,
      sex: null,
      updated_at: null,
      userType: "doctor",
    },
    healthFlag: false,
    id: "87c43790-086a-4c5f-94c0-6cb1017d1b3d",
    isPriority: false,
    medicalCardNum: 54457899,
    requestedUpdatesList: {
      chestPain: false,
      fever: false,
      headache: false,
      lethargy: false,
      medicalCard: false,
      nasalCongestion: false,
      nausea: false,
      soreThroat: false,
      temperature: true,
      vomiting: false,
      weight: true,
    },
    status: "none",
    symptoms: true,
    updatesRequestEnd: null,
    updatesRequested: false,
    userInfo: {
      address: "7452\tTousant St\tMontreal\tQuebec\tH3F6B1\n",
      contacted_with_covid: true,
      dateofbirth: "1995-07-02",
      email: "c.aireton@supamail.com",
      firstname: "Cherey",
      id: "87c43790-086a-4c5f-94c0-6cb1017d1b3d",
      inactive: null,
      lastname: "Aireton",
      middlename: null,
      phonenumber: 5145785236,
      quarantine: false,
      sex: "female",
      updated_at: null,
      userType: "patient",
    },
  };

  describe("Check that the general UI components are rendering correctly", () => {
    it("renders the contact trace button text in the card", async () => {
      render(
        <AppContextProvider mockData={{}}>
          <DataContextProvider mockData={{}}>
            <Card fullObj={mockPatientInfo} />
          </DataContextProvider>
        </AppContextProvider>
      );

      const button = screen.getByTestId("contact-trace-button");
      expect(button).toHaveTextContent("Contact Trace");
    });

    it("renders the precaution email button text in the card", async () => {
      render(
        <AppContextProvider mockData={{}}>
          <DataContextProvider mockData={{}}>
            <Card fullObj={mockPatientInfo} />
          </DataContextProvider>
        </AppContextProvider>
      );

      const button = screen.getByTestId("precaution-email-button");
      expect(button).toHaveTextContent("Send Precaution Email");
    });

    it("renders the quarantine email button text in the card", async () => {
      render(
        <AppContextProvider mockData={{}}>
          <DataContextProvider mockData={{}}>
            <Card fullObj={mockPatientInfo} />
          </DataContextProvider>
        </AppContextProvider>
      );

      const button = screen.getByTestId("quarantine-email-button");
      expect(button).toHaveTextContent("Start Quarantine Email");
    });

    it("renders the general email button text in the card", async () => {
      render(
        <AppContextProvider mockData={{}}>
          <DataContextProvider mockData={{}}>
            <Card fullObj={mockPatientInfo} />
          </DataContextProvider>
        </AppContextProvider>
      );

      const button = screen.getByTestId("general-email-button");
      expect(button).toHaveTextContent("Send Email");
    });

    it("renders the details button text in the card", async () => {
      render(
        <AppContextProvider mockData={{}}>
          <DataContextProvider mockData={{}}>
            <Card fullObj={mockPatientInfo} />
          </DataContextProvider>
        </AppContextProvider>
      );

      const button = screen.getByTestId("details-button");
      expect(button).toHaveTextContent("Details");
    });
  });
});
