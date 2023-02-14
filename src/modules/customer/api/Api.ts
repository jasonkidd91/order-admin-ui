import { BaseApi } from 'src/api/BaseApi';

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

class Api extends BaseApi {
  async getCustomerData(): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/customers`;
    const response = await this.get(path);
    return response?.data?.data;
  }

  async getCustomerDataList(page: any, customerSearch: any): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/customers?page=${page}&first_name=${customerSearch?.first_name}&phone_no=${customerSearch?.phone_no}`;
    const response = await this.get(path);
    return response?.data?.data;
  }

  async createCustomer(customer: object): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/customers`;
    const response = await this.post(path, customer);
    return response;
  }

  async retrieveCustomer(id: any): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/customers/${id}`;
    const response = await this.get(path);
    return response?.data;
  }

  async updateCustomer(customer: object, id: any): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/customers/${id}`;
    const response = await this.post(path, customer);
    return response;
  }

  async deleteCustomer(id: any): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/customers/${id}`;
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

  async getCustomerAddress(customer_id: any, address_id: any): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/customers/${customer_id}/addresses/${address_id}`;
    const response = await this.get(path);
    return response?.data;
  }

  async createCustomerAddress(address: any): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/customers/${address.customer_id}/addresses`;
    const response = await this.post(path, address);
    return response;
  }

  async updateCustomerAddress(address: any): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/customers/${address.customer_id}/addresses/${address.id}`;
    const response = await this.post(path, address);
    return response;
  }
}

export default Api;
