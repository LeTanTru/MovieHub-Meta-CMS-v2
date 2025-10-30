import { apiConfig } from '@/constants';
import { ApiResponse, ProfileBodyType, ProfileResType } from '@/types';
import { http } from '@/utils';

const accountApiRequest = {
  getProfile: async () =>
    await http.get<ApiResponse<ProfileResType>>(apiConfig.account.getProfile),
  updateProfile: async (body: ProfileBodyType) =>
    await http.put<ApiResponse<any>>(apiConfig.account.updateAdmin, {
      body
    })
};

export default accountApiRequest;
