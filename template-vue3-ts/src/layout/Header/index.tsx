import clsx from 'clsx';
import { defineComponent } from 'vue';

import LogoSvg from '@/assets/logo.svg';
import { useSettingsStore } from '@/store';

import Extend from './Extend';
import Navigation from './Navigation';
import styles from './index.module.less';

export default defineComponent({
  setup() {
    const settingsStore = useSettingsStore();

    return () => {
      const { header } = settingsStore;

      return (
        <div class={clsx(styles.header, { [styles['fixed-header']]: header.fixed })}>
          <div class={styles.logo}>
            <LogoSvg class={styles.icon} />
            <span class={styles.text}>vue3-ts</span>
          </div>

          <Navigation />

          <Extend />
        </div>
      );
    };
  },
});
