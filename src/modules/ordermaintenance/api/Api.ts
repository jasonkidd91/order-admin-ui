import { BaseApi } from 'src/api/BaseApi';

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

class Api extends BaseApi {
  async getFoodPreparationDataList(customerSearch: any, menu: any): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/preparation?from=${customerSearch.from}&to=${customerSearch.to}&menu_id=${menu.menu_id}`;
    const response = await this.get(path);
    return response?.data;
  }

  async downloadOrderDataList(
    filename: string,
    dateSearch: any,
    menu: any,
    search: any,
    status: any,
  ): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/order/maintenances/download?status=${status}&from=${dateSearch.from}&to=${dateSearch.to}&menu_id=${menu.menu_id}&search_value=${search.search_value}&payment_status=${search.payment_status}&slot_id=${search.slot_id}&item_name=${search.item_name}&sort_by=${search.sort_by}`;
    const response = await this.download(filename, path);
    return response;
  }

  async getMenuList(): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/menu`;
    const response = await this.get(path);
    return response?.data;
  }

  async getOrderGeneralDataList(
    status: any,
    query: any,
    menu: any,
    page: any,
    search: any,
  ): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/order/maintenances?status=${status}&from=${query.from}&to=${query.to}&menu_id=${menu.menu_id}&page=${page}&search_value=${search.search_value}&payment_status=${search.payment_status}&slot_id=${search.slot_id}&item_name=${search.item_name}&sort_by=${search.sort_by}`;
    const response = await this.get(path);
    return response?.data;
  }

  async updateStatus(input: object): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/order/maintenances`;
    const response = await this.post(path, input);
    return response;
  }

  async getOrderGeneralDataDetail(id: any): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/order/maintenances/${id}`;
    const response = await this.get(path);
    return response?.data;
  }

  async sendPrintReceiptRequest(input: object): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/order/maintenances/printreceipt`;
    const response = await this.post(path, input);
    return response;
  }

  async sendCopyPasteRequest(input: object): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/order/maintenances/copypaste`;
    const response = await this.post(path, input);
    return response;
  }

  async sendDownloadItemBasedOnIdsRequest(filename: any, input: object): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/order/maintenances/downloaditem`;
    const response = await this.downloadWithPost(filename, path, input);
    return response;
  }

  async getStoreSlots(store_id: number): Promise<any> {
    const path = `${baseUrl}/stores/${store_id}/slots`;
    const response = await this.get(path);
    return response;
  }

  async getSlotDataListBasedOnMenu(menu_id: any): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/slot?menu_id=${menu_id}`;
    const response = await this.get(path);
    return response?.data;
  }

  async sendEditRemarksRequest(id: any, input: object): Promise<any> {
    // const path = mockUrl + '/';
    const path = `${baseUrl}/order/maintenances/editremarks/${id}`;
    const response = await this.post(path, input);
    return response;
  }
}

export default Api;
