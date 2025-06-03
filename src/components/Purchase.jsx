import React from 'react'
import "../styles/purchase.css"
import { IoShieldHalf } from "react-icons/io5";

const Purchase = () => {
  return (
    <div className='purchase_body'>
        <div className="purchase_wrapper">
            <div className="purchase_top">
                <h2>Take part in raffles</h2>
                <h4>We run raffles for all our users on a regular basis. Purchase tickets and win hefty bonuses.</h4>
                <button className='purchase_cta'>Purchase Ticket</button>
            </div>
            <div className="purchase_bottom">
                <div className="bottom_header">
                    <IoShieldHalf className='shield_icon'/>
                    <h2> Provably fair </h2>
                </div>
                <h4>Our stockcabsales uses provably fair technology, which allows you to verify that each roll or card draw is completely random and you are not being cheated!</h4>
                <button className='purchase_cta'>Learn More</button>
            </div>
        </div>
    </div>
  )
}

export default Purchase