import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import axios, { PrivateApi } from '../api/axios';
const initialState = {
  name: null,
  roles: [],
  isLoading: false,
  accessToken: null,
  messageError: '',
};

export const fetchToken = createAsyncThunk(
  'auth/fetchToken',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('/auth', JSON.stringify(userData), {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      const userInfo = jwt_decode(response.data.accessToken).userInfo;
      userInfo.accessToken = response.data.accessToken;

      return userInfo;
    } catch (error) {
      if (!error?.response) {
        return thunkAPI.rejectWithValue(`No Server Response`);
      }
      if (error.response.status === 400) {
        return thunkAPI.rejectWithValue(`Missing Username or Password`);
      }

      if (error.response.status === 401) {
        return thunkAPI.rejectWithValue(`Unauthrozed`);
      }

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/refresh', {
        withCredentials: true,
      });

      const userInfo = jwt_decode(response.data.accessToken).userInfo;
      userInfo.accessToken = response.data.accessToken;

      return userInfo;
    } catch (error) {
      throw error;
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunkAPI) => {
    try {
      const response = await PrivateApi.get('/logout');

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearErrorMessage: (state) => {
      state.messageError = '';
    },
  },
  extraReducers: (builder) =>
    builder
      /* get token */
      .addCase(fetchToken.pending, (state) => {
        state.isLoading = true;
        state.messageError = '';
      })
      .addCase(fetchToken.fulfilled, (state, action) => {
        state.name = action.payload.username;
        state.roles = action.payload.roles;
        state.accessToken = action.payload.accessToken;
        state.isLoading = false;
      })
      .addCase(fetchToken.rejected, (state, action) => {
        state.isLoading = false;
        state.messageError = action.payload;
      })

      /* refresh token */
      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
        state.messageError = '';
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.name = action.payload.username;
        state.roles = action.payload.roles;
        state.accessToken = action.payload.accessToken;

        state.isLoading = false;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isLoading = false;
        state.roles = [];
        state.accessToken = null;
      })

      /* logout */
      .addCase(logout.pending, (state, action) => {
        state.isLoading = true;
        state.messageError = '';
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.name = null;
        state.accessToken = null;
        state.roles = [];

        state.isLoading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.accessToken = null;
        state.name = null;
        state.roles = [];
        state.isLoading = false;
      }),
});

export const { clearErrorMessage } = authSlice.actions;

export default authSlice.reducer;
