import React, { useEffect, useState } from 'react';
import './Result.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Result = () => {
    const [votes, setVotes] = useState([]);
    const [timeElapsed, setTimeElapsed] = useState(0); // Time in seconds
    const [timerFinished, setTimerFinished] = useState(false);
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        fetchVotes();

        const voteInterval = setInterval(fetchVotes, 3000);
        const timer = setInterval(() => {
            setTimeElapsed(prev => {
                if (prev >= 19) {  // At 20 seconds
                    clearInterval(timer);
                    clearInterval(voteInterval);
                    setTimerFinished(true);
                }
                return prev + 1;
            });
        }, 1000);

        return () => {
            clearInterval(voteInterval);
            clearInterval(timer);
        };
    }, []);

    const fetchVotes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/count-vote`);
            // Sort votes by highest to lowest before setting
            const sortedVotes = response.data.sort((a, b) => b.total_votes - a.total_votes);
            setVotes(sortedVotes);
        } catch (error) {
            console.error('Error fetching votes:', error);
        }
    };

    const formatTime = (seconds) => {
        const secs = seconds % 60;
        return `00:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="result-page">
            <header className="result-header">
                <h1>Voting Results</h1>
                <Link className="home-link" to="/">Back to Home</Link>
            </header>

            <div className="timer">
                ⏳ Time Elapsed: {formatTime(timeElapsed)}
            </div>

            <main className="results-container">
                {votes.map((vote, index) => (
                    <div
                        key={vote.cId}
                        className={`result-card ${timerFinished ? highlightClass(index) : ''}`}
                    >
                        <h2>{vote.cName}</h2>
                        <p className="votes">{vote.total_votes} Votes</p>

                        {timerFinished && index === 0 && <span className="badge gold">🥇 1st</span>}
                        {timerFinished && index === 1 && <span className="badge silver">🥈 2nd</span>}
                        {timerFinished && index === 2 && <span className="badge bronze">🥉 3rd</span>}
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
