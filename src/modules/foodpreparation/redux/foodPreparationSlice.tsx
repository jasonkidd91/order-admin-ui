import { createSlice } from '@reduxjs/toolkit';
import { CustomerState } from './types';
import Api from '../api/Api';

const initialState: CustomerState = {};

const foodPreparationSlice = createSlice({
  name: 'foodpreparation',
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
    foodPreparationDetailsPayload: (state, action) => {
      return {
        ...state,
        foodPreparationDetailsPayload: action.payload,
      };
    },
  },
});

// actions
export const {
  mockPayload,
  foodPreparationListPayload,
  menuListPayload,
  foodPreparationDetailsPayload,
} = foodPreparationSlice.actions;

export const getReduxDataList = (auth: any, customerSearchState: any, menu: any) => {
  return (dispatch: any) => {
    return new Api(auth)
      .getFoodPreparationDataList(customerSearchState, menu)
      .then((result) => {
        dispatch(foodPreparationListPayload(result));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getFoodPreparationDataDetailsList = (
  auth: any,
  item_id: any,
  variant_id: any,
  slot_id: any,
  delivery_date: any,
) => {
  return (dispatch: any) => {
    return new Api(auth)
      .getFoodPreparationDataDetails(item_id, variant_id, slot_id, delivery_date)
      .then((result) => {
        dispatch(foodPreparationDetailsPayload(result));
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
    return dispatch(foodPreparationListPayload({}));
  };
};

export default foodPreparationSlice.reducer;
