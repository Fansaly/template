import { defineComponent, h } from 'vue';
import { RouterView } from 'vue-router';

export default defineComponent({
  name: 'PageRouterView',
  setup() {
    return () => (
      <RouterView>
        {({ Component, route }) => {
          const meta = route.meta ?? {};
          const key = meta.fullpath;

          return Component ? h(Component, { key }) : null;
        }}
      </RouterView>
    );
  },
});
