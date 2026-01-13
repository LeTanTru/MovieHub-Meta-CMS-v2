'use client';

import { Activity } from '@/components/activity';
import {
  Col,
  InputField,
  PasswordField,
  Row,
  SelectField,
  UploadImageField
} from '@/components/form';
import { BaseForm } from '@/components/form/base-form';
import { PageWrapper } from '@/components/layout';
import { CircleLoading } from '@/components/loading';
import {
  customerErrorMaps,
  apiConfig,
  STATUS_ACTIVE,
  statusOptions,
  ErrorCode
} from '@/constants';
import { useFileUploadManager, useSaveBase } from '@/hooks';
import { useDeleteFileMutation, useUploadAvatarMutation } from '@/queries';
import { route } from '@/routes';
import { customerSchema } from '@/schemaValidations';
import type { CustomerBodyType, CustomerResType } from '@/types';
import { renderImageUrl, renderListPageUrl } from '@/utils';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import type { UseFormReturn } from 'react-hook-form';

export default function CustomerForm({ queryKey }: { queryKey: string }) {
  const { id } = useParams<{ id: string }>();

  const uploadImageMutation = useUploadAvatarMutation();
  const deleteFileMutation = useDeleteFileMutation();

  const {
    data,
    loading,
    isEditing,
    queryString,
    responseCode,
    handleSubmit,
    renderActions
  } = useSaveBase<CustomerResType, CustomerBodyType>({
    apiConfig: apiConfig.customer,
    options: {
      queryKey,
      objectName: 'khách hàng',
      listPageUrl: route.customer.getList.path,
      pathParams: {
        id
      },
      mode: id === 'create' ? 'create' : 'edit'
    }
  });

  const defaultValues: CustomerBodyType = {
    username: '',
    email: '',
    fullName: '',
    password: '',
    avatarPath: '',
    status: 0,
    confirmPassword: '',
    logoPath: '',
    phone: ''
  };

  const avatarImageManager = useFileUploadManager({
    initialUrl: data?.avatarPath,
    deleteFileMutation: deleteFileMutation,
    isEditing,
    onOpen: true
  });

  const logoImageManager = useFileUploadManager({
    initialUrl: data?.avatarPath,
    deleteFileMutation: deleteFileMutation,
    isEditing,
    onOpen: true
  });

  const initialValues: CustomerBodyType = useMemo(() => {
    return {
      username: data?.username ?? '',
      email: data?.email ?? '',
      fullName: data?.fullName ?? '',
      password: '',
      avatarPath: data?.avatarPath ?? '',
      status: data?.status ?? STATUS_ACTIVE,
      confirmPassword: '',
      logoPath: data?.logoPath ?? '',
      phone: data?.phone ?? ''
    };
  }, [data]);

  const handleCancel = async () => {
    await avatarImageManager.handleCancel();
    await logoImageManager.handleCancel();
  };

  const onSubmit = async (
    values: CustomerBodyType,
    form: UseFormReturn<CustomerBodyType>
  ) => {
    await avatarImageManager.handleSubmit();
    await logoImageManager.handleSubmit();

    await handleSubmit(
      {
        ...values,
        avatarPath: avatarImageManager.currentUrl,
        logoPath: logoImageManager.currentUrl
      },
      form,
      customerErrorMaps
    );
  };

  return (
    <PageWrapper
      breadcrumbs={[
        {
          label: 'Khách hàng',
          href: renderListPageUrl(route.customer.getList.path, queryString)
        },
        { label: `${!data ? 'Thêm mới' : 'Cập nhật'} khách hàng` }
      ]}
      notFound={responseCode === ErrorCode.CUSTOMER_ERROR_NOT_FOUND}
      notFoundContent='Không tìm thấy khách hàng này'
    >
      <BaseForm
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        schema={customerSchema(isEditing)}
        initialValues={initialValues}
      >
        {(form) => (
          <>
            <Row>
              <Col>
                <UploadImageField
                  value={renderImageUrl(avatarImageManager.currentUrl)}
                  loading={uploadImageMutation.isPending}
                  control={form.control}
                  name='avatarPath'
                  onChange={avatarImageManager.trackUpload}
                  size={100}
                  uploadImageFn={async (file: Blob) => {
                    const res = await uploadImageMutation.mutateAsync({ file });
                    return res.data?.filePath ?? '';
                  }}
                  label='Ảnh đại diện'
                  deleteImageFn={avatarImageManager.handleDeleteOnClick}
                />
              </Col>
              <Col>
                <UploadImageField
                  value={renderImageUrl(logoImageManager.currentUrl)}
                  loading={uploadImageMutation.isPending}
                  control={form.control}
                  name='logoPath'
                  onChange={logoImageManager.trackUpload}
                  size={100}
                  uploadImageFn={async (file: Blob) => {
                    const res = await uploadImageMutation.mutateAsync({ file });
                    return res.data?.filePath ?? '';
                  }}
                  label='Logo'
                  aspect={16 / 9}
                  deleteImageFn={logoImageManager.handleDeleteOnClick}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <InputField
                  control={form.control}
                  name='username'
                  label='Tên đăng nhập'
                  placeholder='Tên đăng nhập'
                  required
                  disabled={isEditing}
                />
              </Col>
              <Col>
                <InputField
                  control={form.control}
                  name='fullName'
                  label='Họ tên khách hàng'
                  placeholder='Họ tên khách hàng'
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <InputField
                  control={form.control}
                  name='phone'
                  label='Số điện thoại'
                  placeholder='Số điện thoại'
                  required
                />
              </Col>
              <Col>
                <InputField
                  control={form.control}
                  name='email'
                  label='Email'
                  placeholder='Email'
                  required
                />
              </Col>
            </Row>
            {isEditing ? (
              <Row>
                <Col>
                  <PasswordField
                    control={form.control}
                    name='oldPassword'
                    label='Mật khẩu cũ'
                    placeholder='Mật khẩu cũ'
                  />
                </Col>
                <Col>
                  <PasswordField
                    control={form.control}
                    name='newPassword'
                    label='Mật khẩu mới'
                    placeholder='Mật khẩu mới'
                  />
                </Col>
              </Row>
            ) : (
              <Row>
                <Col>
                  <PasswordField
                    control={form.control}
                    name='password'
                    label='Mật khẩu'
                    placeholder='Mật khẩu'
                    required
                  />
                </Col>
                <Col>
                  <PasswordField
                    control={form.control}
                    name='confirmPassword'
                    label='Nhập lại mật khẩu'
                    placeholder='Nhập lại mật khẩu'
                    required
                  />
                </Col>
              </Row>
            )}
            {isEditing ? (
              <Row>
                <Col>
                  <PasswordField
                    control={form.control}
                    name='confirmNewPassword'
                    label='Nhập lại mật khẩu mới'
                    placeholder='Nhập lại mật khẩu mới'
                  />
                </Col>
                <Col>
                  <SelectField
                    getLabel={(opt) => opt.label}
                    getValue={(opt) => opt.value}
                    options={statusOptions || []}
                    control={form.control}
                    name='status'
                    label='Trạng thái'
                    placeholder='Trạng thái'
                    required
                  />
                </Col>
              </Row>
            ) : (
              <Row>
                <Col>
                  <SelectField
                    getLabel={(opt) => opt.label}
                    getValue={(opt) => opt.value}
                    options={statusOptions || []}
                    control={form.control}
                    name='status'
                    label='Trạng thái'
                    placeholder='Trạng thái'
                    required
                  />
                </Col>
              </Row>
            )}
            <>
              {renderActions(form, {
                onCancel: handleCancel
              })}
            </>
            <Activity visible={loading}>
              <div className='absolute inset-0 bg-white/80'>
                <CircleLoading className='stroke-dodger-blue mt-20 size-8' />
              </div>
            </Activity>
          </>
        )}
      </BaseForm>
    </PageWrapper>
  );
}
