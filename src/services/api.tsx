import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../config/env";
import { logout } from "../store/auth/AuthSlice";
import { persistor } from "../store/store";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }: any) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
const baseQueryWithInterceptor = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  const { dispatch, endpoint, getState } = api;

  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    dispatch({ type: "logout" });
    setTimeout(async () => {
      dispatch(logout()), await persistor.purge();
      await persistor.flush();
    }, 500);
  }

  // dispatch(setLoading(false));

  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ["User"],
  endpoints: () => ({}),
});
