import { Button, Space, Typography } from 'antd';
import styles from './index.module.scss';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ToolBar from '../ToolBar';

const { Title } = Typography;

const ToolHeader = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => navigate(-1)}>
              返回
            </Button>
            <Title>问卷标题</Title>
          </Space>
        </div>
        <div className={styles.main}>
          <ToolBar />
        </div>
        <div className={styles.right}>
          <Space>
            <Button>保存</Button>
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default ToolHeader;
