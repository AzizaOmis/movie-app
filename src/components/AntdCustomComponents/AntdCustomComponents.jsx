import React from 'react';
import { Alert, Pagination, Rate, Space, Spin, Tabs } from 'antd';

import './AntdCustomComponents.css';

function MyAlert({ message, description, type }) {
  return (
    <Space>
      <Alert className="movies_alert" message={message} description={description} type={type} showIcon />
    </Space>
  );
}
function MyError({ helloMessage, notFound, serverErr, noConnection, noData }) {
  let message;
  let description;
  let type;
  if (notFound) {
    message = 'Not Found :(';
    description = "Sorry, we didn't find a movie with that title";
    type = 'warning';
  }
  if (helloMessage) {
    message = 'Hello!';
    description = 'Please enter the name of the movie and we will find it for you :)';
    type = 'success';
  }
  if (serverErr) {
    message = 'Server Error';
    description = 'A server error occurred while loading data. Please try again later.';
    type = 'error';
  }
  if (noConnection) {
    message = 'Network Error';
    description =
      'Something is temporarily wrong with your network connection. Make sure you are connected to the Internet and then restart your browser.';
    type = 'error';
  }
  if (noData) {
    message = "It's empty here";
    description = "You haven't rated any movies yet";
    type = 'warning';
  }
  return <MyAlert message={message} description={description} type={type} />;
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
export { MyError, MyPagination, MyRate, MySpin, MyTabs };
