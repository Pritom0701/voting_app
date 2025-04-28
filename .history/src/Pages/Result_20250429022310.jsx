import React, { useEffect, useState } from 'react';
import './Result.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Result = () => {
    const [votes, setVotes] = useState([]);
    const [timeElapsed, setTimeElapsed] = useState(0); // Time in seconds
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        // Fetch votes initially
        fetchVotes();

        // Set interval to fetch votes every 3 seconds
        const voteInterval = setInterval(fetchVotes, 3000);

        // Timer for tracking 5 minutes
        const timer = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);

        return () => {
            clearInterval(voteInterval);
            clearInterval(timer);
        };
    }, []);

    const fetchVotes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/count-vote`);
            setVotes(response.data);
        } catch (error) {
            console.error('Error fetching votes:', error);
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="result-page">
            <header className="result-header">
                <h1>Voting Results</h1>
                <Link className="home-link" to="/">Back to Home</Link>
            </header>

            <main className="results-container">
                <div className="timer">
                    ⏳ Time Elapsed: {formatTime(timeElapsed)}
                </div>

                {votes.map((vote, index) => (
                    <div 
                        key={vote.cId} 
                        className={`result-card ${timeElapsed >= 300 ? highlightClass(index) : ''}`}
                    >
                        <h2>{vote.cName}</h2>
                        <p className="votes">{vote.total_votes} Votes</p>
                        {timeElapsed >= 300 && index === 0 && <span className="badge gold">🥇 1st</span>}
                        {timeElapsed >= 300 && index === 1 && <span className="badge silver">🥈 2nd</span>}
                        {timeElapsed >= 300 && index === 2 && <span className="badge bronze">🥉 3rd</span>}
                    </div>
                ))}
            </main>
        </div>
    );
};

// Helper function to apply styles
const highlightClass = (index) => {
    if (index === 0) return 'gold-highlight';
    if (index === 1) return 'silver-highlight';
    if (index === 2) return 'bronze-highlight';
    return '';
};

export default Result;
