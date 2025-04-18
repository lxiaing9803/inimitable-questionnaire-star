import { Checkbox, Form, Input, Select } from 'antd';
import { QuestionTitlePropsType } from './type';
import { useCallback, useEffect } from 'react';
import { LevelList } from './constant';

const PropComponent: React.FC<QuestionTitlePropsType> = ({ text, level, isCenter, onChange }) => {
  const [form] = Form.useForm();

  const handleValuesChange = useCallback(() => {
    onChange?.(form.getFieldsValue());
  }, [form, onChange]);

  useEffect(() => {
    form.setFieldsValue({ text, level, isCenter });
  }, [form, text, level, isCenter]);

  return (
    <Form
      layout="vertical"
      initialValues={{ text, level, isCenter }}
      form={form}
      onValuesChange={handleValuesChange}
    >
      <Form.Item label="标题内容" name="text" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="层级" name="level">
        <Select options={LevelList} />
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
