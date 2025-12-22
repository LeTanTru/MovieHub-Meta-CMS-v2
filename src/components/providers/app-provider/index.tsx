'use client';

import envConfig from '@/config';
import { storageKeys } from '@/constants';
import { useProfileQuery, useRefreshTokenMutation } from '@/queries';
import { useAuthStore } from '@/store';
import { getData, isTokenExpiringSoon, setData } from '@/utils';
import { useEffect } from 'react';

export default function AppProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const accessToken = getData(storageKeys.ACCESS_TOKEN);
  const refreshToken = getData(storageKeys.REFRESH_TOKEN);

  const profileQuery = useProfileQuery();
  const { setProfile, isAuthenticated, setLoading } = useAuthStore();
  const refreshTokenMutation = useRefreshTokenMutation();

  useEffect(
    () => setLoading(profileQuery.isLoading || profileQuery.isFetching),
    [profileQuery.isFetching, profileQuery.isLoading, setLoading]
  );

  useEffect(() => {
    if (!accessToken) return;

    const handleGetProfile = async () => {
      const res = await profileQuery.refetch();
      if (res.data?.result && res.data.data) {
        setProfile(res.data.data);
      }
    };

    handleGetProfile();
  }, [accessToken, isAuthenticated]);

  useEffect(() => {
    if (!refreshToken) return;

    const handleRefreshToken = async () => {
      const res = await refreshTokenMutation.mutateAsync({
        refresh_token: refreshToken,
        grant_type: envConfig.NEXT_PUBLIC_GRANT_TYPE_REFRESH_TOKEN
      });

      if (res?.access_token) {
        setData(storageKeys.ACCESS_TOKEN, res?.access_token);
      }

      if (res?.refresh_token) {
        setData(storageKeys.REFRESH_TOKEN, res?.refresh_token);
      }
    };

    if (isTokenExpiringSoon(accessToken)) {
      handleRefreshToken();
    }
  }, []);

  return <>{children}</>;
}
