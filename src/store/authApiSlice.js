import jwt_decode from 'jwt-decode';
import { serverApi } from './api';
import { setCredentials, cleanCredentials } from './AuthSlice';

serverApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth',
        method: 'POST',
        body: { ...credentials },
      }),
      transformResponse: (response) => {
        console.log({ response });
        const userInfo = jwt_decode(response.accessToken).userInfo;
        userInfo.accessToken = response.accessToken;
        return userInfo;
      },
      transformErrorResponse: (response, meta, arg) => {
        console.log({ response, meta, arg });
        const status = response?.originalStatus;

        if (!status) {
          return `No Server Response`;
        }

        if (status === 400) {
          return `Missing Username or Password`;
        }

        if (status === 401) {
          return `Unauthrozed`;
        }

        return response.data;
      },

      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const result = await queryFulfilled;
        dispatch(setCredentials(result.data));
      },
    }),

    refresh: builder.mutation({
      query: () => ({
        url: '/refresh',
      }),
      transformResponse: (response) => {
        console.log({ response });
        const userInfo = jwt_decode(response.accessToken).userInfo;
        userInfo.accessToken = response.accessToken;
        return userInfo;
      },

      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setCredentials(result.data));
        } catch (error) {
          dispatch();
        }
      },
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/logout',
      }),

      async onQueryStarted(args, { dispatch }) {
        dispatch(cleanCredentials());
      },
    }),
  }),
});

export const { useLoginMutation, useRefreshMutation, useLogoutMutation } =
  serverApi;
