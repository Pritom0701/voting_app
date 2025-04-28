import React, { useState } from 'react';
import './Registration.css';
import { Link } from 'react-router-dom';

const Registration_voter = () => {
    const [phone, setPhone] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');

    const handlePhoneSubmit = (e) => {
        e.preventDefault();
        if (phone.length >= 10) {
            setOtpSent(true);
            console.log('OTP sent to', phone);
            // Here, you would call your backend API to send the OTP
        } else {
            alert('Please enter a valid phone number.');
        }
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        console.log('OTP entered:', otp);
        // Here, you would verify the OTP via backend API
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
