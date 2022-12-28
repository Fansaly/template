# template-vue3-composition-options

### 项目基于
| package                           | used      | latest |
| :---                              | ---       | --- |
| [Vite][vite-github]               | `v4.0.3`  | [![npm version][vite-npm-version]][vite-npm-package] |
| [Vue][vue-github]                 | `v3.2.45` | [![npm version][vue-npm-version]][vue-npm-package] |
| [Pinia][pinia-github]             | `v2.0.28` | [![npm version][pinia-npm-version]][pinia-npm-package] |
| [Vue Router][vue-router-github]   | `v4.1.6`  | [![npm version][vue-router-npm-version]][vue-router-npm-package] |
| [Ant Design Vue][antd-vue-github] | `v3.2.15` | [![npm version][antd-vue-npm-version]][antd-vue-npm-package] |
| [Vite PWA][vite-pwa-github]       | `v0.14.0` | [![npm version][vite-pwa-npm-version]][vite-pwa-npm-package] |

[vite-github]: https://github.com/vitejs/vite
[vite-npm-version]: https://img.shields.io/npm/v/vite.svg
[vite-npm-package]: https://npmjs.com/package/vite

[vue-github]: https://github.com/vuejs/core
[vue-npm-version]: https://img.shields.io/npm/v/vue.svg
[vue-npm-package]: https://npmjs.com/package/vue

[pinia-github]: https://github.com/vuejs/pinia
[pinia-npm-version]: https://img.shields.io/npm/v/pinia.svg
[pinia-npm-package]: https://npmjs.com/package/pinia

[vue-router-github]: https://github.com/vuejs/router
[vue-router-npm-version]: https://img.shields.io/npm/v/vue-router.svg
[vue-router-npm-package]: https://npmjs.com/package/vue-router

[antd-vue-github]: https://github.com/vueComponent/ant-design-vue
[antd-vue-npm-version]: https://img.shields.io/npm/v/ant-design-vue.svg
[antd-vue-npm-package]: https://npmjs.com/package/ant-design-vue

[vite-pwa-github]: https://github.com/vite-pwa/vite-plugin-pwa
[vite-pwa-npm-version]: https://img.shields.io/npm/v/vite-plugin-pwa.svg
[vite-pwa-npm-package]: https://npmjs.com/package/vite-plugin-pwa

### 开发环境
- 安装 node  
  node 版本 `>=16.0.0 <20.0.0`  
  https://nodejs.org/zh-cn/download/releases
- 安装 pnpm  
  pnpm 版本 `>=6.0.0 <8.0.0`  
  https://pnpm.io/zh/installation

### 项目开发
- 安装项目依赖
  ```
  pnpm install
  ```

- 开始开发
  ```
  pnpm dev
  ```

- 构建应用
  ```sh
  pnpm build
  ```

- 打包部署文件
  ```sh
  pnpm zip
  ```

- 检查编码风格
  ```
  pnpm check
  ```

- 修复编码风格
  ```
  pnpm fix
  ```

### 项目规范
- eslint  
  检查、修复编码风格
- prettier  
  检查、修复编码风格
- lint-staged  
  git commit 时，执行 eslint、prettier 检查
- commitlint  
  检查 git commit message

### 自定义配置
查看 https://cn.vitejs.dev/config

### License
[MIT licensed](../LICENSE)