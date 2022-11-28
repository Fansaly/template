## template-uni-app-vue3

项目基于 HBuilderX（`Vue3/Vite`）提供的模板  
查看 https://uniapp.dcloud.net.cn/quickstart-cli.html

### 路由拦截
对 uni 的导航 api `navigateTo` `redirectTo` `reLaunch` `switchTab` 进行了拦截（[了解更多](https://uniapp.dcloud.net.cn/api/interceptor.html#addinterceptor)），以配置简单的路由守卫。

> 对于使用 `navigation` 组件触发的导航无法拦截  
>
> 可在 `pages.json` 中配置 `meta` 的属性  
> `"type": "signin"` => 登录页面  
> `"requiredAuth": true` => 需要权限的页面  
>
> 另外对 `request` `downloadFile` `uploadFile` 的 **401** 状态，也做了“用户登录弹框”提示，查看 [src/utils/request](src/utils/request)

```json
{
  "pages": [
    {
      "path": "pages/home/index"
    },
    {
      "path": "pages/signin/index",
      "meta": { "type": "signin" }
    },
    {
      "path": "pages/protected/index",
      "meta": { "requiredAuth": true }
    }
  ]
}
```

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

- 打开小程序到**微信 web 开发者工具**
  ```
  pnpm open
  ```
  <details>
    <summary>提示</summary>

    可在项目根目录的 `.webdevtools.local` 文件中，配置“开发者工具”路径  
    > WSL 与 Windows 配置相同  
    > 使用默认路径时，可忽略该配置文件  
    > 目前仅支持“微信 web 开发者工具”  

    ```
    # 微信 web 开发者工具 - macOS
    WEBDEVTOOLS_WECHAT_MACOS=/Applications/wechatwebdevtools.app/Contents/MacOS/cli

    # 微信 web 开发者工具 - Windows
    WEBDEVTOOLS_WECHAT_WINDOWS=C:\Program Files (x86)\Tencent\微信web开发者工具\cli.bat
    ```
  </details>

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