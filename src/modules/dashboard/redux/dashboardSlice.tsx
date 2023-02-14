import { createSlice } from '@reduxjs/toolkit';
import { DashboardState } from './types';
import Api from '../api/Api';
import mockData from '../mocks/mockData';

const initialState: DashboardState = {};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    mockPayload: (state, action) => {
      return {
        ...state,
        mockPayload: action.payload,
      };
    },
    reduxPayload: (state, action) => {
      return {
        ...state,
        reduxPayload: action.payload,
      };
    },
  },
});

// actions
export const { mockPayload, reduxPayload } = dashboardSlice.actions;

export const getMockData = () => {
  return (dispatch: any) => dispatch(mockPayload(mockData));
};

export const getReduxData = () => {
  return (dispatch: any) => {
    return new Api()
      .getDashboardData()
      .then((result) => {
        dispatch(reduxPayload(result));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export default dashboardSlice.reducer;
