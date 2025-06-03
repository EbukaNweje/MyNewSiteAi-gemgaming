// src/pages/DocumentVerificationPage.jsx
import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Upload, notification, Space } from 'antd';
import { UploadOutlined, UserOutlined, FileTextOutlined } from '@ant-design/icons';
import '../styles/login.css'; // Reusing your existing styles for consistent page layout

const { Title, Text } = Typography;

const DocumentVerificationPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // State for uploaded files
  const [frontDocumentList, setFrontDocumentList] = useState([]);
  const [backDocumentList, setBackDocumentList] = useState([]);

  // --- Props for Ant Design Upload component ---
  const uploadProps = (fileListState, setFileListState) => ({
    onRemove: (file) => {
      const index = fileListState.indexOf(file);
      const newFileList = fileListState.slice();
      newFileList.splice(index, 1);
      setFileListState(newFileList);
    },
    beforeUpload: (file) => {
      // Prevent upload immediately, just store the file in state
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        notification.error({
          message: 'Invalid File Type',
          description: 'You can only upload JPG/PNG file!',
          placement: 'topRight',
        });
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        notification.error({
          message: 'File Too Large',
          description: 'Image must be smaller than 2MB!',
          placement: 'topRight',
        });
      }
      if (isJpgOrPng && isLt2M) {
        setFileListState([file]); // Only allow one file
      }
      return false; // Prevent default upload behavior
    },
    fileList: fileListState,
    maxCount: 1, // Allow only one file
    accept: 'image/jpeg,image/png', // Only accept JPG/PNG
  });


  const onFinish = async (values) => {
    // Basic validation for file uploads (since Ant Design Form.Item doesn't directly validate Upload component's state well)
    if (frontDocumentList.length === 0) {
      notification.error({
        message: 'Missing Document',
        description: 'Please upload the Front Document.',
        placement: 'topRight',
      });
      return;
    }
    if (backDocumentList.length === 0) {
      notification.error({
        message: 'Missing Document',
        description: 'Please upload the Back Document.',
        placement: 'topRight',
      });
      return;
    }

    setLoading(true);

    const { fullname, documentType } = values;

    // In a real application, you would create FormData and send it to your backend
    // const formData = new FormData();
    // formData.append('fullname', fullname);
    // formData.append('documentType', documentType);
    // formData.append('frontDocument', frontDocumentList[0]);
    // formData.append('backDocument', backDocumentList[0]);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2500));

    setLoading(false);

    // Mock success/failure based on some condition
    if (fullname.toLowerCase().includes('fail')) { // Example: if fullname contains 'fail'
      notification.error({
        message: 'Document Upload Failed',
        description: 'There was an issue processing your documents. Please check the file types and try again.',
        placement: 'topRight',
        duration: 0,
      });
    } else {
      notification.success({
        message: 'Documents Uploaded Successfully!',
        description: 'Your documents have been submitted for review. You will be notified via email once verification is complete (within 5-20 minutes).',
        placement: 'topRight',
        duration: 8, // Longer duration for important message
      });
      form.resetFields(); // Clear form fields
      setFrontDocumentList([]); // Clear uploaded files
      setBackDocumentList([]);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    notification.error({
      message: 'Form Validation Error',
      description: 'Please fill in all required fields.',
      placement: 'topRight',
    });
  };

  return (
    <div className="login-page-container">
      <Card
        className="login-card" // Reusing card styling
        title={<Title level={3} style={{ textAlign: 'center', margin: 0, color: '#38b000' }}>VERIFY ACCOUNT</Title>}
        bordered={false}
        style={{ padding: '20px', maxWidth: 700 }} // Adjust max width and padding
      >
        <Text type="secondary" style={{ display: 'block', marginBottom: '20px', lineHeight: '1.6' }}>
          Verify your account by providing us with a valid document (ID card), Drivers Licence, Valid Work ID Card, Passport, etc. are accepted. Please do not try to upload a fake document as our support teams reviews every document uploaded. Detected fake documents will lead to immediate suspension of account! Once uploaded, our support team reviews your document and gets back to you within 5 to 20 minutes. The uploaded documents are for verification purposes only and are deleted once confirmed. You will be notified via email once your document has been verified. Choose your document and click on the verify button.
        </Text>

        <Form
          form={form}
          name="document_verification"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          scrollToFirstError
        >
          {/* Fullname Input */}
          <Form.Item
            label="Fullname:"
            name="fullname"
            rules={[{ required: true, message: 'Please input your Fullname!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="E.g. John Doe"
              size="large"
            />
          </Form.Item>

          {/* Document Type Input */}
          <Form.Item
            label="Document Type: E.g Drivers License, Passport etc"
            name="documentType"
            rules={[{ required: true, message: 'Please enter document type!' }]}
          >
            <Input
              prefix={<FileTextOutlined className="site-form-item-icon" />}
              placeholder="Please enter document type"
              size="large"
            />
          </Form.Item>

          {/* Front Document Upload */}
          <Form.Item
            label="Front Document:"
            name="frontDocument" // Name for form item, but file data handled by state
            valuePropName="fileList" // Important for Ant Design Upload
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }}
            rules={[{ required: true, message: 'Please upload the front document!' }]}
          >
            <Upload {...uploadProps(frontDocumentList, setFrontDocumentList)}>
              <Button icon={<UploadOutlined />} size="large">Choose File</Button>
            </Upload>
          </Form.Item>

          {/* Back Document Upload */}
          <Form.Item
            label="Back Document:"
            name="backDocument" // Name for form item
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }}
            rules={[{ required: true, message: 'Please upload the back document!' }]}
          >
            <Upload {...uploadProps(backDocumentList, setBackDocumentList)}>
              <Button icon={<UploadOutlined />} size="large">Choose File</Button>
            </Upload>
          </Form.Item>

          {/* Verify Account Button */}
          <Form.Item style={{ marginTop: '20px' }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
              style={{ backgroundColor: 'purple', borderColor: 'purple' }}
            >
              Verify Account
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default DocumentVerificationPage;