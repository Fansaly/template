import { MockMethod } from 'vite-plugin-mock';
import Mock from 'mockjs';

const mockMethods: MockMethod[] = [
  {
    url: '/api/user/signup',
    method: 'post',
    response: (res: any) => {
      return {
        code: 0,
        data: {
          mobile: res.body.mobile,
          name: res.body.name,
        },
      };
    },
  },
  {
    url: '/api/user/signin',
    method: 'post',
    response: (res: any) => {
      return {
        code: 0,
        data: {
          mobile: res.body.mobile,
          token: Mock.Random.guid(),
        },
      };
    },
  },
  {
    url: '/api/user/signout',
    method: 'post',
    response: {
      code: 0,
    },
  },
  {
    url: '/api/user/check',
    method: 'post',
    response: (res: any) => {
      return {
        code: 0,
        data: {
          token: res.headers.token,
        },
      };
    },
  },
  {
    url: '/api/user/getUserMenus',
    method: 'get',
    response: {
      code: 0,
      data: [],
    },
  },
  {
    url: '/api/common/sms/send',
    method: 'post',
    response: {
      code: 0,
      data: Number(Mock.Random.string('number', 6)),
    },
  },
];

export default mockMethods;
