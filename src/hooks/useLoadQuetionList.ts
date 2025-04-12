import { getQuestionList } from '@/apis/question';
import useRequest from './useRequest';
import { QuestionnaireRequestParams } from '@/types/question';

const useLoadQuestionList = (params: Partial<QuestionnaireRequestParams> = {}) => {
  const { loading, data } = useRequest(() => getQuestionList(params));

  return {
    loading,
    data,
  };
};

export default useLoadQuestionList;
