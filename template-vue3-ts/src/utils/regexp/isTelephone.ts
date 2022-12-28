export const isTelephone = (number: string) => {
  const re = /^(0\d{2,3}-?)?[1-9]\d{6,7}$/;
  return re.test(number);
};
