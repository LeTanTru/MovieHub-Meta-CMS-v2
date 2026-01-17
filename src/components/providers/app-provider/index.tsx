'use client';

import { logger } from '@/logger';
import { useProfileQuery } from '@/queries';
import { useAppLoading, useAuthStore } from '@/store';
import { getAccessTokenFromLocalStorage } from '@/utils';
import { type ReactNode, useEffect } from 'react';

export default function AppProvider({ children }: { children: ReactNode }) {
  const accessToken = getAccessTokenFromLocalStorage();
  const profileQuery = useProfileQuery(!!accessToken);
  const setLoading = useAppLoading((s) => s.setLoading);
  const setProfile = useAuthStore((s) => s.setProfile);

  useEffect(() => {
    setLoading(profileQuery.isLoading || profileQuery.isFetching);
  }, [profileQuery.isFetching, profileQuery.isLoading, setLoading]);

  useEffect(() => {
    if (!profileQuery.data) return;

    if (profileQuery.data.result && profileQuery.data.data) {
      setProfile(profileQuery.data.data);
    }
  }, [profileQuery.data, setProfile]);

  useEffect(() => {
    if (!profileQuery.error) return;
    logger.error('Error while fetching profile', profileQuery.error);
  }, [profileQuery.error]);

  return <>{children}</>;
}
