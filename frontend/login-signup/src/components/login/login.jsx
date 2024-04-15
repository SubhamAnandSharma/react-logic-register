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
    
            // Get CSRF token from cookies
            const csrfToken = getCookie('csrftoken');
    
            // Include CSRF token in the request headers
            const response = await axios.post('http://127.0.0.1:8000/auth/login/', sanitizedUser, {
                headers: {
                    'X-CSRFToken': csrfToken
                }
            });
    
            // Check if the user's email is verified
            const storedEmail = localStorage.getItem('email');
            if (storedEmail) {
                const { email, is_verified } = JSON.parse(storedEmail);
                if (!is_verified) {
                    toast.error("Please register and verify your email before logging in");
                    return; // Exit if email is not verified
                }else{
                    toast.success("Login successful"); // Toast a success message
                    navigate('/home'); // Redirect to home page
                    // console.log(response);
                }
            } else {
                toast.error("Please register and verify your email before logging in");
                return; // Exit if email is not found in storage
            }
    

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

// Function to retrieve CSRF token from cookies
const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};

export default Login;
