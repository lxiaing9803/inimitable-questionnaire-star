import { LoginFormDataType, RegisterParamsType, UserInfoType } from '@/types/user';
import { request } from '@/utils/request';

export async function getUserInfo() {
  return await request.get<UserInfoType>('/api/user/info');
}

export async function register(data: RegisterParamsType) {
  return await request.post<any>('/api/user/register', {
    data: {
      ...data,
      nickname: data.nickname || data.username,
    },
  });
}

export async function login(data: LoginFormDataType) {
  return await request.post<{ token: string }>('/api/user/login', {
    data,
  });
}
