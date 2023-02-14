import { createSlice } from '@reduxjs/toolkit';
import { PrinterMaintenanceState } from './types';
import Api from '../api/Api';

const initialState: PrinterMaintenanceState = {};

const printerMaintenanceSlice = createSlice({
  name: 'printermaintenance',
  initialState,
  reducers: {
    printerMaintenanceListPayload: (state, action) => {
      return {
        ...state,
        printerMaintenanceListPayload: action.payload,
      };
    },
  },
});

// actions
export const { printerMaintenanceListPayload } = printerMaintenanceSlice.actions;

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

export default printerMaintenanceSlice.reducer;
