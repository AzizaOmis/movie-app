import React from 'react';
import _debounce from 'lodash/debounce';

import './SearchPanel.css';

export default function SearchPanel({ getQueryValue }) {
  const onSearchChange = (e) => {
    getQueryValue(e.target.value);
  };
  return (
    <input
      className="movies__search-panel"
      placeholder="Type to search..."
      autoFocus
      onChange={_debounce(onSearchChange, 2000)}
    ></input>
  );
}
