import React from 'react';

export default function ChatBubble({messages, chatRef}) {
    //One Chat bubble
    const ChatBubble = ({message}) => {
        return(
            <div className="customBub">
                <p className="message">
                    {message}
                </p>
            </div>
        );
    };

    //All chat bubbles
    const mapBubbles = () => {
        return (
            <div ref={chatRef} className="scrollChat">
                {messages.map((msg) => (
                    <ChatBubble key={msg._id} message={msg.message} />
                ))}
            </div>
        );
    };

    return (
        <div>
            {mapBubbles()}
        </div>
    );
}