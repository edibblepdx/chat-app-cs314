import { socket } from "../socket";

export default function LeaveChatButton({ chatId }) {

    const handleLeaveChat = () => {
        socket.emit("leave chat", chatId);
    };

    return (
        <button
            className="redButton"
            style={{ top: "650px", left: "1030px" }}
            onClick={handleLeaveChat}
        >
            Leave Chat
        </button>
    );
}
