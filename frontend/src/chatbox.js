
//Component for the entire chat box
const Chatbox = () => {


    let test = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    //Input box component
    const customInput = () => {
        return (
            <div className="inputBox">
                <input className="customInput" type="text" placeholder="Type something..."/>
            </div>
        );
    }

    //Send Button Component to send messages
    const sendButton = () => {
        return (
            <div>
                <a style={{
                    backgroundColor: "rgb(37, 39, 34)",
                    textDecoration: "none",
                    position: "relative",
                    top: "640px",
                    left: "980px",
                    color: "White",
                    borderRadius: "5px",
                    borderWidth: "4px",
                    padding: "15.5px",
                    display: "flex",
                }}>Send</a>
            </div>
        );
    }

    //Chat Bubbles ***works***
    const chatBubble = () => {
        return (
            <div className="customBub">
                {test}
            </div>
        );
    }


    return (
        <div className="chatBox">
            {customInput()}
            {sendButton()}
            <div className="scrollChat">

            </div>
        </div>
    );
};

export default Chatbox;