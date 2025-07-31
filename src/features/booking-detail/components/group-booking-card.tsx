import BookingCardContainer from '@/features/booking-detail/components/booking-card-container';
import { Reservation } from '@/features/booking-detail/libs/types/booking';
import { sortDatesAscending } from '@/shared/libs/utils/parseDate';

// 새로운 인터페이스
interface GroupedBookingsProps {
  reservations: Reservation[];
}

/**
 * @description 날짜별로 예약 그룹화하여 렌더링하는 컴포넌트
 *
 * @author 김영현
 * @param reservations 예약 정보
 */
const GroupedBookingCards = ({ reservations }: GroupedBookingsProps) => {
  // 날짜별로 예약 그룹화
  const groupedReservations = reservations.reduce(
    (groups, reservation) => {
      const date = reservation.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(reservation);
      return groups;
    },
    {} as Record<string, Reservation[]>,
  );

  // 날짜순으로 정렬 (오름차순)
  const sortedDates = sortDatesAscending(Object.keys(groupedReservations));

  return (
    <div className="flex flex-col gap-[2rem]">
      {sortedDates.map((date) => (
        <div key={date} className="flex flex-col gap-[1.2rem]">
          {/* 날짜 헤더 - 한 번만 표시 */}
          <div className="text-[1.6rem] font-bold text-gray-800 md:text-[1.8rem]">
            {date}
          </div>

          {/* 해당 날짜의 예약 카드들 */}
          <div className="flex flex-col gap-[3rem]">
            {groupedReservations[date].map((reservation, index) => (
              <BookingCardContainer
                key={reservation.id}
                reservation={reservation}
                showDate={false} // 그룹 내에서는 날짜를 표시하지 않음
                showDivider={index === groupedReservations[date].length - 1}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupedBookingCards;
