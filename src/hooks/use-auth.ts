'use client';

import { useAuthStore } from '@/store';
import { decodeJwt, getAccessTokenFromLocalStorage } from '@/utils';
import { useShallow } from 'zustand/react/shallow';

const useAuth = () => {
  const { profile } = useAuthStore(
    useShallow((s) => ({
      profile: s.profile,
      loading: s.loading
    }))
  );
  const accessToken = getAccessTokenFromLocalStorage();
  let permissionCode: string[] = [];
  if (accessToken) {
    const decodedToken = decodeJwt(accessToken);
    if (decodedToken?.authorities) {
      permissionCode =
        decodedToken?.authorities?.length > 0
          ? decodedToken?.authorities?.map((role) => role)
          : [];
    }
  }

  return {
    isAuthenticated: !!profile,
    profile,
    kind: profile?.kind,
    permissionCode: permissionCode.map((pCode) => pCode)
  };
};

export default useAuth;
