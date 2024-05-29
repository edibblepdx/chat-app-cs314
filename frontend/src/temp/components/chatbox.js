import React, {useState, useRef, useEffect} from 'react';

//Component for the entire chat box
const Chatbox = () => {

    //Holds onto the input and messages entered
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);
    const chatRef = useRef(null);

    //Scroll to the bottom of the chat when a new chat comes in
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    //Input box component
    const customInput = () => {
        return (
            <div className="inputBox">
                <input 
                    className="customInput" 
                    type="text" 
                    placeholder="Type something..."
                    value={inputValue}
                    onChange={inputChange}
                />
            </div>
        );
    };

    const inputChange = (event) => {
        setInputValue(event.target.value);
    };

    //Append a new message to current messages
    const handleSendClick = () => {
        if (inputValue.trim() !== '') {
            setMessages([...messages, inputValue]);
            setInputValue('');
        }
    };

    //Send Button Component to send messages
    const sendButton = () => {
        return (
            <div>
                <button 
                    className="sendButton"
                    onClick={handleSendClick}>
                    Send
                </button>
            </div>
        );
    };

    //All chat bubbles
    const mapBubbles = () => {
        return (
            <div ref={chatRef} className="scrollChat">
                {messages.map((message, index) => (
                    <ChatBubble key={index} message={message} />
                ))}
            </div>
        );
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

    return (
        <div className="chatBox">
            {customInput()}
            {sendButton()}
            {mapBubbles()}
        </div>
    );
};

export default Chatbox;