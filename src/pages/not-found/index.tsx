import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.notFound}>
      <Result
        status="404"
        title="404"
        subTitle="抱歉，您访问的页面不存在"
        extra={
          <Button type="primary" size="large" onClick={() => navigate('/')}>
            返回首页
          </Button>
        }
      />
    </div>
  );
};
export default NotFound;
