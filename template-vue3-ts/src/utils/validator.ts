import { isID, isMobile, isTelephone } from '@/utils';

export const validateMobile = (rule: any, value: any) => {
  let { required } = rule;
  required = required !== false;

  return new Promise<void>((resolve, reject) => {
    if (!value) {
      if (required) {
        return reject(new Error('请输入手机号'));
      } else {
        return resolve();
      }
    }

    if (!isMobile(value)) {
      return reject(new Error('请输入正确的手机号码'));
    } else {
      return resolve();
    }
  });
};

export const validateTelephone = (rule: any, value: any) => {
  let { required } = rule;
  required = required !== false;

  return new Promise<void>((resolve, reject) => {
    if (!value) {
      if (required) {
        return reject(new Error('请输入固话号码'));
      } else {
        return resolve();
      }
    }

    if (!isTelephone(value)) {
      return reject(new Error('请输入正确的固话号码'));
    } else {
      return resolve();
    }
  });
};

export const validatePhoneNo = (rule: any, value: any) => {
  return new Promise<void>((resolve, reject) => {
    validateMobile(rule, value)
      .then(() => {
        return resolve();
      })
      .catch(() => {
        validateTelephone(rule, value)
          .then(() => {
            return resolve();
          })
          .catch(() => {
            return reject(new Error('请输入正确的手机、固话号码'));
          });
      });
  });
};

export const validateSmsCode = (rule: any, value: any) => {
  return new Promise<void>((resolve, reject) => {
    if (!/^[\d]{6}$/.test(value)) {
      return reject(new Error('请输入 6 位数字验证码'));
    } else {
      return resolve();
    }
  });
};

export const validatePassword = (rule: any, value: any) => {
  return new Promise<void>((resolve, reject) => {
    if (!value) {
      return reject(new Error('请输入密码'));
    } else if (!/^[-_.\d\w]{6,30}$/.test(value)) {
      return reject(new Error('请输入 6-30 位的密码'));
    } else {
      return resolve();
    }
  });
};

export const validateID = (rule: any, value: any) => {
  return new Promise<void>((resolve, reject) => {
    if (!value) {
      return reject(new Error('请输入身份证号'));
    } else if (!isID(value)) {
      return reject(new Error('请输入正确的身份证号'));
    } else {
      return resolve();
    }
  });
};

export const validateNumber = (rule: any, value: any) => {
  const { required = false, min, max, integer = false } = rule;

  let message = rule.message as string;
  let number = NaN;
  if (`${value}`.trim() !== '') {
    number = Number(value);
  }

  return new Promise<void>((resolve, reject) => {
    if (!required && (value === undefined || value === '')) {
      return resolve();
    }

    if (!Number.isFinite(number)) {
      message = message || '请输入一个数字';
      return reject(new Error(message));
    }

    if (integer && !Number.isInteger(number)) {
      message = message || '请输入一个整数';
      return reject(new Error(message));
    }

    if (min !== undefined && number < min) {
      message = message || `请输入不小于 ${min} 的数字`;
      return reject(new Error(message));
    }
    if (max !== undefined && number > max) {
      message = message || `请输入不大于 ${max} 的数字`;
      return reject(new Error(message));
    }

    return resolve();
  });
};
