// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import logo from "../assets/public/logo.png";
import "../styles/header.css";
import { useNavigate } from 'react-router-dom';
import { Dropdown, Space } from 'antd';
import { CaretDownOutlined,CloseOutlined } from '@ant-design/icons';
import { CgMenuRight } from "react-icons/cg";

const Header = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isGamesAccordionOpen, setIsGamesAccordionOpen] = useState(false);
  const [isHistoryAccordionOpen, setIsHistoryAccordionOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isTabletOrSmaller = windowWidth <= 1024;
  const isMobile = windowWidth <= 840;

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setIsMobileMenuOpen(false);
      setIsGamesAccordionOpen(false);
      setIsHistoryAccordionOpen(false);
    }
  };

  const toggleGamesAccordion = () => {
    setIsGamesAccordionOpen(!isGamesAccordionOpen);
    setIsHistoryAccordionOpen(false);
  };

  const toggleHistoryAccordion = () => {
    setIsHistoryAccordionOpen(!isHistoryAccordionOpen);
    setIsGamesAccordionOpen(false);
  };

  const gamesMenuItems = [
    { label: 'Dice Game', key: 'dice-game', onClick: () => handleNavigation('/games/dice') },
    { label: 'Coin Flip', key: 'coin-flip', onClick: () => handleNavigation('/games/coin-flip') },
    { label: 'Slots', key: 'slots', onClick: () => handleNavigation('/games/slots') },
    { type: 'divider', key: 'games-divider' },
    { label: 'View All Games', key: 'all-games', onClick: () => handleNavigation('/games') },
  ];

  const historyMenuItems = [
    { label: 'Recent Games', key: 'recent-games', onClick: () => handleNavigation('/history/recent-games') },
    { label: 'Top Wins', key: 'top-wins', onClick: () => handleNavigation('/history/top-wins') },
    { label: 'Top Losses', key: 'top-losses', onClick: () => handleNavigation('/history/top-losses') },
    { type: 'divider', key: 'history-divider' },
  ];

  return (
    <>
      <header className='header_body'>
        <div className="header_wrapper">
          <div className="logo_holder">
            <div className="logo_card">
              <img src={logo} alt="Application Logo" aria-label="Home page link" onClick={() => handleNavigation('/')} style={{ cursor: 'pointer' }}/>
            </div>
          </div>

          {!isMobile && (
            <nav className="texts" aria-label="Main Navigation">
              <Dropdown menu={{ items: gamesMenuItems }} trigger={['click']}>
                <a onClick={e => e.preventDefault()} className="ant-dropdown-trigger" aria-haspopup="true" aria-label="Games menu">
                  <Space>
                    {!isTabletOrSmaller && 'Games'}
                    <CaretDownOutlined />
                  </Space>
                </a>
              </Dropdown>

              <Dropdown menu={{ items: historyMenuItems }} trigger={['click']}>
                <a onClick={e => e.preventDefault()} className="ant-dropdown-trigger" aria-haspopup="true" aria-label="History menu">
                  <Space>
                    {!isTabletOrSmaller && 'History'}
                    <CaretDownOutlined />
                  </Space>
                </a>
              </Dropdown>

              <h4 onClick={() => handleNavigation('/raffle')} tabIndex="0">Raffle</h4>
              <h4 onClick={() => handleNavigation('/leaderboard')} tabIndex="0">Leaderboard</h4>
              <h4 onClick={() => handleNavigation('/chat')} tabIndex="0">Chat</h4>
            </nav>
          )}

          {!isMobile && (
            <div className="authActions">
              <button className='authButtons' onClick={() => handleNavigation('/login')}>Login</button>
              <button className='authButtons' onClick={() => handleNavigation('/signup')}>Signup</button>
            </div>
          )}

          {isMobile && (
              <CgMenuRight 
                className="mobile_menu_icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Open mobile menu"
              />
          )}
        </div>
      </header>

      <div
        className={`mobile_menu_container ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        <div className="mobile_menu_content" onClick={e => e.stopPropagation()}>
          <div className="mobile_menu_header">
            <div className="logo_card">
              <img src={logo} alt="Application Logo" onClick={() => handleNavigation('/')} style={{ cursor: 'pointer' }}/>
            </div>
              <CloseOutlined 
                className="mobile_menu_close_icon"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close mobile menu"
              />
          </div>

          <nav className="mobile_menu_links" aria-label="Mobile Navigation Links">
            <div className={`accordion_header ${isGamesAccordionOpen ? 'open' : ''}`} onClick={toggleGamesAccordion} aria-expanded={isGamesAccordionOpen} aria-controls="games-accordion-content">
                Games <CaretDownOutlined />
            </div>
            <div id="games-accordion-content" className={`accordion_content ${isGamesAccordionOpen ? 'open' : ''}`}>
                {gamesMenuItems.map(item =>
                    item.type === 'divider' ? null : (
                        <h5 key={item.key} onClick={item.onClick} tabIndex="0">{item.label}</h5>
                    )
                )}
            </div>

            <div className={`accordion_header ${isHistoryAccordionOpen ? 'open' : ''}`} onClick={toggleHistoryAccordion} aria-expanded={isHistoryAccordionOpen} aria-controls="history-accordion-content">
                History <CaretDownOutlined />
            </div>
            <div id="history-accordion-content" className={`accordion_content ${isHistoryAccordionOpen ? 'open' : ''}`}>
                {historyMenuItems.map(item =>
                    item.type === 'divider' ? null : (
                        <h5 key={item.key} onClick={item.onClick} tabIndex="0">{item.label}</h5>
                    )
                )}
            </div>

            <h4 onClick={() => handleNavigation('/raffle')} tabIndex="0">Raffle</h4>
            <h4 onClick={() => handleNavigation('/leaderboard')} tabIndex="0">Leaderboard</h4>
            <h4 onClick={() => handleNavigation('/chat')} tabIndex="0">Chat</h4>
          </nav>

          <div className="mobile_menu_auth_buttons">
            <button className='authButtons' onClick={() => handleNavigation('/login')}>Login</button>
            <button className='authButtons' onClick={() => handleNavigation('/signup')}>Signup</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;