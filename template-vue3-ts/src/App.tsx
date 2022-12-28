import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { defineComponent, h, KeepAlive, Suspense, VNode } from 'vue';
import { RouteLocation, RouterView } from 'vue-router';

import UpdatePrompt from '@/pwa/UpdatePrompt';

// https://github.com/vuejs/core/blob/main/packages/runtime-core/src/h.ts#L24
const ComponentRender = (Component: VNode, key?: string) => (
  <Suspense
    v-slots={{
      fallback: () => ' 加载中... ',
      default: () => h(Component, { key }),
    }}
  />
);

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <ConfigProvider locale={zhCN}>
        <RouterView>
          {({ Component, route }: { Component: VNode; route: RouteLocation }) => {
            const meta = route.meta ?? {};
            const keepAlive = meta.keepAlive;
            const key = meta.usePathKey ? route.path : undefined;

            return !Component ? null : keepAlive ? (
              <KeepAlive>{ComponentRender(Component, key)}</KeepAlive>
            ) : (
              ComponentRender(Component, key)
            );
          }}
        </RouterView>
        <UpdatePrompt />
      </ConfigProvider>
    );
  },
});
