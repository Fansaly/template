export const absolutePath = (path = '') => (!/^\//.test(path) ? `/${path}` : path);

export const getCurrentPage = () => {
  const pages = [...getCurrentPages()];
  const page = pages.pop();
  return page;
};

export const getCurrentPagePath = () => {
  const page = getCurrentPage();
  return absolutePath(page.route);
};

export const transformPath = (fullpath) => {
  const re = /^(.*?)(\?(.*))?$/;
  const matches = fullpath.match(re);
  const to = matches[1];
  const queryString = matches[3];

  const currentPage = getCurrentPage();
  const from = absolutePath(currentPage.route);

  return { to, from, queryString };
};

export const resolvePath = ({ to, from }) => {
  if (/^\//.test(to)) {
    return to;
  }

  const path = from ? from.split('/') : [];
  path.pop();

  to.split('/').forEach((str) => {
    switch (str) {
      case '.':
        break;
      case '..':
        path.pop();
        break;
      default:
        path.push(str);
        break;
    }
  });

  return absolutePath(path.join('/'));
};
