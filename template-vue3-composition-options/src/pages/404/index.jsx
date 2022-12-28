import { Button } from 'ant-design-vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

import styles from './index.module.less';

export default defineComponent({
  name: 'NotFound',
  setup() {
    const router = useRouter();

    const handleClick = () => {
      router.replace('/');
    };

    return () => (
      <div class={styles['not-found']}>
        <div class={styles.text}>Page Not Found</div>
        <Button type="dashed" class={styles.btn} onClick={handleClick}>
          返回首页
        </Button>
      </div>
    );
  },
});
