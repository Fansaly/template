import path from 'path';
import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

import { VitePWA } from 'vite-plugin-pwa';
import replace from '@rollup/plugin-replace';

import svgLoader from 'vite-svg-loader';
import { createStyleImportPlugin, AndDesignVueResolve } from 'vite-plugin-style-import';

import eslint from 'vite-plugin-eslint';
import checker from 'vite-plugin-checker';
import { viteMockServe } from 'vite-plugin-mock';

import { publicURL } from './src/config';
import { pwaOptions, replaceOptions } from './src/pwa/options';

const resolve = (dir) => path.join(__dirname, dir);

// https://cn.vitejs.dev/config
export default defineConfig(({ mode }) => ({
  base: mode === 'development' ? '/' : publicURL,
  server: {
    host: '0.0.0.0',
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          // Check less variables to customize ant design theme:
          // https://github.com/ant-design/ant-design/blob/4.x-stable/components/style/themes/default.less
          'body-background': '#f0f2f5',
        },
      },
    },
  },
  build: {
    sourcemap: process.env.SOURCE_MAP === 'true',
  },
  plugins: [
    vue(),
    vueJsx(),
    VitePWA(pwaOptions),
    replace(replaceOptions),
    svgLoader(),
    createStyleImportPlugin({
      resolves: [AndDesignVueResolve()],
    }),
    eslint(),
    checker({ vueTsc: true }),
    viteMockServe({
      mockPath: 'src/mock',
      localEnabled: mode === 'development',
    }),
  ],
  resolve: {
    alias: {
      '@': resolve('./src'),
    },
  },
}));
