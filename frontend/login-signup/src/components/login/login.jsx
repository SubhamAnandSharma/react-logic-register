import React, { useState } from "react";
import "./login.css";
import axios from 'axios'; // Import Axios for making HTTP requests
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
import DOMPurify from 'dompurify';

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const validateForm = () => {
        const { email, password } = user;

        // Check if any field is empty
        if (!email || !password) {
            toast.error("All fields are required");
            return false;
        }

        // Check if email is valid
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            toast.error("Invalid email format");
            return false;
        }

        // Check if any field length exceeds 25 characters
        const fields = [ email, password ];
        const maxLength = 25;
        const longFields = fields.filter(field => field.length > maxLength);
        if (longFields.length > 0) {
            toast.error("Input length must not exceed 25 characters");
            return false;
        }

        return true;
    };

    const handleLogin = async () => {
        if (!validateForm()) {
            return; // Exit if form validation fails
        }
    
        try {
            // Sanitize user inputs using DOMPurify
            const sanitizedUser = {
                email: DOMPurify.sanitize(user.email),
                password: DOMPurify.sanitize(user.password)
            };
    
            const response = await axios.post('http://127.0.0.1:8000/auth/login/', sanitizedUser);
            toast.success("Login successful"); // Toast a success message
            navigate('/home'); // Redirect to home page
            console.log(response);
        } catch (error) {
            console.error('Error logging in:', error.response.data);
            // Handle error response
        }
    };
    

    const handleRegisterClick = () => {
        navigate('/register'); // Redirect to login page when "Login" button is clicked
    };

    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Your Email" />
            <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Your Password" />
            <div className="button" onClick={handleLogin}>Login</div>
            or
            <div className="button" onClick={handleRegisterClick}>Register</div>
        </div>
    );
};

export default Login;
