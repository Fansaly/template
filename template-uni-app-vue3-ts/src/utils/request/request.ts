import { Loading, Response as BasicResponse } from '@/api/types';
import { confirmSignin } from '../confirmSignin';
import { configurator } from './configurator';

interface Config extends Omit<UniApp.RequestOptions, 'header'> {
  loading?: Loading;
  headers?: UniApp.RequestOptions['header'];
}

type Response<T = Record<string, any>, R = never> = Partial<Omit<R, keyof T> & T>;

// 请求(token 存在时自动携带)
export const request = async <T = Record<string, any>, R = BasicResponse>({
  loading,
  method = 'GET',
  headers,
  ...config
}: Config): Promise<Response<T, R>> => {
  return new Promise((resolve, reject) => {
    // method = method.toUpperCase();
    headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest',
      ...(method === 'GET' ? { Accept: 'application/json' } : {}),
      ...headers,
    };
    const options = {
      dataType: 'json',
      ...configurator({ ...config, method, headers }),
    };

    // loading 为 Boolean 类型或者 uni.showLoading 的配置参数
    // https://uniapp.dcloud.net.cn/api/ui/prompt.html#showloading
    if (loading) {
      uni.showLoading({
        title: '数据请求中...',
        ...(typeof loading === 'object' ? loading : {}),
      });
    }

    uni.request({
      ...options,
      success: (res) => {
        let data: any = {};

        try {
          if (res.data && typeof res.data === 'object') {
            data = res.data;
          }
          if (typeof res.data === 'string') {
            data = JSON.parse(res.data);
          }
        } catch {
          // Swallow the exceptions.
        }

        if (data.code === 401) {
          confirmSignin().catch(() => {
            /* Swallow the exceptions. */
          });
          return reject({ errMsg: data.message || '还未登录或登录已过期' });
        }

        resolve(data);
      },
      fail: (error) => {
        reject(error);
      },
      complete: () => {
        if (loading) {
          uni.hideLoading();
        }
      },
    });
  });
};
