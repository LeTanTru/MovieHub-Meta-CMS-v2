'use client';
import { logoWithText } from '@/assets';
import { Button, Col, InputField, PasswordField, Row } from '@/components/form';
import { BaseForm } from '@/components/form/base-form';
import { storageKeys } from '@/constants';
import { logger } from '@/logger';
import { useLoginMutation, useProfileQuery } from '@/queries';
import { loginSchema } from '@/schemaValidations';
import type { LoginBodyType } from '@/types';
import { notify, setData } from '@/utils';
import Image from 'next/image';
import { useAppLoadingStore, useAuthStore } from '@/store';
import envConfig from '@/config';

export default function LoginForm() {
  const { refetch: getProfile } = useProfileQuery();
  const { mutateAsync: loginMutate, isPending } = useLoginMutation();

  const setLoading = useAppLoadingStore((s) => s.setLoading);
  const setProfile = useAuthStore((s) => s.setProfile);

  const defaultValues: LoginBodyType = {
    username: '',
    password: '',
    grant_type: envConfig.NEXT_PUBLIC_GRANT_TYPE as string
  };

  const onSubmit = async (values: LoginBodyType) => {
    await loginMutate(values, {
      onSuccess: async (res) => {
        notify.success('Đăng nhập thành công');
        setData(storageKeys.ACCESS_TOKEN, res?.access_token!);
        setData(storageKeys.REFRESH_TOKEN, res?.refresh_token!);
        setData(storageKeys.USER_KIND, res?.user_kind?.toString()!);
        const profile = await getProfile();
        if (profile.data?.data) {
          setProfile(profile.data?.data);
          setLoading(true);
        }
      },
      onError: (error) => {
        logger.error('Error while logging in:', error);
        notify.error('Đăng nhập thất bại');
      }
    });
  };

  return (
    <BaseForm
      defaultValues={defaultValues}
      schema={loginSchema}
      onSubmit={onSubmit}
      className='flex flex-col items-center justify-around gap-0 rounded-lg border border-solid border-gray-200 px-6 py-6 shadow-[0px_0px_10px_2px] shadow-black/20 max-[1560px]:w-100 min-[1560px]:w-120'
    >
      {(form) => (
        <>
          <Row className='mb-2 w-full'>
            <Col span={24} className='items-center justify-center px-0'>
              <div className='bg-sidebar/80 mx-auto flex w-full items-center justify-center rounded py-2'>
                <Image
                  src={logoWithText.src}
                  width={180}
                  height={50}
                  alt='MovieHub Logo'
                />
              </div>
            </Col>
          </Row>
          <Row className='w-full flex-col gap-5 *:px-0'>
            <Col span={24}>
              <InputField
                name='username'
                control={form.control}
                label='Tên đăng nhập'
                placeholder='Tên đăng nhập'
                required
              />
            </Col>
            <Col span={24}>
              <PasswordField
                name='password'
                control={form.control}
                label='Mật khẩu'
                placeholder='Mật khẩu'
                className='focus-visible:ring-dodger-blue'
                required
              />
            </Col>
          </Row>
          <Row className='mb-0 w-full'>
            <Col className='my-0 px-0' span={24}>
              <Button
                disabled={!form.formState.isDirty || isPending}
                variant={'primary'}
                loading={isPending}
              >
                Đăng nhập
              </Button>
            </Col>
          </Row>
        </>
      )}
    </BaseForm>
  );
}
