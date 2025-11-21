export interface UploadItem {
  name: string;
  fileName: string;
  url: string;
  contentType: string;
  size: number;
}

export interface UploadMediaData {
  files: UploadItem[];
}

export interface UploadMediaResponse {
  success?: boolean;
  timestamp?: string;
  data: {
    data: UploadMediaData;
  };
}

export interface UploadMediaRequest {
  formData: FormData;
  type?: "image" | "fileimage";
}
