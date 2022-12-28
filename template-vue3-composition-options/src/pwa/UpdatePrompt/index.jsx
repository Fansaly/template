import { CheckCircleOutlined, InfoCircleOutlined } from '@ant-design/icons-vue';
import { Button, notification as Notification, Typography } from 'ant-design-vue';
import { useRegisterSW } from 'virtual:pwa-register/vue';
import { defineComponent, Fragment, h, watchEffect } from 'vue';

import { isDev } from '@/config';

import styles from './index.module.less';

export default defineComponent({
  name: 'UpdatePrompt',
  setup() {
    // replaced dynamically
    const buildDate = '__DATE__';
    // replaced dyanmicaly
    const reloadSW = '__RELOAD_SW__';

    const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
      immediate: true,
      /* eslint-disable no-console */
      onRegisteredSW(swUrl, r) {
        if (isDev) {
          console.groupCollapsed('Service Worker');
          console.log(`Script: ${swUrl}`);
        }

        if (reloadSW === 'true') {
          r &&
            setInterval(async () => {
              console.log('Checking for sw update');
              await r.update();
            }, 3000);
        } else if (isDev) {
          console.log('SW Registered Successful:');
          console.log(r);
          console.groupEnd();
        }
      },
      onRegisterError(error) {
        console.error('SW registration error', error);
      },
      /* eslint-enable no-console */
    });

    watchEffect(() => {
      if (offlineReady.value || needRefresh.value) {
        open();
      }
    });

    const open = () => {
      Notification.open({
        key: buildDate,
        icon: () => {
          return offlineReady.value
            ? h(InfoCircleOutlined, { class: styles.info })
            : h(CheckCircleOutlined, { class: styles.available });
        },
        message: () =>
          h(Fragment, null, [
            offlineReady.value ? 'APP 已准备就绪' : '有新版本可用',
            h(Typography, { style: { display: 'none' } }, { default: () => buildDate }),
          ]),
        duration: null,
        placement: 'bottomRight',
        style: { width: '300px' },
        btn: () =>
          needRefresh.value
            ? h(
                Button,
                { size: 'middle', type: 'primary', onClick: () => updateServiceWorker() },
                {
                  default: () => '更新',
                },
              )
            : null,
        onClose: () => close(),
      });
    };

    const close = async () => {
      Notification.close(buildDate);

      setTimeout(() => {
        offlineReady.value = false;
        needRefresh.value = false;
        // https://github.com/vueComponent/ant-design-vue/blob/main/components/notification/style/index.less#L167
      }, 210 /* 0.2s */);
    };

    return () => null;
  },
});
