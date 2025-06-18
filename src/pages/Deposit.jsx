import React, { useState, useEffect, useRef } from 'react';
import { Form, Select, Button, Card, Typography, Space, notification, Modal, Divider, InputNumber } from 'antd';
import { CopyOutlined, WalletOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title, Text } = Typography;
const { Option } = Select;

const Deposit = () => {
  const userId = localStorage.getItem('Userid'); 
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [currentCrypto, setCurrentCrypto] = useState('BTC'); 
  const [selectedNetwork, setSelectedNetwork] = useState('default'); 
  const [depositAmount, setDepositAmount] = useState(0);
  const [depositAddress, setDepositAddress] = useState('');
  const [transactionId, setTransactionId] = useState('');

  const [isReceiptModalVisible, setIsReceiptModalVisible] = useState(false);
  const [receiptDetails, setReceiptDetails] = useState(null);
  const receiptContentRef = useRef(null);
  const [printLoading, setPrintLoading] = useState(false);

  const API_URL = 'https://my-new-site-ai-gemgaming-backend.vercel.app/api';

  const openNotificationWithIcon = (type, message, description, placement = 'topRight', duration = 4.5) => {
    const config = {
      message: message,
      description: description,
      placement: placement,
      duration: duration,
    };

    switch (type) {
      case 'success':
        notification.success(config);
        break;
      case 'error':
        notification.error(config);
        break;
      case 'info':
        notification.info(config);
        break;
      case 'warn':
        notification.warning(config); 
        break;
      default:
        notification.open(config);
        break;
    }
  };

  useEffect(() => {
    setCurrentCrypto('BTC');
    setSelectedNetwork('default');
    form.setFieldsValue({ cryptocurrency: 'BTC', network: 'default' });
  }, [form]);

  const onAmountChange = (value) => {
    setDepositAmount(value);
    setDepositAddress(''); 
    setTransactionId('');
  };

  const handleCopyAddress = () => {
    if (depositAddress && depositAddress !== 'Error fetching address') {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(depositAddress);
        } else {
          const textArea = document.createElement("textarea");
          textArea.value = depositAddress;
          textArea.style.position = "fixed";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }
        openNotificationWithIcon('success', 'Address Copied!', 'The deposit address has been copied to your clipboard.', 'bottomRight');
      } catch (err) {
        openNotificationWithIcon('error', 'Copy Failed', 'Could not copy address. Please try manually.', 'bottomRight');
      }
    }
  };

  const onCryptoChange = (value) => {
    setCurrentCrypto(value);
    setSelectedNetwork(undefined); 
    form.setFieldsValue({ network: undefined });
    setDepositAddress(''); 
    setTransactionId(''); 
  };

  const onNetworkChange = (value) => {
    setSelectedNetwork(value);
    setDepositAddress(''); 
    setTransactionId(''); 
  };

  const handleDepositedConfirmation = async () => {
    if (!currentCrypto || !selectedNetwork) {
      openNotificationWithIcon('warn', 'Missing Selection', 'Please select both cryptocurrency and network.', 'topRight');
      return;
    }
    if (depositAmount <= 0) {
      openNotificationWithIcon('warn', 'Invalid Amount', 'Please enter a valid amount greater than zero.', 'topRight');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        coin: currentCrypto,
        amount: parseFloat(depositAmount),
      };

      const response = await axios.post(`${API_URL}/deposit/${userId}`, payload);
      const result = response.data;

      if (response.status === 200) {
        // const { transactionId, depositAddress } = result.data;
        console.log(response.data)
        // setDepositAddress(depositAddress);
        // setTransactionId(transactionId);
        // openNotificationWithIcon('success', 'Deposit Address Fetched!', 'Proceeding to receipt. Please send funds to the address shown.', 'bottomRight');

        const depositTime = new Date().toLocaleString();
        setReceiptDetails({
          cryptocurrency: currentCrypto,
          network: selectedNetwork,
          depositAddress: depositAddress,
          depositTime: depositTime,
          transactionId: transactionId,
          status: 'Awaiting Confirmation',
          amount: depositAmount,
        });
        setIsReceiptModalVisible(true);

        openNotificationWithIcon('info', 'Deposit Initiated!', 'Your deposit is being awaited. Please send crypto to the address shown in the receipt.', 'topRight', 5);

        setTimeout(() => {
          setReceiptDetails(prevDetails => {
            if (prevDetails && prevDetails.transactionId === transactionId) {
              openNotificationWithIcon('success', 'Deposit Confirmed!', `Your deposit of ${prevDetails.amount} ${prevDetails.cryptocurrency} has been confirmed. Transaction ID: ${transactionId}`, 'topRight', 8);
              return { ...prevDetails, status: 'Confirmed' };
            }
            return prevDetails;
          });
        }, 8000);

      } else {
        openNotificationWithIcon('error', 'Deposit Address Error', result.message || 'Failed to get deposit address. Please try again.', 'bottomRight');
        setDepositAddress('');
        setTransactionId('');
      }
    } catch (err) {
      if (err.response) {
        openNotificationWithIcon('error', 'API Error', err.response.data.message || 'Server error. Please try again.', 'bottomRight');
      } else if (err.request) {
        openNotificationWithIcon('error', 'Network Error', 'No response from server. Check your internet connection.', 'bottomRight');
      } else {
        openNotificationWithIcon('error', 'Request Failed', err.message || 'An unexpected error occurred.', 'bottomRight');
      }
      console.error("Error during deposit initiation:", err);
      setDepositAddress('');
      setTransactionId('');
    } finally {
      setLoading(false); 
    }
  };

  const handleReceiptModalClose = () => {
    setIsReceiptModalVisible(false);
    setReceiptDetails(null);
    setDepositAddress(''); 
    setTransactionId(''); 
    setDepositAmount(0); 
    form.resetFields(['amount']);
  };

  const handlePrintReceipt = () => {
    const printContent = receiptContentRef.current;
    if (printContent) {
      setPrintLoading(true);
      const printWindow = window.open('', '_blank', 'height=600,width=800');
      if (printWindow) {
        printWindow.document.write('<html><head><title>Deposit Receipt</title>');
        printWindow.document.write('<style>');
        printWindow.document.write(`
                  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'; margin: 20px; }
                  .receipt-header, .receipt-section, .receipt-footer { padding: 10px 0; }
                  .receipt-header { text-align: center; }
                  .receipt-title { margin-bottom: 10px; }
                  .receipt-row { display: flex; justify-content: space-between; margin-bottom: 5px; }
                  .receipt-label { font-weight: bold; }
                  .receipt-value { word-break: break-all; text-align: right; }
                  .receipt-value.address, .receipt-value.id { font-family: monospace; }
                  .receipt-divider { margin: 15px 0; border-top: 1px dashed #eee; }
                  .receipt-footer { font-size: 0.8em; color: #666; text-align: center; }
                  .status-awaiting-confirmation { color: orange; }
                  .status-confirmed { color: green; }
              `);
        printWindow.document.write('</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(printContent.outerHTML);
        printWindow.document.close();

        printWindow.onload = () => {
          printWindow.focus();
          printWindow.print();
          printWindow.close();
          setPrintLoading(false);
        };
      } else {
        setPrintLoading(false);
        openNotificationWithIcon('error', 'Print Failed', 'Could not open print window. Please check your browser settings.', 'topRight');
      }
    } else {
      openNotificationWithIcon('error', 'Print Failed', 'Receipt content not available for printing.', 'topRight');
      setPrintLoading(false);
    }
  };

  const isDepositButtonEnabled = !loading && currentCrypto && selectedNetwork && depositAmount > 0;

  return (
    <div className="withdraw-page-container" style={{ padding: '20px' }}>
      <Card
        className="withdraw-card"
        style={{ maxWidth: '500px', margin: 'auto' }}
        title={<Title level={3} style={{ textAlign: 'center', margin: 0, color: '#38b000' }}>Deposit {currentCrypto}</Title>}
      >
        <Form
          form={form}
          layout="vertical"
          name="deposit_form"
          initialValues={{
            cryptocurrency: currentCrypto, 
            network: selectedNetwork,     
            amount: depositAmount,
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
            </Select>
          </Form.Item>

          <Form.Item
            label="Network"
            name="network"
            rules={[{ required: true, message: 'Please select a network!' }]}
          >
            <Select placeholder="Select a network" size="large" onChange={onNetworkChange}>
              {currentCrypto === 'BTC' && <Option value="default">Bitcoin Network</Option>}
              {currentCrypto === 'ETH' && <Option value="ERC20">ERC20 (Ethereum)</Option>}
            </Select>
          </Form.Item>

          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              { required: true, message: 'Please enter the deposit amount!' },
              { type: 'number', min: 0.000001, message: 'Amount must be greater than zero!' },
            ]}
          >
            <InputNumber
              min={0.000001}
              step={0.000001}
              placeholder="e.g., 0.001"
              size="large"
              style={{ width: '100%' }}
              onChange={onAmountChange}
              value={depositAmount}
            />
          </Form.Item>

          {depositAddress && transactionId && !loading && (
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <Text strong>Your Deposit Address ({selectedNetwork}):</Text>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 8, marginBottom: 16 }}>
                <Text copyable={{ text: depositAddress }} style={{ fontSize: '1.1em', fontWeight: 'bold', maxWidth: '80%', wordWrap: 'break-word' }}>
                  {depositAddress}
                </Text>
                <Button icon={<CopyOutlined />} onClick={handleCopyAddress} type="text" />
              </div>
            </div>
          )}

          {loading && (
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <Text type="secondary">Fetching deposit details...</Text>
            </div>
          )}

          <div style={{ marginBottom: 24, padding: '12px 0', borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0' }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text strong style={{ color: '#faad14' }}>
                Important:
              </Text>
              <Text type="secondary" style={{ fontSize: '0.85em' }}>
                1. Send only **{currentCrypto}** to this address. Sending any other asset may result in loss.
              </Text>
              <Text type="secondary" style={{ fontSize: '0.85em' }}>
                2. Ensure the selected network is **{selectedNetwork || 'N/A'}**. Deposits on incorrect networks may be lost.
              </Text>
              <Text type="secondary" style={{ fontSize: '0.85em' }}>
                3. This address is valid for multiple deposits.
              </Text>
            </Space>
          </div>

          <Form.Item>
            <Button
              type="primary"
              block
              size="large"
              onClick={handleDepositedConfirmation}
              style={{ backgroundColor: '#38b000', borderColor: '#38b000' }}
              disabled={!isDepositButtonEnabled || loading}
            >
              {loading ? 'Processing...' : 'Initiate Deposit'}
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
            key="print"
            onClick={handlePrintReceipt}
            loading={printLoading}
            style={{ backgroundColor: '#38b000', borderColor: '#38b000', color: 'white' }}
          >
            {printLoading ? 'Preparing Print...' : 'Print Receipt'}
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
              <Title level={5} className="receipt-title">Deposit Details</Title>
            </div>

            <Divider className="receipt-divider" />

            <div className="receipt-section">
              <div className="receipt-row">
                <Text className="receipt-label">Cryptocurrency:</Text>
                <Text className="receipt-value">{receiptDetails.cryptocurrency}</Text>
              </div>
              <div className="receipt-row">
                <Text className="receipt-label">Network:</Text>
                <Text className="receipt-value">{receiptDetails.network}</Text>
              </div>
              <div className="receipt-row">
                <Text className="receipt-label">Amount:</Text>
                <Text className="receipt-value">{receiptDetails.amount}</Text>
              </div>
              <div className="receipt-row">
                <Text className="receipt-label">Deposit Address:</Text>
                <Text copyable className="receipt-value address">{receiptDetails.depositAddress}</Text>
              </div>
            </div>

            <Divider className="receipt-divider" />

            <div className="receipt-section">
              <div className="receipt-row">
                <Text className="receipt-label">Time of Request:</Text>
                <Text className="receipt-value">{receiptDetails.depositTime}</Text>
              </div>
              <div className="receipt-row">
                <Text className="receipt-label">Reference ID:</Text>
                <Text copyable className="receipt-value id">{receiptDetails.transactionId}</Text>
              </div>
              <div className="receipt-row">
                <Text className="receipt-label">Status:</Text>
                <Text className={`receipt-value status-${receiptDetails.status.toLowerCase().replace(/\s/g, '-')}`}>{receiptDetails.status}</Text>
              </div>
            </div>

            <Divider className="receipt-divider" />

            <div className="receipt-footer">
              <Text type="secondary" className="footer-disclaimer">
                Please ensure you've sent the correct cryptocurrency to the displayed address and network. Your balance will update upon blockchain confirmation.
              </Text>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Deposit;
