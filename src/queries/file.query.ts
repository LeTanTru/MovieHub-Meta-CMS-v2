import { fileApiRequest } from '@/api-requests';
import { useMutation } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

export const useUploadAvatar = () => {
  return useMutation({
    mutationFn: async ({
      file,
      options
    }: {
      file: Blob;
      options?: AxiosRequestConfig;
    }) => await fileApiRequest.uploadAvatar(file, options)
  });
};

export const useUploadLogo = () => {
  return useMutation({
    mutationFn: async ({
      file,
      options
    }: {
      file: Blob;
      options?: AxiosRequestConfig;
    }) => await fileApiRequest.uploadLogo(file, options)
  });
};
