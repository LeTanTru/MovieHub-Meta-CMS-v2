import { CustomerForm } from '@/app/customer/_components';
import { queryKeys } from '@/constants';

export default async function CustomerSavePage() {
  return <CustomerForm queryKey={queryKeys.CUSTOMER} />;
}
