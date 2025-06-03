import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import '../styles/herod.css'; // Your custom styles
import HeroImg from "../assets/public/Hero-image.jpg";
import HeroImg2 from "../assets/public/Hero-image2.png";
import HeroImg3 from "../assets/public/Hero-image3.png";
import HeroImg4 from "../assets/public/Hero-image4.png";

const Herod = () => {
    const changingWords = [
        "Dominate the Blockchain.",
        "Own the Future.",
        "Achieve Victory.",
        "Become Legendary."
    ];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        const wordInterval = setInterval(() => { 
            setAnimationClass('fade-out');
            const wordTimeout = setTimeout(() => { 
                setCurrentWordIndex(prevIndex => (prevIndex + 1) % changingWords.length);
                setAnimationClass('fade-in');
            }, 500);
            return () => clearTimeout(wordTimeout);
        }, 3000);

        setAnimationClass('fade-in');
        return () => clearInterval(wordInterval);
    }, []);

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const mountTimer = setTimeout(() => {
            setIsMounted(true);
        }, 100); 

        return () => clearTimeout(mountTimer); 
    }, []); 

    return (
        <div className='herod_body'>
            <div className={`h_wrapper ${isMounted ? 'animate-in' : ''}`}> 
                <div className="h_text_holder">
                    <h2>
                        Play. Earn. <br />
                        <span className={`animated-word ${animationClass}`}>
                            {changingWords[currentWordIndex]}
                        </span>
                    </h2>
                    <h4>Step into the next generation of gaming where every win counts and your time is rewarded. Dive into thrilling gameplay, own your in-game assets as NFTs, and earn real crypto rewards with every mission.</h4>
                    <button className="h_cta_button">Play & Earn Now</button>
                </div>
                <div className="hero_image">
                    <div className="hero_image_container">
                        <div className="image_card1">
                            <img src={HeroImg} alt="Game screenshot 1" className='hero_img'/>
                        </div>
                        <div className="image_card2">
                            <img src={HeroImg2} alt="Game screenshot 2" className='hero_img'/>
                        </div>
                        <div className="image_card3">
                            <img src={HeroImg3} alt="Game screenshot 3" className='hero_img'/>
                        </div>
                        <div className="image_card4">
                            <img src={HeroImg4} alt="Game screenshot 4" className='hero_img'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Herod;