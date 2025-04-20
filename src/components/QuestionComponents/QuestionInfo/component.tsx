import { QuestionInfoPropsType } from './type';
import { Space, Typography } from 'antd';
import { QuestionInfoDefaultProps } from './constant';

const { Paragraph, Title } = Typography;

const SpaceStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const QuestionInfo: React.FC<QuestionInfoPropsType> = (props) => {
  const { title, desc } = { ...QuestionInfoDefaultProps, ...props };
  // 考虑到渲染安全性，不使用 dangerouslySetInnerHTML
  const descList = desc?.split('\n') || [];
  return (
    <Space direction="vertical" style={SpaceStyle}>
      <Title style={{ fontSize: '24px' }}>{title}</Title>
      <Paragraph>
        {descList?.map((d, index) => (
          <span key={index}>
            {index > 0 && <br />}
            {d}
          </span>
        ))}
      </Paragraph>
    </Space>
  );
};
export default QuestionInfo;
