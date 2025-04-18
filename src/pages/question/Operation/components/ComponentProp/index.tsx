import {
  getComponentConfigByType,
  QuestionComponentPropsType,
} from '@/components/QuestionComponents';
import useGetQuestionComponentInfo from '@/hooks/useGetQuestionComponentInfo';
import { changeComponentProps } from '@/store/questionComponentsReducer';
import { useAppDispatch } from '@/utils/hook';

const NoProp = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>;
};

const ComponentProp = () => {
  const { selectedComponent } = useGetQuestionComponentInfo();

  const dispatch = useAppDispatch();

  if (!selectedComponent) return <NoProp />;

  const { props, type } = selectedComponent;

  const componentConfig = getComponentConfigByType(type);

  if (!componentConfig) return <NoProp />;

  const { PropComponent } = componentConfig;

  const changeProps = (newProps: QuestionComponentPropsType) => {
    if (!selectedComponent) return;
    const { fe_id } = selectedComponent;
    dispatch(changeComponentProps({ fe_id, newProps }));
  };

  return <PropComponent {...props} onChange={changeProps} />;
};

export default ComponentProp;
