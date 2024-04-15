import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator'; // Import validator library
import "./register.css";
import DOMPurify from 'dompurify';


const Register = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        c_password: ""
    });

    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: DOMPurify.sanitize(value) // Sanitize user input before updating state
        });
    };

    const handleRegister = async () => {
        try {
            // Sanitize user inputs using DOMPurify
            const sanitizedUser = {
                username: DOMPurify.sanitize(user.username),
                email: DOMPurify.sanitize(user.email),
                password: DOMPurify.sanitize(user.password),
                c_password: DOMPurify.sanitize(user.c_password)
            };
    
            // Get CSRF token from cookies
            const csrfToken = getCookie('csrftoken');
    
            // Include CSRF token in the request headers
            const response = await axios.post('http://127.0.0.1:8000/auth/register/', sanitizedUser, {
                headers: {
                    'X-CSRFToken': csrfToken
                }
            });
    
            // Store email with is_verified flag set to false in localStorage
            localStorage.setItem('email', JSON.stringify({ email: sanitizedUser.email, is_verified: false }));
    
            sessionStorage.setItem('otp', response.data.otp);
            navigate('/verify_otp');
            toast.info("Check your email for the OTP");
        } catch (error) {
            console.error('Error registering:', error.response.data);
            if (error.response.status === 400) {
                // Handle validation errors
                const errors = error.response.data;
                Object.keys(errors).forEach(field => {
                    toast.error(errors[field][0]);
                });
            } else {
                toast.error("An error occurred while registering");
            }
        }
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

    const handleLoginClick = () => {
        navigate('/login');
    };

    const validateForm = () => {
        const { username, email, password, c_password } = user;
    
        // Check if any field is empty
        if (!username || !email || !password || !c_password) {
            toast.error("All fields are required");
            return false;
        }
    
        // Check if email is valid
        if (!validator.isEmail(email)) {
            toast.error("Invalid email format");
            return false;
        }
    
        // Check if password length is at least 8 characters
        if (password.length < 8) {
            toast.error("Password must be at least 8 characters long");
            return false;
        }
    
        // Check if password contains at least one uppercase letter
        if (!validator.isStrongPassword(password)) {
            toast.error("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");
            return false;
        }
    
        // Check if password and confirm password match
        if (password !== c_password) {
            toast.error("Passwords do not match");
            return false;
        }

        // Check if username contains only letters and numbers
        if (!validator.isAlphanumeric(username)) {
            toast.error("Username can only contain letters and numbers, no space allowed!");
            return false;
        }

        // Check if any field length exceeds 25 characters
        const fields = [username, email, password, c_password];
        const maxLength = 25;
        const longFields = fields.filter(field => field.length > maxLength);
        if (longFields.length > 0) {
            toast.error("Input length must not exceed 25 characters");
            return false;
        }
    
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            handleRegister();
        }
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword); // Toggle the state to show/hide password
    };

    return (
        <div className="register">
            <h1>Register</h1>
            <input type="text" name="username" value={user.username} onChange={handleChange} placeholder="Enter Username" />
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Your Email" />
            <div className="password-field">
                <input className="password-input" type={showPassword ? "text" : "password"} name="password" value={user.password} onChange={handleChange} placeholder="Your Password" />
                <button className="toggle-button" onClick={handleTogglePassword}>
                    {showPassword ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}
                </button>
            </div>
            <div className="password-field">
                <input className="password-input" type={showPassword ? "text" : "password"} name="c_password" value={user.c_password} onChange={handleChange} placeholder="Re-enter Password" />
                <button className="toggle-button" onClick={handleTogglePassword}>
                    {showPassword ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}
                </button>
            </div>
            <div className="button" onClick={handleSubmit}>Register</div>
            or
            <div className="button" onClick={handleLoginClick}>Login</div>
        </div>
    );
}

export default Register;

