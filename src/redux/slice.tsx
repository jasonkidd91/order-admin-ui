import { createSlice } from '@reduxjs/toolkit';
import { currentDate, parseDate } from 'src/helpers';
import { AppState, addGlobalToastAction, setSidebarAction } from './types';

const initialState: AppState = {
  sidebarShow: 'responsive',
  toasters: [],
  loading: false,
  error: false,
  maintenance: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSidebarVisible: (state: AppState, action: setSidebarAction) => {
      return {
        ...state,
        sidebarShow: action.payload,
      };
    },
    addGlobalToast: (state: AppState, action: addGlobalToastAction) => {
      // remove expired toast
      state.toasters = state.toasters.filter((t) => parseDate(t.expiry).isAfter(currentDate()));
      // push new toast
      state.toasters.push(action.payload);
    },
  },
});

// actions
export const { setSidebarVisible, addGlobalToast } = appSlice.actions;

export const globalToast = (type: 'success' | 'error', message: string, title?: string) => {
  return (dispatch: any) => {
    let color = 'light';
    switch (type) {
      case 'error':
        title = title || 'Error';
        color = 'danger';
        break;
      case 'success':
        title = title || 'Success';
        color = 'success';
        break;
      default:
        break;
    }
    const expiry = currentDate().add(5, 'seconds').toISOString();
    dispatch(addGlobalToast({ color, message, title, expiry, id: expiry }));
  };
};

export default appSlice.reducer;
