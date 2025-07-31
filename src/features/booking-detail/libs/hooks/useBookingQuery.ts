import { useQuery } from '@tanstack/react-query';

import { getBooking } from '../api/bookingApi';
import { GetBookingParams, GetBookingResponse } from '../types/booking';

export const useBookingQuery = (params?: GetBookingParams) => {
  return useQuery<GetBookingResponse>({
    queryKey: ['booking', params],
    queryFn: () => getBooking(params),
    staleTime: 1000 * 60 * 30,
    retry: 1,
  });
};
