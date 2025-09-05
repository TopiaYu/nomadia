import BookingList from '@/features/booking-detail/components/booking-list';

const ReservationPage = () => {
  return (
    <main>
      <div className="mb-[2.4rem] py-[1rem]">
        <h1 className="mb-[0.4rem] text-[1.8rem] font-bold text-gray-950">
          예약 내역
        </h1>
        <span className="text-[1.4rem] font-medium text-gray-500">
          예약내역 변경 및 취소할 수 있습니다.
        </span>
      </div>
      <BookingList />
    </main>
  );
};

export default ReservationPage;
