// src/pages/ResetPasswordPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, notification } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import '../styles/login.css';

const { Title } = Typography;

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  // --- Initial Check for Token (shows error notification if missing) ---
//   useEffect(() => {
//     if (!token) {
//       notification.error({
//         message: 'Invalid Link',
//         description: 'Password reset token is missing. Please request a new link.',
//         placement: 'topRight',
//         duration: 0 
//       });
//     }
//   }, [token, navigate]);

  const onFinish = async (values) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);

    // --- Corrected Mock Backend Logic ---
    // Simulates success if token exists AND new password isn't 'failtest'
    if (values.newPassword !== 'failtest') {
      notification.success({
        message: 'Password Reset Successful',
        description: 'Your password has been updated! You will be redirected to the login page.',
        placement: 'topRight',
      });
      setTimeout(() => navigate('/login'), 2000);
    } else {
      let errorMessage = 'Could not reset password. Please try again or request a new link.';
      if (!token) {
          errorMessage = 'Password reset token is missing or expired. Please request a new link.';
      }
      notification.error({
        message: 'Password Reset Failed',
        description: errorMessage,
        placement: 'topRight',
        duration: 0
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Form validation failed:', errorInfo);
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
        title={<Title level={3} style={{ textAlign: 'center', margin: 0, color: '#38b000' }}>Set New Password</Title>}
      >
        <p style={{ textAlign: 'center', marginBottom: '20px', color: '#555' }}>
          Enter your new password below.
        </p>
        <Form
          form={form}
          name="reset_password_form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          scrollToFirstError
        >
          {/* New Password Field */}
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: 'Please input your new Password!' },
              { min: 6, message: 'Password must be at least 6 characters long!' },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Enter your new password"
              size="large"
            />
          </Form.Item>

          {/* Confirm New Password Field */}
          <Form.Item
            label="Confirm New Password"
            name="confirmNewPassword"
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your new Password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Confirm your new password"
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
              {loading ? 'Resetting Password...' : 'Reset Password'}
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

export default ResetPassword;