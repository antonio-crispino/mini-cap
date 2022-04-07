import { render, screen } from "@testing-library/react";
import Messages from "../../components/messenger/Messages";

describe("<Messages/>", () => {
  it.only("renders messages provided props are passed", () => {
    window.HTMLElement.prototype.scrollIntoView = function () {};
    const messages = [
      { senderId: 1, id: 1, text: "hi" },
      { senderId: 2, id: 2, text: "hello" },
    ];
    render(<Messages messages={messages} userId="1" />);
    const msg = screen.getByText("hi");
    expect(msg).toBeInTheDocument();
  });
});
