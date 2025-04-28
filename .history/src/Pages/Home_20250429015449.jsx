import React, { useEffect, useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Home = () => {
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
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

    // handle vote function
    const handleVote = async (candidateId) => {
        try {
            const phone = localStorage.getItem('phone');
            if (!phone) {
                console.error('User not logged in.');
                return;
            }

            // Fetch candidate details first
            const candidateResponse = await axios.get(`${BASE_URL}/candidate/${candidateId}`);
            const candidate = candidateResponse.data;

            const voteData = {
                phone: phone,
                cId: candidate.id,
                cName: candidate.name,
                vote: 1, // Always 1 because they are casting 1 vote
            };

            console.log(voteData);
            

            const voteResponse = await axios.post(`${BASE_URL}/vote`, voteData);
            console.log('Vote successful:', voteResponse.data);
            toast.success('Vote successful!');
            // toast.success('Vote successful!');
        } catch (error) {
            console.error('Error voting:', error);
            // toast.error('Vote failed!');
        }
    };


    const handleInfo = (candidate) => {
        setSelectedCandidate(candidate);
    };

    return (
        <div className="page-wrapper">
            <header>
                <h1>Vote for Your Favorite Candidate</h1>
                <div className="nav-links">
                    <Link to="/result">See Results</Link>
                    <Link to="/voter-registration">Register to Vote</Link>
                    <Link to="/candidate-registration">Register as Candidate</Link>
                </div>
            </header>

            <main className="containers">
                {/* Candidate Info Section */}
                <div className="information-container">
                    {selectedCandidate ? (
                        <div className="info">
                            <h2>Candidate Name: <span>{selectedCandidate.name}</span></h2>
                            <h3>Project Name: <span>{selectedCandidate.pName}</span></h3>
                            <h3>Project Image:</h3>
                            <img src={`${BASE_URL}/admin/image/${selectedCandidate.pImage}`} alt={selectedCandidate.pName} />
                            <h3><a href={selectedCandidate.liveLink} target="_blank" rel="noopener noreferrer">Live Project Link</a></h3>
                        </div>
                    ) : (
                        <div className="info">
                            <h2>Select a Candidate to See Details</h2>
                        </div>
                    )}
                    {selectedCandidate && (
                        <button className="vote-btn" onClick={() => handleVote(selectedCandidate.id)}>Vote for {selectedCandidate.name}</button>
                    )}
                </div>

                {/* Candidate Cards Section */}
                <div className="candidate-container">
                    {candidates.map((candidate) => (
                        <div className="card" key={candidate.id}>
                            <h2>{candidate.name}</h2>
                            <h4>{candidate.pName}</h4>
                            <div className="card-buttons">
                                <button className="vote-btn" onClick={() => handleVote(candidate.id)}>Vote</button>
                                <button className="info-btn" onClick={() => handleInfo(candidate)}>See Info</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <footer>
                <p>Presented by - Inspired IT & Soft Code Loop</p>
            </footer>
        </div>
    );
};

export default Home;
