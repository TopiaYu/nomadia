export const getReservations = async ({
  actId,
  date,
  token,
}: {
  actId: string;
  date: string;
  token: string;
}) => {
  const response = await fetch(
    `https://sp-globalnomad-api.vercel.app/15-6/my-activities/${actId}/reserved-schedule?date=${encodeURIComponent(date)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) throw new Error('예약 정보 요청 실패');

  const data = await response.json();
  return data; // 이건 서버 응답 구조에 따라 조정해야 함
};
