import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "../styles/gameCard.css";
import Avalanche from "../assets/public/Avalanche.png";
import Neo from "../assets/public/Neo.png";
import Waka from "../assets/public/Waka.png";
import Citizen from '../assets/public/Citizen.png';
import SNeo from "../assets/public/S1-Neo.png";
import { IoGameController } from "react-icons/io5";

const GameCard = () => {
    const navigate = useNavigate(); // Initialize the navigate hook

    const games = [
        {
            img: Avalanche,
            title: "Avalanche",
        },
        {
            img: Neo,
            title: "S2-Neo",
        },
        {
            img: Waka,
            title: "AvaWakalanche",
        },
        {
            img: Citizen,
            title: "Citizen",
        },
        {
            img: SNeo,
            title: "S1-Neo",
        },
    ];

    const handleCardClick = () => {
        // This function will be called when a game card is clicked.
        // It routes the user to the '/login' path.
        navigate('/login');
    };

    return (
        <div className='gamecard_body'>
            <div className="g_card_wrapper">
                <div className="game_header">
                    <h2>Play our exciting games</h2>
                    <div className="filter_container">
                        <button className='filter_buttons'>All</button>
                        <button className='filter_buttons'>Cards</button>
                    </div>
                </div>
                <div className="g_card_container">
                    {
                        games.map((item, index) => (
                            <div
                                className="games_card"
                                key={index}
                                onClick={handleCardClick} // Attach the click handler here
                                style={{ cursor: 'pointer' }} // Optional: Add a pointer cursor for better UX
                            >
                                <div className="game_image">
                                    <img src={item.img} alt={item.title} /> {/* Add alt for accessibility */}
                                </div>
                                <div className="card_overlay">
                                    <h4>{item.title}</h4>
                                    <IoGameController className='game-icon' />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default GameCard;