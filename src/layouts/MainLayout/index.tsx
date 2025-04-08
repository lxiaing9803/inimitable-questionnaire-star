import { Layout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import styles from './index.module.scss';
import Logo from '@/components/Logo';
import UserInfo from '@/components/UserInfo';
import { PAGE_TITLE_MAP } from '@/constants';
import { useMemo, useEffect } from 'react';
import { PageTitleKeyType } from '@/types';

const { Header, Content, Footer } = Layout;

const MainLayout = () => {
  const { pathname } = useLocation();

  const title = useMemo(() => {
    return PAGE_TITLE_MAP[pathname as PageTitleKeyType] || '问卷系统';
  }, [pathname]);

  useEffect(() => {
    document.title = title;
  }, [title]);
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      <Content className={styles.main}>
        <Outlet />
      </Content>
      <Footer className={styles.footer}>问卷系统 ©2025 - present. Created by AshinLX</Footer>
    </Layout>
  );
};
export default MainLayout;
