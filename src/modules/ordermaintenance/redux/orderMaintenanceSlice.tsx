import { createSlice } from '@reduxjs/toolkit';
import { OrderMaintenanceState } from './types';
import Api from '../api/Api';
import { globalToast } from 'src/redux/slice';

const initialState: OrderMaintenanceState = {};

const orderMaintenanceSlice = createSlice({
  name: 'ordermaintenance',
  initialState,
  reducers: {
    mockPayload: (state, action) => {
      return {
        ...state,
        mockPayload: action.payload,
      };
    },
    foodPreparationListPayload: (state, action) => {
      return {
        ...state,
        foodPreparationListPayload: action.payload,
      };
    },
    menuListPayload: (state, action) => {
      return {
        ...state,
        menuListPayload: action.payload,
      };
    },
    orderGeneralListPayload: (state, action) => {
      return {
        ...state,
        orderGeneralListPayload: action.payload,
      };
    },
    orderDetailPayload: (state, action) => {
      return {
        ...state,
        orderDetailPayload: action.payload,
      };
    },
    slotListPayload: (state, action) => {
      return {
        ...state,
        slotListPayload: action.payload,
      };
    },
  },
});

// actions
export const {
  mockPayload,
  foodPreparationListPayload,
  menuListPayload,
  orderGeneralListPayload,
  orderDetailPayload,
  slotListPayload,
} = orderMaintenanceSlice.actions;

export const getMenuList = (auth: any) => {
  return (dispatch: any) => {
    return new Api(auth)
      .getMenuList()
      .then((result) => {
        dispatch(menuListPayload(result));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getSlotList = (auth: any, menu: any) => {
  return (dispatch: any) => {
    return new Api(auth)
      .getSlotDataListBasedOnMenu(menu)
      .then((result) => {
        dispatch(slotListPayload(result));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getOrderGeneralList = (
  status: any,
  auth: any,
  dateSearchState: any,
  menu: any,
  page: any,
  searchQuery: any,
) => {
  if (status == null || status === undefined) {
    status = '';
  }
  return (dispatch: any) => {
    return new Api(auth)
      .getOrderGeneralDataList(status, dateSearchState, menu, page, searchQuery)
      .then((result) => {
        dispatch(orderGeneralListPayload(result));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getOrderPendingList = (
  auth: any,
  dateSearchState: any,
  menu: any,
  page: any,
  searchQuery: any,
) => {
  return (dispatch: any) => {
    return new Api(auth)
      .getOrderGeneralDataList(0, dateSearchState, menu, page, searchQuery)
      .then((result) => {
        dispatch(orderGeneralListPayload(result));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getOrderConfirmedList = (
  auth: any,
  dateSearchState: any,
  menu: any,
  page: any,
  searchQuery: any,
) => {
  return (dispatch: any) => {
    return new Api(auth)
      .getOrderGeneralDataList(1, dateSearchState, menu, page, searchQuery)
      .then((result) => {
        dispatch(orderGeneralListPayload(result));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getOrderVoidList = (
  auth: any,
  dateSearchState: any,
  menu: any,
  page: any,
  searchQuery: any,
) => {
  return (dispatch: any) => {
    return new Api(auth)
      .getOrderGeneralDataList(2, dateSearchState, menu, page, searchQuery)
      .then((result) => {
        dispatch(orderGeneralListPayload(result));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const updateStatusToServer = (auth: any, input: object, action: any) => {
  return (dispatch: any) => {
    new Api(auth).updateStatus(input).then((res) => {
      if (res.code !== '200') {
        const { errors } = res.data;
        if (errors) {
          let errorMessage = errors instanceof Array ? errors[0] : errors;
          dispatch(globalToast('error', errorMessage));
        } else {
          dispatch(globalToast('success', 'Order Data Updated!'));
          dispatch(action);
        }
      } else {
        dispatch(globalToast('error', 'Server error, please try again later..'));
      }
    });
  };
};

export const resetOrderGeneralList = () => {
  return (dispatch: any) => {
    return dispatch(orderGeneralListPayload({}));
  };
};

export const getOrderDetail = (auth: any, id: any) => {
  return (dispatch: any) => {
    return new Api(auth)
      .getOrderGeneralDataDetail(id)
      .then((result) => {
        dispatch(orderDetailPayload(result));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const downloadOrderDataList = (
  auth: any,
  dateSearchState: any,
  menu: any,
  searchQuery: any,
  status: any,
) => {
  return (
    new Api(auth)
      .downloadOrderDataList('orders.xlsx', dateSearchState, menu, searchQuery, status)
      // .then(res => res.blob())
      .catch((error) => {
        console.error(error);
      })
  );
};

export const printReceipt = (auth: any, input: object, action: any) => {
  return (dispatch: any) => {
    new Api(auth).sendPrintReceiptRequest(input).then((res) => {
      if (res.code !== '200') {
        const { errors } = res.data;
        if (errors) {
          let errorMessage = errors instanceof Array ? errors[0] : errors;
          dispatch(globalToast('error', errorMessage));
        } else {
          dispatch(globalToast('success', 'Order Receipt Sent to server!'));
          dispatch(action);
        }
      } else {
        dispatch(globalToast('error', 'Server error, please try again later..'));
      }
    });
  };
};

export const copyOrder = (auth: any, input: any, copy_paste_date_list: any, action: any) => {
  return (dispatch: any) => {
    input.copy_paste_date_list = copy_paste_date_list;
    new Api(auth).sendCopyPasteRequest(input).then((res) => {
      if (res.code !== '200') {
        const { errors } = res.data;
        if (errors) {
          let errorMessage = errors instanceof Array ? errors[0] : errors;
          dispatch(globalToast('error', errorMessage));
        } else {
          dispatch(globalToast('success', 'Orders have been duplicated!'));
          dispatch(action);
        }
      } else {
        dispatch(globalToast('error', 'Server error, please try again later..'));
      }
    });
  };
};

export const downloadOrderDataListBasedOnIds = (auth: any, input: object) => {
  return (
    new Api(auth)
      .sendDownloadItemBasedOnIdsRequest('dataExport.xlsx', input)
      // .then(res => res.blob())
      .catch((error) => {
        console.error(error);
      })
  );
};

export const sendEditRemarksRequest = (auth: any, input: any, id: any, action: any) => {
  return (dispatch: any) => {
    // input.copy_paste_date_list = copy_paste_date_list;
    new Api(auth).sendEditRemarksRequest(id, input).then((res) => {
      if (res.code !== '200') {
        const { errors } = res.data;
        if (errors) {
          let errorMessage = errors instanceof Array ? errors[0] : errors;
          dispatch(globalToast('error', errorMessage));
        } else {
          dispatch(globalToast('success', 'Order remarks have been edited!'));
          dispatch(action);
        }
      } else {
        dispatch(globalToast('error', 'Server error, please try again later..'));
      }
    });
  };
};

export default orderMaintenanceSlice.reducer;
