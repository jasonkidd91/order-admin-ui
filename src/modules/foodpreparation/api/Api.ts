import { BaseApi } from 'src/api/BaseApi';

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

class Api extends BaseApi {
  async getFoodPreparationDataList(customerSearch: any, menu: any): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/preparation?from=${customerSearch.from}&to=${customerSearch.to}&menu_id=${menu.menu_id}`;
    const response = await this.get(path);
    return response?.data;
  }

  async getFoodPreparationDataDetails(
    item_id: any,
    variant_id: any,
    slot_id: any,
    delivery_date: any,
  ): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/preparation/item/${item_id}?delivery_date=${delivery_date}&slot_id=${slot_id}&variant_id=${variant_id}`;
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
