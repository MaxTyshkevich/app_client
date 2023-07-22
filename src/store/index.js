import { configureStore } from '@reduxjs/toolkit';
import { serverApi } from './api';
import authReducer from './AuthSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,

    [serverApi.reducerPath]: serverApi.reducer,
  },
  middleware: (gDM) => gDM().concat(serverApi.middleware),
  devTools: true,
});
