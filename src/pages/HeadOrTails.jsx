// src/pages/HeadsOrTails.jsx
import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Card, Typography, Space, notification } from 'antd';
import { RiseOutlined, FallOutlined, SyncOutlined, DollarOutlined } from '@ant-design/icons';
import '../styles/withdraw.css'; // Reusing for general card/page styling

const { Title, Text } = Typography;
const { Option } = Select;

const HeadsOrTails = () => {
  const [form] = Form.useForm();
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [betAmount, setBetAmount] = useState('');
  const [userChoice, setUserChoice] = useState(null); // 'heads' or 'tails'
  const [gameResult, setGameResult] = useState(null); // 'heads' or 'tails'
  const [flipping, setFlipping] = useState(false);
  const [availableBalance, setAvailableBalance] = useState({
    BTC: 0.5,
    ETH: 2.0,
    USDT: 1000,
  });

  // Mock win multiplier (e.g., 1.95x for a 5% house edge)
  const winMultiplier = 1.95;

  const currentBalance = availableBalance[selectedCrypto];

  // Reset game state after a flip
  useEffect(() => {
    // This effect is not strictly necessary for simple reset, but can be used for more complex post-game logic.
    // For now, reset of userChoice and betAmount are handled directly in handleFlip.
  }, []);

  const handleFlip = async () => {
    try {
      const values = await form.validateFields();
      const parsedBetAmount = parseFloat(values.betAmount);

      if (parsedBetAmount <= 0) {
        notification.error({
          message: 'Invalid Bet',
          description: 'Bet amount must be greater than zero.',
          placement: 'topRight',
        });
        return;
      }

      if (parsedBetAmount > currentBalance) {
        notification.error({
          message: 'Insufficient Balance',
          description: `You only have ${currentBalance.toFixed(8)} ${selectedCrypto} available.`,
          placement: 'topRight',
        });
        return;
      }

      if (!userChoice) {
        notification.warning({
          message: 'Make Your Choice',
          description: 'Please select either Heads or Tails.',
          placement: 'topRight',
        });
        return;
      }

      setFlipping(true);
      setGameResult(null); // Clear previous result
      notification.info({
        message: 'Flipping...',
        description: 'The coin is in the air!',
        placement: 'topRight',
        duration: 2,
      });

      // Simulate coin flip delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Determine result
      const outcome = Math.random() < 0.5 ? 'heads' : 'tails';
      setGameResult(outcome);
      setFlipping(false);

      // Update balance and notify
      let newBalanceAmount;
      if (outcome === userChoice) {
        const winnings = parsedBetAmount * winMultiplier;
        newBalanceAmount = currentBalance + (winnings - parsedBetAmount);
        notification.success({
          message: 'You Win!',
          description: `It's ${outcome}! You won ${winnings.toFixed(8)} ${selectedCrypto}.`,
          placement: 'topRight',
          duration: 5,
        });
      } else {
        newBalanceAmount = currentBalance - parsedBetAmount;
        notification.error({
          message: 'You Lose!',
          description: `It's ${outcome}. Better luck next time! You lost ${parsedBetAmount.toFixed(8)} ${selectedCrypto}.`,
          placement: 'topRight',
          duration: 5,
        });
      }

      setAvailableBalance(prev => ({
        ...prev,
        [selectedCrypto]: parseFloat(newBalanceAmount.toFixed(8)), // Ensure precision
      }));

      // Reset choice and bet amount for next round
      setUserChoice(null);
      setBetAmount('');
      form.resetFields(['betAmount']);

    } catch (info) {
      // Form validation will catch errors here, Ant Design notification will show automatically.
      console.log('Validate Failed:', info);
    }
  };

  return (
    <div className="withdraw-page-container"> {/* Reusing page container */}
      <Card
        className="withdraw-card" // Reusing card style
        title={<Title level={3} style={{ textAlign: 'center', margin: 0, color: 'purple' }}>Heads or Tails</Title>}
      >
        <Form
          form={form}
          layout="vertical"
          name="heads_or_tails_form"
          onFinish={handleFlip} // Trigger handleFlip on form submission
          initialValues={{
            cryptocurrency: selectedCrypto,
            betAmount: '',
          }}
        >
          <Form.Item
            label="Cryptocurrency"
            name="cryptocurrency"
            rules={[{ required: true, message: 'Please select a cryptocurrency!' }]}
          >
            <Select placeholder="Select a crypto" size="large" onChange={value => setSelectedCrypto(value)} disabled={flipping}>
              <Option value="BTC">Bitcoin (BTC)</Option>
              <Option value="ETH">Ethereum (ETH)</Option>
              <Option value="USDT">Tether (USDT)</Option>
            </Select>
          </Form.Item>

          <div className="available-balance-display">
            <Text strong><DollarOutlined /> Your balance:</Text> <Text>{currentBalance.toFixed(8)} {selectedCrypto}</Text>
          </div>

          <Form.Item
            label="Bet Amount"
            name="betAmount"
            rules={[
              { required: true, message: 'Please enter your bet amount!' },
              {
                validator: (_, value) => {
                  const parsedValue = parseFloat(value);
                  if (isNaN(parsedValue) || parsedValue <= 0) {
                    return Promise.reject(new Error('Amount must be greater than zero!'));
                  }
                  if (parsedValue > currentBalance) {
                    return Promise.reject(new Error(`Insufficient balance! Max: ${currentBalance.toFixed(8)}`));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input
              type="number"
              placeholder="Enter bet amount"
              step="0.000001" // Allow for small crypto amounts
              size="large"
              onChange={e => setBetAmount(e.target.value)}
              disabled={flipping}
            />
          </Form.Item>

          <Form.Item label="Your Choice">
            <Space className="choice-buttons-container" direction="horizontal" size="large">
              <Button
                type={userChoice === 'heads' ? 'primary' : 'default'}
                size="large"
                onClick={() => setUserChoice('heads')}
                disabled={flipping}
                style={{ backgroundColor: userChoice === 'heads' ? 'purple' : '', borderColor: userChoice === 'heads' ? 'purple' : '' }}
              >
                <RiseOutlined /> Heads
              </Button>
              <Button
                type={userChoice === 'tails' ? 'primary' : 'default'}
                size="large"
                onClick={() => setUserChoice('tails')}
                disabled={flipping}
                style={{ backgroundColor: userChoice === 'tails' ? 'purple' : '', borderColor: userChoice === 'tails' ? 'purple' : '' }}
              >
                <FallOutlined /> Tails
              </Button>
            </Space>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit" // Set to submit to trigger form validation
              block
              size="large"
              loading={flipping}
              disabled={!userChoice || !betAmount || parseFloat(betAmount) <= 0 || parseFloat(betAmount) > currentBalance}
              style={{ backgroundColor: 'purple', borderColor: 'purple' }}
            >
              {flipping ? <><SyncOutlined spin /> Flipping...</> : 'Flip Coin!'}
            </Button>
          </Form.Item>

          {/* Coin Flip Animation Area and Result */}
          <div className="coin-animation-area">
            {flipping && (
              <div className="coin-placeholder flipping">
                <Text>...</Text>
              </div>
            )}
            {!flipping && gameResult && (
              <div className={`coin-result ${gameResult}`}>
                <Text strong style={{ fontSize: '2em', textTransform: 'uppercase' }}>{gameResult}!</Text>
                {/* You could add a small image icon here for heads/tails */}
              </div>
            )}
            {!flipping && !gameResult && (
                <div className="coin-placeholder">
                    <Text type="secondary">Choose a side & bet to flip!</Text>
                </div>
            )}
          </div>

          <div className="game-info">
            <Text type="secondary" style={{ fontSize: '0.85em' }}>
              **Rules:** Choose Heads or Tails, enter your bet. If you guess correctly, you win your bet multiplied by {winMultiplier.toFixed(2)}. This game has a small house edge.
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default HeadsOrTails;