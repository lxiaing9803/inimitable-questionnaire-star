import { Radio, Space, Typography } from 'antd';
import { QuestionRadioDefaultProps } from './constant';
import { QuestionRadioPropsType } from './type';
import { useMemo } from 'react';

const { Paragraph } = Typography;

const QuestionRadio: React.FC<QuestionRadioPropsType> = (props) => {
  const { title, options, value, isVertical } = { ...QuestionRadioDefaultProps, ...props };

  const radioDirection = useMemo(() => {
    return isVertical ? 'vertical' : 'horizontal';
  }, [isVertical]);

  return (
    <Space direction="vertical">
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group value={value}>
        <Space direction={radioDirection}>
          {options?.map((option) => {
            const { value, label } = option;
            return (
              <Radio key={value} value={value}>
                {label}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    </Space>
  );
};

export default QuestionRadio;
