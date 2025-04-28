import React from 'react';
import './Registration.css'
import { Link } from 'react-router-dom';


const Registration_voter = () => {
    return (
        <div>
            <header>
                <h1>Voter Registration</h1>
                <Link to="/">Bake to home</Link>
            </header>

            <main class="container">
                <div class="registration-form">
                    <h2>Register to Vote</h2>
                    <label for="phone">Phone Number <span>*</span></label>
                    <input type="tel" id="phone" required/>

                        <button type="submit" class="submit-btn">Register</button>
                </div>
            </main>
        </div>
    );
};

export default Registration_voter;