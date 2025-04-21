import { Tabs } from 'antd';
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import ComponentProp from '../ComponentProp';
import PageSetting from '../PageSetting';
import useGetQuestionComponentInfo from '@/hooks/useGetQuestionComponentInfo';
import { QUESTION_RIGHT_PANEL_TAB_KEYS, QuestionRightPanelTabItemType } from '@/types/question';
const RightPanel = () => {
  const tabsItems = [
    {
      key: QUESTION_RIGHT_PANEL_TAB_KEYS.PROP_KEY,
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <ComponentProp />,
    },
    {
      key: QUESTION_RIGHT_PANEL_TAB_KEYS.SETTING_KEY,
      label: (
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
      children: <PageSetting />,
    },
  ];

  const [activeKey, setActiveKey] = useState<QuestionRightPanelTabItemType>(
    QUESTION_RIGHT_PANEL_TAB_KEYS.PROP_KEY
  );
  const { selectedId } = useGetQuestionComponentInfo();

  useEffect(() => {
    if (selectedId) {
      setActiveKey(QUESTION_RIGHT_PANEL_TAB_KEYS.PROP_KEY);
    } else {
      setActiveKey(QUESTION_RIGHT_PANEL_TAB_KEYS.SETTING_KEY);
    }
  }, [selectedId]);

  return (
    <Tabs
      activeKey={activeKey}
      items={tabsItems}
      onChange={(key) => setActiveKey(key as QuestionRightPanelTabItemType)}
    />
  );
};

export default RightPanel;
