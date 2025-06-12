import React from 'react'
import "../styles/home.css"
import Hero from '../components/Hero'
import Herod from '../components/Herod'
import AboutCard from '../components/AboutCard'
import GameCard from '../components/GameCard'
import Purchase from '../components/Purchase'
import Testimonies from '../components/Testimonies'
import Sponsors from '../components/Sponsors'


const Home = () => {
  return (
    <div className='home_body'>
        <Hero />
        <AboutCard />
        <GameCard />
        <Purchase />
        <Testimonies />
        <Sponsors />
    </div>
  )
}

export default Home