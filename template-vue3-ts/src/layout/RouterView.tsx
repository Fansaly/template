import { defineComponent, h, VNode } from 'vue';
import { RouteLocation, RouterView } from 'vue-router';

export default defineComponent({
  name: 'PageRouterView',
  setup() {
    return () => (
      <RouterView>
        {({ Component, route }: { Component: VNode; route: RouteLocation }) => {
          const meta = route.meta ?? {};
          const key = meta.fullpath as undefined | string;

          return Component ? h(Component, { key }) : null;
        }}
      </RouterView>
    );
  },
});
