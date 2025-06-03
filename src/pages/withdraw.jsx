import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input, Select, Button, Card, Typography, Space, notification, Modal, Divider } from 'antd';
import { WalletOutlined } from '@ant-design/icons';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import '../styles/withdraw.css';

const { Title, Text } = Typography;
const { Option } = Select;

const Withdraw = () => {
  const { cryptocurrency: paramCrypto } = useParams();
  const [form] = Form.useForm();

  const [amount, setAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [currentCrypto, setCurrentCrypto] = useState('BTC');

  const [availableBalance, setAvailableBalance] = useState(1.50000000);

  const [transactionFee, setTransactionFee] = useState('0.00010000');
  const [youWillReceive, setYouWillReceive] = useState('0.00000000');

  const [isReceiptModalVisible, setIsReceiptModalVisible] = useState(false);
  const [receiptDetails, setReceiptDetails] = useState(null);

  const receiptContentRef = useRef(null);
  const [downloadLoading, setDownloadLoading] = useState(false);

  useEffect(() => {
    if (paramCrypto) {
      const formattedCrypto = paramCrypto.toUpperCase();
      setCurrentCrypto(formattedCrypto);
      form.setFieldsValue({ cryptocurrency: formattedCrypto });
    } else {
      setCurrentCrypto('BTC');
      form.setFieldsValue({ cryptocurrency: 'BTC' });
    }
  }, [paramCrypto, form]);

  useEffect(() => {
    const parsedAmount = parseFloat(amount);
    const parsedFee = parseFloat(transactionFee);

    if (!isNaN(parsedAmount) && parsedAmount > 0) {
      const received = parsedAmount - parsedFee;
      setYouWillReceive(received > 0 ? received.toFixed(8) : '0.00000000');
    } else {
      setYouWillReceive('0.00000000');
    }
  }, [amount, transactionFee]);

  const handleWithdrawSubmit = async (values) => {
    setLoading(true);
    const { amount: withdrawnAmountStr, walletAddress, cryptocurrency, network } = values;

    const withdrawnAmount = parseFloat(withdrawnAmountStr);
    const fee = parseFloat(transactionFee);
    const currentBalanceNum = parseFloat(availableBalance);

    if (isNaN(withdrawnAmount) || withdrawnAmount <= 0) {
        notification.error({
            message: 'Invalid Amount',
            description: 'Please enter a valid amount greater than zero.',
            placement: 'topRight',
        });
        setLoading(false);
        return;
    }
    if (withdrawnAmount > currentBalanceNum) {
        notification.error({
            message: 'Insufficient Balance',
            description: 'You do not have enough funds for this withdrawal.',
            placement: 'topRight',
        });
        setLoading(false);
        return;
    }

    await new Promise(resolve => setTimeout(resolve, 2000));

    setLoading(false);

    const newBalance = currentBalanceNum - withdrawnAmount;
    setAvailableBalance(newBalance.toFixed(8));

    const withdrawalTime = new Date().toLocaleString();
    const mockTransactionId = `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`;

    setReceiptDetails({
      cryptocurrency: cryptocurrency,
      amountWithdrawn: withdrawnAmountStr,
      transactionFee: transactionFee,
      youWillReceive: youWillReceive,
      recipientAddress: walletAddress,
      network: network,
      withdrawalTime: withdrawalTime,
      transactionId: mockTransactionId,
      status: 'Pending',
    });

    setIsReceiptModalVisible(true);

    notification.success({
      message: 'Withdrawal Initiated!',
      description: 'Your withdrawal is being processed. See receipt for details.',
      placement: 'topRight',
      duration: 3,
    });

    form.resetFields();
    setAmount('');
    setWalletAddress('');
    setSelectedNetwork(undefined);
    setYouWillReceive('0.00000000');
  };

  const handleReceiptModalClose = () => {
    setIsReceiptModalVisible(false);
    setReceiptDetails(null);
  };

  const handleDownloadReceipt = async () => {
    if (!receiptContentRef.current) {
      notification.error({
        message: 'Download Failed',
        description: 'Receipt content not found.',
        placement: 'topRight',
      });
      return;
    }

    setDownloadLoading(true);
    try {
      const canvas = await html2canvas(receiptContentRef.current, { scale: 3, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const filename = `withdrawal_receipt_${receiptDetails.transactionId || Date.now()}.pdf`;
      pdf.save(filename);
      notification.success({
        message: 'Receipt Downloaded',
        description: `Your receipt has been downloaded as ${filename}`,
        placement: 'topRight',
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      notification.error({
        message: 'Download Failed',
        description: 'Could not generate the PDF receipt. Please try again.',
        placement: 'topRight',
      });
    } finally {
      setDownloadLoading(false);
    }
  };

  const onCryptoChange = (value) => {
    setCurrentCrypto(value);
  };

  const onAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const onWalletAddressChange = (e) => {
    setWalletAddress(e.target.value);
  };

  const onNetworkChange = (value) => {
    setSelectedNetwork(value);
  };

  return (
    <div className="withdraw-page-container">
      <Card
        className="withdraw-card"
        title={<Title level={3} style={{ textAlign: 'center', margin: 0, color: '#38b000' }}>Withdraw {currentCrypto}</Title>}
      >
        <Form
          form={form}
          layout="vertical"
          name="withdraw_form"
          onFinish={handleWithdrawSubmit}
          initialValues={{
            cryptocurrency: currentCrypto,
            amount: '',
            walletAddress: '',
            network: undefined,
          }}
        >
          <Form.Item
            label="Cryptocurrency"
            name="cryptocurrency"
            rules={[{ required: true, message: 'Please select a cryptocurrency!' }]}
          >
            <Select placeholder="Select a crypto" size="large" onChange={onCryptoChange}>
              <Option value="BTC">Bitcoin (BTC)</Option>
              <Option value="ETH">Ethereum (ETH)</Option>
              <Option value="USDT">Tether (USDT)</Option>
            </Select>
          </Form.Item>

          <div className="available-balance-display">
            <Text strong>Your current balance:</Text> <Text>{availableBalance} {currentCrypto}</Text>
          </div>

          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              { required: true, message: 'Please enter the amount!' },
              {
                validator: (_, value) => {
                  const parsedValue = parseFloat(value);
                  const parsedBalance = parseFloat(availableBalance);
                  if (isNaN(parsedValue) || parsedValue <= 0) {
                    return Promise.reject(new Error('Amount must be greater than zero!'));
                  }
                  if (parsedValue > parsedBalance) {
                    return Promise.reject(new Error(`Insufficient balance! Max: ${parsedBalance.toFixed(8)}`));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input
              type="number"
              placeholder="Enter amount"
              step="0.000001"
              size="large"
              onChange={onAmountChange}
            />
          </Form.Item>

          <Form.Item
            label="Network"
            name="network"
            rules={[{ required: true, message: 'Please select a network!' }]}
          >
            <Select placeholder="Select a network" size="large" onChange={onNetworkChange} value={selectedNetwork}>
              <Option value="ERC20">ERC20 (Ethereum)</Option>
              <Option value="TRC20">TRC20 (Tron)</Option>
              <Option value="BEP20">BSC (BEP20)</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Recipient Address"
            name="walletAddress"
            rules={[
              { required: true, message: 'Please enter the recipient wallet address!' },
              { min: 20, message: 'Address is too short (minimum 20 characters)!' },
            ]}
          >
            <Input
              placeholder="Enter recipient wallet address"
              size="large"
              onChange={onWalletAddressChange}
            />
          </Form.Item>

          <div style={{ marginBottom: 24, padding: '12px 0', borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0' }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div className="summary-row">
                <Text strong>Transaction Fee:</Text>
                <Text>{transactionFee} {currentCrypto}</Text>
              </div>
              <div className="summary-row">
                <Text strong>You'll Receive:</Text>
                <Text className="final-amount-text">{youWillReceive} {currentCrypto}</Text>
              </div>
              <Text type="secondary" style={{ fontSize: '0.85em', marginTop: 8 }}>
                **Important:** Always double-check the address and network. Crypto withdrawals are irreversible.
              </Text>
            </Space>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
              className="withdraw-submit-button"
            >
              {loading ? 'Processing...' : 'Withdraw'}
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Modal
        title={null}
        open={isReceiptModalVisible}
        onCancel={handleReceiptModalClose}
        footer={[
          <Button
            key="download"
            onClick={handleDownloadReceipt}
            loading={downloadLoading}
            className="download-receipt-button"
            type="primary"
          >
            {downloadLoading ? 'Generating...' : 'Download Receipt'}
          </Button>,
          <Button key="ok" onClick={handleReceiptModalClose}>
            Got It
          </Button>,
        ]}
        centered
        width={480}
        className="withdrawal-receipt-modal"
      >
        {receiptDetails && (
          <div className="withdrawal-receipt-content" ref={receiptContentRef}>
            <div className="receipt-header">
              <div className="header-logo">
                <WalletOutlined style={{ fontSize: '30px', color: '#333' }} />
              </div>
              <Title level={5} className="receipt-title">Withdrawal Receipt</Title>
            </div>

            <Divider className="receipt-divider" />

            <div className="receipt-section">
              <div className="receipt-row">
                <Text className="receipt-label">Amount Withdrawn:</Text>
                <Text className="receipt-value">{receiptDetails.amountWithdrawn} {receiptDetails.cryptocurrency}</Text>
              </div>
              <div className="receipt-row">
                <Text className="receipt-label">Transaction Fee:</Text>
                <Text className="receipt-value">{receiptDetails.transactionFee} {receiptDetails.cryptocurrency}</Text>
              </div>
              <div className="receipt-row total">
                <Text className="receipt-label">You Will Receive:</Text>
                <Text className="receipt-value final-amount">{receiptDetails.youWillReceive} {receiptDetails.cryptocurrency}</Text>
              </div>
            </div>

            <Divider className="receipt-divider" />

            <div className="receipt-section">
              <div className="receipt-row">
                <Text className="receipt-label">Recipient Address:</Text>
                <Text copyable className="receipt-value address">{receiptDetails.recipientAddress}</Text>
              </div>
              <div className="receipt-row">
                <Text className="receipt-label">Network:</Text>
                <Text className="receipt-value">{receiptDetails.network}</Text>
              </div>
              <div className="receipt-row">
                <Text className="receipt-label">Withdrawal Time:</Text>
                <Text className="receipt-value">{receiptDetails.withdrawalTime}</Text>
              </div>
              <div className="receipt-row">
                <Text className="receipt-label">Transaction ID:</Text>
                <Text copyable className="receipt-value id">{receiptDetails.transactionId}</Text>
              </div>
              <div className="receipt-row">
                <Text className="receipt-label">Status:</Text>
                <Text className={`receipt-value status-${receiptDetails.status.toLowerCase()}`}>{receiptDetails.status}</Text>
              </div>
            </div>

            <Divider className="receipt-divider" />

            <div className="receipt-footer">
              <Text type="secondary" className="footer-disclaimer">
                Please note: Withdrawal status is initially 'Pending' and may take time to confirm on the blockchain.
              </Text>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Withdraw;