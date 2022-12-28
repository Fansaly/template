import { defineComponent } from 'vue';
import styles from './index.module.less';

export default defineComponent({
  setup() {
    return () => (
      <div class={styles.footer}>
        <div class={styles.copyright}>&copy; 2022 Powered by U</div>
      </div>
    );
  },
});
