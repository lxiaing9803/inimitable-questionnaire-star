import { useCallback, useEffect } from 'react';
import { CheckboxOptionType, QuestionCheckboxPropsType } from './type';
import { Button, Checkbox, Form, Input, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid';

const PropComponent: React.FC<QuestionCheckboxPropsType> = ({
  title,
  list,
  isVertical,
  disabled,
  onChange,
}) => {
  const [form] = Form.useForm();

  const handleValuesChange = useCallback(() => {
    const newValues = form.getFieldsValue() as QuestionCheckboxPropsType;
    // 兼容处理(需清理label为undefined的情况)
    if (newValues.list) {
      newValues.list = newValues.list.filter((item) => item.text !== null);
    }
    const { list } = newValues;

    list?.forEach((item) => {
      // 处理选项值为空的情况
      if (item.value) return;
      item.value = nanoid(5);
    });
    onChange?.(newValues);
  }, [form, onChange]);

  useEffect(() => {
    form.setFieldsValue({ title, list, isVertical });
  }, [form, title, list, isVertical]);

  return (
    <Form
      layout="vertical"
      initialValues={{ title, list, isVertical }}
      form={form}
      disabled={disabled}
      onValuesChange={handleValuesChange}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    <Form.Item name={[name, 'checked']} valuePropName="checked">
                      <Checkbox />
                    </Form.Item>
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: '请输入选项' },
                        {
                          validator: (_, text) => {
                            const { list } = form.getFieldsValue();
                            let num: number = 0;
                            list?.forEach((item: CheckboxOptionType) => {
                              // 记录重复的选项数量
                              if (item.text === text) num++;
                            });
                            if (num === 1) return Promise.resolve();
                            return Promise.reject(new Error('选项不能重复'));
                          },
                        },
                      ]}
                    >
                      <Input placeholder="请输入选项" />
                    </Form.Item>
                    {index > 0 && <MinusCircleOutlined onClick={() => remove(name)} />}
                  </Space>
                );
              })}
              <Form.Item>
                <Button
                  type="link"
                  icon={<PlusOutlined />}
                  onClick={() => add({ text: '', value: '', checked: false })}
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>

      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
