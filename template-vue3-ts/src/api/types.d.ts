export interface Response {
  code: number;
  data: any;
  time?: number | string;
  message?: string;
}

export interface Signin {
  mobile?: string;
  password?: string;
  captcha?: number | string;
}

export interface Signup {
  code?: string | number;
  name: string;
  mobile: string;
  password: string;
  captcha: number | string;
}

export interface SmsCode {
  biz: string;
  mobile: string;
}
