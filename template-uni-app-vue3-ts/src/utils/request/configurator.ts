import { TOKEN_REQUEST, TOKEN_STORE, baseURL } from '@/config';

export const configurator = <T = any>({
  url,
  headers = {},
  ...config
}: Record<string, any>): T => {
  if (!/^(http(s)?:)?\/\//.test(url)) {
    url = `${baseURL}${url}`;
  }

  let { data = {} } = config;
  const token = uni.getStorageSync(TOKEN_STORE);

  if (token) {
    headers[TOKEN_REQUEST] = token;
    data[TOKEN_REQUEST] = token;
  }

  data = JSON.parse(JSON.stringify(data));

  return { ...config, url, header: headers, data } as T;
};
