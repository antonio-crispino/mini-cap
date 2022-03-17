import { render, screen, cleanup } from "@testing-library/react";

import ContextProvider from "../context/AppContext";
import StatusForm from "../components/StatusForm";

afterEach(cleanup);

describe("Update status testing", () => {
  const patientInfo = {
    medicalCardNum: 54658795,
    requestedUpdatesList: {
      temperature: false,
      weight: true,
      nausea: false,
      headache: false,
      lethargy: false,
      vomiting: true,
      soreThroat: true,
      nasalCongestion: true,
      fever: true,
      chestPain: true,
    },
  };
  describe("Check that the general UI components are rendering with correct", () => {
    it("renders the medical card number in the medical card field", async () => {
      const { getByLabelText } = render(
        <ContextProvider mockData={{}}>
          <StatusForm patientData={patientInfo} testing />
        </ContextProvider>
      );

      const getMedicalCardNum = await getByLabelText("Medical Card").value;

      expect(getMedicalCardNum).toBe("54658795");
    });

    it("Checks that all input fields are rendered correctly", async () => {
      render(
        <ContextProvider mockData={{}}>
          <StatusForm patientData={patientInfo} testing />
        </ContextProvider>
      );

      expect(await screen.findAllByTestId("checkbox-test")).toHaveLength(10);
    });

    it("Checks that only doctor-requested fields are enabled", async () => {
      const { getByLabelText } = render(
        <ContextProvider mockData={{}}>
          <StatusForm patientData={patientInfo} testing />
        </ContextProvider>
      );

      expect(getByLabelText("Weight")).not.toHaveAttribute("disabled");
      expect(getByLabelText("Temperature")).toHaveAttribute("disabled");
    });
  });
});
