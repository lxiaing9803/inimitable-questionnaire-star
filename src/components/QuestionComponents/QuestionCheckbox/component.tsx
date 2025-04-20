import { Checkbox, Space, Typography } from 'antd';
import { QuestionCheckboxDefaultProps } from './constant';
import { QuestionCheckboxPropsType } from './type';
import { useMemo } from 'react';

const { Paragraph } = Typography;

const QuestionCheckbox: React.FC<QuestionCheckboxPropsType> = (props) => {
  const { title, isVertical, list } = { ...QuestionCheckboxDefaultProps, ...props };

  const checkboxDirection = useMemo(() => {
    return isVertical ? 'vertical' : 'horizontal';
  }, [isVertical]);
  return (
    <Space direction="vertical">
      <Paragraph strong>{title}</Paragraph>
      <Space direction={checkboxDirection}>
        {list?.map((item) => {
          const { text, value, checked } = item;
          return (
            <Checkbox key={value} value={value} checked={checked}>
              {text}
            </Checkbox>
          );
        })}
      </Space>
    </Space>
  );
};

export default QuestionCheckbox;
