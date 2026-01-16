import type { AuthStoreType, ProfileResType } from '@/types';
import { create } from 'zustand';

const useAuthStore = create<AuthStoreType>((set) => ({
  profile: null,
  loading: true,
  isLoggedOut: false,

  setProfile: (profile: ProfileResType | null) => set({ profile }),
  setLoading: (loading: boolean) => set({ loading }),
  setIsLoggedOut: (isLoggedOut: boolean) => set({ isLoggedOut })
}));

export default useAuthStore;
