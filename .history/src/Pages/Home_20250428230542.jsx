import React, { useEffect, useState } from 'react';
import './Home.css'
import { Link } from 'react-router-dom';
import axios from 'axios';


const Home = () => {
    // get all candidates from API
    const [candidates, setCandidates] = useState([]);
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/candidate`);
                setCandidates(response.data);
            } catch (error) {
                console.error('Error fetching candidates:', error);
            }
        };
        fetchCandidates();
    }, []);
    console.log(candidates)
    // const handleVote = async (candidateId) => {
    //     try {
    //         const response = await axios.post(`${BASE_URL}/vote`, { candidateId });
    //         console.log('Vote successful:', response.data);
    //         toast.success('Vote successful!');
    //     } catch (error) {
    //         console.error('Error voting:', error);
    //         toast.error('Vote failed!');
    //     }
    // };
    // const handleVote = (candidateId) => {
    //     // Handle the vote logic here, e.g., send a request to the server
    //     console.log(`Voted for candidate with ID: ${candidateId}`);
    //     toast.success('Vote successful!');
    // };
    // const handleInfo = (candidateId) => {
    //     // Handle the info logic here, e.g., show candidate details in a modal
    //     console.log(`Show info for candidate with ID: ${candidateId}`);
    //     toast.success('Info displayed!');
    // };
    // const handleInfo = (candidateId) => {
    //     // Handle the info logic here, e.g., show candidate details in a modal
    //     console.log(`Show info for candidate with ID: ${candidateId}`);
    //     toast.success('Info displayed!');
    // };
    // const handleInfo = (candidateId) => {
    //     // Handle the info logic here, e.g., show candidate details in a modal
    //     console.log(`Show info for candidate with ID: ${candidateId}`);
    //     toast.success('Info displayed!');
    // };
    // const handleInfo = (candidateId) => {
    //     // Handle the info logic here, e.g., show candidate details in a modal
    //     console.log(`Show info for candidate with ID: ${candidateId}`);
    //     toast.success('Info displayed!');

    const handleVote = async (candidateId) => {
        try {
            const response = await axios.post(`${BASE_URL}/vote`, { candidateId });
            console.log('Vote successful:', response.data);
            // toast.success('Vote successful!');
        } catch (error) {
            console.error('Error voting:', error);
            // toast.error('Vote failed!');
        }
    }
    const handleInfo = (candidateId) => {
        // Handle the info logic here, e.g., show candidate details in a modal
        console.log(`Show info for candidate with ID: ${candidateId}`);
        // toast.success('Info displayed!');
    };
    
    return (
        <div>
            <header>
                <h1>Vote for Your Favorite Candidate</h1>
                <div>
                    <Link to="/result">See Result</Link>
                    <Link to="/voter-registration">Register to Vote</Link>
                    <Link to="/candidate-registration">Register as Candidate</Link>
                </div>
            </header>

            <main class="containers">
                <div class="information-container">
                    <div class="info">
                        <h2>Candidate name- <span>Name</span></h2>
                        <h3>Project name- <span>xyz</span></h3>
                        <h3>Project image-</h3>
                        <img width="100%" src="/public/image/Project Image.png" alt="" />
                        <h3><a href="">Live Link</a></h3>
                    </div>
                    <button class="vote-btn">Vote</button>
                </div>

                <div class="candidate-container">
                    {
                        candidates.map((candidate) => (
                            <div className="card" key={candidate._id}>
                                <h2>{candidate.name}</h2>
                                <button className="vote-btn" onClick={() => handleVote(candidate._id)}>Vote</button>
                                <button className="info-btn" onClick={() => handleInfo(candidate._id)}>See Info</button>
                            </div>
                        ))
                    }
                    <div class="card">
                        <h2>Candidate A</h2>
                        <button class="info-btn">See Info</button>
                    </div>

                    <div class="card">
                        <h2>Candidate B</h2>
                        <button class="info-btn">See Info</button>
                    </div>

                    <div class="card">
                        <h2>Candidate C</h2>
                        <button class="info-btn">See Info</button>
                    </div>
                </div>
            </main>
            <footer>
                <p>Presenting By - Inspired IT & Soft Code Loop</p>
            </footer>
        </div>
    );
};

export default Home;