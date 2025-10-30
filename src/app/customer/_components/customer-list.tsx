'use client';

import { AvatarField } from '@/components/form';
import { ListPageWrapper, PageWrapper } from '@/components/layout';
import { BaseTable } from '@/components/table';
import { apiConfig, FieldTypes, statusOptions } from '@/constants';
import { useListBase } from '@/hooks';
import { customerSearchSchema } from '@/schemaValidations/customer.schema';
import {
  Column,
  CustomerResType,
  CustomerSearchType,
  SearchFormProps
} from '@/types';
import { renderImageUrl } from '@/utils';
import { AiOutlineUser } from 'react-icons/ai';

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

  const columns: Column<CustomerResType>[] = [
    {
      title: '#',
      dataIndex: ['account', 'avatarPath'],
      width: 80,
      align: 'center',
      render: (value) => (
        <AvatarField
          size={50}
          disablePreview={!value}
          src={renderImageUrl(value)}
          icon={<AiOutlineUser className='size-7 text-slate-800' />}
        />
      )
    },
    {
      title: 'Tên',
      dataIndex: ['account', 'fullName'],
      render: (value) => value ?? '---'
    },
    {
      title: 'Email',
      dataIndex: ['account', 'email'],
      width: 250,
      render: (value) => (
        <span className='line-clamp-1' title={value}>
          {value ?? '-----'}
        </span>
      )
    },
    handlers.renderStatusColumn(),
    handlers.renderActionColumn({
      actions: { edit: true, delete: true }
    })
  ];

  const searchFields: SearchFormProps<CustomerSearchType>['searchFields'] = [
    { key: 'fullName', placeholder: 'Họ tên' },
    {
      key: 'phone',
      placeholder: 'Số điện thoại'
    },
    {
      key: 'status',
      placeholder: 'Trạng thái',
      type: FieldTypes.SELECT,
      options: statusOptions
    }
  ];

  return (
    <PageWrapper breadcrumbs={[{ label: 'Quản trị viên' }]}>
      <ListPageWrapper
        searchForm={handlers.renderSearchForm({
          searchFields,
          schema: customerSearchSchema
        })}
        addButton={handlers.renderAddButton()}
        reloadButton={handlers.renderReloadButton()}
      >
        <BaseTable
          columns={columns}
          dataSource={data || []}
          pagination={pagination}
          loading={loading}
          changePagination={handlers.changePagination}
        />
      </ListPageWrapper>
    </PageWrapper>
  );
}
