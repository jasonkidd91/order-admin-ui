import { BaseApi } from 'src/api/BaseApi';

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

class Api extends BaseApi {
  async getPrinterList(): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/feieyun`;
    const response = await this.get(path);
    return response?.data;
  }
}

export default Api;
