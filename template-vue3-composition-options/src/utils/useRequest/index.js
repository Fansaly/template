import axios from 'axios';
import Cookies from 'js-cookie';

import { pick } from '../data';

export const useRequest = ({ key = {}, config = {} } = {}) => {
  const configurator = (config) => {
    const { headers = {} } = config;
    const token = key.store && Cookies.get(key.store);

    if (key.request && token) {
      headers[key.request] = token;
    }

    return { ...config, headers };
  };

  const createInstance = (config) => {
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

  const handleError = (error) => {
    let message;

    if (!axios.isAxiosError(error)) {
      message = error;
    } else if (error.name === 'CanceledError') {
      // message = 'CANCELED';
      message = error;
    } else {
      const response = error.response;
      message = response.data.message || error.message;
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

  const request = async (options) => {
    try {
      const response = await basic(options);
      return response.data;
    } catch (error) {
      return Promise.reject(handleError(error));
    }
  };

  const fetch = async (options) => {
    try {
      const response = await normal(options);
      return response.data;
    } catch (error) {
      return Promise.reject(handleError(error));
    }
  };

  return { basic, normal, request, fetch };
};
