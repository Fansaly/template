import { Menu } from 'ant-design-vue';
import clsx from 'clsx';
import { defineComponent } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

import MenuIcon from '@/components/MenuIcon';
import { useSettingsStore } from '@/store';
import { useMenu } from '@/hooks';

interface Props {
  maxLevel?: number;
  level?: number;
  link?: boolean;
  menus: Route[];
  parent?: Route;
}

const MenuItem = defineComponent({
  name: 'MenuItem',
  props: {
    maxLevel: {
      required: false,
      type: Number as PropType<Props['maxLevel']>,
    },
    level: {
      required: false,
      type: Number as PropType<Props['level']>,
    },
    link: {
      required: false,
      type: Boolean as PropType<Props['link']>,
    },
    menus: {
      required: true,
      type: Array as PropType<Props['menus']>,
    },
    parent: {
      required: false,
      type: Object as PropType<Props['parent']>,
    },
  },
  setup(props) {
    const router = useRouter();

    const handleClick = (menu: Route) => () => {
      router.push(menu.meta.fullpath);
    };

    return () => {
      const { maxLevel, level = 1, link, menus } = props;

      return menus.map(({ children = [], ...menu }) => {
        if (menu.meta.hidden) {
          return null;
        }

        children = children.filter((route) => {
          return !route.meta.hidden && !/^\/?:[_a-zA-Z]+/.test(route.path);
        });

        const renderChildren = children.length > 0 && (!maxLevel || level < maxLevel);

        return renderChildren ? (
          <MenuList
            maxLevel={maxLevel}
            level={level}
            link={link}
            menus={children}
            parent={menu}
          />
        ) : (
          <Menu.Item
            key={menu.meta.fullpath}
            v-slots={{
              default: () =>
                link ? (
                  <RouterLink to={menu.meta.fullpath}>{menu.meta.title}</RouterLink>
                ) : (
                  menu.meta.title
                ),
              icon: () => <MenuIcon icon={menu.meta.icon} />,
            }}
            {...(!link ? { onClick: handleClick(menu) } : {})}
          />
        );
      });
    };
  },
});

const MenuList = defineComponent({
  name: 'MenuList',
  props: {
    maxLevel: {
      required: false,
      type: Number as PropType<Props['maxLevel']>,
    },
    level: {
      required: false,
      type: Number as PropType<Props['level']>,
    },
    link: {
      required: false,
      type: Boolean as PropType<Props['link']>,
    },
    menus: {
      required: true,
      type: Array as PropType<Props['menus']>,
    },
    parent: {
      required: false,
      type: Object as PropType<Props['parent']>,
    },
  },
  setup(props) {
    const menu = useMenu();
    const settingsStore = useSettingsStore();

    return () => {
      const { level = 0, link, parent } = props;

      return !parent ? (
        <Menu
          mode="inline"
          openKeys={menu.openKeys.value}
          selectedKeys={menu.selectedKeys.value}
          inlineCollapsed={settingsStore.sidebar.collapsed}
        >
          <MenuItem {...{ ...props, level: level + 1 }} />
        </Menu>
      ) : (
        <Menu.SubMenu
          key={parent.meta.fullpath}
          class={clsx(`submenu-${level}`, {
            'should-selected': menu.selectedKeys.value.includes(parent.meta.fullpath),
          })}
          v-slots={{
            title: () => (link ? <a>{parent.meta.title}</a> : parent.meta.title),
            icon: () => <MenuIcon icon={parent.meta.icon} />,
          }}
        >
          <MenuItem {...{ ...props, level: level + 1 }} />
        </Menu.SubMenu>
      );
    };
  },
});

export default MenuList;
