import { render, screen, cleanup } from "@testing-library/react";
import Appointment from "../components/Appointment";
import ContextProvider from "../context/AppContext";

afterEach(cleanup);

describe("Appointment Card View", () => {
  describe("With doctor view", () => {
    const appointment = {
      subject: "General Checkup",
      date: "2022-04-05T15:45:56.91+00:00",
      location: "Montreal General Hospital",
      notes: "Please keep your mask on at all times!",
      status: "Canceled",
      firstname: "Vikki",
      lastname: "Dearsley",
    };

    const user = {
      id: "3511f1cb-e3a5-4222-b14d-ada2b55cf3c4",
      email: "doctor@supamail.com",
      firstname: "Matt",
      lastname: "Rayas",
      userType: "doctor",
    };
    it("Renders confirm and reject appointment buttons, as well as cancel", async () => {
      render(
        <ContextProvider mockData={{ user }}>
          <Appointment appointment={{ appointment }} />
        </ContextProvider>
      );

      expect(await screen.queryAllByTestId("cancel-btn")).toHaveLength(1);
      expect(await screen.queryAllByTestId("accept-btn")).toHaveLength(0);
      expect(await screen.queryAllByTestId("reject-btn")).toHaveLength(0);
    });
  });

  describe("With patient view", () => {
    const appointment = {
      subject: "Covid Test",
      date: "2022-04-05T23:55:37.882+00:00",
      location: "Laval Health Center",
      notes:
        "Recent symptoms are concerning. We will do a PCR test. Masks on at all times, please!",
      id: "54e05e86-d103-4a42-b57c-375b5a04defe",
      status: "Not-Confirmed",
    };

    const user = {
      email: "c.aireton@supamail.com",
      firstname: "Cherey",
      lastname: "Aireton",
      userType: "patient",
    };
    it("Renders confirm and reject appointment buttons, as well as cancel", async () => {
      render(
        <ContextProvider mockData={{ user }}>
          <Appointment appointment={appointment} />
        </ContextProvider>
      );

      expect(await screen.queryAllByTestId("cancel-btn")).toHaveLength(1);
      expect(await screen.getAllByTestId("accept-btn")).toHaveLength(1);
      expect(await screen.queryAllByTestId("reject-btn")).toHaveLength(1);
    });
  });
});
