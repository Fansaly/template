export const isRegExp = (re: RegExp) => {
  return Object.prototype.toString.call(re) === '[object RegExp]';
};
