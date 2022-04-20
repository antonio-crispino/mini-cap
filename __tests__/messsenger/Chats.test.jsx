import { render, screen } from "@testing-library/react";
import Chats from "../../components/messenger/Chats";

describe("<Chats/>", () => {
  it("chating with doctor appear for patient", () => {
    const chats = [
      { id: 1, info: { firstname: "doctor", lastname: "doctor" } },
    ];
    const currentUser = { id: 1, userType: "patient" };
    const patients = [
      {
        id: 1,
        doctorInfo: {
          id: 2,
          firstname: "doctor",
          lastname: "doctor",
        },
      },
    ];
    const supabase = {
      supaCreateNewConversation: () => {},
    };
    render(
      <Chats
        chats={chats}
        onChatChanged={() => {}}
        patients={patients}
        currentUser={currentUser}
        supabase={supabase}
        currentChatId="1"
      />
    );
    const chatInBox = screen.getByText("doctor doctor");
    expect(chatInBox).toBeInTheDocument();
  });
});
