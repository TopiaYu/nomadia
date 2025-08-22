import React, { useEffect, useMemo, useState } from 'react';

import { getReserveTimeApi } from '@/features/activities/libs/api/getReserveTimeApi';
import { updateReservationStatus } from '@/features/activities/libs/api/updateReservation';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';

export type DisplayReservation = {
  id: string;
  nickname: string;
  headCount: number;
  status: 'pending' | 'confirmed' | 'declined';
  startTime: string;
  endTime: string;
};

interface ContentReservationProps {
  teamId: string;
  activityId: number;
  scheduleId: number[];
  status: 'pending' | 'confirmed' | 'declined';
  selectedDate: string;
  onStatusChange?: (
    reservationId: string,
    newStatus: 'confirmed' | 'declined',
  ) => void;
}

export const ContentReservation: React.FC<ContentReservationProps> = ({
  teamId,
  activityId,
  scheduleId,
  selectedDate,
  onStatusChange,
}) => {
  const [reservations, setReservations] = useState<DisplayReservation[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    'pending' | 'confirmed' | 'declined'
  >('pending');
  const token = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (!teamId || !activityId || !scheduleId || !token || !selectedDate)
      return;

    Promise.all(
      scheduleId.map((id) =>
        Promise.all([
          getReserveTimeApi(activityId, id, 'pending'),
          getReserveTimeApi(activityId, id, 'confirmed'),
          getReserveTimeApi(activityId, id, 'declined'),
        ]),
      ),
    )
      .then((results) => {
        const allReservations: DisplayReservation[] = results.flatMap(
          (resGroup) =>
            resGroup.flatMap((res) =>
              res.reservations.map((r) => ({
                id: String(r.id),
                nickname: r.nickname,
                headCount: r.headCount,
                status:
                  (r.status as 'pending' | 'confirmed' | 'declined') ||
                  'pending',
                startTime: r.startTime,
                endTime: r.endTime,
              })),
            ),
        );
        setReservations(allReservations);

        // 모든 시간대 목록
        const slots = [
          ...new Set(
            allReservations.map((r) => `${r.startTime} - ${r.endTime}`),
          ),
        ];
        setSelectedTimeSlot((prev) => prev ?? slots[0] ?? null);
      })
      .catch((err) => {
        console.error(err);
        setReservations([]);
        setSelectedTimeSlot(null);
      });
  }, [teamId, activityId, scheduleId, token, selectedDate]);

  // 드롭다운에 보여줄 시간대
  const timeSlots = useMemo(() => {
    return [
      ...new Set(reservations.map((r) => `${r.startTime} - ${r.endTime}`)),
    ];
  }, [reservations]);

  // 선택된 시간대 + 상태에 따른 예약 내역 필터링
  const filteredReservations = useMemo(() => {
    return reservations.filter((r) => {
      const statusMatch =
        activeTab === 'pending'
          ? r.status === 'pending' || !r.status
          : r.status === activeTab;

      const timeMatch = selectedTimeSlot
        ? `${r.startTime} - ${r.endTime}` === selectedTimeSlot
        : true;
      return statusMatch && timeMatch;
    });
  }, [reservations, selectedTimeSlot, activeTab]);

  // 예약 상태 변경
  const handleStatusChange = async (
    reservationId: string,
    newStatus: 'confirmed' | 'declined',
  ) => {
    try {
      await updateReservationStatus(
        teamId,
        activityId,
        Number(reservationId),
        newStatus,
      );
      setReservations((prev) =>
        prev.map((r) =>
          r.id === reservationId ? { ...r, status: newStatus } : r,
        ),
      );
      onStatusChange?.(reservationId, newStatus);
    } catch (error) {
      console.error(error);
      alert('예약 상태 업데이트 실패');
    }
  };

  return (
    <div className="mx-auto max-w-md p-4">
      <h1 className="txt-20-bold mb-6 text-center">{selectedDate}</h1>

      <div className="txt-14-bold mb-4 flex border-b">
        <button
          className={`flex-1 py-2 text-center ${
            activeTab === 'pending' ? 'border-main border-b-2' : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('pending')}
        >
          신청{' '}
          {
            reservations.filter(
              (r) =>
                r.status === 'pending' &&
                (selectedTimeSlot
                  ? `${r.startTime} - ${r.endTime}` === selectedTimeSlot
                  : true),
            ).length
          }
        </button>
        <button
          className={`flex-1 py-2 text-center ${
            activeTab === 'confirmed'
              ? 'border-main border-b-2'
              : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('confirmed')}
        >
          승인{' '}
          {
            reservations.filter(
              (r) =>
                r.status === 'confirmed' &&
                (selectedTimeSlot
                  ? `${r.startTime} - ${r.endTime}` === selectedTimeSlot
                  : true),
            ).length
          }
        </button>
        <button
          className={`flex-1 py-2 text-center ${
            activeTab === 'declined'
              ? 'border-main border-b-2'
              : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('declined')}
        >
          거절{' '}
          {
            reservations.filter(
              (r) =>
                r.status === 'declined' &&
                (selectedTimeSlot
                  ? `${r.startTime} - ${r.endTime}` === selectedTimeSlot
                  : true),
            ).length
          }
        </button>
      </div>

      <div className="mb-6">
        <div className="txt-14-bold mb-1 block">예약 시간</div>
        <select
          className="txt-14-medium h-[4.4rem] w-full rounded-2xl border p-4"
          value={selectedTimeSlot ?? ''}
          onChange={(e) => setSelectedTimeSlot(e.target.value || null)}
        >
          {timeSlots.map((timeSlot) => (
            <option key={timeSlot} value={timeSlot}>
              {timeSlot}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="txt-14-bold mb-2 block">예약 내역</div>

        <div className="space-y-4">
          {filteredReservations.map(({ id, nickname, headCount }) => (
            <div
              key={id}
              className="txt-13-medium flex items-center justify-between rounded-2xl border bg-white p-4"
            >
              <div>
                <div>닉네임: {nickname}</div>
                <div>인원: {headCount}명</div>
              </div>
              {activeTab === 'pending' && (
                <div className="flex flex-col space-y-2">
                  <button
                    className="txt-12-medium rounded border px-3 py-1"
                    onClick={() => handleStatusChange(id, 'confirmed')}
                  >
                    승인하기
                  </button>
                  <button
                    className="txt-12-medium rounded border px-3 py-1 text-sm"
                    onClick={() => handleStatusChange(id, 'declined')}
                  >
                    거절하기
                  </button>
                </div>
              )}
            </div>
          ))}
          {filteredReservations.length === 0 && (
            <p className="text-center text-gray-500">
              선택한 시간대에 해당 상태의 예약이 없습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
