import { Flex, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import React from 'react'

const Loader = () => {
  return (
    <Flex aligns="center" justify='center'>
    <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
  </Flex>
  )
}

export default Loader