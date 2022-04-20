import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import NotifViewButton from "../components/NotifViewButton";
import ContextProvider from "../context/AppContext";

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
