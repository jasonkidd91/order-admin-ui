import { BaseApi } from 'src/api/BaseApi';

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

class Api extends BaseApi {
  // -----------------------Zone ---------------------------------------------------
  async getDriverZoneList(): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/v2/driverzone`;
    const response = await this.get(path);
    return response?.data;
  }

  async createDriverZone(driverZone: object): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/v2/driverzone`;
    const response = await this.post(path, driverZone);
    return response;
  }

  async updateDriverZone(driverZone: any): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/v2/driverzone/${driverZone.id}`;
    const response = await this.post(path, driverZone);
    return response;
  }

  async deleteDriverZone(driverZone: any): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/driverzone/${driverZone.id}`;
    const response = await this.delete(path);
    return response;
  }

  async getDriverLinkList(driverZone: any): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/driverzone/${driverZone.id}/drivers`;
    const response = await this.get(path);
    return response?.data;
  }

  async getDriverList(): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/drivers`;
    const response = await this.get(path);
    return response?.data;
  }

  async updateDriverLinkList(driverZone: any, driverLink: any): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/driverzone/${driverZone.id}/drivers`;
    const response = await this.post(path, driverLink);
    return response;
  }
}

export default Api;
