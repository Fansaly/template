import clsx from 'clsx';
import { defineComponent } from 'vue';

import styles from './index.module.less';

export default defineComponent({
  setup() {
    return () => (
      <div class={clsx('no-margin-top', styles.footer)}>
        Copyright &copy; 2022 - Present Powered By U
      </div>
    );
  },
});
