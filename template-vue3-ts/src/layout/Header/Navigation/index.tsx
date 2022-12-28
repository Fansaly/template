import { Menu } from 'ant-design-vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

import { useMenu } from '@/hooks';

import styles from './index.module.less';

export default defineComponent({
  setup() {
    const router = useRouter();
    const menu = useMenu();

    const handleClick = (menu: Route) => {
      router.push(menu.meta.fullpath);
    };

    return () => (
      <div class={styles.nav}>
        <Menu mode="horizontal" selectedKeys={menu.selectedKeys.value}>
          {menu.headerMenus.value.map((menu) => {
            return menu.meta.hidden ? null : (
              <Menu.Item key={menu.meta.fullpath} onClick={() => handleClick(menu)}>
                {menu.meta.title}
              </Menu.Item>
            );
          })}
        </Menu>
      </div>
    );
  },
});
