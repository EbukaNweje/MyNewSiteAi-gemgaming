import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/dashboard.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Line } from '@ant-design/charts';
import { Table, Card, Modal, Button as AntdButton } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Dashboard = () => {
  const userId = useSelector((state) => state.user._id); 
 console.log(userId)
  const [showBalances, setShowBalances] = useState({
    totalBalance: false,
    totalDeposit: false,
    totalWithdrawal: false,
  });

  const [isDepositModalVisible, setIsDepositModalVisible] = useState(false);
  const [depositCrypto, setDepositCrypto] = useState('');

  const [isWithdrawModalVisible, setIsWithdrawModalVisible] = useState(false);
  const [withdrawCrypto, setWithdrawCrypto] = useState('');

  const [dashboardData, setDashboardData] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  const navigate = useNavigate();

  const handleToggleBalance = (balanceKey) => {
    setShowBalances(prev => ({
      ...prev,
      [balanceKey]: !prev[balanceKey],
    }));
  };

  const handleDepositClick = (cryptocurrency) => {
    setDepositCrypto(cryptocurrency);
    setIsDepositModalVisible(true);
  };

  const handleDepositModalOk = () => {
    setIsDepositModalVisible(false);
    navigate(`/deposit/${depositCrypto}`); // FIXED: Added backticks
  };

  const handleDepositModalCancel = () => {
    setIsDepositModalVisible(false);
  };

  const handleWithdrawClick = (cryptocurrency) => {
    setWithdrawCrypto(cryptocurrency);
    setIsWithdrawModalVisible(true);
  };

  const handleWithdrawModalOk = () => {
    setIsWithdrawModalVisible(false);
    navigate(`/withdraw/${withdrawCrypto}`); // FIXED: Added backticks
  };

  const handleWithdrawModalCancel = () => {
    setIsWithdrawModalVisible(false);
  };

  const chartData = [
    { category: 'Deposit', value: 5000 },
    { category: 'Withdrawal', value: 3000 },
    { category: 'Net Change', value: 2000 },
  ];

  const config = {
    data: chartData,
    xField: 'category',
    yField: 'value',
    height: 400,
    point: {
      size: 5,
      shape: 'circle',
    },
    tooltip: {
      showMarkers: true,
      formatter: (data) => ({ name: data.category, value: `$${data.value.toLocaleString()}` }), // FIXED: Added backticks
    },
    legend: { position: 'bottom' },
    lineStyle: {
      stroke: '#8a2be2',
      lineWidth: 2,
    },
  };

  const columns = [
    {
      title: 'Cryptocurrency',
      dataIndex: 'cryptocurrency',
      key: 'cryptocurrency',
      sorter: (a, b) => a.cryptocurrency.localeCompare(b.cryptocurrency),
      filters: [
        { text: 'Bitcoin (BTC)', value: 'Bitcoin (BTC)' },
        { text: 'Ethereum (ETH)', value: 'Ethereum (ETH)' },
        { text: 'Litecoin (LTC)', value: 'Litecoin (LTC)' },
      ],
      onFilter: (value, record) => record.cryptocurrency.includes(value),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => parseFloat(a.amount.replace(/[^0-9.-]+/g, "")) - parseFloat(b.amount.replace(/[^0-9.-]+/g, "")),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div className="crypto-action-buttons-container">
          <AntdButton className="crypto-action-btn deposit-btn" onClick={() => handleDepositClick(record.cryptocurrency)}>Deposit</AntdButton>
          <AntdButton className="crypto-action-btn withdraw-btn" onClick={() => handleWithdrawClick(record.cryptocurrency)}>Withdraw</AntdButton>
        </div>
      ),
    },
  ];

  const dataSource = [
    { key: '1', cryptocurrency: 'Bitcoin (BTC)', amount: '$1,500.00' },
    { key: '2', cryptocurrency: 'Ethereum (ETH)', amount: '0.75 ETH' },
    { key: '3', cryptocurrency: 'Litecoin (LTC)', amount: '5.20 LTC' },
    { key: '4', cryptocurrency: 'Cardano (ADA)', amount: '120.00 ADA' },
    { key: '5', cryptocurrency: 'Ripple (XRP)', amount: '800.00 XRP' },
    { key: '6', cryptocurrency: 'Dogecoin (DOGE)', amount: '50.00 DOGE' },
    { key: '7', cryptocurrency: 'Solana (SOL)', amount: '250.00 SOL' },
    { key: '8', cryptocurrency: 'Polkadot (DOT)', amount: '70.00 DOT' },
    { key: '9', cryptocurrency: 'Chainlink (LINK)', amount: '150.00 LINK' },
    { key: '10', cryptocurrency: 'Shiba Inu (SHIB)', amount: '1,000,000.00 SHIB' },
  ];

  const balanceDisplayMap = {
    'Total Balance': 'totalBalance',
    'Total Deposit': 'totalDeposit',
    'Total Withdrawal': 'totalWithdrawal',
  };

  const balanceValues = {
    totalBalance: '$1234.56',
    totalDeposit: '$5000.00',
    totalWithdrawal: '$3000.00',
  };

  const getCardClassName = (title) => {
    return `wallet_balance ${title.toLowerCase().replace(/\s/g, '-')}-card`; 
  };

  const API_BASE_URL = "https://my-new-site-ai-gemgaming-backend.vercel.app/api";

  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true);
      try {
        if (!userId) {
          console.warn('User ID is missing. Skipping API call.');
          setLoadingData(false); 
          return;
        }

        const response = await axios.get(`${API_BASE_URL}/userdata/${userId}`); 
        if (!response.ok) {
          throw new Error(`Failed to fetch dashboard data. Status: ${response.status}`); 

        }

        console.log(response)
        // setDashboardData(response);
      } catch (error) {
        console.error('Error fetching dashboard data:', error.message);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [userId]);

  if (!userId) {
    return (
      <div className="dashboard_body" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', fontSize: '1.2em', color: '#555' }}>
        Please log in to view your dashboard.
        <AntdButton type="primary" onClick={() => navigate('/login')} style={{ marginTop: '20px' }}>Go to Login</AntdButton>
      </div>
    );
  }

  if (loadingData) {
    return <div className="dashboard_body">Loading Dashboard...</div>;
  }

  return (
    <div className='dashboard_body'>
      <div className="dashboard_wrapper">
        <div className="amount_card">
          {['Total Balance', 'Total Deposit', 'Total Withdrawal'].map((title, idx) => {
            const balanceKey = balanceDisplayMap[title];
            const isBalanceVisible = showBalances[balanceKey];
            // Use dynamic values if available, otherwise fallback to static
            const valueToDisplay = (dashboardData?.balances && dashboardData.balances[balanceKey]) ? dashboardData.balances[balanceKey] : balanceValues[balanceKey];

            return (
              <Card className={getCardClassName(title)} key={idx}>
                <div className="balance_wrapper">
                  <h4>{title}</h4>
                  <div className="wallet_amount">
                    {isBalanceVisible ? <h2>{valueToDisplay}</h2> : <h2>****</h2>} {/* Changed empty <h2> to **** */}
                    {isBalanceVisible ? (
                      <FaEyeSlash onClick={() => handleToggleBalance(balanceKey)} style={{ cursor: 'pointer' }} />
                    ) : (
                      <FaEye onClick={() => handleToggleBalance(balanceKey)} style={{ cursor: 'pointer' }} />
                    )}
                  </div>
                  <div className="wallet_footer">
                    <p>Compared to $7,000 last month </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="transaction_chart">
          <div className="chart_header">
            <h4>Transaction Chart</h4>
            <p>Last 30 days</p>
          </div>
          <div className="chart_body" style={{ height: '400px', width: '100%', padding: '10px' }}>
            <Line {...config} />
          </div>
        </div>

        <div className="transaction_table">
          <div className="table_header">
            <h4>Your Crypto Balances</h4>
          </div>
          <div className="table_body">
            <Table
              dataSource={dataSource}
              columns={columns}
            />
          </div>
        </div>
      </div>

      <Modal
        title={`Initiate Deposit for ${depositCrypto}`} // FIXED: Added backticks
        open={isDepositModalVisible}
        onOk={handleDepositModalOk}
        onCancel={handleDepositModalCancel}
        okText="Proceed to Deposit Page"
        cancelText="Cancel"
        className="deposit-modal"
      >
        <p>You are about to navigate to the deposit page for <strong>{depositCrypto}</strong>.</p>
        <p>Please ensure you have reviewed your selection.</p>
      </Modal>

      <Modal
        title={`Initiate Withdrawal for ${withdrawCrypto}`} // FIXED: Added backticks
        open={isWithdrawModalVisible}
        onOk={handleWithdrawModalOk}
        onCancel={handleWithdrawModalCancel}
        okText="Proceed to Withdraw Page"
        cancelText="Cancel"
        className="withdraw-modal"
      >
        <p>You are about to navigate to the withdrawal page for <strong>{withdrawCrypto}</strong>.</p>
        <p>Please be sure of your selection as withdrawals are irreversible.</p>
      </Modal>
    </div>
  );
};

export default Dashboard;