import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, notification } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import axios from 'axios'; 
import '../../styles/login.css'; // Reusing your existing styles (ensure this path is correct)

const { Title } = Typography;

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_BASE_URL = "https://my-new-site-ai-gemgaming-backend.vercel.app/api"; // Adjust if different

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/forgotpassword`, {
        email: values.email, // Axios automatically stringifies the body
      });

      const { data } = response;

      // Axios typically throws an error for non-2xx status codes,
      // so if we reach here, it's a 2xx success response.
      notification.success({
        message: 'Password Reset Request Sent',
        description: data.message || `If an account exists for ${values.email}, you will receive a password reset email shortly.`,
        placement: 'topRight',
        duration: 8,
      });
      navigate('/reset-password'); // Redirect to login page after sending email
    } catch (error) {
      // Axios error handling is different:
      // error.response exists for server responses (4xx, 5xx)
      // error.request exists if no response was received (e.g., network error)
      // error.message for general errors
      console.error('Error during password reset request:', error);

      let errorMessage = 'Something went wrong. Please try again.';
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorMessage = error.response.data.message || error.response.statusText || errorMessage;
        console.error('Server error data:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = 'No response from server. Please check your internet connection.';
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = error.message || errorMessage;
        console.error('Axios setup error:', error.message);
      }

      notification.error({
        message: 'Password Reset Request Failed',
        description: errorMessage,
        placement: 'topRight',
        duration: 5,
      });
    } finally {
      setLoading(false); // Always set loading to false
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Validation Failed:', errorInfo);
    notification.error({
      message: 'Validation Error',
      description: 'Please correct the highlighted fields.',
      placement: 'topRight',
    });
  };

  return (
    <div className="login-page-container"> {/* Ensure this class exists in your CSS */}
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