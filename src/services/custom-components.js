import React from 'react';
import { Space, Alert, Spin, Pagination, Rate, Tabs } from 'antd';

import './custom-components.css';

function MyAlert({ message, description, type }) {
  return (
    <Space>
      <Alert className="movies_alert" message={message} description={description} type={type} showIcon />
    </Space>
  );
}
function MyPagination({ onPaginationChange, totalPages, page }) {
  return (
    <Pagination
      className="movies_pagination"
      onChange={(page) => onPaginationChange(page)}
      total={totalPages * 10}
      pageSize={10}
      current={page}
    />
  );
}
function MySpin() {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Spin size="large" />
    </Space>
  );
}
function MyRate({ value, onRateChange }) {
  return (
    <Rate value={value} count={10} onChange={(value) => onRateChange(value)} allowHalf={true} className="movie__rate" />
  );
}
function MyTabs({ activeKey, onTabsChange }) {
  const names = {
    search: 'Search',
    rated: 'Rated',
  };
  const items = [
    {
      key: names.search,
      label: <p className="movies__tab">{names.search}</p>,
    },
    {
      key: names.rated,
      label: <p className="movies__tab">{names.rated}</p>,
    },
  ];
  return <Tabs activeKey={activeKey} centered items={items} onChange={(activeKey) => onTabsChange(activeKey)} />;
}
export { MyAlert, MyPagination, MySpin, MyRate, MyTabs };
