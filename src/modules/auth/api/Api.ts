import { BaseApi } from 'src/api/BaseApi';

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;
const userUrl = `${process.env.REACT_APP_USER_API}`;

class Api extends BaseApi {
  async authenticate(credential: object): Promise<any> {
    const path = `${baseUrl}${userUrl}/login`;
    const response = await this.post(path, credential);
    return response;
  }
}

export default Api;
