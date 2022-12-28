import { fetch } from '../request';
import { SmsCode } from '../types';

const api = {
  sms: '/common/sms',
};

export const fetchSmsCode = (payload: SmsCode) => {
  const url = `${api.sms}/send`;
  return fetch({ url, method: 'POST', data: payload });
};
