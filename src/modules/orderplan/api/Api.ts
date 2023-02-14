import { BaseApi } from 'src/api/BaseApi';

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

class Api extends BaseApi {
  async getMenuList(): Promise<any> {
    const path = `${baseUrl}/menu`;
    const response = await this.get(path);
    return response;
  }

  async getMenuPlans(menu_id: number): Promise<any> {
    const path = `${baseUrl}/menu/${menu_id}/items?is_plan=1`;
    const response = await this.get(path);
    return response;
  }

  async getMenuStores(menu_id: number): Promise<any> {
    const path = `${baseUrl}/menu/${menu_id}/stores`;
    const response = await this.get(path);
    return response;
  }

  async getPlanItems(menu_id: number): Promise<any> {
    const path = `${baseUrl}/menu/${menu_id}/items?is_plan=0`;
    const response = await this.get(path);
    return response;
  }

  async getStoreSlots(store_id: number): Promise<any> {
    const path = `${baseUrl}/stores/${store_id}/slots`;
    const response = await this.get(path);
    return response;
  }

  async searchCustomer(term: string | number): Promise<any> {
    const path = `${baseUrl}/customers?first_name=${term}&page=1&limit=10`;
    const response = await this.get(path);
    return response;
  }

  async getCustomerAddresses(customer_id: number): Promise<any> {
    const path = `${baseUrl}/customers/${customer_id}/addresses`;
    const response = await this.get(path);
    return response;
  }

  async submitOrder(payload: any): Promise<any> {
    const path = `${baseUrl}/preparation/admin/create`;
    const response = await this.post(path, payload);
    return response;
  }

  async getBlockOffDateList(): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/deliverabledate/blockoffdate`;
    const response = await this.get(path);
    return response;
  }

  async getOperationDayList(slot_id: any): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/deliverabledate/operationday/slots/${slot_id}`;
    const response = await this.get(path);
    return response;
  }

  async getDeliverableDayList(delivery_date: any, slot_id: any, variant_id: any): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/deliverabledate?delivery_date=${delivery_date}&slot_id=${slot_id}&variant_id=${variant_id}`;
    const response = await this.get(path);
    return response;
  }
}

export default Api;
