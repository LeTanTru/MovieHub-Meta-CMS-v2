import { apiConfig, uploadOptions } from '@/constants';
import { ApiResponse, UploadImageResponseType } from '@/types';
import { http } from '@/utils';
import { AxiosRequestConfig } from 'axios';

const fileApiRequest = {
  uploadAvatar: async (file: Blob, options?: AxiosRequestConfig) =>
    await http.post<ApiResponse<UploadImageResponseType>>(
      apiConfig.file.upload,
      {
        body: {
          file: file,
          type: uploadOptions.AVATAR
        },
        options
      }
    ),
  uploadLogo: async (file: Blob, options?: AxiosRequestConfig) =>
    await http.post<ApiResponse<UploadImageResponseType>>(
      apiConfig.file.upload,
      {
        body: {
          file: file,
          type: uploadOptions.LOGO
        },
        options
      }
    )
};

export default fileApiRequest;
