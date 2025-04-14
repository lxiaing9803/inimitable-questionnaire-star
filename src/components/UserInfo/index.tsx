import { LOGIN_PATHNAME } from '@/constants';
import { UserInfoType } from '@/types/user';
import { Link, useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import { UserOutlined } from '@ant-design/icons';
import { Button, message, Modal, Space } from 'antd';
import { useRequest } from 'ahooks';
import { getUserInfo } from '@/apis/user';
import { removeToken } from '@/utils/user';

const UserComponent = (props: UserInfoType) => {
  const { nickname } = props;

  const navigate = useNavigate();

  const logout = () => {
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
          },
        });
      },
    });
  };

  return (
    <Space>
      <span className={styles.nickname}>
        <UserOutlined /> {nickname}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </Space>
  );
};

const UserInfo = () => {
  const { data } = useRequest(getUserInfo);

  return (
    <>{data?.username ? <UserComponent {...data} /> : <Link to={LOGIN_PATHNAME}>登录</Link>}</>
  );
};

export default UserInfo;
