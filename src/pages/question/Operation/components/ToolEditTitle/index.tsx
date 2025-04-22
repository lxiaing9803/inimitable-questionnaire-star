import { EditOutlined } from '@ant-design/icons';
import { Button, Input, Space, Typography } from 'antd';
import { useCallback, useMemo, useState } from 'react';

interface ToolEditTitleProps {
  title: string;
  onEdit: (title: string) => void;
}

const { Title } = Typography;

const ToolEditTitle: React.FC<ToolEditTitleProps> = ({ title, onEdit }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleEdit = useCallback(() => {
    setIsEdit(true);
  }, []);

  const onBlur = useCallback(() => {
    setIsEdit(false);
  }, []);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTitle = e.target.value.trim();
      onEdit(newTitle);
    },
    [onEdit]
  );

  const renderTitle = useMemo(() => {
    if (isEdit) {
      return (
        <Input autoFocus value={title} onChange={onChange} onPressEnter={onBlur} onBlur={onBlur} />
      );
    }
    return <Title>{title}</Title>;
  }, [isEdit, onBlur, onChange, title]);

  return (
    <Space>
      {renderTitle}
      {!isEdit && title && <Button type="text" icon={<EditOutlined />} onClick={handleEdit} />}
    </Space>
  );
};

export default ToolEditTitle;
