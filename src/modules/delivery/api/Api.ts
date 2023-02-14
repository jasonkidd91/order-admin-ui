import { BaseApi } from 'src/api/BaseApi';

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

class Api extends BaseApi {
  async getDeliveryDataList(slot_type: any): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/slot?slot_type=${slot_type}`;
    const response = await this.get(path);
    return response?.data;
  }

  async getDeliveryDataListBasedOnStore(slot_type: any, store_id: any): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/slot?slot_type=${slot_type}&store_id=${store_id}`;
    const response = await this.get(path);
    return response?.data;
  }

  async createDelivery(delivery: object): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/slot`;
    const response = await this.post(path, delivery);
    return response;
  }

  async updateDelivery(delivery: object, id: any): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/slot/${id}`;
    const response = await this.post(path, delivery);
    return response;
  }

  async getStoreList(): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/stores`;
    const response = await this.get(path);
    return response?.data;
  }

  async getStoreDetails(id: any): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/stores/${id}`;
    const response = await this.get(path);
    return response?.data;
  }

  async getSlotDetails(id: any): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/slot/${id}`;
    const response = await this.get(path);
    return response?.data;
  }

  async deleteSlotDetails(id: any): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/slot/${id}`;
    const response = await this.delete(path);
    return response?.data;
  }

  // -----------------------Zone ---------------------------------------------------
  async getZoneListBasedOnStore(store_id: any): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/zone?store_id=${store_id}`;
    const response = await this.get(path);
    return response?.data;
  }
}

export default Api;
