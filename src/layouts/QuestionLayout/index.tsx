import useLoadUserData from '@/hooks/useLoadUserData';
import useNavPage from '@/hooks/useNavPage';
import { Outlet } from 'react-router-dom';
import styles from './index.module.scss';
import { Spin } from 'antd';

const QuestionLayout = () => {
  const { isWaitingUserInfo } = useLoadUserData();
  useNavPage(isWaitingUserInfo);

  return (
    <div className={styles.layout}>
      {isWaitingUserInfo ? (
        <div className={styles.loading}>
          <Spin />
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};
export default QuestionLayout;
