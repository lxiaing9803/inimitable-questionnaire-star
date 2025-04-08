import { Button, Flex, Typography } from 'antd';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

const { Title, Paragraph } = Typography;

const Home = () => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate('/manage/list');
  }, [navigate]);

  return (
    <div className={styles.home}>
      <Flex vertical justify="center">
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>已累计创建问卷 100 份，发布问卷 90 份，收到答卷 980 份</Paragraph>
        <Flex justify="center">
          <Button type="primary" size="large" onClick={handleClick}>
            开始使用
          </Button>
        </Flex>
      </Flex>
    </div>
  );
};

export default Home;
