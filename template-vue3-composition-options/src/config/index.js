const isDev = process.env.NODE_ENV === 'development';

const NAME = 'template-vue3-composition-options';
const publicURL = '/';

// axios
const AXIOS_CONFIG = {
  timeout: 0,
  baseURL: '/api',
};

// storage key
const PREFIX = 'V_';
const TOKEN_REQUEST = 'token';
const TOKEN_STORE = `${PREFIX}TOKEN`;
const USER_INFO = `${PREFIX}USER_INFO`;
const SETTINGS = `${PREFIX}SETS`;

export {
  isDev,
  NAME,
  publicURL,
  AXIOS_CONFIG,
  TOKEN_REQUEST,
  TOKEN_STORE,
  USER_INFO,
  SETTINGS,
};
