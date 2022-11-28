export type Loading = boolean | (UniApp.ShowLoadingOptions & { timeout?: number });

export type Payload<T = Record<string, any>> = { loading?: Loading } & T;

export interface Response {
  code?: number;
  data: any;
  time?: number | string;
  message?: string;
  success?: boolean;
}

export interface Signin extends Payload {
  code: string;
  nickName: string;
  avatarUrl: string;
}
