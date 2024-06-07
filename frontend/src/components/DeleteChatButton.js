import { socket } from "../socket";

export default function DeleteChatButton({ chatId }) {

    const handleDeleteChat = () => {
        socket.emit("delete chat", chatId);
    };

    return (
        <button
            className="redButton"
            style={{ top: "700px", left: "1030px" }}
            onClick={handleDeleteChat}
        >
            Delete Chat
        </button>
    );
}