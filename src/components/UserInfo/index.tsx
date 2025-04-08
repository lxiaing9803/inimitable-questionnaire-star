import { LOGIN_PATHNAME } from '@/constants';
import { Link } from 'react-router-dom';

const UserInfo = () => {
  return (
    <>
      <Link to={LOGIN_PATHNAME}>登录</Link>
    </>
  );
};

export default UserInfo;
