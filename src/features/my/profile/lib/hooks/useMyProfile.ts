import { useQuery } from '@tanstack/react-query';

import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { getMe } from '@/features/my/profile/lib/api/profile.api';

export const useMyProfile = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  return useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    enabled: isLoggedIn,
    staleTime: 1000 * 60 * 25,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
