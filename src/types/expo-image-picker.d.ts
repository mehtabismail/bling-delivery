declare module "expo-image-picker" {
  export enum MediaTypeOptions {
    All = "All",
    Images = "Images",
    Videos = "Videos",
  }

  export enum MediaType {
    ALL = "All",
    IMAGE = "Images",
    VIDEO = "Videos",
  }

  export interface ImagePickerAsset {
    uri: string;
    width?: number;
    height?: number;
    fileName?: string;
    mimeType?: string;
    fileSize?: number;
    type?: string;
  }

  export interface ImagePickerResult {
    canceled: boolean;
    assets?: ImagePickerAsset[];
  }

  export interface PermissionResponse {
    granted: boolean;
    expires?: string;
    canAskAgain?: boolean;
    status?: string;
  }

  export function requestMediaLibraryPermissionsAsync(): Promise<PermissionResponse>;
  export function launchImageLibraryAsync(options?: {
    mediaTypes?: MediaType | MediaType[];
    allowsEditing?: boolean;
    quality?: number;
  }): Promise<ImagePickerResult>;
}
