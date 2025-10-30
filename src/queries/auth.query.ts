import { authApiRequest } from '@/api-requests';
import { LoginBodyType } from '@/types';
import { useMutation } from '@tanstack/react-query';

export const useLoginMutation = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: async (body: LoginBodyType) => await authApiRequest.login(body)
  });
};
