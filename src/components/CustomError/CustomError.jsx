import React from 'react';
import { Alert, Space } from 'antd';

function CustomAlert({ message, description, type }) {
  return (
    <Space>
      <Alert className="movies_alert" message={message} description={description} type={type} showIcon />
    </Space>
  );
}
function CustomError({ helloMessage, notFound, serverErr, noConnection, noData }) {
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
  return <CustomAlert message={message} description={description} type={type} />;
}

export default CustomError;
