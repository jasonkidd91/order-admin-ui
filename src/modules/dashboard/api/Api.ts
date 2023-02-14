import { BaseApi } from 'src/api/BaseApi';

const mockUrl = `${process.env.REACT_APP_MOCK_API}`;

class Api extends BaseApi {
  async getDashboardData(): Promise<any> {
    const path = mockUrl + '/';
    const response = await this.get(path);
    return response?.data;
  }
}

export default Api;
