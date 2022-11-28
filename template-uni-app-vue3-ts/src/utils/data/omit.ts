import { stringToArray } from './stringToArray';

export const omit = <T = any>(data: any, fields?: string | string[]): T => {
  fields = Array.isArray(fields)
    ? fields
    : typeof fields === 'string'
    ? stringToArray(fields)
    : [];

  if (!data || typeof data !== 'object' || fields.length === 0) {
    return (data || {}) as T;
  }

  data = { ...data };

  fields.forEach((key) => {
    delete data[key];
  });

  return data as T;
};
