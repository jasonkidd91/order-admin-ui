import { MenuItemType } from '../constants';

export type MenuMaintenanceState = {
  [key: string]: any;
  menuList?: any;
  profileDetailFormState?: ProfileDetailFormState;
  selectedMenu?: any;
  itemList?: any;
  createMenuDetailFormState?: Partial<MenuDetailFormState>;
  editMenuDetailFormState?: MenuDetailFormState;
};

export type ProfileDetailFormState = {
  id?: number;
  name?: string;
  email?: string;
  logoUrl?: string;
  remarks?: string;
  tnc?: string;
  privacyPolicy?: string;
  minimumAmount?: number;
};

export type MenuCategoryFormState = {
  type: MenuItemType.CATEGORY;
  id: number;
  name: string;
};

export type MenuItemFormState = {
  type: MenuItemType.ITEM;
  id: number;
  name: string;
  price: number;
  isPlan: boolean;
};

export type MenuVariantFormState = {
  type: MenuItemType.VARIANT;
  id: number;
  name: string;
  price: number;
  isPlan?: boolean;
  days?: number;
};

export type MenuDetailFormState = MenuCategoryFormState | MenuItemFormState | MenuVariantFormState;
