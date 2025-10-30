'use client';

import { apiConfig } from '@/constants';
import { useListBase } from '@/hooks';
import { CustomerResType, CustomerSearchType } from '@/types';

export default function CustomerList({ queryKey }: { queryKey: string }) {
  const { data, loading, pagination, handlers } = useListBase<
    CustomerResType,
    CustomerSearchType
  >({
    apiConfig: apiConfig.customer,
    options: {
      objectName: 'khách hàng',
      queryKey
    }
  });
  return <div></div>;
}
