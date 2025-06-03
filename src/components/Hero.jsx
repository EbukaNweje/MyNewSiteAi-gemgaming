import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import "../styles/hero.css";

import HeroImg from "../assets/public/Hero-image.jpg";
import HeroImg2 from "../assets/public/Hero-image3.png";

const Hero = () => {
    const changingWords = [
        "Dominate the Blockchain.",
        "Own the Future.",
        "Achieve Victory.",
        "Become Legendary."
    ];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        setAnimationClass('fade-in'); 

        const wordInterval = setInterval(() => { 
            setAnimationClass('fade-out');
            
            const wordTimeout = setTimeout(() => { 
                setCurrentWordIndex(prevIndex => (prevIndex + 1) % changingWords.length);
                setAnimationClass('fade-in');
            }, 500);

            return () => clearTimeout(wordTimeout);
        }, 3000);

        return () => clearInterval(wordInterval);
    }, [changingWords.length]);

    const display = [
        { img: HeroImg },
        { img: HeroImg },
    ];

    return (
        <div className='hero_body'>
            <Swiper
                spaceBetween={30}
                effect={'fade'}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, EffectFade, Pagination]}
                className="mySwiper hero-swiper"
            >
                {display.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="hero_slide_content"
                            style={{ backgroundImage: `url(${item.img})` }}
                        >
                            <div className="hero_text_overlay">
                                <h2>
                                    Play. Earn. <br />
                                    <span className={`animated-word ${animationClass}`}>
                                        {changingWords[currentWordIndex]}
                                    </span>
                                </h2>
                                <h4>Step into the next generation of gaming where every win counts and your time is rewarded. Dive into thrilling gameplay, own your in-game assets as NFTs, and earn real crypto rewards with every mission.</h4>
                                <button className="hero_cta_button">Play & Earn Now</button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Hero;