import { render, screen } from "@testing-library/react";
import NotificationList from "../components/NotificationList";
import ContextProvider from "../context/AppContext";

describe("< NotificationList>", () => {
  it("Displays list of notifications", () => {
    const notifications = [
      {
        info: "test notification info",
        created_at: "12-02-03T120000",
        read: false,
        id: "1",
        flag: false,
      },
    ];
    render(
      <ContextProvider mockData={{ notifications }}>
        <NotificationList />
      </ContextProvider>
    );

    const notificationInfo = screen.getByText("test notification info");
    expect(notificationInfo).toBeInTheDocument();
  });
});
