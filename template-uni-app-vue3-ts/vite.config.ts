import path from 'path';
import { defineConfig } from 'vite';

import uni from '@dcloudio/vite-plugin-uni';
import eslint from 'vite-plugin-eslint';
import checker from 'vite-plugin-checker';

const resolve = (dir) => path.join(__dirname, dir);

// https://cn.vitejs.dev/config
export default defineConfig({
  plugins: [uni(), eslint(), checker({ vueTsc: true })],
  resolve: {
    alias: {
      '@': resolve('./src'),
    },
  },
  optimizeDeps: ['@dcloudio/uni-ui'],
});
