import React from 'react';
import { Space, Spin } from 'antd';

function CustomSpin() {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Spin size="large" />
    </Space>
  );
}

export default CustomSpin;
