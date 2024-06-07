import { useEffect } from "react";
import { socket } from "../socket";
import { toast } from 'react-hot-toast';

export default function DeleteChatButton({ chatId }) {
    useEffect(() => {
        socket.on("fail", ({msg}) => {
            toast.error(msg);
        });

        return () => {
            socket.off("fail");
        };
    }, []);

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