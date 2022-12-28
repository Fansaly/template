import { useRouteQuery } from '@vueuse/router';
import Cookies from 'js-cookie';
import { onBeforeMount, ref } from 'vue';

import { TOKEN_STORE } from '@/config';

export const usePayload = () => {
  const code = useRouteQuery('code');
  const payload = ref({});

  onBeforeMount(() => {
    payload.value = {
      code: code.value || undefined,
      token: Cookies.get(TOKEN_STORE) || undefined,
    };
  });

  return payload;
};

export default usePayload;
