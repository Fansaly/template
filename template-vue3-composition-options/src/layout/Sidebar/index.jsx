import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import { Button } from 'ant-design-vue';
import clsx from 'clsx';
import { defineComponent } from 'vue';

import { useSettingsStore } from '@/store';
import { useMenu } from '@/hooks';

import MenuList from './MenuList';

import styles from './index.module.less';

export default defineComponent({
  setup() {
    const settingsStore = useSettingsStore();
    const menu = useMenu();

    const handleToggleSider = () => {
      settingsStore.toggleSider();
    };

    return () => {
      const { sidebar } = settingsStore;

      return (
        <div
          class={clsx(styles.sidebar, {
            [styles['fixed-sidebar']]: sidebar.fixed,
            [styles['sidebar-collapsed']]: sidebar.collapsed,
          })}
        >
          <div class={styles.main}>
            <div class={styles['menu-container']}>
              <MenuList menus={menu.sidebarMenus.value} />
            </div>
          </div>

          <div class={styles.extend}>
            <Button
              class="simple-icon-btn btn"
              v-slots={{
                icon: () =>
                  sidebar.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />,
              }}
              onClick={handleToggleSider}
            />
          </div>
        </div>
      );
    };
  },
});
