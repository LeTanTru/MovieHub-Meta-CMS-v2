'use client';

import { logger } from '@/logger';
import { useProfileQuery } from '@/queries';
import { useAppLoadingStore, useAuthStore } from '@/store';
import { getAccessTokenFromLocalStorage } from '@/utils';
import { type ReactNode, useEffect } from 'react';

export default function AppProvider({ children }: { children: ReactNode }) {
  const accessToken = getAccessTokenFromLocalStorage();
  const { data, error, isLoading, isFetching } = useProfileQuery(!!accessToken);
  const setLoading = useAppLoadingStore((s) => s.setLoading);
  const setProfile = useAuthStore((s) => s.setProfile);

  useEffect(() => {
    setLoading(isLoading || isFetching);
  }, [isFetching, isLoading, setLoading]);

  useEffect(() => {
    if (!data) return;

    if (data.result && data.data) {
      setProfile(data.data);
    }
  }, [data, setProfile]);

  useEffect(() => {
    if (!error) return;
    logger.error('Error while fetching profile', error);
  }, [error]);

  return <>{children}</>;
}
