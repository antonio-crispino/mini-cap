import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import LoginForm from "../components/LoginForm";
import ContextProvider from "../context/AppContext";

afterEach(cleanup);

describe("Login", () => {
  describe("With invalid email", () => {
    it("renders the email validation error", async () => {
      const { getByLabelText, getByTestId } = render(
        <ContextProvider mockData={{}}>
          <LoginForm />
        </ContextProvider>
      );

      await act(async () => {
        fireEvent.change(getByLabelText("Email"), {
          target: { value: "" },
        });
        fireEvent.change(getByLabelText("Password"), {
          target: { value: "super-secret-password" },
        });
      });
      await act(async () => {
        fireEvent.click(getByTestId("submitBtn"));
      });

      expect(await screen.findAllByTestId("login-error-msg")).toHaveLength(1);
    });
  });

  describe("With invalid password", () => {
    it("renders the password validation error", async () => {
      const { getByLabelText, getByTestId } = render(
        <ContextProvider mockData={{}}>
          <LoginForm />
        </ContextProvider>
      );

      await act(async () => {
        fireEvent.change(getByLabelText("Email"), {
          target: { value: "john.doe@mail.com" },
        });
        fireEvent.change(getByLabelText("Password"), {
          target: { value: "zxc" },
        });
      });

      await act(async () => {
        fireEvent.click(getByTestId("submitBtn"));
      });

      expect(await screen.findAllByTestId("login-error-msg")).toHaveLength(1);
    });
  });

  describe("With invalid email and pass", () => {
    it("renders the password validation error", async () => {
      const { getByLabelText, getByTestId } = render(
        <ContextProvider mockData={{}}>
          <LoginForm />
        </ContextProvider>
      );

      await act(async () => {
        fireEvent.change(getByLabelText("Email"), {
          target: { value: "" },
        });
        fireEvent.change(getByLabelText("Password"), {
          target: { value: "zxc" },
        });
      });

      await act(async () => {
        fireEvent.click(getByTestId("submitBtn"));
      });

      expect(await screen.findAllByTestId("login-error-msg")).toHaveLength(2);
    });
  });
});
