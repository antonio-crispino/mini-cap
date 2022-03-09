import { render, screen } from "@testing-library/react";
import Main from "../pages/main";
import ContextProvider from "../context/AppContext";

// integration test, sees how main page reacts with withAuth hoc, ErrorCatcher component, context and Main component

describe("<Main/>", () => {
  it("Displays Error catcher and Asks user to login when no user found in context", () => {
    render(
      <ContextProvider mockData={{}}>
        <Main />
      </ContextProvider>
    );

    const msg = screen.getByText("You need to login to view this page");
    expect(msg).toBeInTheDocument();
  });

  it("Displays User name when user found in context", () => {
    render(
      <ContextProvider
        mockData={{
          isLoading: false,
          user: { firstname: "john", lastname: "doe" },
        }}
      >
        <Main />
      </ContextProvider>
    );
    const msg = screen.getByText("Hello john doe");
    expect(msg).toBeInTheDocument();
  });
});
