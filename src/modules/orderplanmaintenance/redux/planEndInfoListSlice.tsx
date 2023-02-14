import { createSlice } from '@reduxjs/toolkit';
import { CustomerState } from './types';
import Api from '../api/Api';

const initialState: CustomerState = {};

const planEndInfoListSlice = createSlice({
  name: 'planEndInfoList',
  initialState,
  reducers: {
    mockPayload: (state, action) => {
      return {
        ...state,
        mockPayload: action.payload,
      };
    },
    planEndInfoListPayload: (state, action) => {
      return {
        ...state,
        planEndInfoListPayload: action.payload,
      };
    },
    menuListPayload: (state, action) => {
      return {
        ...state,
        menuListPayload: action.payload,
      };
    },
    planEndInfoDetailPayload: (state, action) => {
      return {
        ...state,
        planEndInfoDetailPayload: action.payload,
      };
    },
  },
});

// actions
export const { mockPayload, planEndInfoListPayload, menuListPayload, planEndInfoDetailPayload } =
  planEndInfoListSlice.actions;

export const getReduxDataList = (auth: any, customerSearchState: any, menu: any) => {
  return (dispatch: any) => {
    return new Api(auth)
      .getOrderPlanEndList(customerSearchState, menu)
      .then((result) => {
        console.log(result.data.orders);
        dispatch(planEndInfoListPayload(result));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getOrderPlanDetailList = (auth: any, order_id: any) => {
  return (dispatch: any) => {
    return new Api(auth)
      .getOrderPlanDetails(order_id)
      .then((result) => {
        dispatch(planEndInfoDetailPayload(result));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const downloadFoodPreparationDataList = (
  auth: any,
  customerSearchState: any,
  menuState: any,
) => {
  return (
    new Api(auth)
      .downloadFoodPreparationDataList('foodPreparation.xlsx', customerSearchState, menuState)
      // .then(res => res.blob())
      .catch((error) => {
        console.error(error);
      })
  );
};

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

export const resetFoodPreparationListPayload = () => {
  return (dispatch: any) => {
    return dispatch(planEndInfoListPayload({}));
  };
};

export default planEndInfoListSlice.reducer;
