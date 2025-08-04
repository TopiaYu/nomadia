import { useQuery } from '@tanstack/react-query';

import { getBooking } from '../api/bookingApi';
import { GetBookingParams, GetBookingResponse } from '../types/booking';

export const useBookingQuery = (params?: GetBookingParams) => {
  return useQuery<GetBookingResponse>({
    queryKey: ['booking', params],
    queryFn: () => getBooking(params),
    staleTime: 1000 * 60 * 60 * 2, // 2시간
    cacheTime: 1000 * 60 * 60 * 24, // 24시간
    retry: 1,
  });
};
