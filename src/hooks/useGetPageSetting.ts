import { useAppSelector } from '@/utils/hook';

const useGetPageSetting = () => {
  const { title, desc, js, css } = useAppSelector((state) => state.questionPageSettingReducer);
  return { title, desc, js, css };
};

export default useGetPageSetting;
