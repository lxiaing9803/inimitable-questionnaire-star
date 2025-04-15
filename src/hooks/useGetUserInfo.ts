import { useAppSelector } from '@/utils/hook';

const useGetUserInfo = () => {
  const { username, nickname } = useAppSelector((state) => state.userReducer);

  return {
    username,
    nickname,
  };
};

export default useGetUserInfo;
