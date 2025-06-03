// src/pages/SettingsPage.jsx
import React, { useState } from 'react';
import {
  Card,
  Tabs,
  Typography,
  Form,
  Input,
  Button,
  Switch,
  Space,
  notification,
  Divider,
} from 'antd';
import {
  UserOutlined,
  LockOutlined,
  BellOutlined,
  VerifiedOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../styles/settings.css'; // This CSS file will be updated below

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const Settings = () => {
  const [profileForm] = Form.useForm();
  const [securityForm] = Form.useForm();

  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '+1234567890',
    verificationStatus: 'Pending', // Could be 'Verified', 'Pending', 'Rejected'
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    emailWithdrawals: true,
    emailDeposits: true,
    smsAlerts: false,
    newsletters: true,
  });

  const [loading, setLoading] = useState(false);

  // --- Handlers remain the same ---
  const handleProfileUpdate = async (values) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setUserProfile({ ...userProfile, ...values });
    setLoading(false);
    notification.success({
      message: 'Profile Updated',
      description: 'Your profile information has been successfully updated.',
      placement: 'topRight',
    });
  };

  const handlePasswordChange = async (values) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    notification.success({
      message: 'Password Changed',
      description: 'Your password has been successfully updated.',
      placement: 'topRight',
    });
    securityForm.resetFields();
  };

  const handleTwoFactorToggle = async (checked) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setTwoFactorEnabled(checked);
    setLoading(false);
    notification.success({
      message: checked ? '2FA Enabled' : '2FA Disabled',
      description: `Two-Factor Authentication has been successfully ${checked ? 'enabled' : 'disabled'}.`,
      placement: 'topRight',
    });
  };

  const handleNotificationToggle = (key) => (checked) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: checked,
    }));
    notification.success({
      message: 'Notification Preference Updated',
      description: 'Your notification settings have been saved.',
      placement: 'topRight',
    });
  };

  const goToVerification = () => {
    navigate('/verify-Account');
  };

  return (
    <div className="settings-page-container">
      <Card className="settings-main-card">
        {' '}
        {/* Main card for the entire settings content */}
        <Title level={2} className="settings-page-title">
          Settings
        </Title>
        <Tabs defaultActiveKey="1" tabPosition="top" className="settings-tabs">
          {' '}
          {/* Tabs at the top */}
          {/* --- Tab 1: Account Information --- */}
          <TabPane tab={<span><UserOutlined /> Account</span>} key="1">
            <Card
              className="settings-section-card"
              title={
                <Title level={5} style={{ color: '#38b000', margin: 0 }}>
                  Personal Information
                </Title>
              }
            >
              <Text type="secondary" style={{ display: 'block', marginBottom: '20px' }}>
                Update your personal details.
              </Text>
              <Form
                form={profileForm}
                layout="vertical"
                name="profile_settings"
                initialValues={userProfile}
                onFinish={handleProfileUpdate}
              >
                <Form.Item label="First Name" name="firstName">
                  <Input size="large" />
                </Form.Item>
                <Form.Item label="Last Name" name="lastName">
                  <Input size="large" />
                </Form.Item>
                <Form.Item label="Email Address" name="email">
                  <Input size="large" type="email" disabled />
                </Form.Item>
                <Form.Item label="Phone Number" name="phoneNumber">
                  <Input size="large" />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    style={{ backgroundColor: '#38b000', borderColor: 'purple' }}
                  >
                    Save Changes
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </TabPane>
          {/* --- Tab 2: Security --- */}
          <TabPane tab={<span><LockOutlined /> Security</span>} key="2">
            <Card
              className="settings-section-card"
              title={
                <Title level={5} style={{ color: '#38b000', margin: 0 }}>
                  Change Password
                </Title>
              }
            >
              <Text type="secondary" style={{ display: 'block', marginBottom: '20px' }}>
                Create a strong password for your account.
              </Text>
              <Form
                form={securityForm}
                layout="vertical"
                name="password_change"
                onFinish={handlePasswordChange}
              >
                <Form.Item
                  label="Current Password"
                  name="currentPassword"
                  rules={[{ required: true, message: 'Please enter your current password!' }]}
                >
                  <Input.Password size="large" />
                </Form.Item>
                <Form.Item
                  label="New Password"
                  name="newPassword"
                  rules={[
                    { required: true, message: 'Please enter your new password!' },
                    { min: 8, message: 'Password must be at least 8 characters!' },
                  ]}
                >
                  <Input.Password size="large" />
                </Form.Item>
                <Form.Item
                  label="Confirm New Password"
                  name="confirmNewPassword"
                  dependencies={['newPassword']}
                  hasFeedback
                  rules={[
                    { required: true, message: 'Please confirm your new password!' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('newPassword') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error('The two passwords that you entered do not match!')
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password size="large" />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    style={{ backgroundColor: '#38b000', borderColor: '#38b000' }}
                  >
                    Change Password
                  </Button>
                </Form.Item>
              </Form>
            </Card>
            <Card
              className="settings-section-card"
              title={
                <Title level={5} style={{ color: '#38b000', margin: 0 }}>
                  Two-Factor Authentication (2FA)
                </Title>
              }
            >
              <Text type="secondary" style={{ display: 'block', marginBottom: '20px' }}>
                Enable 2FA for enhanced account security.
              </Text>
              <Space align="center" className="two-factor-switch-container">
                <Text strong>Status:</Text>
                <Switch
                  checked={twoFactorEnabled}
                  onChange={handleTwoFactorToggle}
                  loading={loading}
                  checkedChildren="ON"
                  unCheckedChildren="OFF"
                  style={twoFactorEnabled ? { backgroundColor: '#38b000' } : {}}
                />
              </Space>
              <Text type="secondary" style={{ display: 'block', marginTop: '10px' }}>
                Using Google Authenticator or similar app.
              </Text>
            </Card>
          </TabPane>
          {/* --- Tab 3: Notifications --- */}
          <TabPane tab={<span><BellOutlined /> Notifications</span>} key="3">
            <Card
              className="settings-section-card"
              title={
                <Title level={5} style={{ color: '#38b000', margin: 0 }}>
                  Notification Preferences
                </Title>
              }
            >
              <Text type="secondary" style={{ display: 'block', marginBottom: '20px' }}>
                Choose how you receive alerts and updates.
              </Text>
              <Space direction="vertical" style={{ width: '100%' }}>
                <div className="notification-item">
                  <Text>Email: Withdrawal Confirmations</Text>
                  <Switch
                    checked={notificationSettings.emailWithdrawals}
                    onChange={handleNotificationToggle('emailWithdrawals')}
                    style={notificationSettings.emailWithdrawals ? { backgroundColor: '#38b000' } : {}}
                  />
                </div>
                <div className="notification-item">
                  <Text>Email: Deposit Confirmations</Text>
                  <Switch
                    checked={notificationSettings.emailDeposits}
                    onChange={handleNotificationToggle('emailDeposits')}
                    style={notificationSettings.emailDeposits ? { backgroundColor: '#38b000' } : {}}
                  />
                </div>
                <div className="notification-item">
                  <Text>SMS Alerts</Text>
                  <Switch
                    checked={notificationSettings.smsAlerts}
                    onChange={handleNotificationToggle('smsAlerts')}
                    style={notificationSettings.smsAlerts ? { backgroundColor: '#38b000' } : {}}
                  />
                </div>
                <div className="notification-item">
                  <Text>Promotional Emails & Newsletters</Text>
                  <Switch
                    checked={notificationSettings.newsletters}
                    onChange={handleNotificationToggle('newsletters')}
                    style={notificationSettings.newsletters ? { backgroundColor: '#38b000' } : {}}
                  />
                </div>
              </Space>
            </Card>
          </TabPane>
          {/* --- Tab 4: Verification Status --- */}
          <TabPane tab={<span><VerifiedOutlined /> Verification</span>} key="4">
            {' '}
            {/* Corrected key here */}
            <Card
              className="settings-section-card"
              title={
                <Title level={5} style={{ color: '#38b000', margin: 0 }}>
                  Account Verification (KYC)
                </Title>
              }
            >
              <Text type="secondary" style={{ display: 'block', marginBottom: '20px' }}>
                Complete your identity verification to unlock full platform features and higher
                limits.
              </Text>
              <Card
                style={{
                  marginBottom: 20,
                  borderColor:
                    userProfile.verificationStatus === 'Verified'
                      ? '#52c41a'
                      : userProfile.verificationStatus === 'Pending'
                        ? '#faad14'
                        : '#ff4d4f',
                  borderLeftWidth: 5,
                }}
              >
                {' '}
                {/* Added borderLeftWidth for accent */}
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <Text strong>Current Status:</Text>
                  {userProfile.verificationStatus === 'Verified' ? (
                    <Text type="success" className="verification-status-text">
                      <VerifiedOutlined /> Verified
                    </Text>
                  ) : userProfile.verificationStatus === 'Pending' ? (
                    <Text type="warning" className="verification-status-text">
                      <ExclamationCircleOutlined /> Pending Review
                    </Text>
                  ) : userProfile.verificationStatus === 'Rejected' ? (
                    <Text type="danger" className="verification-status-text">
                      <ExclamationCircleOutlined /> Rejected
                    </Text>
                  ) : (
                    <Text type="secondary" className="verification-status-text">
                      Not Submitted
                    </Text>
                  )}
                  {userProfile.verificationStatus !== 'Verified' && (
                    <Text type="secondary" style={{ marginTop: 10 }}>
                      Please submit your documents to verify your account.
                    </Text>
                  )}
                </Space>
              </Card>
              {userProfile.verificationStatus !== 'Verified' && (
                <Button
                  type="primary"
                  onClick={goToVerification}
                  icon={<VerifiedOutlined />}
                  size="large"
                  style={{ backgroundColor: '#38b000', borderColor: '#38b000', marginTop: 10 }}
                >
                  Go to Verification Page
                </Button>
              )}
              {userProfile.verificationStatus === 'Verified' && (
                <Text
                  type="success"
                  style={{ display: 'block', textAlign: 'center', marginTop: 20 }}
                >
                  Your account is fully verified!
                </Text>
              )}
            </Card>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Settings;