import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

import { pick } from '../data';

export const useRequest = <P = Record<string, any>>({
  key = {},
  config = {},
}: { key?: Record<string, string>; config?: AxiosRequestConfig } = {}) => {
  const configurator = (config: AxiosRequestConfig) => {
    const { headers = {} } = config;
    const token = key.store && Cookies.get(key.store);

    if (key.request && token) {
      headers[key.request] = token;
    }

    return { ...config, headers };
  };

  const createInstance = (config: AxiosRequestConfig) => {
    const instance = axios.create(config);

    instance.interceptors.request.use(
      (config) => configurator(config),
      (error) => Promise.reject(error),
    );

    instance.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error),
    );

    return instance;
  };

  const handleError = (error: unknown) => {
    let message;

    if (!axios.isAxiosError(error)) {
      message = error;
    } else if (error.name === 'CanceledError') {
      // message = 'CANCELED';
      message = error;
    } else {
      const response = <AxiosResponse>error.response;
      message = response?.data?.message || error.message;
      message = new Error(message);
    }

    return message;
  };

  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
  };

  const basic = createInstance({
    ...pick(config, 'timeout'),
    headers: { ...headers, ...config.headers },
  });
  const normal = createInstance({
    ...config,
    headers: { ...headers, ...config.headers },
  });

  const request = async <T = Record<string, any>, R = any>(
    options: AxiosRequestConfig,
  ): Promise<Omit<R, keyof T> & T> => {
    try {
      const response = await basic(options);
      return response.data;
    } catch (error) {
      return Promise.reject(handleError(error));
    }
  };

  const fetch = async <T = Record<string, any>, R = P>(
    options: AxiosRequestConfig,
  ): Promise<Omit<R, keyof T> & Partial<T>> => {
    try {
      const response = await normal(options);
      return response.data;
    } catch (error) {
      return Promise.reject(handleError(error));
    }
  };

  return { basic, normal, request, fetch };
};
