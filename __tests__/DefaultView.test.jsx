import { render, cleanup, screen } from "@testing-library/react";

import DefaultView from "../components/DefaultView";
import ContextProvider from "../context/AppContext";

afterEach(cleanup);
describe("Default View test", () => {
  const userDetails = {
    id: 5943857,
    firstname: "Jane",
    lastname: "Smith",
    address: "567 Sesame Street",
    email: "jane.smith@email.com",
    phonenumber: 4356753535,
    dateofbirth: null,
    type: "patient",
  };
  describe("Testing view rendering", () => {
    it("Renders user default view", async () => {
      render(
        <ContextProvider mockData={{}}>
          <DefaultView user={userDetails} />
        </ContextProvider>
      );
      expect(screen.getByTestId("default-view")).toHaveTextContent(
        userDetails.firstname
      );
    });
  });
});
