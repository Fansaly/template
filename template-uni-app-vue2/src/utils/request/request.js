import { confirmSignin } from '../confirmSignin';
import { configurator } from './configurator';

// 请求(token 存在时自动携带)
export const request = async ({ loading, method = 'GET', headers, ...config } = {}) => {
  return new Promise((resolve, reject) => {
    method = method.toUpperCase();
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
        let data = {};

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
