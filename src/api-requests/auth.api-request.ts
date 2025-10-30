import envConfig from '@/config';
import { apiConfig } from '@/constants';
import { LoginBodyType, LoginResType } from '@/types/auth.type';
import { http } from '@/utils';

const authApiRequest = {
  login: async (body: LoginBodyType) =>
    await http.post<LoginResType>(apiConfig.auth.login, {
      body,
      options: {
        headers: {
          Authorization: `Basic ${btoa(`${envConfig.NEXT_PUBLIC_APP_USERNAME}:${envConfig.NEXT_PUBLIC_APP_PASSWORD}`)}`
        }
      }
    })
};

export default authApiRequest;
