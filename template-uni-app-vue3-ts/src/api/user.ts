import { request } from '@/utils';
import { Payload, Response, Signin } from './types';

// export const signin = ({ loading, ...data }: Payload) => {
//   const url = '/signin';
//   return request({ url, method: 'POST', data, loading });
// };
export const signin = (data: Signin) => {
  return new Promise<Response>((resolve) => {
    resolve({ success: !!data, data: 'token' });
  });
};
export const signout = () => {
  return new Promise<Response>((resolve) => {
    resolve({ success: true, data: null });
  });
};

export const fetchUserInfo = ({ loading, ...data }: Payload) => {
  const url = '/getUserInfo';
  return request({ url, method: 'GET', data, loading });
};

export const fetchSmsCode = ({ loading, ...data }: Payload) => {
  const url = '/getSmsCode';
  return request({ url, method: 'GET', data, loading });
};
