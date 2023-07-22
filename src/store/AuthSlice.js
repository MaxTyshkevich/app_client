import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: null,
  roles: [],
  accessToken: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.name = action.payload.username;
      state.roles = action.payload.roles;
      state.accessToken = action.payload.accessToken;
    },

    cleanCredentials: () => initialState,
  },
});

export const { setCredentials, cleanCredentials } = authSlice.actions;

export default authSlice.reducer;
