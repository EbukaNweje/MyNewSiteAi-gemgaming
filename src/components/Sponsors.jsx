import React from 'react'
import "../styles/sponsors.css"
import Coinbase from "../assets/public/coinbase.png"
import Crypto from "../assets/public/crypto.png"
import Coingecko from "../assets/public/coinGecko.png"
import Kraken from "../assets/public/kraken.png"
import { GoTrophy } from "react-icons/go";


const Sponsors = () => {
  const sponsors = [
    {
      name: "Coinbase",
      image: Coinbase,
    },
    {
      name: "Crypto",
      image: Crypto,
    },
    {
      name: "Kraken",
      image: Kraken,
    },
    {
      name: "Coingecko",
      image: Coingecko,
    }
  ]
  return (
    <div className='sponsor_body'>
      <div className="sponsor_wrapper">
        <div className="sponsor_container">
          <h2>Sponsors/Partners</h2>
          <div className="sponsor_list">
            {
              sponsors.map((item, index)=>(
                <div className="sponsor_card" key={index}>
                  <img src={item.image} alt={item.name} />
                </div>
              ))
            }
          </div>
        </div>
        <div className="trophy_container">
          <div className="trophy_card">
            <div className="trophy_header">
              <GoTrophy className='trophy_icon' />
              <h4>Biggest Win</h4>
            </div>
            <div className="trophy_body">
              <p>Crypto Slots</p>
              <h4>Brent osburn won 263,500.00 credits</h4>
              <button className='trophy_cta'>View Leaderboard</button>
            </div>
            <div className="trophy_footer">
              <p>4 Months ago</p>
            </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Sponsors