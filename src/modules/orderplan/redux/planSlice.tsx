import { createSlice } from '@reduxjs/toolkit';
import { PlanState } from './types';
import Api from '../api/Api';
import {
  addItemToCart,
  currentDate,
  deepCopy,
  formatDate,
  removeItemFromCart,
  updateItemQuantityFromCart,
} from 'src/helpers';

export const initialState: PlanState = {
  // screenState: ScreenState.NEW,
  currentStep: 0,
  availableMenus: [],
  availableStores: [],
  availableSlots: [],
  selectedMenu: null,
  selectedStore: null,
  planList: [],
  itemList: [],
  selectedPlan: {
    variant: {
      id: '',
    },
  },
  cartList: [],
  orderDetail: {
    id: '',
    slot_type: 1,
    delivery_charge: 0,
    discount_amount: 0,
    customer_id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_no: '',
    recipient_name: '',
    recipient_phone_number: '',
    address_id: '',
    delivery_address_1: '',
    delivery_address_2: '',
    delivery_address_3: '',
    delivery_postal: '',
    delivery_city: '',
    delivery_state: '',
    delivery_country: 'Malaysia',
    coordinate: null,
    delivery_remark: '',
    customer_remark: '',
    kitchen_remark: '',
    delivery_date: formatDate(currentDate(), 'YYYY-MM-DD'),
    slot_id: '',
    payment_mode_id: 1,
    delivery_date_list: [],
  },
  blockOffDateList: [],
};

const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    //   setScreenState: (state, action) => {
    //     return {
    //       ...state,
    //       screenState: action.payload,
    //     };
    //   },
    setCurrentStep: (state, action) => {
      return {
        ...state,
        currentStep: action.payload,
      };
    },
    setAvailableMenus: (state, action) => {
      return {
        ...state,
        availableMenus: action.payload,
      };
    },
    setAvailableStores: (state, action) => {
      return {
        ...state,
        availableStores: action.payload,
      };
    },
    setAvailableSlots: (state, action) => {
      return {
        ...state,
        availableSlots: action.payload,
      };
    },
    setSelectedMenu: (state, action) => {
      return {
        ...state,
        selectedMenu: action.payload,
      };
    },
    setSelectedStore: (state, action) => {
      return {
        ...state,
        selectedStore: action.payload,
      };
    },
    setPlanList: (state, action) => {
      return {
        ...state,
        planList: action.payload,
      };
    },
    setItemList: (state, action) => {
      return {
        ...state,
        itemList: action.payload,
      };
    },
    setSelectedPlan: (state, action) => {
      return {
        ...state,
        selectedPlan: action.payload,
      };
    },
    setCartList: (state, action) => {
      return {
        ...state,
        cartList: action.payload,
      };
    },
    addToCart: (state, action) => {
      const item = action.payload;
      const cartList = deepCopy(state.cartList);
      return {
        ...state,
        cartList: addItemToCart(item, cartList),
      };
    },
    removeFromCart: (state, action) => {
      const item = action.payload;
      const cartList = deepCopy(state.cartList);
      return {
        ...state,
        cartList: removeItemFromCart(item, cartList),
      };
    },
    setCartItemQuantity: (state, action) => {
      const { item, quantity } = action.payload;
      const cartList = deepCopy(state.cartList);
      return {
        ...state,
        cartList: updateItemQuantityFromCart(item, cartList, quantity),
      };
    },
    setOrderDetail: (state, action) => {
      return {
        ...state,
        orderDetail: action.payload,
      };
    },
    //   clearOrderState: (state) => {
    //     return {
    //       ...state,
    //       cartList: [],
    //       orderDetail: initialState.orderDetail,
    //     };
    //   },
    resetPlanState: () => {
      return initialState;
    },
    setBlockOffDateList: (state, action) => {
      return {
        ...state,
        blockOffDateList: action.payload,
      };
    },
  },
});

// actions
export const {
  // setScreenState,
  setCurrentStep,
  setAvailableMenus,
  setAvailableStores,
  setAvailableSlots,
  setSelectedMenu,
  setSelectedStore,
  setPlanList,
  setItemList,
  setSelectedPlan,
  setCartList,
  addToCart,
  removeFromCart,
  setCartItemQuantity,
  setOrderDetail,
  // clearOrderState,
  resetPlanState,
  setBlockOffDateList,
} = planSlice.actions;

export const getMenuList = (auth: any) => {
  return (dispatch: any) => {
    return new Api(auth).getMenuList().then((res) => {
      if (res.data) {
        const { errors, data } = res.data;
        if (errors) {
          console.log('order::getMenuList', errors);
          let errorMessage = errors instanceof Array ? errors[0] : errors;
          throw new Error(errorMessage);
        } else {
          dispatch(setAvailableMenus(data));
          return data;
        }
      } else {
        throw new Error('Server error, please try again later..');
      }
    });
  };
};

export const getMenuPlans = (auth: any, menu_id: number) => {
  return (dispatch: any) => {
    return new Api(auth).getMenuPlans(menu_id).then((res) => {
      if (res.data) {
        const { errors, data } = res.data;
        if (errors) {
          console.log('order::getMenuItemList', errors);
          let errorMessage = errors instanceof Array ? errors[0] : errors;
          throw new Error(errorMessage);
        } else {
          dispatch(setPlanList(data));
          return data;
        }
      } else {
        throw new Error('Server error, please try again later..');
      }
    });
  };
};

export const getPlanItemList = (auth: any, menu_id: number) => {
  return (dispatch: any) => {
    return new Api(auth).getPlanItems(menu_id).then((res) => {
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

export const getMenuStores = (auth: any, menu_id: number) => {
  return (dispatch: any) => {
    return new Api(auth).getMenuStores(menu_id).then((res) => {
      if (res.data) {
        const { errors, data } = res.data;
        if (errors) {
          console.log('order::getMenuStores', errors);
          let errorMessage = errors instanceof Array ? errors[0] : errors;
          throw new Error(errorMessage);
        } else {
          dispatch(setAvailableStores(data));
          return data;
        }
      } else {
        throw new Error('Server error, please try again later..');
      }
    });
  };
};

export const getStoreSlots = (auth: any, store_id: number) => {
  return (dispatch: any) => {
    return new Api(auth).getStoreSlots(store_id).then((res) => {
      if (res.data) {
        const { errors, data } = res.data;
        if (errors) {
          console.log('order::getStoreSlots', errors);
          let errorMessage = errors instanceof Array ? errors[0] : errors;
          throw new Error(errorMessage);
        } else {
          dispatch(setAvailableSlots(data));
          return data;
        }
      } else {
        throw new Error('Server error, please try again later..');
      }
    });
  };
};

export const searchCustomers = (auth: any, term: string | number) => {
  // return (dispatch: any) => {
  return new Api(auth).searchCustomer(term).then((res) => {
    if (res.data) {
      const { errors, data } = res.data;
      if (errors) {
        console.log('order::searchCustomers', errors);
        let errorMessage = errors instanceof Array ? errors[0] : errors;
        throw new Error(errorMessage);
      } else {
        return data.customers;
      }
    } else {
      throw new Error('Server error, please try again later..');
    }
  });
  // };
};

export const getCustomerAddresses = (auth: any, customer_id: number) => {
  // return (dispatch: any) => {
  return new Api(auth).getCustomerAddresses(customer_id).then((res) => {
    if (res.data) {
      const { errors, data } = res.data;
      if (errors) {
        console.log('order::getCustomerAddresses', errors);
        let errorMessage = errors instanceof Array ? errors[0] : errors;
        throw new Error(errorMessage);
      } else {
        return data;
      }
    } else {
      throw new Error('Server error, please try again later..');
    }
  });
  // };
};

// export const submitOrder = (auth: any, payload: any) => {
//   // return (dispatch: any) => {
//   return new Api(auth).submitOrder(payload).then((res) => {
//     if (res.data) {
//       const { errors, data } = res.data;
//       if (errors) {
//         console.log('order::submitOrder', errors);
//         let errorMessage = errors instanceof Array ? errors[0] : errors;
//         throw new Error(errorMessage);
//       } else {
//         return data;
//       }
//     } else {
//       throw new Error('Server error, please try again later..');
//     }
//   });
//   // };
// };

// export const getOrderDetails = (auth: any, order_id: number) => {
//   // return (dispatch: any) => {
//   return new Api(auth).getOrderDetails(order_id).then((res) => {
//     if (res.data) {
//       const { errors, data } = res.data;
//       if (errors) {
//         console.log('order::getOrderDetails', errors);
//         let errorMessage = errors instanceof Array ? errors[0] : errors;
//         throw new Error(errorMessage);
//       } else {
//         return data;
//       }
//     } else {
//       throw new Error('Server error, please try again later..');
//     }
//   });
//   // };
// };

export const getBlockOffDateList = (auth: any) => {
  return (dispatch: any) => {
    return new Api(auth).getBlockOffDateList().then((result) => {
      if (result.data) {
        const { errors, data } = result.data;
        if (errors) {
          console.log('order::getBlockOffDateList', errors);
          let errorMessage = errors instanceof Array ? errors[0] : errors;
          throw new Error(errorMessage);
        } else {
          dispatch(setBlockOffDateList(data.block_off_date_list));
          return data;
        }
      } else {
        throw new Error('Server error, please try again later..');
      }
    });
  };
};

export const getOperationDayList = (auth: any, slot_id: any) => {
  // return (dispatch: any) => {
  return new Api(auth).getOperationDayList(slot_id).then((result) => {
    if (result.data) {
      const { errors, data } = result.data;
      if (errors) {
        console.log('order::getOperationDayList', errors);
        let errorMessage = errors instanceof Array ? errors[0] : errors;
        throw new Error(errorMessage);
      } else {
        // dispatch(setBlockOffDateList(data.block_off_date_list));
        return data.operation_day_list;
      }
    } else {
      throw new Error('Server error, please try again later..');
    }
  });
  // };
};

export const getDeliverableDayList = (
  auth: any,
  delivery_date: any,
  slot_id: any,
  variant_id: any,
) => {
  // return (dispatch: any) => {
  return new Api(auth).getDeliverableDayList(delivery_date, slot_id, variant_id).then((result) => {
    if (result.data) {
      const { errors, data } = result.data;
      if (errors) {
        console.log('order::getDeliverableDayList', errors);
        let errorMessage = errors instanceof Array ? errors[0] : errors;
        throw new Error(errorMessage);
      } else {
        // dispatch(setBlockOffDateList(data.block_off_date_list));
        return data.delivery_date_list;
      }
    } else {
      throw new Error('Server error, please try again later..');
    }
  });
  // };
};

export const submitOrder = (auth: any, payload: any) => {
  // return (dispatch: any) => {
  return new Api(auth).submitOrder(payload).then((res) => {
    if (res.data) {
      const { errors, data } = res.data;
      if (errors) {
        console.log('order::submitOrder', errors);
        let errorMessage = errors instanceof Array ? errors[0] : errors;
        throw new Error(errorMessage);
      } else {
        return data;
      }
    } else {
      throw new Error('Server error, please try again later..');
    }
  });
  // };
};

export default planSlice.reducer;
