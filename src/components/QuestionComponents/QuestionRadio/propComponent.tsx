import { useCallback, useEffect } from 'react';
import { OptionType, QuestionRadioPropsType } from './type';
import { Button, Checkbox, Form, Input, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid';

const PropComponent: React.FC<QuestionRadioPropsType> = ({
  title,
  options,
  value,
  isVertical,
  disabled,
  onChange,
}) => {
  const [form] = Form.useForm();

  const handleValuesChange = useCallback(() => {
    const newValues = form.getFieldsValue() as QuestionRadioPropsType;
    // 兼容处理(需清理label为undefined的情况)
    if (newValues.options) {
      newValues.options = newValues.options.filter((item) => item.label !== null);
    }
    const { options } = newValues;

    options?.forEach((item) => {
      // 处理选项值为空的情况
      if (item.value) return;
      item.value = nanoid(5);
    });
    onChange?.(newValues);
  }, [form, onChange]);

  useEffect(() => {
    form.setFieldsValue({ title, options, value, isVertical });
  }, [form, title, options, value, isVertical]);

  return (
    <Form
      layout="vertical"
      initialValues={{ title, options, value, isVertical }}
      form={form}
      disabled={disabled}
      onValuesChange={handleValuesChange}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    <Form.Item
                      name={[name, 'label']}
                      rules={[
                        { required: true, message: '请输入选项' },
                        {
                          validator: (_, text) => {
                            const { options } = form.getFieldsValue();
                            let num: number = 0;
                            options?.forEach((item: OptionType) => {
                              // 记录重复的选项数量
                              if (item.label === text) num++;
                            });
                            if (num === 1) return Promise.resolve();
                            return Promise.reject(new Error('选项不能重复'));
                          },
                        },
                      ]}
                    >
                      <Input placeholder="请输入选项" />
                    </Form.Item>
                    {index > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
                  </Space>
                );
              })}
              <Form.Item>
                <Button
                  type="link"
                  icon={<PlusOutlined />}
                  onClick={() => add({ label: '', value: '' })}
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>

      <Form.Item label="默认选中" name="value">
        <Select options={options} />
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
