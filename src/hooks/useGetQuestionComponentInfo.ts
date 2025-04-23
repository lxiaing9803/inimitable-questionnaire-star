import { useAppSelector } from '@/utils/hook';

const useGetQuestionComponentInfo = () => {
  const { componentList, selectedId, copiedComponent } = useAppSelector(
    (state) => state.questionComponentsReducer.present
  );

  const selectedComponent = componentList.find((item) => item.fe_id === selectedId);

  return {
    componentList,
    selectedId,
    selectedComponent,
    copiedComponent,
  };
};

export default useGetQuestionComponentInfo;
