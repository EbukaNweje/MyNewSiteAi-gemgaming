// src/pages/ForgotPasswordPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, notification } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import '../../styles/login.css'; // Reusing your existing styles

const { Title } = Typography;

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);

    // Simulate API call to send reset email/code
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay

    setLoading(false);

    // Mock Backend Logic:
    // In a real app, you'd send a request to your backend with values.email.
    // The backend would then send a password reset link/code to that email.
    if (values.email) {
      notification.success({
        message: 'Password Reset Email Sent',
        description: `If an account exists for ${values.email}, you will receive a password reset email shortly.`,
        placement: 'topRight',
        duration: 8, // Keep message on screen longer for user to read
      });
      navigate('/reset-password'); // Redirect to login page after sending email
    } else {
      notification.error({
        message: 'Request Failed',
        description: 'Something went wrong. Please try again.',
        placement: 'topRight',
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    notification.error({
      message: 'Validation Error',
      description: 'Please correct the highlighted fields.',
      placement: 'topRight',
    });
  };

  return (
    <div className="login-page-container">
      <Card
        className="login-card"
        title={<Title level={3} style={{ textAlign: 'center', margin: 0, color: '#38b000' }}>Forgot Your Password?</Title>}
      >
        <p style={{ textAlign: 'center', marginBottom: '20px', color: '#555' }}>
          Enter your email address below and we'll send you a link to reset your password.
        </p>
        <Form
          name="forgot_password_form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          {/* Email Field */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { type: 'email', message: 'Please enter a valid E-mail!' },
              { required: true, message: 'Please input your E-mail!' },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Your registered email address"
              size="large"
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
              style={{ backgroundColor: '#38b000', borderColor: '#38b000' }}
            >
              {loading ? 'Sending Request...' : 'Send Reset Link'}
            </Button>
          </Form.Item>

          {/* Back to Login Link */}
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <a href="/login" style={{ color: '#38b000' }}>Back to Login</a>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPassword;