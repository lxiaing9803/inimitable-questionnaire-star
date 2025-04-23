import { useAppDispatch } from '@/utils/hook';
import useGetQuestionComponentInfo from './useGetQuestionComponentInfo';
import { moveComponent } from '@/store/questionComponentsReducer';
import { useCallback, useMemo } from 'react';

const useDragSortComponent = () => {
  const { componentList } = useGetQuestionComponentInfo();

  const dispatch = useAppDispatch();

  const renderComponentList = useMemo(() => {
    return componentList.map((c) => {
      return {
        ...c,
        id: c.fe_id,
      };
    });
  }, [componentList]);
  // 拖拽结束
  const onDragEnd = useCallback(
    (oldIndex: number, newIndex: number) => {
      dispatch(moveComponent({ oldIndex, newIndex }));
    },
    [dispatch]
  );

  return {
    renderComponentList,
    onDragEnd,
  };
};

export default useDragSortComponent;
