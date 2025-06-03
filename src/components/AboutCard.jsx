import React from 'react'
import "../styles/aboutCard.css"

const AboutCard = () => {
    const card = [
        {
            title: "Free trial",
            content: "Sign up and get 1000 free credits to play and try our stockcabsales."
        },
        {
            title: "Crypto deposits",
            content: "Make deposits in cryptocurrencies. Get 5% back when you deposit more than 5000 credits at once."
        },
        {
            title: "Referral program",
            content: "Refer other people to our stockcabsales and get bonuses when they sign up, play games or make deposits."
        }
    ]

  return (
    <div className='a_card_body'>
        <div className="card_wrapper">
            {
                card.map((item, index)=>(
                <div className="card" key={index}>
                    <div className="incard_wrapper">
                        <h4>{item.title}</h4>
                        <p>{item.content}</p>
                        <button className='card_cta'>Sign up</button>
                    </div>
                </div>

                ))
            }
        </div>
    </div>
  )
}

export default AboutCard