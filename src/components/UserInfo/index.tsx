import { LOGIN_PATHNAME } from '@/constants';
import { Link, useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import { UserOutlined } from '@ant-design/icons';
import { Button, message, Modal, Space } from 'antd';
import { removeToken } from '@/utils/user';
import useGetUserInfo from '@/hooks/useGetUserInfo';
import { useAppDispatch } from '@/utils/hook';
import { logoutReducer } from '@/store/userReducer';
import { useCallback } from 'react';

const UserInfo = () => {
  const navigate = useNavigate();

  const { nickname } = useGetUserInfo();

  const dispatch = useAppDispatch();

  const logout = useCallback(() => {
    Modal.confirm({
      title: '退出登录',
      content: '确定要退出登录吗？',
      centered: true,
      onOk: () => {
        message.success({
          content: '退出登录成功',
          duration: 1,
          onClose: () => {
            removeToken();
            navigate(LOGIN_PATHNAME);
            dispatch(logoutReducer());
          },
        });
      },
    });
  }, [dispatch, navigate]);

  return (
    <>
      {nickname ? (
        <Space>
          <span className={styles.nickname}>
            <UserOutlined /> {nickname}
          </span>
          <Button type="link" onClick={logout}>
            退出
          </Button>
        </Space>
      ) : (
        <Link to={LOGIN_PATHNAME}>登录</Link>
      )}
    </>
  );
};

export default UserInfo;
