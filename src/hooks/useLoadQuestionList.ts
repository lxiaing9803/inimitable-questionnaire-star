import { getQuestionList } from '@/apis/question';
import { useRequest } from 'ahooks';
import { QuestionRequestParams } from '@/types/question';
import { useSearchParams } from 'react-router-dom';

const useLoadQuestionList = (params: Partial<QuestionRequestParams> = {}) => {
  const { isDeleted, isStar } = params;

  const [searchParams] = useSearchParams();

  const { loading, data, run, refresh } = useRequest(
    async () => {
      const keyword = searchParams.get('keyword') || '';
      const pageSize = parseInt(searchParams.get('pageSize') || '10');
      const data = await getQuestionList({ keyword, isDeleted, isStar, pageSize });
      return data;
    },
    {
      refreshDeps: [searchParams],
    }
  );

  return {
    loading,
    list: data?.list || [],
    total: data?.total || 0,
    run,
    refresh,
  };
};

export default useLoadQuestionList;
