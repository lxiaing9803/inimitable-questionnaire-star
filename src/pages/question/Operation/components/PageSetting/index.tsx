import useGetQuestionPageSetting from '@/hooks/useGetQuestionPageSetting';
import { resetPageSetting } from '@/store/questionPageSetting';
import { useAppDispatch } from '@/utils/hook';
import { Form, Input } from 'antd';
import { useCallback, useEffect } from 'react';

const { TextArea } = Input;

const PageSetting = () => {
  const pageSettingInfo = useGetQuestionPageSetting();

  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  const handleValuesChange = useCallback(() => {
    dispatch(resetPageSetting(form.getFieldsValue()));
  }, [form, dispatch]);

  useEffect(() => {
    form.setFieldsValue(pageSettingInfo);
  }, [pageSettingInfo, form]);

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={pageSettingInfo}
      onValuesChange={handleValuesChange}
    >
      <Form.Item
        label="问卷标题"
        name="title"
        rules={[{ required: true, message: '请输入问卷标题' }]}
      >
        <Input placeholder="请输入问卷标题" />
      </Form.Item>
      <Form.Item label="问卷描述" name="desc">
        <TextArea placeholder="问卷描述..." />
      </Form.Item>
      <Form.Item label="样式代码" name="css">
        <TextArea placeholder="CSS样式代码..." />
      </Form.Item>
      <Form.Item label="脚本代码" name="js">
        <TextArea placeholder="JavaScript脚本代码..." />
      </Form.Item>
    </Form>
  );
};

export default PageSetting;
