import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import RequestPatientAppointment from "../components/RequestPatientAppointment";
import ContextProvider from "../context/AppContext";

afterEach(cleanup);

describe("Schedule Appointment", () => {
  describe("With incomplete data", () => {
    it("renders validation errors and schedule button is disabled", async () => {
      const { getByLabelText, getByTestId } = render(
        <ContextProvider mockData={{}}>
          <RequestPatientAppointment patientData={{}} />
        </ContextProvider>
      );
      await act(async () => {
        fireEvent.click(getByTestId("open-modal-btn"));
      });

      await act(async () => {
        fireEvent.change(getByLabelText("Subject"), {
          target: { value: "" },
        });
        fireEvent.change(getByLabelText("Location"), {
          target: { value: "" },
        });
        fireEvent.change(getByLabelText("Time"), {
          target: { value: "11:45" },
        });
      });

      expect(await screen.findByTestId("schedule-btn")).toHaveAttribute(
        "disabled"
      );
    });
  });

  describe("Without opening the modal", () => {
    it("Does not find any element of the appointment form", async () => {
      render(
        <ContextProvider mockData={{}}>
          <RequestPatientAppointment patientData={{}} />
        </ContextProvider>
      );

      expect(await screen.queryAllByLabelText("Subject")).toHaveLength(0);
      expect(await screen.queryAllByLabelText("Notes")).toHaveLength(0);
      expect(await screen.queryAllByTestId("schedule-btn")).toHaveLength(0);
      expect(await screen.queryAllByTestId("model-open")).toHaveLength(0);
    });
  });

  describe("With wrong time format", () => {
    it("Raises the wrong date format error and disables schedule button", async () => {
      const { getByLabelText, getByTestId } = render(
        <ContextProvider mockData={{}}>
          <RequestPatientAppointment patientData={{}} />
        </ContextProvider>
      );

      await act(async () => {
        fireEvent.click(getByTestId("open-modal-btn"));
      });

      await act(async () => {
        fireEvent.change(getByLabelText("Subject"), {
          target: { value: "Checkup" },
        });
        fireEvent.change(getByLabelText("Location"), {
          target: { value: "Toronto General Hospital" },
        });
        fireEvent.change(getByTestId("date-in"), {
          target: { value: new Date() },
        });
        fireEvent.change(getByLabelText("Time"), {
          target: { value: "1150" },
        });
      });

      expect(await screen.findByTestId("schedule-btn")).toHaveAttribute(
        "disabled"
      );

      expect(await screen.findAllByTestId("wrong-time-err")).toHaveLength(1);
    });
  });

  describe("With correct and complete data", () => {
    it("Does not show any error and schedule button is enabled", async () => {
      const { getByLabelText, getByTestId } = render(
        <ContextProvider mockData={{}}>
          <RequestPatientAppointment patientData={{}} />
        </ContextProvider>
      );

      await act(async () => {
        fireEvent.click(getByTestId("open-modal-btn"));
      });

      await act(async () => {
        fireEvent.change(getByLabelText("Subject"), {
          target: { value: "Checkup" },
        });
        fireEvent.change(getByLabelText("Location"), {
          target: { value: "Toronto General Hospital" },
        });
        fireEvent.change(getByTestId("date-in"), {
          target: { value: new Date() },
        });
        fireEvent.change(getByLabelText("Time"), {
          target: { value: "11:45" },
        });
      });

      expect(await screen.findByTestId("schedule-btn")).not.toHaveAttribute(
        "disabled"
      );

      expect(await screen.findAllByTestId("correct-format-time")).toHaveLength(
        1
      );

      expect(await screen.queryAllByTestId("wrong-time-err")).toHaveLength(0);
    });
  });
});
