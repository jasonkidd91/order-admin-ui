import { BaseApiConfig, DEFAULT_API_CONFIG } from './BaseApiConfig';

export abstract class BaseApi {
  config: BaseApiConfig;
  auth: any;

  constructor(auth?: any, config: BaseApiConfig = DEFAULT_API_CONFIG) {
    this.auth = auth;
    this.config = config;
    if (auth && auth.token) {
      this.config.headers = {
        ...this.config.headers,
        Authorization: `Bearer ${auth.token}`,
      };
    }
  }

  async post(url: string, body?: object, headers?: { [key: string]: string }) {
    body = body || {};
    let response: any | Response = await this.fetchReq('POST', url, headers, body);
    return response;
  }
  async get(url: string, body?: object, headers?: { [key: string]: string }) {
    let response: any | Response = await this.fetchReq('GET', url, headers, body);
    return response;
  }
  async put(url: string, body?: object, headers?: { [key: string]: string }) {
    let response: any | Response = await this.fetchReq('PUT', url, headers, body);
    return response;
  }
  async patch(url: string, body?: object, headers?: { [key: string]: string }) {
    let response: any | Response = await this.fetchReq('PATCH', url, headers, body);
    return response;
  }
  async delete(url: string, body?: object, headers?: { [key: string]: string }) {
    let response: any | Response = await this.fetchReq('DELETE', url, headers, body);
    return response;
  }
  async download(
    filename: string,
    url: string,
    body?: object,
    headers?: { [key: string]: string },
  ) {
    let response: any | Response = await this.downloadReq(filename, 'GET', url, headers, body);
    return response;
  }
  async downloadWithPost(
    filename: string,
    url: string,
    body?: object,
    headers?: { [key: string]: string },
  ) {
    let response: any | Response = await this.downloadReqWithPost(
      filename,
      'POST',
      url,
      headers,
      body,
    );
    return response;
  }

  async fetchReq(
    methodType: 'DELETE' | 'GET' | 'POST' | 'PUT' | 'PATCH',
    url: string,
    headers?: { [key: string]: string },
    body?: object,
  ) {
    const requestHeaders = { ...this.config.headers, ...headers };
    let config: any | RequestInit = {
      method: methodType,
      headers: requestHeaders,
    };
    if (body) {
      let requestBody = JSON.stringify(body);
      config.body = requestBody;
    }

    let response: any | Response = await fetch(url, config);

    if (!response.ok) {
      // api common error handling
      switch (response.status) {
        // handle for different http status code
        default:
          break;
      }
      console.error(`method:${methodType}, url: ${url}`);
      console.error('request api error::', response);
    }
    try {
      let jsonData: object = await response.json();
      response.data = jsonData;
    } catch {
      response.data = response.data || null;
    }

    return response;
  }

  async downloadReq(
    filename: string,
    methodType: 'GET',
    url: string,
    headers?: { [key: string]: string },
    body?: object,
  ) {
    const requestHeaders = { ...this.config.headers, ...headers };
    let config: any | RequestInit = {
      method: methodType,
      headers: requestHeaders,
    };
    if (body) {
      let requestBody = JSON.stringify(body);
      config.body = requestBody;
    }

    let response: any | Response = await fetch(url, config);

    if (!response.ok) {
      // api common error handling
      switch (response.status) {
        // handle for different http status code
        default:
          break;
      }
      console.error(`method:${methodType}, url: ${url}`);
      console.error('request api error::', response);
    }
    try {
      let jsonData: object = await response.blob().then((blob: any) => {
        const fileurl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = fileurl;
        // the filename you want
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(fileurl);
      });
      response.data = jsonData;
    } catch {
      response.data = response.data || null;
    }

    return response;
  }

  async downloadReqWithPost(
    filename: string,
    methodType: 'POST',
    url: string,
    headers?: { [key: string]: string },
    body?: object,
  ) {
    const requestHeaders = { ...this.config.headers, ...headers };
    let config: any | RequestInit = {
      method: methodType,
      headers: requestHeaders,
    };
    if (body) {
      let requestBody = JSON.stringify(body);
      config.body = requestBody;
    }

    let response: any | Response = await fetch(url, config);

    if (!response.ok) {
      // api common error handling
      switch (response.status) {
        // handle for different http status code
        default:
          break;
      }
      console.error(`method:${methodType}, url: ${url}`);
      console.error('request api error::', response);
    }
    try {
      let jsonData: object = await response.blob().then((blob: any) => {
        const fileurl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = fileurl;
        // the filename you want
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(fileurl);
      });
      response.data = jsonData;
    } catch {
      response.data = response.data || null;
    }

    return response;
  }
}
