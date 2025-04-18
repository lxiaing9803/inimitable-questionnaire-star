import { Tabs } from 'antd';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { useState } from 'react';
import ComponentLib from '../ComponentLib';

const LeftPanel = () => {
  const tabsItems = [
    {
      key: 'componentLib',
      label: (
        <span>
          <AppstoreOutlined />
          组件库
        </span>
      ),
      children: <ComponentLib />,
    },
    {
      key: 'layer',
      label: (
        <span>
          <BarsOutlined />
          图层
        </span>
      ),
      children: <div>图层</div>,
    },
  ];

  const [activeKey, setActiveKey] = useState<string>('componentLib');

  return <Tabs activeKey={activeKey} items={tabsItems} onChange={setActiveKey} />;
};

export default LeftPanel;
