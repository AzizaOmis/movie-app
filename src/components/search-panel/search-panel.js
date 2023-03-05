import React from 'react';
import './search-panel.css';
import _debounce from 'lodash/debounce';

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
