const TOKEN_REQUEST = 'token';
const TOKEN_STORE = 'TOKEN';
const USER_INFO = 'USER_INFO';

const baseURL =
  process.env.NODE_ENV === 'development' ? '/api' : 'https://example.com/api';

export { TOKEN_REQUEST, TOKEN_STORE, USER_INFO, baseURL };
