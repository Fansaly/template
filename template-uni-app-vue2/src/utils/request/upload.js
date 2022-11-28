import { confirmSignin } from '../confirmSignin';
import { configurator } from './configurator';

// 文件上传(token 存在时自动携带)
export const upload = ({ loading, ...config } = {}) => {
  return new Promise((resolve, reject) => {
    const options = {
      name: 'files',
      ...configurator(config),
    };

    // loading 为 Boolean 类型或者 uni.showLoading 的配置参数
    // https://uniapp.dcloud.net.cn/api/ui/prompt.html#showloading
    if (loading) {
      uni.showLoading({
        title: '文件上传中...',
        ...(typeof loading === 'object' ? loading : {}),
      });
    }

    const uploadTask = uni.uploadFile({
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

        if (res.statusCode !== 200) {
          return reject({ errMsg: data.message || `${res.statusCode}: 文件下载错误` });
        }

        if (data && data.code === 401) {
          confirmSignin().catch(() => {
            /* Swallow the exceptions. */
          });
          return reject({ errMsg: data.message || '还未登录或登录已过期' });
        }

        resolve(res);
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

    uploadTask.onProgressUpdate((res) => {
      if (typeof config.onProgressUpdate === 'function') {
        config.onProgressUpdate(res);
      }
    });
  });
};
