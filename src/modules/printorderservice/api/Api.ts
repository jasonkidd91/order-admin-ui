import { BaseApi } from 'src/api/BaseApi';

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

class Api extends BaseApi {
  async getItemList(page?: { page: number; limit?: number }): Promise<any> {
    const path = `${baseUrl}/deliverypreparation?page=${page?.page || 1}&limit=${page?.limit}`;
    const response = await this.get(path);
    return response;
  }

  async getDeliveryDriversWithPreparationId(id: any): Promise<any> {
    const path = `${baseUrl}/deliverypreparation/${id}/drivers`;
    const response = await this.get(path);
    return response;
  }

  async getDeliveryDrivers(): Promise<any> {
    const path = `${baseUrl}/deliverypreparation/drivers`;
    const response = await this.get(path);
    return response;
  }

  async getPrintOrder(request: object): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/printorder`;
    const response = await this.post(path, request);
    return response;
  }

  async printOrder(request: object): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/printorder/print`;
    const response = await this.post(path, request);
    return response;
  }

  async deleteDeliveryPlan(id: any): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/deliverypreparation/delete/${id}`;
    const response = await this.delete(path);
    return response;
  }

  async getDeliveryPlanDetail(id: any): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/deliverypreparation/detail/${id}`;
    const response = await this.get(path);
    return response;
  }

  async refreshDeliveryPlanDetail(id: any): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/deliverypreparation/refresh/${id}`;
    const response = await this.get(path);
    return response;
  }

  async assginDriver(request: object): Promise<any> {
    const path = `${baseUrl}/deliverypreparation/assigndriver`;
    const response = await this.post(path, request);
    return response;
  }

  async assignDriverOrderList(request: object): Promise<any> {
    const path = `${baseUrl}/deliverypreparation/assigndriverorderlist`;
    const response = await this.post(path, request);
    return response;
  }

  async assignDriverOrderIndividual(request: object): Promise<any> {
    const path = `${baseUrl}/deliverypreparation/assigndriverorderindividual`;
    const response = await this.post(path, request);
    return response;
  }

  async getStoreSlots(): Promise<any> {
    const path = `${baseUrl}/slot`;
    const response = await this.get(path);
    return response;
  }

  async getStores(): Promise<any> {
    const path = `${baseUrl}/stores`;
    const response = await this.get(path);
    return response;
  }

  async downloadDeliveryPlan(filename: string, deliveryid: any): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/deliverypreparation/export/${deliveryid}`;
    const response = await this.download(filename, path);
    return response;
  }

  async getDriverZoneList(id: any): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/v2/driverzone/deliverypreparation/${id}`;
    const response = await this.get(path);
    return response?.data;
  }

  async getZoneOrderDetails(request: object): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/deliverypreparation/zone/order/details`;
    const response = await this.post(path, request);
    return response?.data;
  }

  async getZoneOrderList(request: object): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/deliverypreparation/zone/order`;
    const response = await this.post(path, request);
    return response?.data;
  }
}

export default Api;
