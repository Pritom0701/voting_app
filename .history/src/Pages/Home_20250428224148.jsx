import React from 'react';
import './Home.css'
import { Link } from 'react-router-dom';


const Home = () => {
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