// src/pages/SignUpPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, notification } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import '../../styles/login.css';

const { Title } = Typography;

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);

    if (values.email && values.password) {
      notification.success({
        message: 'Registration Successful',
        description: 'Your account has been created! Please check your email to verify your account and then log in.',
        placement: 'topRight',
        duration: 8,
      });
      navigate('/login'); 
    } else {
      notification.error({
        message: 'Registration Failed',
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
        title={<Title level={3} style={{ textAlign: 'center', margin: 0, color: '#38b000' }}>Create Your Account</Title>}
      >
        <Form
          form={form}
          name="register_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          scrollToFirstError
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: 'Please input your Username!' },
              { min: 3, message: 'Username must be at least 3 characters!' },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Choose a username"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { type: 'email', message: 'The input is not a valid E-mail!' },
              { required: true, message: 'Please input your E-mail!' },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Enter your email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your Password!' },
              { min: 6, message: 'Password must be at least 6 characters long!' },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Create a password"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your Password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Confirm your password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
              style={{ backgroundColor: '#38b000', borderColor: '#38b000' }}
            >
              {loading ? 'Registering...' : 'Sign Up'}
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            Already have an account? <a href="/login" style={{ color: '#38b000' }}>Log in now!</a>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Signup;