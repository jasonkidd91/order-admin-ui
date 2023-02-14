import { createSlice } from '@reduxjs/toolkit';
import { AuthState, SESSION_AUTH_KEY } from './types';
import Api from '../api/Api';
import { globalToast } from 'src/redux/slice';

const initialState: AuthState = {
  token: localStorage.getItem(SESSION_AUTH_KEY) || '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        token: action.payload,
      };
    },
    logout: (state, action) => {
      state = action;
      return {
        ...state,
        token: action.payload,
      };
    },
  },
});

// actions
export const { login, logout } = authSlice.actions;

export const authenticate = (credential: object) => {
  return (dispatch: any) => {
    new Api().authenticate(credential).then((res) => {
      if (res.data) {
        const { errors, data } = res.data;
        if (errors) {
          console.log('auth::authenticate', errors);
          let errorMessage = errors instanceof Array ? errors[0] : errors;
          dispatch(globalToast('error', errorMessage));
        } else {
          const authToken = data;
          dispatch(login(authToken));
          localStorage.setItem(SESSION_AUTH_KEY, authToken);
        }
      } else {
        dispatch(globalToast('error', 'Server error, please try again later..'));
      }
    });
  };
};

export const submitLogout = () => {
  return (dispatch: any) => {
    localStorage.removeItem(SESSION_AUTH_KEY);
    return dispatch(logout(null));
  };
};

export default authSlice.reducer;
