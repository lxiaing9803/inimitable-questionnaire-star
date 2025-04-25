import useLoadUserData from '@/hooks/useLoadUserData';
import useNavPage from '@/hooks/useNavPage';
import { Outlet, useLocation } from 'react-router-dom';
import styles from './index.module.scss';
import { Spin } from 'antd';
import { PAGE_TITLE_MAP } from '@/constants';
import { PageTitleKeyType } from '@/types';
import { useMemo, useEffect } from 'react';

const QuestionLayout = () => {
  const { pathname } = useLocation();

  const { isWaitingUserInfo } = useLoadUserData();
  useNavPage(isWaitingUserInfo);

  const title = useMemo(() => {
    if (pathname.includes('/stat')) {
      return PAGE_TITLE_MAP['/question/stat'];
    }
    if (pathname.includes('/operation')) {
      return PAGE_TITLE_MAP['/question/operation'];
    }
    return PAGE_TITLE_MAP[pathname as PageTitleKeyType] || '问卷系统';
  }, [pathname]);

  useEffect(() => {
    document.title = title;
  }, [title]);

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
