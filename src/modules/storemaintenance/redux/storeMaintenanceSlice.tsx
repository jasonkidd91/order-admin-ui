import { createSlice } from '@reduxjs/toolkit';
import { StoreMaintenanceState } from './types';
import Api from '../api/Api';
import { globalToast } from 'src/redux/slice';

const initialState: StoreMaintenanceState = {};

const storeMaintenanceSlice = createSlice({
  name: 'storemaintenance',
  initialState,
  reducers: {
    storeMaintenanceListPayload: (state, action) => {
      return {
        ...state,
        storeMaintenanceListPayload: action.payload,
      };
    },
    printerMaintenanceListPayload: (state, action) => {
      return {
        ...state,
        printerMaintenanceListPayload: action.payload,
      };
    },
  },
});

// actions
export const { storeMaintenanceListPayload, printerMaintenanceListPayload } =
  storeMaintenanceSlice.actions;

export const getStoreList = (auth: any) => {
  return (dispatch: any) => {
    return new Api(auth)
      .getStoreList()
      .then((result) => {
        dispatch(storeMaintenanceListPayload(result));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getStoreData = (auth: any, id: any) => {
  // return (dispatch: any) => {
  return new Api(auth)
    .getStoreDetail(id)
    .then((result) => {
      return result?.data;
    })
    .catch((error) => {
      console.error(error);
    });
  // };
};

export const getPrinterList = (auth: any) => {
  return (dispatch: any) => {
    return new Api(auth)
      .getPrinterList()
      .then((result) => {
        console.log('result');
        console.log(result);
        dispatch(printerMaintenanceListPayload(result));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const updateStore = (auth: any, store: object, id: any) => {
  return (dispatch: any) => {
    new Api(auth).updateStore(store, id).then((res) => {
      if (res.code !== '200') {
        const { errors } = res.data;
        if (errors) {
          let errorMessage = errors instanceof Array ? errors[0] : errors;
          dispatch(globalToast('error', errorMessage));
        } else {
          dispatch(globalToast('success', 'Store Data Updated!'));
        }
      } else {
        dispatch(globalToast('error', 'Server error, please try again later..'));
      }
    });
  };
};

export default storeMaintenanceSlice.reducer;
