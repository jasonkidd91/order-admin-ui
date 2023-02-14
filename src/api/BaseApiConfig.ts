export interface BaseApiConfig {
  headers?: { [key: string]: string };
}

export const DEFAULT_API_CONFIG: BaseApiConfig = {
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
    'Cache-control': 'no-store',
  },
};
