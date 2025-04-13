import { getQuestionDetail } from '@/apis/question';
import { useRequest } from 'ahooks';
import { useParams } from 'react-router-dom';

const useLoadQuestionDetail = () => {
  const { id = '' } = useParams();

  const { loading, data } = useRequest(() => getQuestionDetail(id));

  return {
    loading,
    questionData: data,
  };
};

export default useLoadQuestionDetail;
