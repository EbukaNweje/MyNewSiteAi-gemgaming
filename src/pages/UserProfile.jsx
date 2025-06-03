import React from 'react';
import { Avatar, Card, Col, Row, Typography, Tag, Descriptions } from 'antd';
import { UserOutlined, CheckCircleOutlined } from '@ant-design/icons';
import '../styles/userProfile.css'; 

const { Title, Text } = Typography;

const user = {
  fullName: 'Jane Mike',
  email: 'jane.mike@example.com',
  country: 'Nigeria',
  phone: '+234 700 123 4567',
  registrationDate: '2025-02-20',
  accountStatus: 'Verified',
  accountType: 'Personal',
};

const statusColors = {
  Verified: 'green',
  Unverified: 'red',
  Pending: 'orange',
};

const UserProfile = () => {
  return (
    <div className="profile-layout">
      <Card className="profile-card" bordered={false}>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <div className="profile-avatar-container">
              <Avatar size={120} icon={<UserOutlined />} />
              <Title level={4} style={{ marginTop: 16 }}>{user.fullName}</Title>
              <Text type="secondary">{user.email}</Text>
              <div style={{ marginTop: 8 }}>
                <Tag color={statusColors[user.accountStatus]}>
                  <CheckCircleOutlined /> {user.accountStatus}
                </Tag>
              </div>
            </div>
          </Col>

          <Col xs={24} md={16}>
            <Descriptions
              title="Account Information"
              column={1}
              bordered
              size="middle"
            >
              <Descriptions.Item label="Country">{user.country}</Descriptions.Item>
              <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
              <Descriptions.Item label="Registration Date">{user.registrationDate}</Descriptions.Item>
              <Descriptions.Item label="Account Type">{user.accountType}</Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default UserProfile;