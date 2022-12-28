import { useRouteQuery } from '@vueuse/router';
import { Card, Row } from 'ant-design-vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

import { pick } from '@/utils';

import Footer from '../Footer';
import usePayload from '../usePayload';
import NormalModule from './NormalModule';
import styles from './sign.module.less';

export default defineComponent({
  name: 'Signin',
  setup() {
    const router = useRouter();
    const redirect = useRouteQuery<string>('redirect');
    const payload = usePayload();

    const gotoWhere = () => {
      let path: string = redirect.value || '/';
      path = /^\//.test(`${path}`) ? path : '/';
      router.push(path);
    };
    const handleSignup = () => {
      router.push({
        name: 'Signup',
        query: pick(payload.value, ['code']),
      });
    };
    const handleView = (type: string) => (event: Event) => {
      event.preventDefault();
      // eslint-disable-next-line no-console
      console.log(type);
    };

    return () => (
      <div class={styles['sign-container']}>
        <div class={styles['main-container']}>
          <Card>
            <NormalModule onSignup={handleSignup} onGotoWhere={gotoWhere} />
          </Card>

          <Row class={styles.rules}>
            登录即代表你已阅读并同意
            <a class={styles['type-link']} onClick={handleView('agreement')}>
              服务协议
            </a>
            和
            <a class={styles['type-link']} onClick={handleView('privacy')}>
              隐私条款
            </a>
          </Row>

          <Footer />
        </div>
      </div>
    );
  },
});
