// src/pages/VerifyEmailPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, Spin, Result, Button, notification, Typography } from 'antd';
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import '../../styles/login.css'; // Reusing your existing styles

const { Title } = Typography;

const VerifyEmailPage = () => {
  const [verificationStatus, setVerificationStatus] = useState('loading'); // 'loading', 'success', 'error'
  const [message, setMessage] = useState('Verifying your email...');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token'); // Get the token from the URL query parameter

  useEffect(() => {
    const verifyUserEmail = async () => {
      if (!token) {
        setVerificationStatus('error');
        setMessage('Verification link is missing or invalid.');
        notification.error({
          message: 'Verification Failed',
          description: 'The verification link is incomplete. Please ensure you clicked the full link from your email.',
          placement: 'topRight',
          duration: 0, // Keep this notification on screen indefinitely
        });
        return;
      }

      setVerificationStatus('loading');
      setMessage('Verifying your email. Please wait...');

      // --- Simulate API Call to Backend for Email Verification ---
      // In a real application, you would send this 'token' to your backend:
      // try {
      //   const response = await axios.post('/api/verify-email', { token });
      //   if (response.status === 200) { // Or check response.data.success etc.
      //     setVerificationStatus('success');
      //     setMessage('Your email has been successfully verified!');
      //     notification.success({
      //       message: 'Email Verified',
      //       description: 'You can now log in to your account.',
      //       placement: 'topRight',
      //     });
      //     setTimeout(() => navigate('/login'), 3000); // Redirect to login after 3 seconds
      //   } else {
      //     // Handle specific backend errors (e.g., token expired, token already used)
      //     setVerificationStatus('error');
      //     setMessage(response.data.message || 'Email verification failed. Please try again.');
      //     notification.error({
      //       message: 'Verification Failed',
      //       description: response.data.message || 'An error occurred during verification.',
      //       placement: 'topRight',
      //     });
      //   }
      // } catch (error) {
      //   setVerificationStatus('error');
      //   setMessage(error.response?.data?.message || 'Network error or invalid token.');
      //   notification.error({
      //     message: 'Verification Error',
      //     description: 'Could not connect to the server or token is invalid/expired.',
      //     placement: 'topRight',
      //   });
      // } finally {
      //   // Any cleanup
      // }

      // --- Mock Verification Logic for Demo ---
      await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate API delay

      // Mock success for any token present
      if (token === 'valid_token_example') { // You can make this specific
        setVerificationStatus('success');
        setMessage('Your email has been successfully verified!');
        notification.success({
          message: 'Email Verified',
          description: 'You can now log in to your account.',
          placement: 'topRight',
        });
        setTimeout(() => navigate('/login'), 3000); // Redirect to login after 3 seconds
      } else {
        setVerificationStatus('error');
        setMessage('Email verification failed. The link may be expired or invalid.');
        notification.error({
          message: 'Verification Failed',
          description: 'The verification token is invalid or has expired. Please request a new one.',
          placement: 'topRight',
          duration: 0, // Keep this notification on screen
        });
      }
    };

    verifyUserEmail();
  }, [token, navigate]); // Rerun effect if token or navigate changes

  return (
    <div className="login-page-container">
      <Card className="login-card" style={{ textAlign: 'center' }}>
        <Title level={3} style={{ color: 'purple' }}>Email Verification</Title>
        {verificationStatus === 'loading' && (
          <Spin size="large" tip={message} style={{ marginTop: '50px', marginBottom: '50px' }} />
        )}
        {!verificationStatus === 'success' && (
          <Result
            status="success"
            title={message}
            subTitle="You can now log in to your account."
            extra={[
              <Button type="primary" key="login" onClick={() => navigate('/login')} style={{ backgroundColor: 'purple', borderColor: 'purple' }}>
                Go to Login
              </Button>,
            ]}
          />
        )}
        {!verificationStatus === 'error' && (
          <Result
            status="error"
            title="Verification Failed"
            subTitle={message}
            extra={[
              <Button type="primary" key="login" onClick={() => navigate('/login')} style={{ backgroundColor: 'purple', borderColor: 'purple' }}>
                Go to Login
              </Button>,
              <Button key="resend" onClick={() => {
                // In a real app, you'd send a request to resend the verification email
                notification.info({
                  message: 'Resend Email',
                  description: 'A new verification email has been sent to your registered address.',
                  placement: 'topRight',
                });
              }}>
                Resend Verification Email
              </Button>,
            ]}
          />
        )}
      </Card>
    </div>
  );
};

export default VerifyEmailPage;