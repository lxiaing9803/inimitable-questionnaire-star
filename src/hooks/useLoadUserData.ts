import { useEffect, useState } from 'react';
import useGetUserInfo from './useGetUserInfo';
import { useRequest } from 'ahooks';
import { getUserInfo } from '@/apis/user';
import { useAppDispatch } from '@/utils/hook';
import { loginReducer } from '@/store/userReducer';
import { getToken } from '@/utils/user';

const useLoadUserData = () => {
  const [isWaitingUserInfo, setIsWaitingUserInfo] = useState<boolean>(true);

  const { username } = useGetUserInfo();

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
      const token = getToken();
      if (token) {
        run();
      } else {
        setIsWaitingUserInfo(false);
      }
    }
  }, [run, username]);

  return {
    isWaitingUserInfo,
  };
};

export default useLoadUserData;
