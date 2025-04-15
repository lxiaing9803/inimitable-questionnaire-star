import { HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME } from '@/constants';

export const IsLoginOrRegister = (pathname: string) => {
  return pathname === LOGIN_PATHNAME || pathname === REGISTER_PATHNAME;
};

export const WithoutUserInfo = (pathname: string) => {
  if ([HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true;
  return false;
};
