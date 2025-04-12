import { Button, Checkbox, Flex, Form, Input, Space, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useCallback, useEffect } from 'react';
import { LoginFormDataType, VALIDATOR_FORM_ITEM_ENUM } from '@/types/user';
import { Link } from 'react-router-dom';
import { REGISTER_PATHNAME } from '@/constants';
import { usernameRegex, regexErrorMap } from '@/constants/rules';
import styles from './index.module.scss';

const { Title } = Typography;

const QUESTIONNAIRE_USER_INFO = 'QUESTIONNAIRE_USER_INFO';

const Login = () => {
  const [form] = Form.useForm();

  const rememberUser = useCallback((userInfo: LoginFormDataType) => {
    localStorage.setItem(QUESTIONNAIRE_USER_INFO, JSON.stringify(userInfo));
  }, []);

  const clearUserInfo = useCallback(() => {
    localStorage.removeItem(QUESTIONNAIRE_USER_INFO);
  }, []);

  const getUserInfo = useCallback(() => {
    const data = localStorage.getItem(QUESTIONNAIRE_USER_INFO);
    if (!data) return;
    const userInfo = JSON.parse(data) as LoginFormDataType;
    form.setFieldsValue({
      username: userInfo.username,
      password: userInfo.password,
      remember: userInfo.remember,
    });
  }, [form]);

  const onFinish = useCallback(
    (values: LoginFormDataType) => {
      console.log(values);
      if (values.remember) {
        rememberUser(values);
      } else {
        clearUserInfo();
      }
    },
    [clearUserInfo, rememberUser]
  );

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  return (
    <div className={styles.login}>
      <Space>
        <Title level={2}>
          <UserOutlined />
        </Title>
        <Title level={2}>用户登录</Title>
      </Space>
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        initialValues={{ remember: true }}
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
        <Form.Item label={null} name="remember" valuePropName="checked">
          <Checkbox>记住我</Checkbox>
        </Form.Item>
        <Flex justify="center">
          <Space direction="vertical" align="center">
            <Button type="primary" htmlType="submit">
              登录
            </Button>
            <Link to={REGISTER_PATHNAME}>还没有账号？去注册</Link>
          </Space>
        </Flex>
      </Form>
    </div>
  );
};

export default Login;
