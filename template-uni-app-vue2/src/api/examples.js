// import { request } from '@/utils';

// export const fetchTabs = ({ loading, ...data } = {}) => {
//   const url = '/fetchTabs';
//   return request({ url, method: 'POST', data, loading });
// };
export const fetchTabs = () => {
  return new Promise((resolve) => {
    resolve({
      success: true,
      data: [
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
        { id: 3, name: 'C' },
      ],
    });
  });
};

// export const fetchList = ({ loading, ...data } = {}) => {
//   const url = '/fetchList';
//   return request({ url, method: 'POST', data, loading });
// };
export const fetchList = ({ pageNo = 1, pageSize = 6 } = {}) => {
  return new Promise((resolve) => {
    resolve({
      success: true,
      data: {
        pageNo,
        pageSize,
        total: 18,
        list: Array.from(new Array(pageSize)).fill({
          date: new Date(),
          name: 'name',
          img: 'https://joeschmoe.io/api/v1/random',
        }),
      },
    });
  });
};
