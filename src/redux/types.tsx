import rootReducer from './reducer';
import store from './store';

export type AppState = {
  sidebarShow: string | boolean;
  toasters: any[];
  loading: boolean;
  error: boolean;
  maintenance: boolean;
};

export type setSidebarAction = {
  payload: any;
};

export type addGlobalToastAction = {
  payload: any;
};

export type RootState = ReturnType<typeof rootReducer>;
export type RootDispatch = typeof store.dispatch;
