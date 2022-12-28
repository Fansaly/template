import './styles/index.less';

import clsx from 'clsx';
import { defineComponent, h, Transition, VNode } from 'vue';
import { RouteLocation, RouterView } from 'vue-router';

import { useSettingsStore } from '@/store';

import Extra from './Extra';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';

export default defineComponent({
  name: 'DefaultLayout',
  setup() {
    const settingsStore = useSettingsStore();

    return () => {
      const { header, sidebar } = settingsStore;

      return (
        <div
          class={clsx('app-container', {
            'fixed-header': header.fixed,
            'sidebar-collapsed': sidebar.collapsed,
          })}
        >
          <Header />
          <Sidebar />

          <div class="app-content">
            <Extra />

            <RouterView>
              {({ Component, route }: { Component: VNode; route: RouteLocation }) => {
                const meta = route.meta ?? {};
                const key = meta.fullpath ? `ani-${meta.fullpath}` : undefined;
                const transitionName = (meta.transition as string) ?? 'slide';

                return (
                  <Transition name={transitionName} mode="out-in">
                    {Component && h(Component, { key })}
                  </Transition>
                );
              }}
            </RouterView>

            <Footer />
          </div>
        </div>
      );
    };
  },
});
