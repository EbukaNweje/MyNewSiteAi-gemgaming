import React, { useState } from 'react';
import { Card, Table, Tag, Typography, Modal, Space, Button } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import '../styles/transactionHistory.css';

const { Title, Text } = Typography;

const transactions = [
  {
    key: '1',
    date: '2025-05-01',
    description: 'Wallet Top-up',
    amount: 150.00,
    type: 'Credit',
    status: 'Successful',
    transactionId: 'TXN001ABC',
    balanceBefore: 500.00,
    balanceAfter: 650.00,
    paymentMethod: 'Bank Transfer',
  },
  {
    key: '2',
    date: '2025-05-03',
    description: 'Subscription Payment',
    amount: -20.00,
    type: 'Debit',
    status: 'Successful',
    transactionId: 'TXN002DEF',
    balanceBefore: 650.00,
    balanceAfter: 630.00,
    merchant: 'Streaming Service',
  },
  {
    key: '3',
    date: '2025-05-05',
    description: 'Refund for Purchase',
    amount: 20.00,
    type: 'Credit',
    status: 'Pending',
    transactionId: 'TXN003GHI',
    balanceBefore: 630.00,
    balanceAfter: 650.00,
    originalTransaction: 'PURCHASE123',
  },
  {
    key: '4',
    date: '2025-05-07',
    description: 'Transfer to Bank Account',
    amount: -50.00,
    type: 'Debit',
    status: 'Failed',
    transactionId: 'TXN004JKL',
    balanceBefore: 650.00,
    balanceAfter: 600.00,
    bankAccount: '1234567890',
    reason: 'Insufficient funds in linked bank.',
  },
  {
    key: '5',
    date: '2025-05-10',
    description: 'Purchase from Store',
    amount: -75.00,
    type: 'Debit',
    status: 'Successful',
    transactionId: 'TXN005MNO',
    balanceBefore: 600.00,
    balanceAfter: 525.00,
    merchant: 'Groceries Store',
  },
  {
    key: '6',
    date: '2025-05-12',
    description: 'Received from Friend',
    amount: 30.00,
    type: 'Credit',
    status: 'Successful',
    transactionId: 'TXN006PQR',
    balanceBefore: 525.00,
    balanceAfter: 555.00,
    sender: 'John Doe',
  },
  {
    key: '7',
    date: '2025-05-15',
    description: 'Utility Bill Payment',
    amount: -45.50,
    type: 'Debit',
    status: 'Successful',
    transactionId: 'TXN007STU',
    balanceBefore: 555.00,
    balanceAfter: 509.50,
    biller: 'Electricity Company',
  },
  {
    key: '8',
    date: '2025-05-18',
    description: 'Crypto Exchange',
    amount: -100.00,
    type: 'Debit',
    status: 'Successful',
    transactionId: 'TXN008VWX',
    balanceBefore: 509.50,
    balanceAfter: 409.50,
    cryptoAmount: 0.0025,
    cryptoCurrency: 'BTC',
  },
];

const statusColors = {
  Successful: 'green',
  Failed: 'red',
  Pending: 'orange',
};

const TransactionHistory = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const showModal = (record) => {
    setSelectedTransaction(record);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedTransaction(null);
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      responsive: ['xs', 'sm', 'md', 'lg'],
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      responsive: ['sm', 'md', 'lg'],
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount, record) => (
        <span style={{ color: record.type === 'Credit' ? 'green' : 'red' }}>
          {record.type === 'Credit' ? <ArrowDownOutlined /> : <ArrowUpOutlined />} ₦{Math.abs(amount).toFixed(2)}
        </span>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={type === 'Credit' ? 'green' : 'volcano'}>{type}</Tag>
      ),
      responsive: ['md', 'lg'],
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={statusColors[status] || 'default'}>{status}</Tag>
      ),
    },
  ];

  return (
    <div className="transaction-history-container">
      <Card className="transaction-card">
        <Title level={3} style={{ color: '#38b000' }}>Transaction History</Title>
        <Table
          columns={columns}
          dataSource={transactions}
          pagination={{ pageSize: 5 }}
          rowKey="key"
          scroll={{ x: true }}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => {
                showModal(record);
              },
              style: { cursor: 'pointer' },
            };
          }}
        />
      </Card>

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
        {selectedTransaction && (
          <div className="transaction-details-modal-content">
            <p><Text strong>Date:</Text> {selectedTransaction.date}</p>
            <p><Text strong>Description:</Text> {selectedTransaction.description}</p>
            <p>
              <Text strong>Amount:</Text>
              <span style={{ color: selectedTransaction.type === 'Credit' ? 'green' : 'red' }}>
                {selectedTransaction.type === 'Credit' ? <ArrowDownOutlined /> : <ArrowUpOutlined />} ₦{Math.abs(selectedTransaction.amount).toFixed(2)}
              </span>
            </p>
            <p>
              <Text strong>Type:</Text>
              <Tag color={selectedTransaction.type === 'Credit' ? 'green' : 'volcano'} style={{ marginLeft: 8 }}>
                {selectedTransaction.type}
              </Tag>
            </p>
            <p>
              <Text strong>Status:</Text>
              <Tag color={statusColors[selectedTransaction.status] || 'default'} style={{ marginLeft: 8 }}>
                {selectedTransaction.status}
              </Tag>
            </p>
            {selectedTransaction.transactionId && <p><Text strong>Transaction ID:</Text> {selectedTransaction.transactionId}</p>}
            {selectedTransaction.balanceBefore !== undefined && <p><Text strong>Balance Before:</Text> ₦{selectedTransaction.balanceBefore.toFixed(2)}</p>}
            {selectedTransaction.balanceAfter !== undefined && <p><Text strong>Balance After:</Text> ₦{selectedTransaction.balanceAfter.toFixed(2)}</p>}
            {selectedTransaction.paymentMethod && <p><Text strong>Payment Method:</Text> {selectedTransaction.paymentMethod}</p>}
            {selectedTransaction.merchant && <p><Text strong>Merchant:</Text> {selectedTransaction.merchant}</p>}
            {selectedTransaction.originalTransaction && <p><Text strong>Original Txn:</Text> {selectedTransaction.originalTransaction}</p>}
            {selectedTransaction.bankAccount && <p><Text strong>Bank Account:</Text> {selectedTransaction.bankAccount}</p>}
            {selectedTransaction.reason && <p><Text strong>Reason (if failed):</Text> {selectedTransaction.reason}</p>}
            {selectedTransaction.cryptoAmount !== undefined && <p><Text strong>Crypto Amount:</Text> {selectedTransaction.cryptoAmount} {selectedTransaction.cryptoCurrency}</p>}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TransactionHistory;