export const isRegExp = (re) => {
  return Object.prototype.toString.call(re) === '[object RegExp]';
};
