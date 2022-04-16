import { render, screen } from "@testing-library/react";
import ChatStatus from "../../components/messenger/ChatStatus";

describe("<ChatStatus/>", () => {
  it("buttons displayed", () => {
    render(<ChatStatus />);

    const flagButton = screen.getByText("Flag");
    const unflagButton = screen.getByText("Unflag");

    expect(flagButton).toBeInTheDocument();
    expect(unflagButton).toBeInTheDocument();
  });
});
