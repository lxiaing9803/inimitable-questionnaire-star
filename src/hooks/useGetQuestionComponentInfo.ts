import { useAppSelector } from '@/utils/hook';

const useGetQuestionComponentInfo = () => {
  const { componentList, selectedId } = useAppSelector((state) => state.questionComponentsReducer);

  const selectedComponent = componentList.find((item) => item.fe_id === selectedId);

  return {
    componentList,
    selectedId,
    selectedComponent,
  };
};

export default useGetQuestionComponentInfo;
