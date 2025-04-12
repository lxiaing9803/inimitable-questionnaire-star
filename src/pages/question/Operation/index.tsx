import useLoadQuestionDetail from '@/hooks/useLoadQuestionDetail';

const Operation = () => {
  const { loading, questionData } = useLoadQuestionDetail();

  return (
    <div>
      Operation
      {loading ? <p>loading...</p> : JSON.stringify(questionData)}
    </div>
  );
};

export default Operation;
