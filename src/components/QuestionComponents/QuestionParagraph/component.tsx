import { useMemo } from 'react';
import { QuestionParagraphPropsType } from './type';
import { Typography } from 'antd';
import { QuestionParagraphDefaultProps } from './constant';

const { Paragraph } = Typography;

const QuestionParagraph: React.FC<QuestionParagraphPropsType> = (props) => {
  const { text, isCenter } = { ...QuestionParagraphDefaultProps, ...props };
  // 考虑到渲染安全性，不使用 dangerouslySetInnerHTML
  const textList = text?.split('\n') || [];
  const genStyle: React.CSSProperties = useMemo(() => {
    return {
      textAlign: isCenter ? 'center' : 'left',
      marginBottom: 0,
    };
  }, [isCenter]);
  return (
    <Paragraph style={genStyle}>
      {textList?.map((t, index) => (
        <span key={index}>
          {index > 0 && <br />}
          {t}
        </span>
      ))}
    </Paragraph>
  );
};
export default QuestionParagraph;
