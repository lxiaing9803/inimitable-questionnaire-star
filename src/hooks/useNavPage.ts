import { useEffect } from 'react';
import useGetUserInfo from './useGetUserInfo';
import { useLocation, useNavigate } from 'react-router-dom';
import { IsLoginOrRegister, WithoutUserInfo } from '@/utils';
import { LOGIN_PATHNAME, MANAGE_INDEX_PATHNAME } from '@/constants';

const useNavPage = (isWaitingUserInfo: boolean) => {
  const { username } = useGetUserInfo();

  const { pathname } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isWaitingUserInfo) return;
    if (username) {
      if (IsLoginOrRegister(pathname)) {
        navigate(MANAGE_INDEX_PATHNAME);
      }
      return;
    }
    if (!WithoutUserInfo(pathname)) {
      navigate(LOGIN_PATHNAME);
    }
  }, [isWaitingUserInfo, navigate, pathname, username]);
};

export default useNavPage;
