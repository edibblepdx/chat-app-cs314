import { io } from "socket.io-client";

const URL = process.env.REACT_APP_CHAT_SERVICE_URL || "http://localhost:8001";

export const socket = io(URL, {
    autoConnect: false,
});

// catch all listener
socket.onAny((event, ...args) => {
    console.log(event, args);
});
