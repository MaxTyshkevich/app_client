import axios from 'axios';
import { refreshToken } from '../store/AuthSlice';

let store;
export const getStore = (_store) => {
  store = _store;
};
export default axios.create({
  baseURL: 'http://localhost:3500',
});

export const PrivateApi = axios.create({
  baseURL: 'http://localhost:3500',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

PrivateApi.interceptors.request.use((config) => {
  const { accessToken } = store.getState().auth;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

PrivateApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const prevRequest = error?.config;
    if (error?.response?.status === 403 && !prevRequest?.send) {
      prevRequest.send = true;

      await store.dispatch(refreshToken());

      return PrivateApi(prevRequest);
    } else {
      return Promise.reject(error);
    }
  }
);
