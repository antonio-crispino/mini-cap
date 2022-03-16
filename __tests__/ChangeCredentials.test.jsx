import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import CredentialsForm from "../components/CredentialsForm";
import ContextProvider from "../context/AppContext";

afterEach(cleanup);
describe("Change first name", () => {
  describe("With too short one", () => {
    it("renders the minimum length message", async () => {
      const { getByLabelText, getByTestId } = render(
        <ContextProvider mockData={{}}>
          <CredentialsForm />
        </ContextProvider>
      );

      await act(async () => {
        fireEvent.change(getByLabelText("First Name"), {
          target: { value: "" },
        });
      });
      await act(async () => {
        fireEvent.click(getByTestId("saveFnameBtn"));
      });
      expect(await screen.findAllByTestId("firstname-error-msg")).toHaveLength(
        1
      );
    });
  });
});
