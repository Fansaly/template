const ESLintPlugin = require('eslint-webpack-plugin');

// https://cli.vuejs.org/zh/config
module.exports = {
  transpileDependencies: ['@dcloudio/uni-ui', 'uview-ui'],
  chainWebpack: (config) => {
    config
      .plugin('ESLintPlugin')
      .use(ESLintPlugin, [{ failOnError: false }])
      .end();
  },
};
