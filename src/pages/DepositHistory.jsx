// src/pages/DepositHistoryPage.jsx
import React, { useState, useEffect } from 'react';
import { Table, Tag, Typography, Modal, Space, Button } from 'antd';
import "../styles/depositHistory.css"; // Ensure this path is correct

const { Title, Text } = Typography;

// --- Mock Deposit History Data (replace with API call in real app) ---
const mockDepositData = [
  {
    id: 1,
    date: '2025-05-30 10:00:00',
    amount: 500.00,
    currency: 'INR',
    status: 'Completed',
    depositMethod: 'Bank Transfer',
    transactionId: 'DEPN789012345',
    reference: 'BANKREF12345',
    fee: 10.00,
  },
  {
    id: 2,
    date: '2025-05-29 14:30:00',
    amount: 0.5,
    currency: 'ETH',
    status: 'Pending',
    depositMethod: 'Crypto (ETH)',
    depositAddress: '0xabc123def4567890abc123def4567890abc123def',
    blockchainTxId: '0xethblocktxhash123456789abcdef0123456789abcdef0123456789',
    network: 'ERC20',
    confirmations: '5/12',
    fee: 0.0001,
  },
  {
    id: 3,
    date: '2025-05-28 09:15:00',
    amount: 1200.00,
    currency: 'INR',
    status: 'Failed',
    depositMethod: 'UPI',
    transactionId: 'UPIREF54321',
    reference: 'UPITXN98765',
    fee: 0.00, // UPI might have no fee
    failureReason: 'Transaction expired',
  },
  {
    id: 4,
    date: '2025-05-27 18:00:00',
    amount: 1.2,
    currency: 'ETH',
    status: 'Completed',
    depositMethod: 'Crypto (ETH)',
    depositAddress: '0xanotherethaddr1234567890abcdef0123456789abcdef0123456789',
    blockchainTxId: '0xethblocktxhashabcdef0123456789abcdef0123456789abcdef0',
    network: 'ERC20',
    confirmations: '12/12',
    fee: 0.0001,
  },
  {
    id: 5,
    date: '2025-05-26 11:45:00',
    amount: 250.00,
    currency: 'INR',
    status: 'Completed',
    depositMethod: 'Card Payment',
    transactionId: 'CARDTXN123456',
    reference: 'PAYREF654321',
    fee: 5.00,
  },
];

const statusColors = {
  Completed: 'green',
  Pending: 'orange',
  Failed: 'red',
};

const DepositHistory = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDeposit, setSelectedDeposit] = useState(null);

  useEffect(() => {
    setData(mockDepositData);
  }, []);

  const showModal = (record) => {
    setSelectedDeposit(record);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedDeposit(null);
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      responsive: ['xs', 'sm', 'md', 'lg'],
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount, record) => {
        if (record.currency === 'INR') {
          return `₹${amount.toFixed(2)}`; // Indian Rupees
        } else if (record.currency === 'ETH') {
          return `${amount.toFixed(5)} ETH`; // Ethereum
        }
        return amount; // Default
      },
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
      filters: [
        { text: 'INR', value: 'INR' },
        { text: 'ETH', value: 'ETH' },
      ],
      onFilter: (value, record) => record.currency.indexOf(value) === 0,
      responsive: ['sm', 'md', 'lg'],
    },
    {
      title: 'Method',
      dataIndex: 'depositMethod',
      key: 'depositMethod',
      responsive: ['md', 'lg'],
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={statusColors[status] || 'default'}>{status}</Tag>
      ),
      filters: [
        { text: 'Completed', value: 'Completed' },
        { text: 'Pending', value: 'Pending' },
        { text: 'Failed', value: 'Failed' },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
  ];

  return (
    <div className="deposit-history-container">
      <Title level={3} style={{ color: '#38b000' }}>Deposit History</Title>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{ pageSize: 7 }}
        scroll={{ x: true }} // Enable horizontal scroll for smaller screens
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              showModal(record); // Open modal with the clicked row's data
            },
            style: { cursor: 'pointer' }, // Add pointer cursor for better UX
          };
        }}
      />

      {/* --- Deposit Details Modal --- */}
      <Modal
        title={<Title level={4} style={{ margin: 0, color: '#38b000' }}>Deposit Details</Title>}
        open={isModalVisible} // Use 'open' prop for Ant Design v5
        onCancel={handleModalClose}
        footer={[
          <Button
            key="back"
            onClick={handleModalClose}
            type="primary" // Changed to primary type
            className="modal-close-button" // Added class name
            // Removed inline style
            // style={{ backgroundColor: '#38b000', borderColor: '#38b000', color: 'white' }}
          >
            Close
          </Button>,
        ]}
      >
        {selectedDeposit && ( // Only render modal content if a record is selected
          <div className="deposit-details-modal-content">
            <p><Text strong>Date:</Text> {selectedDeposit.date}</p>
            <p>
              <Text strong>Amount:</Text>
              {selectedDeposit.currency === 'INR'
                ? ` ₹${selectedDeposit.amount.toFixed(2)}`
                : ` ${selectedDeposit.amount.toFixed(5)} ${selectedDeposit.currency}`}
            </p>
            <p><Text strong>Currency:</Text> {selectedDeposit.currency}</p>
            <p><Text strong>Method:</Text> {selectedDeposit.depositMethod}</p>
            <p>
              <Text strong>Status:</Text>
              <Tag color={statusColors[selectedDeposit.status] || 'default'} style={{ marginLeft: 8 }}>
                {selectedDeposit.status}
              </Tag>
            </p>
            {/* Display these additional fields only if they exist for the selected deposit */}
            {selectedDeposit.transactionId && <p><Text strong>Transaction ID:</Text> {selectedDeposit.transactionId}</p>}
            {selectedDeposit.reference && <p><Text strong>Reference:</Text> {selectedDeposit.reference}</p>}
            {selectedDeposit.depositAddress && <p><Text strong>Deposit Address:</Text> {selectedDeposit.depositAddress}</p>}
            {selectedDeposit.blockchainTxId && <p><Text strong>Blockchain Txn ID:</Text> {selectedDeposit.blockchainTxId}</p>}
            {selectedDeposit.network && <p><Text strong>Network:</Text> {selectedDeposit.network}</p>}
            {selectedDeposit.confirmations && <p><Text strong>Confirmations:</Text> {selectedDeposit.confirmations}</p>}
            {selectedDeposit.fee !== undefined && <p><Text strong>Fee:</Text> {selectedDeposit.fee} {selectedDeposit.currency}</p>}
            {selectedDeposit.failureReason && <p><Text strong>Failure Reason:</Text> {selectedDeposit.failureReason}</p>}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DepositHistory;