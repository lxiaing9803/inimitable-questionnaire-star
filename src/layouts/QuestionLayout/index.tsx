import useLoadUserData from '@/hooks/useLoadUserData';
import useNavPage from '@/hooks/useNavPage';
import { Outlet } from 'react-router-dom';

const QuestionLayout = () => {
  const { isWaitingUserInfo } = useLoadUserData();
  useNavPage(isWaitingUserInfo);

  return (
    <>
      <div>QuestionLayout Header</div>
      <div>{!isWaitingUserInfo && <Outlet />}</div>
      <div>QuestionLayout Footer</div>
    </>
  );
};
export default QuestionLayout;
