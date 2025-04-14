import { Button, Flex, Form, Input, message, Space, Typography } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { useCallback } from 'react';
import { RegisterFormDataType, VALIDATOR_FORM_ITEM_ENUM } from '@/types/user';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_PATHNAME } from '@/constants';
import styles from './index.module.scss';
import { regexErrorMap, usernameRegex } from '@/constants/rules';
import { register } from '@/apis/user';

const { Title } = Typography;

const Register = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const onFinish = useCallback(
    async (values: RegisterFormDataType) => {
      const { username, password, nickname } = values;
      await register({ username, password, nickname }).then(() => {
        message.success({
          content: '注册成功',
          duration: 1,
          onClose: () => {
            navigate(LOGIN_PATHNAME);
          },
        });
      });
    },
    [navigate]
  );

  return (
    <div className={styles.register}>
      <Space>
        <Title level={2}>
          <UserAddOutlined />
        </Title>
        <Title level={2}>注册新用户</Title>
      </Space>
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            { required: true, message: '请输入用户名' },
            { type: 'string', min: 5, max: 20, message: '用户名长度在5-20个字符之间' },
            {
              pattern: usernameRegex,
              message: regexErrorMap[VALIDATOR_FORM_ITEM_ENUM.username],
            },
          ]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            { required: true, message: '请输入密码' },
            { type: 'string', min: 8, max: 20, message: '密码长度在8-20个字符之间' },
          ]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: '请输入密码' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次输入的密码不一致'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="请再次输入密码" />
        </Form.Item>
        <Form.Item label="昵称" name="nickname">
          <Input placeholder="请输入昵称" />
        </Form.Item>
        <Flex justify="center">
          <Space direction="vertical" align="center">
            <Button type="primary" htmlType="submit">
              注册
            </Button>
            <Link to={LOGIN_PATHNAME}>已有账号，直接登录</Link>
          </Space>
        </Flex>
      </Form>
    </div>
  );
};

export default Register;
