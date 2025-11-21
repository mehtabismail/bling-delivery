import { UploadMediaRequest, UploadMediaResponse } from "@/src/types/media";
import { api } from "../api";
import { apiEndpoints } from "../endpoints";

const getUploadUrl = (type?: string) => {
  const queryParam = type ? `?type=${type}` : "";
  return `${apiEndpoints.uploadMedia}${queryParam}`;
};

export const mediaApi = api.injectEndpoints({
  endpoints: (build) => ({
    uploadMedia: build.mutation<UploadMediaResponse, UploadMediaRequest>({
      query: ({ formData, type = "image" }) => ({
        url: getUploadUrl(type),
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useUploadMediaMutation } = mediaApi;
