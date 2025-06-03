import React, { useEffect, useState } from 'react';
import { Table, Tag, Typography, Modal, Space, Button } from 'antd'; 
import "../styles/withdrawalHistory.css"; 

const { Title, Text } = Typography; 

const mockData = [
  {
    id: 1,
    date: '2025-05-27',
    amount: 120.50,
    currency: 'USD',
    status: 'Completed',
    transactionId: 'TXN789012345',
    walletAddress: '0xabc123...def456', 
    network: 'ERC20', 
    fee: 1.50,
  },
  {
    id: 2,
    date: '2025-05-26',
    amount: 80.00,
    currency: 'USD',
    status: 'Pending',
    transactionId: 'TXN789012346',
    walletAddress: '1A1zP1e...v7DivfNa',
    network: 'Bitcoin',
    fee: 0.80,
  },
  {
    id: 3,
    date: '2025-05-25',
    amount: 45.25,
    currency: 'BTC',
    status: 'Failed',
    transactionId: 'TXN789012347',
    walletAddress: 'bc1qxw...h8y9p0z',
    network: 'Bitcoin',
    fee: 0.0001,
  },
  {
    id: 4,
    date: '2025-05-24',
    amount: 250.75,
    currency: 'USD',
    status: 'Completed',
    transactionId: 'TXN789012348',
    walletAddress: '0xabc123...def456',
    network: 'BEP20',
    fee: 2.50,
  },
  {
    id: 5,
    date: '2025-05-23',
    amount: 0.015,
    currency: 'BTC',
    status: 'Pending',
    transactionId: 'TXN789012349',
    walletAddress: '1A1zP1e...v7DivfNa',
    network: 'Bitcoin',
    fee: 0.00005,
  },
  {
    id: 6,
    date: '2025-05-22',
    amount: 15.00,
    currency: 'USD',
    status: 'Completed',
    transactionId: 'TXN789012350',
    walletAddress: '0xabc123...def456',
    network: 'TRC20',
    fee: 0.15,
  },
  {
    id: 7,
    date: '2025-05-21',
    amount: 1.00,
    currency: 'BTC',
    status: 'Failed',
    transactionId: 'TXN789012351',
    walletAddress: 'bc1qxw...h8y9p0z',
    network: 'Bitcoin',
    fee: 0.0001,
  },
  {
    id: 8,
    date: '2025-05-20',
    amount: 750.00,
    currency: 'USD',
    status: 'Completed',
    transactionId: 'TXN789012352',
    walletAddress: '0xabc123...def456',
    network: 'ERC20',
    fee: 7.50,
  },
  {
    id: 9,
    date: '2025-05-19',
    amount: 0.005,
    currency: 'BTC',
    status: 'Pending',
    transactionId: 'TXN789012353',
    walletAddress: '1A1zP1e...v7DivfNa',
    network: 'Bitcoin',
    fee: 0.00002,
  },
  {
    id: 10,
    date: '2025-05-18',
    amount: 300.00,
    currency: 'USD',
    status: 'Completed',
    transactionId: 'TXN789012354',
    walletAddress: '0xabc123...def456',
    network: 'BEP20',
    fee: 3.00,
  },
  {
    id: 11,
    date: '2025-05-17',
    amount: 0.02,
    currency: 'BTC',
    status: 'Completed',
    transactionId: 'TXN789012355',
    walletAddress: 'bc1qxw...h8y9p0z',
    network: 'Bitcoin',
    fee: 0.00007,
  },
  {
    id: 12,
    date: '2025-05-16',
    amount: 99.99,
    currency: 'USD',
    status: 'Pending',
    transactionId: 'TXN789012356',
    walletAddress: '0xabc123...def456',
    network: 'TRC20',
    fee: 0.99,
  },
];

const statusColors = {
  Completed: 'green',
  Pending: 'orange',
  Failed: 'red',
};

const WithdrawalHistory = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    setData(mockData);
  }, []);

  const showModal = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedRecord(null);
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount, record) => {
        if (record.currency === 'BTC') {
          return `${amount.toFixed(5)} BTC`;
        }
        return `$${amount.toFixed(2)}`;
      },
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
      filters: [
        { text: 'USD', value: 'USD' },
        { text: 'BTC', value: 'BTC' },
      ],
      onFilter: (value, record) => record.currency.indexOf(value) === 0,
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
    <div className="withdrawal-history-container">
      <Title level={3} style={{ color: '#38b000' }}>Withdrawal History</Title>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{ pageSize: 7 }}
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              showModal(record);
            },
            style: { cursor: 'pointer' },
          };
        }}
      />

      <Modal
        title={<Title level={4} style={{ margin: 0, color: '#38b000' }}>Transaction Details</Title>}
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button
            key="back"
            onClick={handleModalClose}
            type="primary"
            className="modal-close-button" 
          >
            Close
          </Button>,
        ]}
      >
        {selectedRecord && (
          <div className="withdrawal-details-modal-content">
            <p><Text strong>Date:</Text> {selectedRecord.date}</p>
            <p>
              <Text strong>Amount:</Text>
              {selectedRecord.currency === 'BTC'
                ? ` ${selectedRecord.amount.toFixed(5)} BTC`
                : ` $${selectedRecord.amount.toFixed(2)}`}
            </p>
            <p><Text strong>Currency:</Text> {selectedRecord.currency}</p>
            <p>
              <Text strong>Status:</Text>
              <Tag color={statusColors[selectedRecord.status] || 'default'} style={{ marginLeft: 8 }}>
                {selectedRecord.status}
              </Tag>
            </p>
            {selectedRecord.transactionId && <p><Text strong>Transaction ID:</Text> {selectedRecord.transactionId}</p>}
            {selectedRecord.walletAddress && <p><Text strong>Wallet Address:</Text> {selectedRecord.walletAddress}</p>}
            {selectedRecord.network && <p><Text strong>Network:</Text> {selectedRecord.network}</p>}
            {selectedRecord.fee !== undefined && <p><Text strong>Fee:</Text> {selectedRecord.fee} {selectedRecord.currency}</p>}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default WithdrawalHistory;