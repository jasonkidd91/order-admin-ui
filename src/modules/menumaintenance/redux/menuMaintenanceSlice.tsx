import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MenuDetailFormState, MenuMaintenanceState, ProfileDetailFormState } from './types';
import Api from '../api/Api';

const initialState: MenuMaintenanceState = {
  menuList: [],
  profileDetailFormState: undefined,
  selectedMenu: null,
  itemList: [],
  createMenuDetailFormState: undefined,
  editMenuDetailFormState: undefined,
};

const menuMaintenanceSlice = createSlice({
  name: 'menuMaintenance',
  initialState,
  reducers: {
    setMenuList: (state, action) => {
      return {
        ...state,
        menuList: action.payload,
      };
    },
    setProfileDetailFormState: (state, action: PayloadAction<ProfileDetailFormState>) => {
      return {
        ...state,
        profileDetailFormState: action?.payload,
      };
    },
    setSelectedMenu: (state, action) => {
      return {
        ...state,
        selectedMenu: action.payload,
      };
    },
    setItemList: (state, action) => {
      return {
        ...state,
        itemList: action.payload,
      };
    },
    setCreateMenuItemFormState: (state, action: PayloadAction<Partial<MenuDetailFormState>>) => {
      return {
        ...state,
        createMenuDetailFormState: action.payload,
      };
    },
    setMenuDetailFormState: (state, action: PayloadAction<MenuDetailFormState>) => {
      return {
        ...state,
        editMenuDetailFormState: action.payload,
      };
    },
    clearMenuDetailState: (state) => {
      return {
        ...state,
        selectedMenu: initialState.selectedMenu,
        editMenuDetailFormState: initialState.editMenuDetailFormState,
        itemList: initialState.itemList,
      };
    },
  },
});

// actions
export const {
  setMenuList,
  setProfileDetailFormState,
  setSelectedMenu,
  setItemList,
  setCreateMenuItemFormState,
  setMenuDetailFormState,
  clearMenuDetailState,
} = menuMaintenanceSlice.actions;

export const getMenuList = (auth: any) => {
  return (dispatch: any) => {
    return new Api(auth).getMenuList().then((res) => {
      if (res.data) {
        const { errors, data } = res.data;
        if (errors) {
          console.log('menuMaintenance::getMenuList', errors);
          let errorMessage = errors instanceof Array ? errors[0] : errors;
          throw new Error(errorMessage);
        } else {
          dispatch(setMenuList(data));
          return data;
        }
      } else {
        throw new Error('Server error, please try again later..');
      }
    });
  };
};

export const upsertMenu = (auth: any, payload: object) => {
  return new Api(auth).upsertMenu(payload).then((res) => {
    if (res.data) {
      const { errors, data } = res.data;
      if (errors) {
        console.log('menuMaintenance::upsertMenu', errors);
        let errorMessage = errors instanceof Array ? errors[0] : errors;
        throw new Error(errorMessage);
      } else {
        return data;
      }
    } else {
      throw new Error('Server error, please try again later..');
    }
  });
};

export const deleteMenu = (auth: any, menu_id: number) => {
  return new Api(auth).deleteMenu(menu_id).then((res) => {
    if (res.data) {
      const { errors, data } = res.data;
      if (errors) {
        console.log('menuMaintenance::deleteMenu', errors);
        let errorMessage = errors instanceof Array ? errors[0] : errors;
        throw new Error(errorMessage);
      } else {
        return data;
      }
    } else {
      throw new Error('Server error, please try again later..');
    }
  });
};

export const updateMenuStatus = (auth: any, menu_id: number, status: boolean) => {
  return new Api(auth).updateMenuStatus(menu_id, status).then((res) => {
    if (res.data) {
      const { errors, data } = res.data;
      if (errors) {
        console.log('menuMaintenance::updateMenuStatus', errors);
        let errorMessage = errors instanceof Array ? errors[0] : errors;
        throw new Error(errorMessage);
      } else {
        return data;
      }
    } else {
      throw new Error('Server error, please try again later..');
    }
  });
};

export const getMenuDetail = (auth: any, menu_id: number) => {
  return (dispatch: any) => {
    return new Api(auth).getMenuDetail(menu_id).then((res) => {
      if (res.data) {
        const { errors, data } = res.data;
        if (errors) {
          console.log('menuMaintenance::getMenuDetail', errors);
          let errorMessage = errors instanceof Array ? errors[0] : errors;
          throw new Error(errorMessage);
        } else {
          dispatch(setSelectedMenu(data));
          return data;
        }
      } else {
        throw new Error('Server error, please try again later..');
      }
    });
  };
};

export const getMenuItemList = (auth: any, menu_id: number) => {
  return (dispatch: any) => {
    return new Api(auth).getMenuItems(menu_id).then((res) => {
      if (res.data) {
        const { errors, data } = res.data;
        if (errors) {
          console.log('order::getMenuItemList', errors);
          let errorMessage = errors instanceof Array ? errors[0] : errors;
          throw new Error(errorMessage);
        } else {
          dispatch(setItemList(data));
          return data;
        }
      } else {
        throw new Error('Server error, please try again later..');
      }
    });
  };
};

export const upsertCategory = (auth: any, payload: object) => {
  return new Api(auth).upsertCategory(payload).then((res) => {
    if (res.data) {
      const { errors, data } = res.data;
      if (errors) {
        console.log('menuMaintenance::upsertCategory', errors);
        let errorMessage = errors instanceof Array ? errors[0] : errors;
        throw new Error(errorMessage);
      } else {
        return data;
      }
    } else {
      throw new Error('Server error, please try again later..');
    }
  });
};

export const upsertItem = (auth: any, payload: object) => {
  return new Api(auth).upsertItem(payload).then((res) => {
    if (res.data) {
      const { errors, data } = res.data;
      if (errors) {
        console.log('menuMaintenance::upsertItem', errors);
        let errorMessage = errors instanceof Array ? errors[0] : errors;
        throw new Error(errorMessage);
      } else {
        return data;
      }
    } else {
      throw new Error('Server error, please try again later..');
    }
  });
};

export const upsertVariant = (auth: any, payload: object) => {
  return new Api(auth).upsertVariant(payload).then((res) => {
    if (res.data) {
      const { errors, data } = res.data;
      if (errors) {
        console.log('menuMaintenance::upsertVariant', errors);
        let errorMessage = errors instanceof Array ? errors[0] : errors;
        throw new Error(errorMessage);
      } else {
        return data;
      }
    } else {
      throw new Error('Server error, please try again later..');
    }
  });
};

export const deleteCategory = (auth: any, id: number) => {
  return new Api(auth).deleteCategory(id).then((res) => {
    if (res.data) {
      const { errors, data } = res.data;
      if (errors) {
        console.log('menuMaintenance::deleteCategory', errors);
        let errorMessage = errors instanceof Array ? errors[0] : errors;
        throw new Error(errorMessage);
      } else {
        return data;
      }
    } else {
      throw new Error('Server error, please try again later..');
    }
  });
};

export const deleteItem = (auth: any, id: number) => {
  return new Api(auth).deleteItem(id).then((res) => {
    if (res.data) {
      const { errors, data } = res.data;
      if (errors) {
        console.log('menuMaintenance::deleteItem', errors);
        let errorMessage = errors instanceof Array ? errors[0] : errors;
        throw new Error(errorMessage);
      } else {
        return data;
      }
    } else {
      throw new Error('Server error, please try again later..');
    }
  });
};

export const deleteVariant = (auth: any, id: number) => {
  return new Api(auth).deleteCategory(id).then((res) => {
    if (res.data) {
      const { errors, data } = res.data;
      if (errors) {
        console.log('menuMaintenance::deleteVariant', errors);
        let errorMessage = errors instanceof Array ? errors[0] : errors;
        throw new Error(errorMessage);
      } else {
        return data;
      }
    } else {
      throw new Error('Server error, please try again later..');
    }
  });
};

export default menuMaintenanceSlice.reducer;
