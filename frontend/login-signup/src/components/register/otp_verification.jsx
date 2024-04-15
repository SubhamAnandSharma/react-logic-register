import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './otp_verification.css';

const OTP_verification = () => {
    const navigate = useNavigate();
    const [OTP, setOTP] = useState("");

    const handleChange = (e) => {
        const { value } = e.target;
        setOTP(value);
    };

    const handleVerification = async () => {
        try {
            const storedOTP = sessionStorage.getItem('otp'); // Retrieve stored OTP from session storage
            if (!storedOTP) {
                throw new Error("No OTP found");
            }
            if (OTP === storedOTP) {
                // Update is_verified to true in localStorage
                const storedEmail = localStorage.getItem('email');
                if (storedEmail) {
                    const parsedEmail = JSON.parse(storedEmail);
                    parsedEmail.is_verified = true;
                    localStorage.setItem('email', JSON.stringify(parsedEmail));
                } else {
                    throw new Error("Email not found");
                }
    
                toast.success("OTP verified successfully");
                navigate('/login');
            } else {
                toast.error("Invalid OTP");
            }
        } catch (error) {
            console.error('Error verifying OTP:', error.message);
            toast.error("Invalid OTP");
        }
    };

    return (
        <div className="otp">
            <h1>OTP verification</h1>
            <input type="text" name="OTP" value={OTP} onChange={handleChange} placeholder="Enter OTP Here" />
            <div className="button" onClick={handleVerification}>Verify Code</div>
        </div>
    );
};

export default OTP_verification;
