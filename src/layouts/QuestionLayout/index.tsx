import { Outlet } from 'react-router-dom';

const QuestionLayout = () => {
  return (
    <>
      <div>QuestionLayout Header</div>
      <div>
        <Outlet />
      </div>
      <div>QuestionLayout Footer</div>
    </>
  );
};
export default QuestionLayout;
