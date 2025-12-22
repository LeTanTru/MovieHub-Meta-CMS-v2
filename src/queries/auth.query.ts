import envConfig from '@/config';
import { apiConfig, queryKeys } from '@/constants';
import {
  ApiResponse,
  LoginBodyType,
  LoginResType,
  RefreshTokenBodyType
} from '@/types';
import { http } from '@/utils';
import { useMutation } from '@tanstack/react-query';

export const useLoginMutation = () => {
  return useMutation({
    mutationKey: [queryKeys.LOGIN],
    mutationFn: (body: LoginBodyType) =>
      http.post<LoginResType>(apiConfig.auth.login, {
        body,
        options: {
          headers: {
            Authorization: `Basic ${btoa(`${envConfig.NEXT_PUBLIC_APP_USERNAME}:${envConfig.NEXT_PUBLIC_APP_PASSWORD}`)}`
          }
        }
      })
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationKey: [queryKeys.LOGOUT],
    mutationFn: () => http.post<ApiResponse<any>>(apiConfig.auth.logout)
  });
};

export const useRefreshTokenMutation = () => {
  return useMutation({
    mutationKey: [queryKeys.REFRESH_TOKEN],
    mutationFn: (body: RefreshTokenBodyType) =>
      http.post<LoginResType>(apiConfig.auth.refreshToken, {
        body,
        options: {
          headers: {
            Authorization: `Basic ${btoa(`${envConfig.NEXT_PUBLIC_APP_USERNAME}:${envConfig.NEXT_PUBLIC_APP_PASSWORD}`)}`
          }
        }
      })
  });
};
