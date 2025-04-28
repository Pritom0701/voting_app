import React, { useState } from 'react';
import './Registration.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // You will need axios for API calls
import toast from 'react-hot-toast';

const Registration_candidate = () => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        pName: '',
        pImage: null,
        pDetails: '',
        liveLink: '',
        githubLink: '',
    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            if (files.length > 0) {
                setFormData({ ...formData, [name]: files[0] }); // Fix here
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', formData.name);
        data.append('phone', formData.phone);
        data.append('pName', formData.pName);
        data.append('pImage', formData.pImage);
        data.append('pDetails', formData.pDetails);
        data.append('liveLink', formData.liveLink);
        data.append('githubLink', formData.githubLink);

        try {
            const response = await axios.post(`${BASE_URL}/candidate/register`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Success:', response.data);
            toast.success('Submit Successfully!');
            navigate('/')
        } catch (error) {
            console.error('Error:', error);
            toast.error('Registration failed!');
        }
    };

    return (
        <div>
            <header>
                <h1>Candidate Registration</h1>
                <Link to="/">Back to home</Link>
            </header>

            <main className="container">
                <form className="registration-form" onSubmit={handleSubmit}>
                    <h2>Register as Candidate</h2>

                    <label htmlFor="fullname">Full Name <span>*</span></label>
                    <input type="text" id="fullname" required name="name" value={formData.name} onChange={handleChange} placeholder='Enter Your Name'/>

                    <label htmlFor="phone">Phone Number <span>*</span></label>
                    <input type="number" id="phone" required name="phone" value={formData.phone} onChange={handleChange} placeholder='Enter Your Phone' />

                    <label htmlFor="project-name">Project Name <span>*</span></label>
                    <input type="text" id="project-name" required name="pName" value={formData.pName} onChange={handleChange} placeholder='Enter Your Project Name'/>

                    <label htmlFor="project-image">Project Image <span>*</span></label>
                    <input type="file" id="project-image" required name="pImage" onChange={handleChange} />

                    <label htmlFor="project-details">Project Details <span>(Optional)</span></label>
                    <input type="text" id="project-details" name="pDetails" value={formData.pDetails} onChange={handleChange} placeholder='Project Details'/>

                    <label htmlFor="link">Live Link</label>
                    <input type="text" id="link" name="liveLink" value={formData.liveLink} onChange={handleChange} placeholder='Enter Live Link'/>

                    <label htmlFor="github-link">Github Link </label>
                    <input type="text" id="github-link" name="githubLink" value={formData.githubLink} onChange={handleChange} placeholder='Enter Repository Link'/>

                    <button type="submit" className="submit-btn">Register</button>
                </form>
            </main>
        </div>
    );
};

export default Registration_candidate;
