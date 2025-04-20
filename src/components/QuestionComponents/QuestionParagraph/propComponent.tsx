import { Checkbox, Form, Input } from 'antd';
import { QuestionParagraphPropsType } from './type';
import { useCallback, useEffect } from 'react';

const { TextArea } = Input;

const PropComponent: React.FC<QuestionParagraphPropsType> = ({
  text,
  isCenter,
  disabled,
  onChange,
}) => {
  const [form] = Form.useForm();

  const handleValuesChange = useCallback(() => {
    onChange?.(form.getFieldsValue());
  }, [form, onChange]);

  useEffect(() => {
    form.setFieldsValue({ text, isCenter });
  }, [form, text, isCenter]);

  return (
    <Form
      layout="vertical"
      initialValues={{ text, isCenter }}
      form={form}
      disabled={disabled}
      onValuesChange={handleValuesChange}
    >
      <Form.Item
        label="段落内容"
        name="text"
        rules={[{ required: true, message: '请输入段落内容' }]}
      >
        <TextArea />
      </Form.Item>

      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
