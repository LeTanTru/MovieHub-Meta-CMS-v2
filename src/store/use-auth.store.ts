import type { AuthStoreType, ProfileResType } from '@/types';
import { create } from 'zustand';

const useAuthStore = create<AuthStoreType>((set) => ({
  profile: null,
  isLoggedOut: false,

  setProfile: (profile: ProfileResType | null) => set({ profile }),
  setIsLoggedOut: (isLoggedOut: boolean) => set({ isLoggedOut })
}));

export default useAuthStore;
