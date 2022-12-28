import { fetch } from '../request';

const api = {
  user: '/user',
};

export const signup = (payload) => {
  const url = `${api.user}/signup`;
  return fetch({ url, method: 'POST', data: payload });
};

export const signin = (payload) => {
  const url = `${api.user}/signin`;
  return fetch({ url, method: 'POST', data: payload });
};

export const signout = () => {
  const url = `${api.user}/signout`;
  return fetch({ url, method: 'POST' });
};

export const fetchUserInfo = () => {
  const url = `${api.user}/check`;
  return fetch({ url, method: 'POST' });
};

export const fetchUserMenus = () => {
  const url = `${api.user}/getUserMenus`;
  return fetch({ url, method: 'GET' });
};
