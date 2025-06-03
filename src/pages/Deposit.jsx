// src/pages/Deposit.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Select, Button, Card, Typography, Space, notification, Modal, Divider } from 'antd';
import { CopyOutlined, WalletOutlined } from '@ant-design/icons';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import '../styles/withdraw.css'; 

const { Title, Text } = Typography;
const { Option } = Select;

const Deposit = () => {
  const { cryptocurrency: paramCrypto } = useParams();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [currentCrypto, setCurrentCrypto] = useState('BTC');
  const [selectedNetwork, setSelectedNetwork] = useState(undefined);
  const [depositAddress, setDepositAddress] = useState('');

  const [isReceiptModalVisible, setIsReceiptModalVisible] = useState(false);
  const [receiptDetails, setReceiptDetails] = useState(null);
  const receiptContentRef = useRef(null); 
  const [downloadLoading, setDownloadLoading] = useState(false);

  const mockDepositAddresses = {
    BTC: {
      default: 'bc1qxw5j9j2p3k4l5m6n7o8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h6i7j8k9l0m',
    },
    ETH: {
      ERC20: '0x742d35Cc6634C0539Ff82869B2c219C74DF6Bc09',
    },
    USDT: {
      ERC20: '0xAbc123DeF456aBc789012345678901234567890',
      TRC20: 'TR7NHqjsudtPZphP6Bv5b7bU8U8y7E7c2cQ',
    },
  };

  useEffect(() => {
    if (paramCrypto) {
      const formattedCrypto = paramCrypto.toUpperCase();
      setCurrentCrypto(formattedCrypto);
      form.setFieldsValue({ cryptocurrency: formattedCrypto });

      if (formattedCrypto === 'ETH') {
        setSelectedNetwork('ERC20');
        form.setFieldsValue({ network: 'ERC20' });
      } else if (formattedCrypto === 'USDT') {
        setSelectedNetwork('ERC20');
        form.setFieldsValue({ network: 'ERC20'});
      } else {
        setSelectedNetwork('default');
        form.setFieldsValue({ network: 'default' });
      }
    } else {
      setCurrentCrypto('BTC');
      setSelectedNetwork('default');
      form.setFieldsValue({ cryptocurrency: 'BTC', network: 'default' });
    }
  }, [paramCrypto, form]);

  useEffect(() => {
    if (currentCrypto && selectedNetwork) {
      setLoading(true);
      setTimeout(() => {
        let address = '';

        if (currentCrypto === 'BTC') {
          address = mockDepositAddresses.BTC.default;
        } else if (currentCrypto === 'ETH' && selectedNetwork === 'ERC20') {
          address = mockDepositAddresses.ETH.ERC20;
        } else if (currentCrypto === 'USDT') {
          if (selectedNetwork === 'ERC20') {
            address = mockDepositAddresses.USDT.ERC20;
          } else if (selectedNetwork === 'TRC20') {
            address = mockDepositAddresses.USDT.TRC20;
          }
        } else {
          address = 'N/A: Select a valid network';
        }
        setDepositAddress(address);
        setLoading(false);
      }, 500);
    } else {
      setDepositAddress('');
    }
  }, [currentCrypto, selectedNetwork]);

  const handleCopyAddress = async () => {
    if (depositAddress) {
      try {
        await navigator.clipboard.writeText(depositAddress);
        notification.success({
          message: 'Address Copied!',
          description: 'The deposit address has been copied to your clipboard.',
          placement: 'bottomRight',
        });
      } catch (err) {
        notification.error({
          message: 'Copy Failed',
          description: 'Could not copy address. Please try manually.',
          placement: 'bottomRight',
        });
      }
    }
  };

  const onCryptoChange = (value) => {
    setCurrentCrypto(value);
    setSelectedNetwork(undefined);
    form.setFieldsValue({ network: undefined });
  };

  const onNetworkChange = (value) => {
    setSelectedNetwork(value);
  };

  const handleDepositedConfirmation = () => {
    if (!depositAddress || depositAddress === 'N/A: Select a valid network') {
      notification.warn({
        message: 'No Deposit Address',
        description: 'Please select cryptocurrency and network to get a deposit address first.',
        placement: 'topRight',
      });
      return;
    }

    const depositTime = new Date().toLocaleString();
    const mockTransactionId = `DEP${Date.now()}${Math.floor(Math.random() * 1000)}`;

    setReceiptDetails({
      cryptocurrency: currentCrypto,
      network: selectedNetwork,
      depositAddress: depositAddress,
      depositTime: depositTime,
      transactionId: mockTransactionId,
      status: 'Awaiting Deposit',
    });
    setIsReceiptModalVisible(true);

    notification.info({
      message: 'Deposit Initiated!',
      description: 'Your deposit is being awaited. Please send crypto to the address shown in the receipt.',
      placement: 'topRight',
      duration: 5,
    });

    setTimeout(() => {
      setReceiptDetails(prevDetails => {
        if (prevDetails && prevDetails.transactionId === mockTransactionId) {
          notification.success({
            message: 'Deposit Confirmed!',
            description: `Your deposit of ${currentCrypto} has been confirmed. Transaction ID: ${mockTransactionId}`,
            placement: 'topRight',
            duration: 8,
          });
          return { ...prevDetails, status: 'Confirmed' }; 
        }
        return prevDetails; 
      });
    }, 8000);
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

      const filename = `deposit_receipt_${receiptDetails.transactionId || Date.now()}.pdf`;
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

  return (
    <div className="withdraw-page-container">
      <Card
        className="withdraw-card"
        title={<Title level={3} style={{ textAlign: 'center', margin: 0, color: '#38b000' }}>Deposit {currentCrypto}</Title>}
      >
        <Form
          form={form}
          layout="vertical"
          name="deposit_form"
          initialValues={{
            cryptocurrency: currentCrypto,
            network: selectedNetwork,
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

          <Form.Item
            label="Network"
            name="network"
            rules={[{ required: true, message: 'Please select a network!' }]}
          >
            <Select placeholder="Select a network" size="large" onChange={onNetworkChange}>
              {currentCrypto === 'BTC' && <Option value="default">Bitcoin Network</Option>}
              {currentCrypto === 'ETH' && <Option value="ERC20">ERC20 (Ethereum)</Option>}
              {currentCrypto === 'USDT' && (
                <>
                  <Option value="ERC20">ERC20 (Ethereum)</Option>
                  <Option value="TRC20">TRC20 (Tron)</Option>
                </>
              )}
            </Select>
          </Form.Item>

          {depositAddress && !loading && (
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <Text strong>Your Deposit Address ({selectedNetwork}):</Text>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 8, marginBottom: 16 }}>
                <Text copyable={{ text: depositAddress }} style={{ fontSize: '1.1em', fontWeight: 'bold', maxWidth: '80%', wordWrap: 'break-word' }}>
                  {depositAddress}
                </Text>
                <Button icon={<CopyOutlined />} onClick={handleCopyAddress} type="text" />
              </div>

              <div style={{ border: '1px solid #f0f0f0', borderRadius: 8, padding: 10, display: 'inline-block' }}>
                {depositAddress && (
                  <QRCode
                    value={depositAddress}
                    size={150}
                  />
                )}
              </div>
            </div>
          )}

          {loading && (
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <Text type="secondary">Generating deposit address...</Text>
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
                2. Ensure the selected network is **{selectedNetwork}**. Deposits on incorrect networks may be lost.
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
            >
              I Have Deposited
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {/* --- Deposit Receipt Modal --- */}
      <Modal
        title={null}
        open={isReceiptModalVisible}
        onCancel={handleReceiptModalClose}
        footer={[
          <Button
            key="download"
            onClick={handleDownloadReceipt}
            loading={downloadLoading}
            style={{ backgroundColor: '#38b000', borderColor: '#38b000', color: 'white' }}
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