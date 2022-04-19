import { render, screen, fireEvent } from "@testing-library/react";
import NotifViewButton from "../components/NotifViewButton";
import ContextProvider from "../context/AppContext";

describe("< NotifViewButton>", () => {
  it("makes sure info appears in view", () => {
    const notification = {
      info: "test notification info",
      created_at: "12-02-03T120000",
      read: false,
      id: "1",
      flag: false,
    };

    const supabase = {
      updateTableBy: () => {},
    };
    render(
      <ContextProvider mockData={{ supabase }}>
        <NotifViewButton {...notification} />)
      </ContextProvider>
    );
    const button = screen.getAllByRole("button")[0];

    fireEvent.click(button);

    const notificationInfo = screen.getByText("test notification info");
    expect(notificationInfo).toBeInTheDocument();
  });

  it("Displays Notification view button", () => {
    const notification = {
      info: "test notification info",
      created_at: "12-02-03T120000",
      read: false,
      id: "1",
      flag: false,
    };

    const supabase = {
      updateTableBy: () => {},
    };
    render(
      <ContextProvider mockData={{ supabase }}>
        <NotifViewButton {...notification} />)
      </ContextProvider>
    );

    const button = screen.getAllByRole("button")[0];

    fireEvent.click(button);
    const notificationInfo = screen.getByText("Mark as Unread");
    expect(notificationInfo).toBeInTheDocument();
  });
});
