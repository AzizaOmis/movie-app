import React from 'react';
import { Tabs } from 'antd';
function CustomTabs({ activeKey, onTabsChange }) {
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
export default CustomTabs;
