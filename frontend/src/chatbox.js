const Chatbox = () => {
    const customInput = () => {
        return (
            <div className="inputBox">
                <input className="customInput" type="text" placeholder="Type something..."/>
            </div>
        );
    }

    const sendButton = () => {
        return (
            <div>
                <a style={{
                    backgroundColor: "rgb(37, 39, 34)",
                    textDecoration: "none",
                    position: "relative",
                    top: "640px",
                    left: "920px",
                    color: "White",
                    borderRadius: "5px",
                    borderWidth: "4px",
                    padding: "15px",
                    display: "flex",
                }}>Send</a>
            </div>
        );
    }

    return (
        <div className="chatBox">
            Chat Box
            {customInput()}
            {sendButton()}
        </div>
    );
};

export default Chatbox;