import {
  UpdatePasswordPayload,
  UpdateProfilePayload,
  UserProfile,
} from "@/src/types/user";
import { api } from "../api";
import { apiEndpoints } from "../endpoints";

interface UserProfileResponse {
  message?: string;
  data: UserProfile;
}

interface UpdatePasswordResponse {
  message: string;
}

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUserProfile: build.query<UserProfile, void>({
      query: () => apiEndpoints.profile,
      transformResponse: (response: UserProfileResponse | UserProfile) => {
        if ("data" in response) {
          return response.data;
        }
        return response;
      },
      providesTags: [{ type: "User", id: "Profile" }],
    }),
    updateUserProfile: build.mutation<UserProfile, UpdateProfilePayload>({
      query: (body) => ({
        url: apiEndpoints.profile,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "User", id: "Profile" }],
    }),
    updateUserPassword: build.mutation<
      UpdatePasswordResponse,
      UpdatePasswordPayload
    >({
      query: (body) => ({
        url: apiEndpoints.updatePassword,
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useUpdateUserPasswordMutation,
} = userApi;
