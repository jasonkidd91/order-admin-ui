import { BaseApi } from 'src/api/BaseApi';

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

class Api extends BaseApi {
  async getStoreList(): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/stores`;
    const response = await this.get(path);
    return response?.data;
  }

  async getPrinterList(): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/feieyun`;
    const response = await this.get(path);
    return response?.data;
  }

  async getStoreDetail(id: any): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/stores/${id}`;
    const response = await this.get(path);
    return response?.data;
  }

  async updateStore(store: object, id: any): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/stores/${id}`;
    const response = await this.post(path, store);
    return response;
  }
}

export default Api;
