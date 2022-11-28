import { Loading } from '@/api/types';
import { confirmSignin } from '../confirmSignin';
import { configurator } from './configurator';

interface DownloadTask
  extends Partial<
    Omit<
      UniApp.DownloadTask,
      | 'onProgressUpdate'
      | 'offProgressUpdate'
      | 'onHeadersReceived'
      | 'offHeadersReceived'
    >
  > {
  onProgressUpdate?: (result: UniApp.OnProgressDownloadResult) => void;
  offProgressUpdate?: (result: any) => void;
  onHeadersReceived?: (result: any) => void;
  offHeadersReceived?: (result: any) => void;
}
interface Config extends UniApp.DownloadFileOption, DownloadTask {
  loading?: Loading;
}

// 文件下载(token 存在时自动携带)
export const download = ({ loading, ...config }: Config) => {
  return new Promise<UniApp.DownloadSuccessData>((resolve, reject) => {
    const options = {
      ...configurator(config),
    };

    // loading 为 Boolean 类型或者 uni.showLoading 的配置参数
    // https://uniapp.dcloud.net.cn/api/ui/prompt.html#showloading
    let timeout = 1000;
    if (typeof loading === 'object') {
      timeout = loading.timeout || timeout;
    }

    if (loading) {
      uni.showLoading({
        title: '文件加载中...',
        ...(typeof loading === 'object' ? loading : {}),
      });
    }

    const downloadTask = uni.downloadFile({
      ...options,
      success: (res) => {
        let data: Record<string, any> = {};

        try {
          if (res.tempFilePath && typeof res.tempFilePath === 'object') {
            data = res.tempFilePath;
          }
          if (typeof res.tempFilePath === 'string') {
            data = JSON.parse(res.tempFilePath);
          }
        } catch {
          // Swallow the exceptions.
        }

        setTimeout(() => {
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
        }, timeout);
      },
      fail: (error) => {
        setTimeout(() => {
          reject(error);
        }, timeout);
      },
      complete: () => {
        setTimeout(() => {
          if (loading) {
            uni.hideLoading();
          }
        }, timeout);
      },
    });

    downloadTask.onProgressUpdate((res) => {
      config.onProgressUpdate?.(res);
    });
  });
};
