import path from 'path';
import { defineConfig } from 'vite';

import uni from '@dcloudio/vite-plugin-uni';
import eslint from 'vite-plugin-eslint';

const resolve = (dir) => path.join(__dirname, dir);

// https://cn.vitejs.dev/config
export default defineConfig({
  plugins: [uni(), eslint()],
  resolve: {
    alias: {
      '@': resolve('./src'),
    },
  },
  optimizeDeps: ['@dcloudio/uni-ui'],
});
