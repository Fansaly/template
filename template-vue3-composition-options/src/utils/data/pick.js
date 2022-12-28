import { stringToArray } from './stringToArray';

export const pick = (data, fields) => {
  fields = Array.isArray(fields)
    ? fields
    : typeof fields === 'string'
    ? stringToArray(fields)
    : [];

  if (!data || typeof data !== 'object' || fields.length === 0) {
    return {};
  }

  const hasOwnProperty = Object.prototype.hasOwnProperty.bind(data);

  return fields.reduce(
    (acc, key) => ({
      ...acc,
      ...(hasOwnProperty(key) ? { [key]: data[key] } : {}),
    }),
    {},
  );
};
