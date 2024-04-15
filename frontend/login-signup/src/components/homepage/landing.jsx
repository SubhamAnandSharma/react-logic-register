import React from "react";
import { Link } from "react-router-dom";
import "./landing.css"; // Assuming you have a landing.css file for styling

const LandingPage = () => {
    return (
        <div className="landing">
            <h1>Welcome to My App</h1>
            <div className="buttons">
                <Link to="/login" className="login-button">Login</Link>
                <Link to="/register" className="register-button">Register</Link>
            </div>
        </div>
    );
};

export default LandingPage;
