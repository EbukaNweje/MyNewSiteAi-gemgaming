import React from 'react';
import logo from "../assets/public/logo.png";
import "../styles/header.css";
import { useNavigate } from 'react-router-dom';
import { Dropdown, Space } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';

const Header = () => {
  const navigate = useNavigate();

  const handleRaffle = () => {
    navigate("/raffle");
  };
  const handleLeaderboard = () => {
    navigate("/leaderboard");
  };
  const handleChat = () => {
    navigate("/chat");
  };
  const handleLogin =()=>{
    navigate("/login")
  }
  const handleSignup=()=>{
    navigate("/signup")
  }

  const gamesMenuItems = [
    {
      label: 'Dice Game',
      key: 'dice-game',
      onClick: () => navigate('/games/dice'),
    },
    {
      label: 'Coin Flip',
      key: 'coin-flip',
      onClick: () => navigate('/games/coin-flip'),
    },
    {
      label: 'Slots',
      key: 'slots',
      onClick: () => navigate('/games/slots'),
    },
    {
      type: 'divider',
      key: 'games-divider',
    },
    {
      label: 'View All Games',
      key: 'all-games',
      onClick: () => navigate('/games'),
    },
  ];

  const historyMenuItems = [
    {
      label: 'Recent Games',
      key: 'recent-games',
      onClick: () => navigate('/history/recent-games'),
    },
    {
      label: 'Top Wins',
      key: 'top-wins',
      onClick: () => navigate('/history/top-wins'),
    },
    {
      label: 'Top Losses',
      key: 'top-losses',
      onClick: () => navigate('/history/top-losses'),
    },
    {
        type: 'divider',
        key: 'history-divider',
    }
  ];

  return (
    <div className='header_body'>
      <div className="header_wrapper">
        <div className="logo_holder">
          <div className="logo_card">
            <img src={logo} alt="Application Logo" />
          </div>
        </div>
        <div className="texts">
          <Dropdown menu={{ items: gamesMenuItems }} trigger={['click']}>
            <a onClick={e => e.preventDefault()}>
              <Space>
                Games
                <CaretDownOutlined />
              </Space>
            </a>
          </Dropdown>

          <Dropdown menu={{ items: historyMenuItems }} trigger={['click']}>
            <a onClick={e => e.preventDefault()}>
              <Space>
                History
                <CaretDownOutlined />
              </Space>
            </a>
          </Dropdown>

          <h4 onClick={handleRaffle}>Raffle</h4>
          <h4 onClick={handleLeaderboard}>Leaderboard</h4>
          <h4 onClick={handleChat}>Chat</h4>
        </div>
        <div className="authActions">
          <button className='authButtons' onClick={handleLogin}>Login</button>
          <button className='authButtons' onClick={handleSignup}>Signup</button>
        </div>
      </div>
    </div>
  );
}

export default Header;