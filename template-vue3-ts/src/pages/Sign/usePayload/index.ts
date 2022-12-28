import { useRouteQuery } from '@vueuse/router';
import Cookies from 'js-cookie';
import { onBeforeMount, ref } from 'vue';

import { TOKEN_STORE } from '@/config';

export interface Payload {
  [key: string]: undefined | string | number;
}

export const usePayload = () => {
  const code = useRouteQuery<string>('code');
  const payload = ref<Payload>({});

  onBeforeMount(() => {
    payload.value = {
      code: code.value || undefined,
      token: Cookies.get(TOKEN_STORE) || undefined,
    };
  });

  return payload;
};

export default usePayload;
