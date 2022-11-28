export const compareSemverVersion = (version = '', target = '') => {
  const versions = version.trim().split(/[.\s]+/);
  const targets = target.trim().split(/[.\s]+/);

  let length = Math.min(versions.length, targets.length);
  let result;

  while (length-- > 0) {
    const v = versions.shift() as string;
    const t = targets.shift() as string;

    if (v > t) {
      result = 'gt';
      break;
    }

    if (v < t) {
      result = 'lt';
      break;
    }

    if (length === 0 && versions.length === targets.length) {
      result = 'eq';
      break;
    }
  }

  return result;
};

type Action = 'eq' | 'lt' | 'lte' | 'gt' | 'gte';

export const compareVersion: {
  [k in Action]: (version: string, target: string) => boolean;
} = {
  eq(version, target) {
    return 'eq' === compareSemverVersion(version, target);
  },
  lt(version, target) {
    return 'lt' === compareSemverVersion(version, target);
  },
  lte(version, target) {
    const result = compareSemverVersion(version, target);
    return 'lt' === result || 'eq' === result;
  },
  gt(version, target) {
    return 'gt' === compareSemverVersion(version, target);
  },
  gte(version, target) {
    const result = compareSemverVersion(version, target);
    return 'gt' === result || 'eq' === result;
  },
};
