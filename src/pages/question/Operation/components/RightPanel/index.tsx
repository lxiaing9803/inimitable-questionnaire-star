import { Tabs } from 'antd';
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import { useState } from 'react';
import ComponentProp from '../ComponentProp';
const RightPanel = () => {
  const tabsItems = [
    {
      key: 'prop',
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <ComponentProp />,
    },
    {
      key: 'setting',
      label: (
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
      children: <div>页面设置</div>,
    },
  ];

  const [activeKey, setActiveKey] = useState<string>('prop');

  return <Tabs activeKey={activeKey} items={tabsItems} onChange={setActiveKey} />;
};

export default RightPanel;
