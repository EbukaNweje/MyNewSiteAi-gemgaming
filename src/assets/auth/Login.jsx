import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "../../styles/login.css";

const { Title } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);

    if (values.username && values.password) {
      notification.success({
        message: 'Login Successful',
        description: 'Welcome back! Redirecting to dashboard...',
        placement: 'topRight',
      });
      navigate('/dashboard');
    } else {
      notification.error({
        message: 'Login Failed',
        description: 'Please ensure both username/email and password are entered.',
        placement: 'topRight',
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
        title={<Title level={3} style={{ textAlign: 'center', margin: 0, color: '#38b000' }}>Login to Your Account</Title>}
      >
        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            label="Username or Email"
            name="username"
            rules={[
              { required: true, message: 'Please input your Username or Email!' },
              { type: 'email', message: 'Please enter a valid email address!' },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Enter your username or email"
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
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Enter your password"
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
              {loading ? 'Logging In...' : 'Log In'}
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <Link to="/forgot-password" className="login-form-forgot" style={{ color: '#38b000' }}>
              Forgot password?
            </Link>
            <span style={{ margin: '0 8px' }}>|</span>
            <Link to="/signup">Register now!</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;