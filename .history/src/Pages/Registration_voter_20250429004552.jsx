import React, { useEffect, useState } from 'react';
import './Registration.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Registration_voter = () => {
    const [phone, setPhone] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [generatedOTP, setGeneratedOTP] = useState('');
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();

    // ⛔ Redirect if already logged in
    useEffect(() => {
        const existingPhone = localStorage.getItem('phone');
        if (existingPhone) {
            navigate('/', { replace: true });
        }
    }, []);

    const handlePhoneSubmit = (e) => {
        e.preventDefault();
        if (phone.length >= 10) {
            const generatedOTP = Math.floor(1000 + Math.random() * 9000);
            setGeneratedOTP(generatedOTP);
            const message = `Your OTP is: ${generatedOTP}`;
            // Call Laravel API (POST request to Laravel API)
            axios.post(`${BASE_URL}/send-sms`, {
                number: phone,    // phone number from input
                message: message // generated OTP message
            })
                .then(response => {
                    console.log("OTP Sent!", response);
                    setOtpSent(true);
                    setPhone('')
                })
                .catch(error => {
                    console.log("Error Sending OTP", error);
                });
        } else {
            alert('Please enter a valid phone number.');
        }
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        if (otp == generatedOTP) {
            // localstorage save phone number
            localStorage.setItem('phone', phone);
            toast.success('OTP Verified Successfully!');
            navigate('/')
        } else {
            toast.error('Invalid OTP! Please try again.');
        }
        setOtp('');
        setOtpSent(false);
    };

    return (
        <div>
            <header>
                <h1>Voter Registration</h1>
                <Link to="/">Back to Home</Link>
            </header>

            <main className="container">
                <div className="registration-form">
                    <h2>Register to Vote</h2>
                    {!otpSent ? (
                        <form onSubmit={handlePhoneSubmit}>
                            <label htmlFor="phone">Phone Number <span>*</span></label>
                            <input
                                type="tel"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                            <button type="submit" className="submit-btn">Send OTP</button>
                        </form>
                    ) : (
                        <form onSubmit={handleOtpSubmit}>
                            <label htmlFor="otp">Enter OTP <span>*</span></label>
                            <input
                                type="text"
                                id="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                            <button type="submit" className="submit-btn">Verify OTP</button>
                        </form>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Registration_voter;
