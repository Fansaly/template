import { AXIOS_CONFIG, TOKEN_REQUEST, TOKEN_STORE } from '@/config';
import { useRequest } from '@/utils';

const Bootstrap = () => {
  return useRequest<Response>({
    key: {
      request: TOKEN_REQUEST,
      store: TOKEN_STORE,
    },
    config: {
      ...AXIOS_CONFIG,
    },
  });
};

const { request, fetch } = Bootstrap();

export { request, fetch };
