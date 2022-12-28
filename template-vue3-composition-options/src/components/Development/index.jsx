import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';

import DevelopmentSvg from '@/assets/icons/development.svg';

import styles from './index.module.less';

export default defineComponent({
  name: 'Development',
  setup() {
    const route = useRoute();
    const currentPath = computed(() => route.fullPath);

    return () => (
      <div class={styles.container}>
        <DevelopmentSvg class={styles.icon} />

        <p>开发中……</p>
        {import.meta.env.DEV && <span>{currentPath.value}</span>}
      </div>
    );
  },
});
