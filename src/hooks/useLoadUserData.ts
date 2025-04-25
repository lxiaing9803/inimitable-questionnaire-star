import { useEffect, useState } from 'react';
import useGetUserInfo from './useGetUserInfo';
import { useRequest } from 'ahooks';
import { getUserInfo } from '@/apis/user';
import { useAppDispatch } from '@/utils/hook';
import { loginReducer } from '@/store/userReducer';
import { getToken } from '@/utils/user';

const useLoadUserData = () => {
  const [isWaitingUserInfo, setIsWaitingUserInfo] = useState<boolean>(true);

  const { username, token } = useGetUserInfo();

  const dispatch = useAppDispatch();

  const { run } = useRequest(getUserInfo, {
    manual: true,
    onSuccess: (res) => {
      const { username: resUsername, nickname } = res;
      dispatch(loginReducer({ username: resUsername, nickname }));
    },
    onFinally: () => {
      setIsWaitingUserInfo(false);
    },
  });

  useEffect(() => {
    if (username) {
      setIsWaitingUserInfo(false);
    } else {
      const currentToken = token || getToken();
      if (currentToken) {
        run();
      } else {
        setIsWaitingUserInfo(false);
      }
    }
  }, [run, token, username]);

  return {
    isWaitingUserInfo,
  };
};

export default useLoadUserData;
