const Chatbox = () => {
    const customInput = () => {
        return (
            <div className="inputBox">
                <input className="customInput" type="text" placeholder="Type something..."/>
            </div>
        );
    }


    return (
        <div className="chatBox">
            Chat Box
            {customInput()}
        </div>
    );
};

export default Chatbox;