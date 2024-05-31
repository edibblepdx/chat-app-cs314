import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
    const navigate = useNavigate();
    
    const logoutUser = async () => {
        try {
            await axios.post("/user/logout");
            navigate("/user/login");
        } catch (err) {
            console.log(err);
        }
    };
    
    return (
        <div>
            <button onClick={logoutUser} className="login-out"
            style={{
                left: "1360px",
                top: "18px"
            }}>Logout</button>
        </div>
    );
}
