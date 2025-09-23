import { setUserData, storeToken } from "@/src/store/auth/AuthSlice";
import { setLoading } from "@/src/store/common/CommonSlice";
import { handleApiError } from "@/src/utils/helper";
import { toast } from "@/src/utils/toast";
import { router } from "expo-router";
import { api } from "../api";
import { apiEndpoints } from "../endpoints";

export interface LoginRequest {
  userNameOrEmail: string;
  password: string;
}

export interface LoginRequestWithLoading {
  loading: boolean;
  data: LoginRequest;
  client?: string;
}

// Types for API Responses
export interface User {
  id: string;
  email: string;
  userName: string;
  role?: {
    id: string;
    name: string;
  };
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  user?: User;
  tokens?: Tokens;
  data?: {
    user: User;
    tokens: Tokens;
  };
}

// RTK Query API endpoint definitions
export const AuthApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Login API
    login: builder.mutation<LoginResponse, LoginRequestWithLoading>({
      query: (payload: LoginRequestWithLoading) => ({
        url: apiEndpoints.login,
        method: "POST",
        body: payload.data,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        if (args.loading === true) {
          dispatch(setLoading(true));
        }
        try {
          const response = await queryFulfilled;
          if (
            response.meta?.response?.status === 200 ||
            response.meta?.response?.status === 201
          ) {
            console.log("Login successful:", response.data);
            // Store user data and token
            if (response?.data?.data?.user) {
              dispatch(setUserData(response.data.data.user));
            }
            if (response?.data?.data?.tokens?.accessToken) {
              dispatch(storeToken(response.data.data.tokens.accessToken));
            }
            toast.success("Login successful!");
            router.dismissAll();
            router.replace("/(app)/(tabs)");
          }
        } catch (error: any) {
          console.log("Login error:", error?.error?.data);
          handleApiError(error, toast);
        } finally {
          // Always turn off loading state
          if (args.loading === true) {
            dispatch(setLoading(false));
          }
        }
      },
    }),
  }),
  overrideExisting: true,
});

// Export hooks for components to use
export const { useLoginMutation } = AuthApi;
