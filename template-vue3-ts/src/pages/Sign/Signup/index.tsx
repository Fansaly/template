import { Card } from 'ant-design-vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

import { pick } from '@/utils';

import Footer from '../Footer';
import styles from '../Signin/sign.module.less';
import usePayload from '../usePayload';
import NormalModule from './NormalModule';

export default defineComponent({
  name: 'Signup',
  setup() {
    const router = useRouter();
    const payload = usePayload();

    const handleSignin = () => {
      router.push({
        name: 'Signin',
        query: pick(payload.value, 'code'),
      });
    };

    return () => (
      <div class={styles['sign-container']}>
        <div class={styles['main-container']}>
          <Card>
            <NormalModule onSignin={handleSignin} />
          </Card>

          <Footer />
        </div>
      </div>
    );
  },
});
