import { BaseApi } from 'src/api/BaseApi';

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

class Api extends BaseApi {
  async getMenuList(): Promise<any> {
    const path = `${baseUrl}/menu`;
    const response = await this.get(path);
    return response;
  }

  async getMenuItems(menu_id: number): Promise<any> {
    const path = `${baseUrl}/menu/${menu_id}/items`;
    const response = await this.get(path);
    return response;
  }

  async getMenuStores(menu_id: number): Promise<any> {
    const path = `${baseUrl}/menu/${menu_id}/stores`;
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

  async getOrderDetails(order_id: number): Promise<any> {
    const path = `${baseUrl}/order/maintenances/${order_id}/refined`;
    const response = await this.get(path);
    return response;
  }

  async updateOrder(payload: any): Promise<any> {
    const path = `${baseUrl}/preparation/admin/update`;
    const response = await this.post(path, payload);
    return response;
  }
}

export default Api;
