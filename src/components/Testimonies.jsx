import React from 'react';
import "../styles/testimonies.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'; 
import { Pagination, Autoplay } from 'swiper/modules';

const Testimonies = () => {
    const testimonials = [
  {
    userName: "CryptoGamerX",
    comment: "This application truly stands out. Fun gameplay, real rewards. My time finally pays off!",
  },
  {
    userName: "NFT_Nerdette",
    comment: "Seamless NFT integration! Love owning my assets and the easy marketplace. Adds huge value.",
  },
  {
    userName: "Blockchain_Bard",
    comment: "This application hits all the right notes: vibrant community, responsive devs, always something new. Highly recommend!",
  },
  {
    userName: "PixelPioneer",
    comment: "Skeptical, but this application proved me wrong. Great way to learn crypto and earn. Big bonus!",
  },
  {
    userName: "GameFiGuru",
    comment: "The economic model in this application is incredibly well-thought-out. Sustainable, rewarding, a true GameFi gem!",
  },
  {
    userName: "MetaverseMaven",
    comment: "Immersive graphics and compelling story. Earning crypto in a high-quality game is the icing on the cake.",
  },
  {
    userName: "TokenHunter",
    comment: "This application is my go-to for chill gaming that builds my crypto portfolio. Daily quests keep me coming back!",
  },
  {
    userName: "DAppDiva",
    comment: "Impressive ease of use and quick transactions. Clearly made for everyone, from crypto natives to newcomers.",
  },
];


    return (
        <div className='testimony_body'>
            <div className="testimony_wrapper">
                <div className="testimony_header">
                    <h2>What our clients say</h2>
                    <h4>Trusted by over 3,500,000 investors around the world.</h4>
                </div>
                <div className="testimony_container">
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={30} 
                        slidesPerView={1}
                        pagination={{ clickable: true }} s
                        autoplay={{
                            delay: 5000, 
                            disableOnInteraction: false, 
                        }}
                        loop={true}
                        grabCursor={true}
                        centeredSlides={true}
                        breakpoints={{
                            640: {
                                slidesPerView: 1.5, 
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 2, 
                                spaceBetween: 30,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 40,
                            },
                        }}
                        className="mySwiper"
                    >
                        {testimonials.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="testimony_card">
                                    <h3>{item.userName}</h3>
                                    <p>"{item.comment}"</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}

export default Testimonies;