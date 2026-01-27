'use client';

import { Activity } from '@/components/activity';
import {
  AutoCompleteField,
  Col,
  DateTimePickerField,
  InputField,
  Row,
  SelectField,
  TextAreaField,
  UploadImageField
} from '@/components/form';
import { BaseForm } from '@/components/form/base-form';
import { PageWrapper } from '@/components/layout';
import { CircleLoading } from '@/components/loading';
import {
  apiConfig,
  TIME_DATE_FORMAT,
  languageOptions,
  STATUS_ACTIVE,
  statusOptions,
  customerBusinessErrorMaps,
  ErrorCode
} from '@/constants';
import { useFileUploadManager, useSaveBase } from '@/hooks';
import { useDeleteFileMutation, useUploadLogoMutation } from '@/queries';
import { route } from '@/routes';
import { businessSchema } from '@/schemaValidations';
import type {
  BusinessBodyType,
  BusinessResType,
  CustomerAutoCompleteType
} from '@/types';
import {
  convertLocalToUTC,
  convertUTCToLocal,
  renderImageUrl,
  renderListPageUrl
} from '@/utils';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import type { UseFormReturn } from 'react-hook-form';

export default function BusinessForm({ queryKey }: { queryKey: string }) {
  const { id } = useParams<{
    id: string;
  }>();

  const { mutateAsync: uploadLogoMutate, isPending: uploadLogoLoading } =
    useUploadLogoMutation();
  const { mutateAsync: deleteFileMutate } = useDeleteFileMutation();

  const {
    data,
    loading,
    isEditing,
    queryString,
    responseCode,
    handleSubmit,
    renderActions
  } = useSaveBase<BusinessResType, BusinessBodyType>({
    apiConfig: apiConfig.business,
    options: {
      queryKey,
      objectName: 'khách hàng',
      listPageUrl: route.business.getList.path,
      pathParams: {
        id
      },
      mode: id === 'create' ? 'create' : 'edit'
    }
  });

  const defaultValues: BusinessBodyType = {
    address: '',
    bannerPath: '',
    city: '',
    customerId: '',
    expireDate: '',
    extDate: '',
    hotline: '',
    lang: '',
    logoPath: '',
    name: '',
    note: '',
    settings: '',
    taxNumber: '',
    tenantId: '',
    zipCode: '',
    status: STATUS_ACTIVE
  };

  const logoImageManager = useFileUploadManager({
    initialUrl: data?.logoPath,
    deleteFileMutate: deleteFileMutate,
    isEditing,
    onOpen: true
  });

  const bannerImageManager = useFileUploadManager({
    initialUrl: data?.bannerPath,
    deleteFileMutate: deleteFileMutate,
    isEditing,
    onOpen: true
  });

  const initialValues: BusinessBodyType = useMemo(() => {
    return {
      customerId: data?.customer?.id?.toString() ?? '',
      address: data?.address ?? '',
      bannerPath: data?.bannerPath ?? '',
      city: data?.city ?? '',
      expireDate: convertUTCToLocal(data?.expireDate ?? '') ?? new Date(),
      extDate: convertUTCToLocal(data?.extDate ?? '') ?? new Date(),
      hotline: data?.hotline ?? '',
      lang: data?.lang ?? '',
      logoPath: data?.logoPath ?? '',
      name: data?.name ?? '',
      note: data?.note ?? '',
      settings: data?.settings ?? '',
      taxNumber: data?.taxNumber ?? '',
      tenantId: data?.businessTenantId ?? '',
      zipCode: data?.zipCode ?? '',
      status: data?.status ?? STATUS_ACTIVE
    };
  }, [
    data?.address,
    data?.bannerPath,
    data?.businessTenantId,
    data?.city,
    data?.customer?.id,
    data?.expireDate,
    data?.extDate,
    data?.hotline,
    data?.lang,
    data?.logoPath,
    data?.name,
    data?.note,
    data?.settings,
    data?.status,
    data?.taxNumber,
    data?.zipCode
  ]);

  const handleCancel = async () => {
    await logoImageManager.handleCancel();
    await bannerImageManager.handleCancel();
  };

  const onSubmit = async (
    values: BusinessBodyType,
    form: UseFormReturn<BusinessBodyType>
  ) => {
    await logoImageManager.handleSubmit();
    await bannerImageManager.handleSubmit();

    await handleSubmit(
      {
        ...values,
        expireDate: convertLocalToUTC(values.expireDate),
        extDate: convertLocalToUTC(values.extDate),
        logoPath: logoImageManager.currentUrl,
        bannerPath: bannerImageManager.currentUrl
      },
      form,
      customerBusinessErrorMaps
    );
  };

  return (
    <PageWrapper
      breadcrumbs={[
        {
          label: 'Doanh nghiệp',
          href: renderListPageUrl(route.business.getList.path, queryString)
        },
        { label: `${!data ? 'Thêm mới' : 'Cập nhật'} doanh nghiệp` }
      ]}
      notFound={responseCode === ErrorCode.BUSINESS_ERROR_NOT_FOUND}
      notFoundContent='Không tìm thấy doanh nghiệp này'
    >
      <BaseForm
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        schema={businessSchema}
        initialValues={initialValues}
      >
        {(form) => (
          <>
            <Row>
              <Col>
                <UploadImageField
                  value={renderImageUrl(logoImageManager.currentUrl)}
                  loading={uploadLogoLoading}
                  control={form.control}
                  name='logoPath'
                  onChange={logoImageManager.trackUpload}
                  size={100}
                  uploadImageFn={async (file: Blob) => {
                    const res = await uploadLogoMutate({
                      file
                    });
                    return res.data?.filePath ?? '';
                  }}
                  required
                  label='Logo'
                  deleteImageFn={logoImageManager.handleDeleteOnClick}
                />
              </Col>
              <Col>
                <UploadImageField
                  value={renderImageUrl(bannerImageManager.currentUrl)}
                  loading={uploadLogoLoading}
                  control={form.control}
                  name='bannerPath'
                  onChange={bannerImageManager.trackUpload}
                  size={100}
                  uploadImageFn={async (file: Blob) => {
                    const res = await uploadLogoMutate({
                      file
                    });
                    return res.data?.filePath ?? '';
                  }}
                  label='Banner'
                  required
                  aspect={16 / 9}
                  deleteImageFn={bannerImageManager.handleDeleteOnClick}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <InputField
                  control={form.control}
                  name='name'
                  label='Tên doanh nghiệp'
                  placeholder='Tên doanh nghiệp'
                  required
                />
              </Col>
              <Col>
                <InputField
                  control={form.control}
                  name='hotline'
                  label='Đường dây nóng'
                  placeholder='Đường dây nóng'
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <InputField
                  control={form.control}
                  name='zipCode'
                  label='Mã bưu điện'
                  placeholder='Mã bưu điện'
                  required
                />
              </Col>
              <Col>
                <AutoCompleteField
                  control={form.control}
                  name='customerId'
                  apiConfig={apiConfig.customer.autoComplete}
                  mappingData={(item: CustomerAutoCompleteType) => ({
                    label: item.fullName,
                    value: item.id.toString()
                  })}
                  searchParams={['fullName']}
                  label='Khách hàng'
                  placeholder='Khách hàng'
                  initialOptionParamName='requiredId'
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <DateTimePickerField
                  control={form.control}
                  name='expireDate'
                  label='Ngày hết hạn'
                  required
                  format={TIME_DATE_FORMAT}
                />
              </Col>
              <Col>
                <DateTimePickerField
                  control={form.control}
                  name='extDate'
                  label='Ngày gia hạn'
                  required
                  format={TIME_DATE_FORMAT}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <SelectField
                  control={form.control}
                  name='lang'
                  label='Ngôn ngữ'
                  options={languageOptions}
                  getLabel={(opt) => opt.label}
                  getValue={(opt) => opt.value}
                  placeholder='Ngôn ngữ'
                  required
                />
              </Col>
              <Col>
                <SelectField
                  control={form.control}
                  name='status'
                  label='Trạng thái'
                  options={statusOptions}
                  getLabel={(opt) => opt.label}
                  getValue={(opt) => opt.value}
                  placeholder='Trạng thái'
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <InputField
                  control={form.control}
                  name='taxNumber'
                  label='Mã số thuế'
                  placeholder='Mã số thuế'
                  required
                />
              </Col>
              <Col>
                <InputField
                  control={form.control}
                  name='tenantId'
                  label='Mã thuê bao'
                  placeholder='Mã thuê bao'
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <InputField
                  control={form.control}
                  name='city'
                  label='Thành phố'
                  placeholder='Thành phố'
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <TextAreaField
                  control={form.control}
                  name='address'
                  label='Địa chỉ'
                  placeholder='Địa chỉ'
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <TextAreaField
                  control={form.control}
                  name='note'
                  label='Ghi chú'
                  placeholder='Ghi chú'
                  required
                />
              </Col>
            </Row>
            <>
              {renderActions(form, {
                onCancel: handleCancel
              })}
            </>
            <Activity visible={loading}>
              <div className='absolute inset-0 bg-white/80'>
                <CircleLoading className='stroke-main-color mt-20 size-8' />
              </div>
            </Activity>
          </>
        )}
      </BaseForm>
    </PageWrapper>
  );
}
