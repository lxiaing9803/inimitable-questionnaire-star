import { Form, Input } from 'antd';
import { QuestionInputPropsType } from './type';
import { useCallback, useEffect } from 'react';

const PropComponent: React.FC<QuestionInputPropsType> = ({ title, placeholder, onChange }) => {
  const [form] = Form.useForm();

  const handleValuesChange = useCallback(() => {
    onChange?.(form.getFieldsValue());
  }, [form, onChange]);

  useEffect(() => {
    form.setFieldsValue({ title, placeholder });
  }, [form, placeholder, title]);

  return (
    <Form
      layout="vertical"
      initialValues={{ title, placeholder }}
      form={form}
      onValuesChange={handleValuesChange}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Placeholder" name="placeholder">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
