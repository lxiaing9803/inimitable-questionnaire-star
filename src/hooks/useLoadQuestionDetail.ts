import { getQuestionDetail } from '@/apis/question';
import { useParams } from 'react-router-dom';
import useRequest from './useRequest';

const useLoadQuestionDetail = () => {
  const { id = '' } = useParams();

  const { loading, data } = useRequest(() => getQuestionDetail(id));

  return {
    loading,
    questionData: data,
  };
};

export default useLoadQuestionDetail;
