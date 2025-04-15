import { FormOutlined } from '@ant-design/icons';
import { Space, Typography } from 'antd';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import useGetUserInfo from '@/hooks/useGetUserInfo';
import { useMemo } from 'react';
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from '@/constants';

const { Title } = Typography;

const Logo = () => {
  const { username } = useGetUserInfo();

  const pathname = useMemo(() => {
    return username ? MANAGE_INDEX_PATHNAME : HOME_PATHNAME;
  }, [username]);

  return (
    <div className={styles.logo}>
      <Link to={pathname}>
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
