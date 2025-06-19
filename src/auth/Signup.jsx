import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, notification } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import '../styles/login.css'; 
import axios from 'axios'; 

const { Title } = Typography;

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm(); 

  const API_BASE_URL = 'https://my-new-site-ai-gemgaming-backend.vercel.app/api'; 

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/register`, { 
        userName: values.userName,
        email: values.email,
        password: values.password,
      });

      if (response.status === 201 || response.status === 200) {
        notification.success({
          message: 'Registration Successful',
          description: 'Your account has been created! Please check your email to verify your account and then log in.',
          placement: 'topRight',
          duration: 8, 
        });
        form.resetFields(); 
        navigate('/login'); 
      } else {
        notification.error({
          message: 'Registration Failed',
          description: response.data.message || 'An unexpected error occurred during registration.',
          placement: 'topRight',
        });
      }
    } catch (error) {
      console.error('Registration error:', error);

      let errorMessage = 'An error occurred during registration. Please try again.';
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);

        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message; 
        } else if (error.response.status === 409) { 
            errorMessage = 'Username or email already exists. Please choose a different one.';
        } else if (error.response.status === 400) {
            errorMessage = 'Invalid input. Please check your details.';
        }
      } else if (error.request) {
        console.error('Error request:', error.request);
        errorMessage = 'No response from server. Please check your internet connection.';
      } else {
        console.error('Error message:', error.message);
        errorMessage = 'Error setting up the request.';
      }

      notification.error({
        message: 'Registration Failed',
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
            name="userName"
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
            Already have an account? <Link to="/login" style={{ color: '#38b000' }}>Log in now!</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Signup;