import { accountApiRequest } from '@/api-requests';
import { useAuthStore } from '@/store';
import { ProfileBodyType } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useProfileQuery = (enabled: boolean = false) => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => await accountApiRequest.getProfile(),
    enabled: enabled
  });
};

export const useUpdateProfileMutation = () => {
  return useMutation({
    mutationKey: ['update-profile'],
    mutationFn: async (body: ProfileBodyType) =>
      await accountApiRequest.updateProfile(body),
    onSuccess: async () => {
      const res = await accountApiRequest.getProfile();
      useAuthStore.getState().setProfile(res.data!);
    }
  });
};
