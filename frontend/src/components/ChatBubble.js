import React from 'react';

export default function ChatBubble({messages, chatRef}) {

    const formatDate = (dateString) => {
        const options = {
          hour: '2-digit',
          minute: '2-digit',
          day: '2-digit',
          month: 'short'
        };
        return new Date(dateString).toLocaleTimeString([], options);
    };

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
                    <>
                    <p style={{marginTop: "10px"}}>{msg.userName} {formatDate(msg.createdAt)}</p>
                    <ChatBubble key={msg._id} message={msg.message} />
                    </>
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