import { BaseApi } from 'src/api/BaseApi';

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

class Api extends BaseApi {
  async getDriverData(): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/drivers`;
    const response = await this.get(path);
    return response?.data;
  }

  async createDriver(driver: object): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/drivers`;
    const response = await this.post(path, driver);
    return response;
  }

  async retrieveDriver(id: any): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/drivers/${id}`;
    const response = await this.get(path);
    return response?.data;
  }

  async updateDriver(driver: object, id: any): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/drivers/${id}`;
    const response = await this.put(path, driver);
    return response;
  }

  async deleteDriver(id: any): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/drivers/${id}`;
    const response = await this.delete(path);
    return response;
  }

  async deleteCustomerAddress(customer_id: any, address_id: any): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/customers/${customer_id}/addresses/${address_id}`;
    const response = await this.delete(path);
    return response;
  }

  async getCustomerAddressList(id: any): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/customers/${id}/addresses`;
    const response = await this.get(path);
    return response?.data;
  }
}

export default Api;
