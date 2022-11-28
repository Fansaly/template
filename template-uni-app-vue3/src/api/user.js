import { request } from '@/utils';

// export const signin = ({ loading, ...data } = {}) => {
//   const url = '/signin';
//   return request({ url, method: 'POST', data, loading });
// };
export const signin = (data) => {
  return new Promise((resolve) => {
    resolve({ success: !!data, data: 'token' });
  });
};
export const signout = () => {
  return new Promise((resolve) => {
    resolve({ success: true, data: null });
  });
};

export const fetchUserInfo = ({ loading, ...data } = {}) => {
  const url = '/getUserInfo';
  return request({ url, method: 'GET', data, loading });
};

export const fetchSmsCode = ({ loading, ...data } = {}) => {
  const url = '/getSmsCode';
  return request({ url, method: 'GET', data, loading });
};
