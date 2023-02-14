export const SESSION_AUTH_KEY = 'authToken';

export type AuthState = {
  token?: string;
  [key: string]: any;
};
