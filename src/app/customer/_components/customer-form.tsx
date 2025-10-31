'use client';

import {
  Col,
  InputField,
  Row,
  SelectField,
  UploadImageField
} from '@/components/form';
import { BaseForm } from '@/components/form/base-form';
import PasswordField from '@/components/form/password-field';
import { PageWrapper } from '@/components/layout';
import { CircleLoading } from '@/components/loading';
import {
  accountErrorMaps,
  apiConfig,
  STATUS_ACTIVE,
  statusOptions
} from '@/constants';
import { useSaveBase } from '@/hooks';
import { useUploadAvatar } from '@/queries';
import { route } from '@/routes';
import { customerSchema } from '@/schemaValidations';
import { CustomerBodyType, CustomerResType } from '@/types';
import { renderImageUrl } from '@/utils';
import { useEffect, useMemo, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

export default function CustomerForm({ queryKey }: { queryKey: string }) {
  const [avatarPath, setAvatarPath] = useState<string>('');
  const [logoPath, setLogoPath] = useState<string>('');
  const uploadImageMutation = useUploadAvatar();
  const { data, loading, isEditing, handleSubmit, renderActions } = useSaveBase<
    CustomerResType,
    CustomerBodyType
  >({
    apiConfig: apiConfig.customer,
    options: {
      queryKey,
      objectName: 'khách hàng',
      listPageUrl: route.customer.getList.path
    }
  });

  const defaultValues: CustomerBodyType = {
    id: '',
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

  const initialValues: CustomerBodyType = useMemo(() => {
    return {
      id: data?.id?.toString(),
      username: data?.account?.username ?? '',
      email: data?.account?.email ?? '',
      fullName: data?.account?.fullName ?? '',
      password: '',
      avatarPath: data?.account?.avatarPath ?? '',
      status: data?.status ?? STATUS_ACTIVE,
      confirmPassword: '',
      logoPath: data?.logoPath ?? '',
      phone: data?.account?.phone ?? ''
    };
  }, [data]);

  useEffect(() => {
    if (data?.account?.avatarPath) setAvatarPath(data?.account?.avatarPath);
  }, [data]);

  useEffect(() => {
    if (data?.logoPath) setLogoPath(data?.logoPath);
  }, [data]);

  const onSubmit = async (
    values: CustomerBodyType,
    form: UseFormReturn<CustomerBodyType>
  ) => {
    await handleSubmit(
      { ...values, avatarPath: avatarPath },
      form,
      accountErrorMaps
    );
  };

  return (
    <PageWrapper
      breadcrumbs={[
        { label: 'Khách hàng', href: route.customer.getList.path },
        { label: `${!data ? 'Thêm mới' : 'Cập nhật'} khách hàng` }
      ]}
    >
      <BaseForm
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        schema={customerSchema}
        initialValues={initialValues}
        className='w-200'
      >
        {(form) => (
          <>
            <Row>
              <Col>
                <UploadImageField
                  value={renderImageUrl(avatarPath)}
                  loading={uploadImageMutation.isPending}
                  control={form.control}
                  name='avatarPath'
                  onChange={(url) => {
                    setAvatarPath(url);
                  }}
                  size={100}
                  uploadImageFn={async (file: Blob) => {
                    const res = await uploadImageMutation.mutateAsync({ file });
                    return res.data?.filePath ?? '';
                  }}
                  label='Ảnh đại diện'
                />
              </Col>
              <Col>
                <UploadImageField
                  value={renderImageUrl(logoPath)}
                  loading={uploadImageMutation.isPending}
                  control={form.control}
                  name='logoPath'
                  onChange={(url) => {
                    setLogoPath(url);
                  }}
                  size={100}
                  uploadImageFn={async (file: Blob) => {
                    const res = await uploadImageMutation.mutateAsync({ file });
                    return res.data?.filePath ?? '';
                  }}
                  label='Logo'
                  required
                  aspect={16 / 9}
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <InputField
                  control={form.control}
                  name='username'
                  label='Tên đăng nhập'
                  placeholder='Tên đăng nhập'
                  required
                  disabled={isEditing}
                />
              </Col>
              <Col span={12}>
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
              <Col span={12}>
                <InputField
                  control={form.control}
                  name='phone'
                  label='Số điện thoại'
                  placeholder='Số điện thoại'
                  required
                />
              </Col>
              <Col span={12}>
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
                <Col span={12}>
                  <PasswordField
                    control={form.control}
                    name='oldPassword'
                    label='Mật khẩu cũ'
                    placeholder='Mật khẩu cũ'
                  />
                </Col>
                <Col span={12}>
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
                <Col span={12}>
                  <PasswordField
                    control={form.control}
                    name='password'
                    label='Mật khẩu'
                    placeholder='Mật khẩu'
                    required
                  />
                </Col>
                <Col span={12}>
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
                <Col span={12}>
                  <PasswordField
                    control={form.control}
                    name='confirmNewPassword'
                    label='Nhập lại mật khẩu mới'
                    placeholder='Nhập lại mật khẩu mới'
                  />
                </Col>
                <Col span={12}>
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
                <Col span={12}>
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
            <>{renderActions(form)}</>
            {loading && (
              <div className='absolute inset-0 bg-white/80'>
                <CircleLoading className='stroke-dodger-blue mt-20 size-8' />
              </div>
            )}
          </>
        )}
      </BaseForm>
    </PageWrapper>
  );
}
