import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { useAuthStore } from '@/features/auth/stores/useAuthStore';

export const useDeleteNotification = () => {
  const token = useAuthStore.getState().accessToken;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/my-notifications/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};
