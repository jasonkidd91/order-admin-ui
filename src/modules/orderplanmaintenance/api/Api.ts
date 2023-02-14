import { BaseApi } from 'src/api/BaseApi';

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

class Api extends BaseApi {
  async getOrderPlanEndList(search: any, menu: any): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/order/maintenances/plans?from=${search.from}&to=${search.to}&menu_id=${menu.menu_id}`;
    const response = await this.get(path);
    return response?.data;
  }

  async getOrderPlanDetails(order_id: any): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/order/maintenances/plan/${order_id}`;
    const response = await this.get(path);
    return response?.data;
  }

  async downloadFoodPreparationDataList(
    filename: string,
    customerSearch: any,
    menu: any,
  ): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/preparation/download?from=${customerSearch.from}&to=${customerSearch.to}&menu_id=${menu.menu_id}`;
    const response = await this.download(filename, path);
    return response;
  }

  async getMenuList(): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/menu`;
    const response = await this.get(path);
    return response?.data;
  }
}

export default Api;
