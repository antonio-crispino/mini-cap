import { render, screen, cleanup } from "@testing-library/react";
import ContextProvider from "../context/AppContext";
import NotifViewButton from "../components/NotifViewButton";

// unit test showing how Notification Viewing functions with test notifications

afterEach(cleanup);
describe("Notifications testing", () => {
  const notif1Details = {
    id: 4,
    userId: 5943857,
    info: "Updates Test",
    created_at: "2022-03-16 03:52:38.127412+00",
    read: true,
  };
  const notif2Details = {
    ...notif1Details,
    read: false,
  };
  describe("Notification viewing test (read)", () => {
    it("Check notificaiton read details", async () => {
      render(
        <ContextProvider mockData={{}}>
          <NotifViewButton {...notif1Details} />
        </ContextProvider>
      );
      expect(screen.getByTestId("notif-view-btn")).toHaveTextContent("Viewed");
    });
  });

  describe("Notification viewing test (unread)", () => {
    it("Check notificaiton read details", async () => {
      render(
        <ContextProvider mockData={{}}>
          <NotifViewButton {...notif2Details} />
        </ContextProvider>
      );

      expect(screen.getByTestId("notif-view-btn")).not.toHaveTextContent(
        "Viewed"
      );
    });
  });
});
