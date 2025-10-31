import { apiConfig, queryKeys } from '@/constants';
import { ApiResponse, ChangeStatusCustomerBodyType } from '@/types';
import { http } from '@/utils';
import { useMutation } from '@tanstack/react-query';

export const useChangeStatusCustomerMutation = () => {
  return useMutation({
    mutationKey: [`change-status-${queryKeys.CUSTOMER}`],
    mutationFn: (body: ChangeStatusCustomerBodyType) =>
      http.put<ApiResponse<any>>(apiConfig.customer.changeStatus, {
        body
      })
  });
};
