export const isURI = (str) => {
  const re = /^((http(s)?:)?\/\/)?[^/]+\.\w{2,7}.*$/i;
  return re.test(str);
};
