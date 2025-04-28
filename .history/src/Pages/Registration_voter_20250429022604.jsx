import React, { useEffect, useState } from 'react';
import './Registration.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Registration_voter = () => {
    const [phone, setPhone] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [gOtp, setGOtp] = useState('');
    const [timeLeft, setTimeLeft] = useState(20); // 20 seconds timer
    const [votingClosed, setVotingClosed] = useState(false);

    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();

    useEffect(() => {
        const existingPhone = localStorage.getItem('phone');
        if (existingPhone) {
            navigate('/', { replace: true });
        }
    }, []);

    useEffect(() => {
        if (otpSent && timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }

        if (timeLeft === 0) {
            setVotingClosed(true);
            toast.error('Voting time expired!');
        }
    }, [otpSent, timeLeft]);

    const handlePhoneSubmit = (e) => {
        e.preventDefault();
        if (phone.length >= 10) {
            const generatedOTP = Math.floor(1000 + Math.random() * 9000);
            setGOtp(generatedOTP);
            const message = `Your OTP is: ${generatedOTP}`;
            axios.post(`${BASE_URL}/send-sms`, {
                number: phone,
                message: message
            })
                .then(response => {
                    toast.success('OTP Sent! Please check your phone.');
                    console.log("OTP Sent!", response);
                    setOtpSent(true);
                    setTimeLeft(20); // start the 20 seconds countdown
                })
                .catch(error => {
                    console.log("Error Sending OTP", error);
                    toast.error('Failed to send OTP.');
                });
        } else {
            alert('Please enter a valid phone number.');
        }
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        if (otp == gOtp) {
            localStorage.setItem('phone', phone);
            toast.success('OTP Verified Successfully!');
            navigate('/');
        } else {
            toast.error('Invalid OTP! Please try again.');
        }
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
                                disabled={votingClosed}
                            />
                            <button type="submit" className="submit-btn" disabled={votingClosed}>
                                Send OTP
                            </button>
                        </form>
                    ) : (
                        <>
                            {votingClosed ? (
                                <div className="closed-message">
                                    <h3>⏳ Time's Up! Voting Closed.</h3>
                                </div>
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
                                    <button type="submit" className="submit-btn">
                                        Verify OTP
                                    </button>
                                    <div className="timer">
                                        ⏳ Time Left: {timeLeft} seconds
                                    </div>
                                </form>
                            )}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Registration_voter;
