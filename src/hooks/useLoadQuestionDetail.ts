import { getQuestionDetail } from '@/apis/question';
import { resetComponents } from '@/store/questionComponentsReducer';
import { resetPageSetting } from '@/store/questionPageSetting';
import { useAppDispatch } from '@/utils/hook';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const useLoadQuestionDetail = () => {
  const { id = '' } = useParams();

  const dispatch = useAppDispatch();

  const { loading, data, error, run } = useRequest(
    async (id: string) => {
      if (!id) {
        message.error('问卷id不存在');
        throw new Error('问卷id不存在');
      }
      const res = await getQuestionDetail(id);
      return res;
    },
    {
      manual: true,
    }
  );

  useEffect(() => {
    run(id);
  }, [id, run]);
  // 根据获取的data设置questionComponentsReducer
  useEffect(() => {
    if (!data) return;
    const { title, componentList, desc = '', css = '', js = '', isPublished } = data;

    dispatch(
      resetComponents({
        componentList,
        selectedId: componentList?.[0]?.fe_id ?? '',
        copiedComponent: null,
      })
    );

    dispatch(resetPageSetting({ title, desc, css, js, isPublished }));
  }, [data, dispatch]);

  return {
    loading,
    error,
    data,
  };
};

export default useLoadQuestionDetail;
