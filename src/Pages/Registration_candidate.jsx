import React from 'react';
import './Registration.css'
import { Link } from 'react-router-dom';


const Registration_candidate = () => {
    return (
        <div>
            <header>
                <h1>Candidate Registration</h1>
                <Link to="/">Bake to home</Link>
            </header>

            <main class="container">
                <div class="registration-form">
                    <h2>Register as Candidate</h2>

                    <label for="fullname">Full Name <span>*</span></label>
                    <input type="text" id="fullname" required />

                    <label for="phone">Phone Number <span>*</span></label>
                    <input type="tel" id="phone" required />

                    <label for="project-name">Project Name <span>*</span></label>
                    <input type="text" id="project-name" required />

                    <label for="project-image">Project Image <span>*</span></label>
                    <input type="file" id="project-image" required />

                    <label for="project-details">Project Details</label>
                    <input type="text" id="project-details" />

                    <label for="link">Live Link  <span>*</span></label>
                    <input type="text" id="link" required />

                    <label for="github-link">Github Link  <span>*</span></label>
                    <input type="text" id="github-link" required />

                    <button type="submit" class="submit-btn">Register</button>
                </div>
            </main>
        </div>
    );
};

export default Registration_candidate;