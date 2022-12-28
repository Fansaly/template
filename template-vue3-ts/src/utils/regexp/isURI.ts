export const isURI = (str: string) => {
  const re = /^((http(s)?:)?\/\/)?[^/]+\.\w{2,7}.*$/i;
  return re.test(str);
};
