import React from 'react';
import './Result.css'
import { Link } from 'react-router-dom';

const Result = () => {
    return (
        <div>
            <header>
                <h1>Voting Results</h1>
                <Link to="/">Bake to home</Link>
            </header>

            <main class="results-container">
                <div class="result-card">
                    <h2>Candidate A</h2>
                    <p class="votes">125 Votes</p>
                </div>

                <div class="result-card">
                    <h2>Candidate B</h2>
                    <p class="votes">98 Votes</p>
                </div>

                <div class="result-card">
                    <h2>Candidate C</h2>
                    <p class="votes">77 Votes</p>
                </div>
            </main>
        </div>
    );
};

export default Result;