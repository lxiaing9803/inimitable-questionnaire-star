import { useAppSelector } from '@/utils/hook';

const useGetUserInfo = () => {
  const { username, nickname, token } = useAppSelector((state) => state.userReducer);

  return {
    username,
    nickname,
    token,
  };
};

export default useGetUserInfo;
