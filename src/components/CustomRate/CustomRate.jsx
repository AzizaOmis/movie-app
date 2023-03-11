import React from 'react';
import { Rate } from 'antd';
function CustomRate({ value, onRateChange }) {
  return (
    <Rate value={value} count={10} onChange={(value) => onRateChange(value)} allowHalf={true} className="movie__rate" />
  );
}
export default CustomRate;
