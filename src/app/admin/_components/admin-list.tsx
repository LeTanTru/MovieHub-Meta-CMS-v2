'use client';

import { AvatarField } from '@/components/form';
import { PageWrapper } from '@/components/layout';
import ListPageWrapper from '@/components/layout/list-page-wrapper';
import { BaseTable } from '@/components/table';
import {
  apiConfig,
  FieldTypes,
  GROUP_KIND_ADMIN,
  statusOptions
} from '@/constants';
import { useListBase } from '@/hooks';
import { cn } from '@/lib';
import { accountSearchSchema } from '@/schemaValidations';
import {
  AccountAutoResType,
  AccountSearchType,
  Column,
  SearchFormProps
} from '@/types';
import { renderImageUrl } from '@/utils';
import { CircleUserRound } from 'lucide-react';

export default function AdminList({ queryKey }: { queryKey: string }) {
  const { data, pagination, loading, handlers, listQuery } = useListBase<
    AccountAutoResType,
    AccountSearchType
  >({
    apiConfig: {
      ...apiConfig.account,
      create: apiConfig.account.createAdmin,
      update: apiConfig.account.updateAdmin
    },
    options: {
      queryKey,
      objectName: 'tài khoản',
      defaultFilters: { kind: GROUP_KIND_ADMIN }
    }
  });

  const columns: Column<AccountAutoResType>[] = [
    {
      title: '#',
      dataIndex: 'avatarPath',
      width: 80,
      align: 'center',
      render: (value) => (
        <AvatarField
          size={50}
          className={cn('mx-auto rounded-full', {
            rounded: value
          })}
          previewClassName='rounded'
          disablePreview={!value}
          src={renderImageUrl(value)}
          icon={
            <CircleUserRound className='fill-transparent stroke-slate-800' />
          }
        />
      )
    },
    {
      title: 'Tên',
      dataIndex: 'fullName',
      render: (value) => value ?? '---'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 250,
      render: (value) => (
        <span className='line-clamp-1' title={value}>
          {value}
        </span>
      )
    },
    handlers.renderStatusColumn(),
    handlers.renderActionColumn({
      actions: { edit: true, delete: (record) => !record.isSuperAdmin }
    })
  ];

  const searchFields: SearchFormProps<AccountSearchType>['searchFields'] = [
    { key: 'fullName', placeholder: 'Họ tên' },
    {
      key: 'email',
      placeholder: 'Email'
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
          schema: accountSearchSchema
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
