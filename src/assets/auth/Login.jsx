import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "../../styles/login.css";
import axios from 'axios'; 
import { useDispatch } from 'react-redux';
import { setUserId } from '../../global/UserData';

const { Title } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const API_BASE_URL = 'https://my-new-site-ai-gemgaming-backend.vercel.app/api'; 
  const onFinish = async (values) => {
    setLoading(true);
    
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email: values.userName,
        password: values.password,
      });
      localStorage.setItem('Userid', response.data._id);
      // dispatch(setUserId(response.data._id)); 
      console.log(`Login response:`, response.data._id);
      if (response.status === 200) { 
        notification.success({
          message: 'Login Successful',
          description: 'Welcome back! Redirecting to dashboard...',
          placement: 'topRight',
        });
        navigate('/dashboard');
      } else {
        notification.error({
          message: 'Login Failed',
          description: response.data.message || 'An unexpected error occurred.',
          placement: 'topRight',
        });
      }
    } catch (error) {
      console.error('Login error:', error);

      let errorMessage = 'An error occurred during login. Please try again.';
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);

        if (error.response.status === 401) {
          errorMessage = 'Invalid credentials. Please check your username/email and password.';
        } else if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message; 
        }
      } else if (error.request) {
        console.error('Error request:', error.request);
        errorMessage = 'No response from server. Please check your internet connection.';
      } else {
        console.error('Error message:', error.message);
        errorMessage = 'Error setting up the request.';
      }

      notification.error({
        message: 'Login Failed',
        description: errorMessage,
        placement: 'topRight',
      });
    } finally {
      setLoading(false); 
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
            name="userName"
            rules={[
              { required: true, message: 'Please input your Username or Email!' },
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