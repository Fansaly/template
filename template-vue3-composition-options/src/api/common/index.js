import { fetch } from '../request';

const api = {
  sms: '/common/sms',
};

export const fetchSmsCode = (payload) => {
  const url = `${api.sms}/send`;
  return fetch({ url, method: 'POST', data: payload });
};
