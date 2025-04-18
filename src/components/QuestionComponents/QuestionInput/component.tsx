import { Input, Typography } from 'antd';
import { QuestionInputPropsType } from './type';
import { QuestionInputDefaultProps } from './constant';

const { Paragraph } = Typography;

const QuestionInput: React.FC<QuestionInputPropsType> = (props) => {
  const { title, placeholder } = { ...QuestionInputDefaultProps, ...props };

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder} />
      </div>
    </div>
  );
};

export default QuestionInput;
