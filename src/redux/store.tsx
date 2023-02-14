import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import rootReducer from './reducer';

const logger = createLogger({
  collapsed: true,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    if (process.env.REACT_APP_ENV === 'DEV') {
      return getDefaultMiddleware().concat(logger);
    }
    return getDefaultMiddleware();
  },
});

export default store;
