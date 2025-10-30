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
  apiConfig,
  GROUP_KIND_ADMIN,
  STATUS_ACTIVE,
  statusOptions
} from '@/constants';
import { useSaveBase } from '@/hooks';
import { useGroupListQuery, useUploadAvatar } from '@/queries';
import { route } from '@/routes';
import { accountSchema } from '@/schemaValidations';
import { AccountBodyType, AccountResType } from '@/types';
import { renderImageUrl } from '@/utils';
import { useEffect, useMemo, useState } from 'react';

export default function AdminForm({ queryKey }: { queryKey: string }) {
  const [avatarPath, setAvatarPath] = useState<string>('');
  const groupListQuery = useGroupListQuery({ kind: GROUP_KIND_ADMIN });
  const groupList = groupListQuery.data?.data.content || [];
  const groupOptions = groupList.map((item) => ({
    label: item.name,
    value: item.id
  }));
  const { data, loading, isEditing, handleSubmit, renderActions } = useSaveBase<
    AccountResType,
    AccountBodyType
  >({
    apiConfig: {
      create: apiConfig.account.createAdmin,
      update: apiConfig.account.updateAdmin,
      getById: apiConfig.account.getById
    },
    options: {
      queryKey,
      objectName: 'tài khoản nhân viên',
      listPageUrl: route.admin.getList.path
    }
  });
  const uploadImageMutation = useUploadAvatar();

  const defaultValues: AccountBodyType = {
    username: '',
    email: '',
    fullName: '',
    groupId: '',
    password: '',
    avatarPath: '',
    status: 0,
    confirmPassword: ''
  };

  const initialValues: AccountBodyType = useMemo(() => {
    return {
      username: data?.username ?? '',
      email: data?.email ?? '',
      fullName: data?.fullName ?? '',
      groupId: data?.group?.id ?? '',
      password: '',
      avatarPath: data?.avatarPath ?? '',
      status: data?.status ?? STATUS_ACTIVE,
      confirmPassword: ''
    };
  }, [data, groupList]);

  useEffect(() => {
    if (data?.avatarPath) setAvatarPath(data?.avatarPath);
  }, [data]);

  const onSubmit = async (values: AccountBodyType) => {
    await handleSubmit({ ...values, avatarPath: avatarPath });
  };

  return (
    <PageWrapper
      breadcrumbs={[
        { label: 'Quản trị viên', href: route.admin.getList.path },
        { label: `${!data ? 'Thêm mới' : 'Cập nhật'} quản trị viên` }
      ]}
    >
      <BaseForm
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        schema={accountSchema}
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
                  label='Tải ảnh lên'
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
                  label='Họ tên nhân viên'
                  placeholder='Họ tên nhân viên'
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <InputField
                  control={form.control}
                  name='email'
                  label='Email'
                  placeholder='Email'
                  required
                />
              </Col>
              <Col span={12}>
                <PasswordField
                  control={form.control}
                  name='password'
                  label='Mật khẩu'
                  placeholder='Mật khẩu'
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <PasswordField
                  control={form.control}
                  name='confirmPassword'
                  label='Nhập lại mật khẩu'
                  placeholder='Nhập lại mật khẩu'
                  required
                />
              </Col>
              <Col span={12}>
                <SelectField
                  getLabel={(opt) => opt.label}
                  getValue={(opt) => opt.value}
                  options={groupOptions || []}
                  control={form.control}
                  name='groupId'
                  label='Nhóm quyền'
                  placeholder='Nhóm quyền'
                  required
                />
              </Col>
            </Row>
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
