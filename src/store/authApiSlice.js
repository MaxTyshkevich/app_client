import jwt_decode from 'jwt-decode';
import { serverApi } from './api';
import { setCredentials } from './AuthSlice';

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
        return response.data;
      },

      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const result = await queryFulfilled;
        dispatch(setCredentials(result.data));
      },
    }),
  }),
});

export const { useLoginMutation } = serverApi;
