import { fireEvent, render, screen } from "@testing-library/react";
import ChatOptions from "../../components/messenger/ChatOptions";

describe("<ChatOptions/>", () => {
  it("checking if chat options are correctly shown", () => {});

  const options = [
    {
      id: 1,
      name: "super doctor",
    },
  ];
  render(<ChatOptions options={options} onOptionClicked={() => {}} />);
  const button = screen.getByRole("button");
  fireEvent.click(button);

  const chatOption = screen.getByText("super doctor");
  expect(chatOption).toBeInTheDocument();
});
