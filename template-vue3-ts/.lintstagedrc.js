module.exports = {
  '*.{js,jsx,vue}': ['eslint', 'prettier --loglevel warn --debug-check'],
  '*.{ts,tsx,vue}': [
    'eslint',
    'prettier --loglevel warn --debug-check',
    // https://github.com/microsoft/TypeScript/issues/27379
    // it will check all files, not just git staged files
    () => 'vue-tsc --skipLibCheck --noEmit',
  ],
};
