import { Breadcrumb } from 'ant-design-vue';
import { computed, defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import styles from './index.module.less';

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();

    const menus = computed(() => {
      return route.matched.map((item) => item.meta as RouteMeta);
    });

    const handleClick = (menu: RouteMeta) => () => {
      router.push(menu.fullpath);
    };

    return () => (
      <div class={styles.breadcrumb}>
        <Breadcrumb>
          {menus.value.map((menu, index) => (
            <Breadcrumb.Item
              {...(index < menus.value.length - 1
                ? { class: 'link-item', onClick: handleClick(menu) }
                : {})}
            >
              {menu.title}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </div>
    );
  },
});
