import { FormOutlined } from '@ant-design/icons';
import { Space, Typography } from 'antd';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const Logo = () => {
  return (
    <div className={styles.logo}>
      <Link to="/">
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>问卷系统</Title>
        </Space>
      </Link>
    </div>
  );
};

export default Logo;
