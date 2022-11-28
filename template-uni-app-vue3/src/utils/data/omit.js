import { stringToArray } from './stringToArray';

export const omit = (data, fields) => {
  fields = Array.isArray(fields)
    ? fields
    : typeof fields === 'string'
    ? stringToArray(fields)
    : [];

  if (!data || typeof data !== 'object' || fields.length === 0) {
    return data || {};
  }

  data = { ...data };

  fields.forEach((key) => {
    delete data[key];
  });

  return data;
};
