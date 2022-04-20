import { render, screen } from "@testing-library/react";
import NotiFlag from "../components/NotifFlag";
import ContextProvider from "../context/AppContext";

describe("< NotiFlag>", () => {
  it("Displays Notification Flag", () => {
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
        <NotiFlag {...notification} />)
      </ContextProvider>
    );

    const flag = screen.getByText("FLAG");
    expect(flag).toBeInTheDocument();
  });
});
