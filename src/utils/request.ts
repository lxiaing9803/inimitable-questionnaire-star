import { ApiResponseDataType } from '@/types/request';
import { message } from 'antd';
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { getToken } from './user';

// 创建 axios 实例
const instance: AxiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.url === '/api/user/login') {
      return config;
    }
    const token = getToken();
    if (!token) {
      message.error('请先登录');
      return Promise.reject('请先登录');
    }
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  <T>(response: AxiosResponse<ApiResponseDataType<T>>) => {
    const res = response.data;
    const { code, msg, data } = res;
    if (code !== 0) {
      message.error(msg);
      return Promise.reject(msg || 'Error');
    }
    return data as T;
  },
  (error) => {
    if (error.response) {
      // 处理 HTTP 状态码错误
      switch (error.response.status) {
        case 401:
          message.error('未授权，请重新登录');
          // 跳转到登录页
          break;
        case 403:
          message.error('拒绝访问');
          break;
        case 404:
          message.error('请求的资源不存在');
          break;
        case 500:
          message.error('服务器错误');
          break;
        default:
          message.error('未知错误');
      }
    } else if (error.request) {
      // 请求已发出但没有收到响应
      message.error('无响应，请检查网络连接');
    } else {
      // 发送请求时出了点问题
      message.error('请求错误', error.message);
    }
    return Promise.reject(error);
  }
);

// 封装通用请求方法
export const request = {
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => instance.get(url, config),

  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    instance.post(url, data, config),

  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    instance.put(url, data, config),

  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    instance.delete(url, config),

  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    instance.patch(url, data, config),
};
