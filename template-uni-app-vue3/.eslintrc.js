module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    babelOptions: {
      plugins: ['@babel/plugin-syntax-jsx'],
    },
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    warnOnUnsupportedTypeScriptVersion: false,
  },
  plugins: ['vue', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    '@vue/prettier', // Make sure this is always the last element in the array.
  ],
  globals: {
    App: 'readonly',
    Page: 'readonly',
    Component: 'readonly',
    Behavior: 'readonly',
    getApp: 'readonly',
    getCurrentPages: 'readonly',
    plus: 'readonly',
    uni: 'readonly',
    uniCloud: 'readonly',
    wx: 'readonly',
    my: 'readonly',
    swan: 'readonly',
    tt: 'readonly',
    ks: 'readonly',
    qh: 'readonly',
    qa: 'readonly',
    xhs: 'readonly',
    HWH5: 'readonly',
    weex: 'readonly',
    __id__: 'readonly',
    __uniConfig: 'readonly',
    __uniRoutes: 'readonly',
    __registerPage: 'readonly',
    UniViewJSBridge: 'readonly',
    UniServiceJSBridge: 'readonly',
    __DEV__: 'readonly',
    __VIEW__: 'readonly',
    __PLATFORM__: 'readonly',
    __VERSION__: 'readonly',
    __GLOBAL__: 'readonly',
    __PLATFORM_TITLE__: 'readonly',
    __PLATFORM_PREFIX__: 'readonly',
    it: 'readonly',
    describe: 'readonly',
    expect: 'readonly',
  },
  rules: {
    // https://eslint.cn/docs/rules
    semi: ['error', 'always'],
    'semi-spacing': [
      'error',
      {
        before: false,
        after: true,
      },
    ],
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    // indentation rule conflict with prettier
    // indent: [
    //   'error',
    //   2,
    //   {
    //     SwitchCase: 1,
    //     ignoredNodes: ['TemplateLiteral'],
    //   },
    // ],
    'template-curly-spacing': ['error', 'never'],
    'space-before-blocks': 'error',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'generator-star-spacing': [
      'error',
      {
        before: true,
        after: false,
      },
    ],

    'comma-dangle': ['error', 'always-multiline'],
    'dot-location': ['error', 'property'],
    'dot-notation': [
      'error',
      {
        allowKeywords: true,
      },
    ],
    eqeqeq: ['error', 'always'],
    'no-unused-vars': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'warn',

    // https://eslint.vuejs.org/rules
    'vue/multi-word-component-names': 'off',
    'vue/component-definition-name-casing': 'off',
    'vue/component-name-in-template-casing': 'off',
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 5,
        multiline: {
          max: 1,
        },
      },
    ],
    'vue/attribute-hyphenation': 'off',
    'vue/no-v-model-argument': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',

    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
};
