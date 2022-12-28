import { fetch } from './request';

export const upload = (data: any) => {
  return fetch({
    headers: { 'Content-Type': 'multipart/form-data' },
    url: '/common/upload',
    method: 'POST',
    ...data,
  });
};
