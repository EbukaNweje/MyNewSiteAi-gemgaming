import React, { useState } from 'react';
import "../styles/dashboardNav.css";
import { FaHome } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa";
import { BiSolidUserAccount } from "react-icons/bi";
import { GiCash } from "react-icons/gi";
import { GiPayMoney } from "react-icons/gi";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { BiSolidBadgeCheck } from "react-icons/bi";
import { BiSolidCategory } from "react-icons/bi";
import { MdVideoLibrary } from "react-icons/md";
import { AiFillSetting } from "react-icons/ai";
import { IoClose, IoLogOut } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import logo from "../assets/public/logo.png";
import { Modal, Button } from 'antd'; // Make sure Button is imported

const DashboardNav = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log("Logged out");
    setIsModalOpen(false);
    navigate("/");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleHomeClick = () => {
    navigate("/dashboard");
  }
    const handleAssetsClick = () => {
        navigate("/assets");
    }
    const handleProfileClick = () => {
        navigate("/User-profile");
    }
    const handleDepositClick = () => {
        navigate("/Deposit-History");
    }
    const handleHistoryClick = () => {
        navigate("/transactions-history");
    }
    const handleWithdrawalsClick = () => {
        navigate("/Withdrawal-History");
    }
    const handleVerifyAccountClick = () => {
        navigate("/verify-account");
    }
    const handleSettingsClick = () => {
        navigate("/settings");
    }

  return (
    <div className='sidebar_body'>
      <div className="sidebar_wrapper">
        <div className="sidebar_header">
          <div className="sidebar_dashboard_logo">
            <img src={logo} alt="Logo" />
          </div>
        </div>

        <div className="dashboard_content">
          <div className="d_content_card" onClick={handleHomeClick}>
            <FaHome className='sidebar_icon'/>
            <h4>Dashboard</h4>
          </div>
          {/* <div className="d_content_card">
            <FaDatabase className='sidebar_icon'/>
            <h4>Assets</h4>
          </div> */}
          <div className="d_content_card" onClick={handleProfileClick}>
            <BiSolidUserAccount className='sidebar_icon'/>
            <h4>Profile</h4>
          </div>
          <div className="d_content_card" onClick={handleDepositClick}>
            <GiPayMoney className='sidebar_icon'/>
            <h4>Deposit</h4>
          </div>
          <div className="d_content_card" onClick={handleWithdrawalsClick}>
            <GiCash className='sidebar_icon'/>
            <h4>Withdrawals</h4>
          </div>
          <div className="d_content_card" onClick={handleHistoryClick}>
            <HiOutlineClipboardDocument className='sidebar_icon'/>
            <h4>Reports</h4>
          </div>
          <div className="d_content_card" onClick={handleVerifyAccountClick}>
            <BiSolidBadgeCheck className='sidebar_icon'/>
            <h4>Verify Account</h4>
          </div>
        </div>

        <div className="sidebar_footer">
          <div className="d_content_card" onClick={handleSettingsClick}>
            <AiFillSetting className='sidebar_icon'/>
            <h4>Settings</h4>
          </div>
          <div className="d_content_card" onClick={showModal}>
            <IoLogOut className='sidebar_icon'/>
            <h4>Logout</h4>
          </div>
        </div>
      </div>

      <Modal
        title="Confirm Logout"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Yes, Log Out"
        cancelText="No, Stay Logged In"
        centered
        maskClosable={false}
        footer={[
          <Button key="back" onClick={handleCancel}>
            No, Stay Logged In
          </Button>,
          <Button
            key="submit"
            type="primary" 
            onClick={handleOk}
            style={{ backgroundColor: 'purple', borderColor: 'purple' }} //
          >
            Yes, Log Out
          </Button>,
        ]}
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
    </div>
  );
};

export default DashboardNav;