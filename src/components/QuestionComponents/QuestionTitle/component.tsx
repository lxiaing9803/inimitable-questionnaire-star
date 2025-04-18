import { Typography } from 'antd';
import { QuestionTitleDefaultProps, QuestionTitleLevelFontSizeMap } from './constant';
import { QuestionTitlePropsType } from './type';
import { useMemo } from 'react';

const { Title } = Typography;

const QuestionTitle: React.FC<QuestionTitlePropsType> = (props) => {
  const { text = '', level = 1, isCenter = false } = { ...QuestionTitleDefaultProps, ...props };

  const genStyle: React.CSSProperties = useMemo(() => {
    return {
      textAlign: isCenter ? 'center' : 'left',
      marginBottom: 0,
      fontSize: QuestionTitleLevelFontSizeMap[level] || '16px',
    };
  }, [isCenter, level]);

  return (
    <Title level={level} style={genStyle}>
      {text}
    </Title>
  );
};

export default QuestionTitle;
