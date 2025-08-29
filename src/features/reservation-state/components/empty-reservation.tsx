import { CalendarDays } from 'lucide-react';

const EmptyReservation = () => {
  return (
    <div className="flex h-full flex-col items-center text-center">
      <CalendarDays className="text-main mt-15 h-12 w-12" />
      <h2 className="txt-18-bold mt-20 text-[2rem] text-gray-900">
        해당 날짜에는 예약내역이 없어요.
      </h2>
      <p className="txt-16-medium mt-10 text-[1.8rem] text-gray-700">
        예약한 날짜를 선택하면,
        <br />
        내 체험을 예약 신청한 사람들과
        <br />
        승인/거절한 목록을 확인할 수 있어요!
      </p>
    </div>
  );
};

export default EmptyReservation;
