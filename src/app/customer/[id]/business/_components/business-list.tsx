'use client';

import DbConfigModal from '@/app/customer/[id]/business/_components/db-config-modal';
import { AvatarField, Button, ToolTip } from '@/components/form';
import { HasPermission } from '@/components/has-permission';
import { ListPageWrapper, PageWrapper } from '@/components/layout';
import { BaseTable } from '@/components/table';
import {
  apiConfig,
  FieldTypes,
  statusOptions,
  TIME_DATE_FORMAT
} from '@/constants';
import { useDisclosure, useListBase } from '@/hooks';
import { businessSearchSchema } from '@/schemaValidations';
import {
  BusinessResType,
  BusinessSearchType,
  Column,
  SearchFormProps
} from '@/types';
import { formatDateUTC, renderImageUrl } from '@/utils';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { AiOutlineApartment, AiOutlineFileImage } from 'react-icons/ai';

export default function BusinessList({ queryKey }: { queryKey: string }) {
  const { id: customerId } = useParams<{ id: string }>();
  const [selectedRow, setSelectedRow] = useState<BusinessResType | null>(null);
  const dbConfigModal = useDisclosure();

  const { data, loading, pagination, handlers } = useListBase<
    BusinessResType,
    BusinessSearchType
  >({
    apiConfig: apiConfig.business,
    options: {
      objectName: 'doanh nghiệp',
      queryKey,
      defaultFilters: { customerId },
      notShowFromSearchParams: ['customerId']
    },
    override: (handlers) => {
      handlers.additionalColumns = () => ({
        dbConfig: (
          record: BusinessResType,
          buttonProps?: Record<string, any>
        ) => (
          <HasPermission
            requiredPermissions={[
              apiConfig.dbConfig.getByBusinessId.permissionCode as string
            ]}
          >
            <ToolTip title={'Cấu hình cơ sở dữ liệu'}>
              <span>
                <Button
                  onClick={() => handleOpenDbConfigModal(record)}
                  className='border-none bg-transparent px-2! shadow-none hover:bg-transparent'
                  {...buttonProps}
                >
                  <AiOutlineApartment className='text-dodger-blue size-4' />
                </Button>
              </span>
            </ToolTip>
          </HasPermission>
        )
      });
    }
  });

  const handleOpenDbConfigModal = (record: BusinessResType) => {
    setSelectedRow(record);
    dbConfigModal.open();
  };

  const handleCloseDbConfigModal = () => {
    setSelectedRow(null);
    dbConfigModal.close();
  };

  const columns: Column<BusinessResType>[] = [
    {
      title: '#',
      dataIndex: 'logoPath',
      width: 80,
      align: 'center',
      render: (value) => (
        <AvatarField
          size={50}
          disablePreview={!value}
          src={renderImageUrl(value)}
          icon={<AiOutlineFileImage className='size-7 text-slate-800' />}
          previewClassName='rounded'
          zoomSize={350}
          className='rounded'
        />
      )
    },
    {
      title: 'Tên doanh nghiệp',
      dataIndex: 'name',
      render: (value) => <span>{value ?? '---'}</span>
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'createdDate',
      width: 200,
      render: (value) => {
        return (
          <span className='line-clamp-1' title={value}>
            {formatDateUTC(value, TIME_DATE_FORMAT) || '-----'}
          </span>
        );
      }
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'expireDate',
      width: 200,
      render: (value) => (
        <span className='line-clamp-1' title={value}>
          {formatDateUTC(value, TIME_DATE_FORMAT) || '-----'}
        </span>
      )
    },
    {
      title: 'Ngày gia hạn',
      dataIndex: 'extDate',
      width: 200,
      render: (value) => (
        <span className='line-clamp-1' title={value}>
          {formatDateUTC(value, TIME_DATE_FORMAT) || '-----'}
        </span>
      )
    },
    handlers.renderStatusColumn(),
    handlers.renderActionColumn({
      actions: { edit: true, dbConfig: true, delete: true }
    })
  ];

  const searchFields: SearchFormProps<BusinessSearchType>['searchFields'] = [
    { key: 'businessName', placeholder: 'Tên doanh nghiệp' },
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
          schema: businessSearchSchema
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
      <DbConfigModal
        data={selectedRow}
        onClose={handleCloseDbConfigModal}
        open={dbConfigModal.opened}
      />
    </PageWrapper>
  );
}
