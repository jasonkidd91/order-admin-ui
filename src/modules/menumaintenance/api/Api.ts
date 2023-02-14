import { BaseApi } from 'src/api/BaseApi';
import mockListing from '../mocks/mockListing';

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

class Api extends BaseApi {
  async getMenuList(): Promise<any> {
    const response = {
      errors: false,
      data: {
        data: mockListing,
      },
    };

    return Promise.resolve(response);
  }

  async upsertMenu(payload: object): Promise<any> {
    const response = {
      errors: false,
      data: {
        data: payload,
      },
    };

    return Promise.resolve(response);
  }

  async deleteMenu(menu_id: number): Promise<any> {
    const response = {
      errors: false,
      data: {
        data: menu_id,
      },
    };

    return Promise.resolve(response);
  }

  async updateMenuStatus(menu_id: number, status: boolean): Promise<any> {
    const response = {
      errors: false,
      data: {
        data: { menu_id, status },
      },
    };

    return Promise.resolve(response);
  }

  async getMenuDetail(menu_id: number): Promise<any> {
    const response = {
      errors: false,
      data: {
        data: mockListing.records.find((m) => m.id === Number(menu_id)),
      },
    };

    return Promise.resolve(response);
  }

  async getMenuItems(menu_id: number): Promise<any> {
    const path = `${baseUrl}/menu/${menu_id}/items`;
    const response = await this.get(path);
    return response;
  }

  async upsertCategory(payload: object): Promise<any> {
    const response = {
      errors: false,
      data: {
        data: payload,
      },
    };

    return Promise.resolve(response);
  }

  async upsertItem(payload: object): Promise<any> {
    const response = {
      errors: false,
      data: {
        data: payload,
      },
    };

    return Promise.resolve(response);
  }

  async upsertVariant(payload: object): Promise<any> {
    const response = {
      errors: false,
      data: {
        data: payload,
      },
    };

    return Promise.resolve(response);
  }

  async deleteCategory(id: number): Promise<any> {
    const response = {
      errors: false,
      data: {
        data: id,
      },
    };

    return Promise.resolve(response);
  }

  async deleteItem(id: number): Promise<any> {
    const response = {
      errors: false,
      data: {
        data: id,
      },
    };

    return Promise.resolve(response);
  }

  async deleteVariant(id: number): Promise<any> {
    const response = {
      errors: false,
      data: {
        data: id,
      },
    };

    return Promise.resolve(response);
  }
}

export default Api;
