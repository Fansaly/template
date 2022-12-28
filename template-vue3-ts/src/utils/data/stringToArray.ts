export const stringToArray = (str: string) => {
  if (typeof str !== 'string') {
    throw new Error("the parameter is not of type `string'.");
  }
  return str.trim().replace(/\s+/g, ' ').split(/[\s,]/);
};
