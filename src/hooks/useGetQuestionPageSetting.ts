import { useAppSelector } from '@/utils/hook';

const useGetQuestionPageSetting = () => {
  const pageSettingInfo = useAppSelector((state) => state.questionPageSettingReducer);
  return pageSettingInfo;
};

export default useGetQuestionPageSetting;
