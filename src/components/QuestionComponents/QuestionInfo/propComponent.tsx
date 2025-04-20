import { Form, Input } from 'antd';
import { QuestionInfoPropsType } from './type';
import { useCallback, useEffect } from 'react';

const { TextArea } = Input;

const PropComponent: React.FC<QuestionInfoPropsType> = ({ title, desc, disabled, onChange }) => {
  const [form] = Form.useForm();

  const handleValuesChange = useCallback(() => {
    onChange?.(form.getFieldsValue());
  }, [form, onChange]);

  useEffect(() => {
    form.setFieldsValue({ title, desc });
  }, [form, title, desc]);

  return (
    <Form
      layout="vertical"
      initialValues={{ title, desc }}
      form={form}
      disabled={disabled}
      onValuesChange={handleValuesChange}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="描述" name="desc" rules={[{ required: true, message: '请输入描述' }]}>
        <TextArea />
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
