import { QuestionTextareaPropsType } from './type';
import { Input, Typography } from 'antd';
import { QuestionTextareaDefaultProps } from './constant';

const { Paragraph } = Typography;
const { TextArea } = Input;

const QuestionTextarea: React.FC<QuestionTextareaPropsType> = (props) => {
  const { title, placeholder } = { ...QuestionTextareaDefaultProps, ...props };

  return (
    <>
      <Paragraph strong>{title}</Paragraph>
      <TextArea placeholder={placeholder} />
    </>
  );
};
export default QuestionTextarea;
