'use client';

import { logger } from '@/logger';
import { useProfileQuery } from '@/queries';
import { useAuthStore } from '@/store';
import { getAccessTokenFromLocalStorage } from '@/utils';
import { type ReactNode, useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

export default function AppProvider({ children }: { children: ReactNode }) {
  const accessToken = getAccessTokenFromLocalStorage();
  const profileQuery = useProfileQuery(!!accessToken);
  const { setLoading, setProfile } = useAuthStore(
    useShallow((s) => ({
      setLoading: s.setLoading,
      setProfile: s.setProfile
    }))
  );

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
