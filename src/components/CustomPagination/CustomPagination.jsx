import React from 'react';
import { Pagination } from 'antd';
function CustomPagination({ onPaginationChange, totalPages, page }) {
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
export default CustomPagination;
