'use client';

import ReservationForm from '@/features/activityId/components/reservation-form/reservation-form';
import AdaptiveModal from '@/shared/components/modal/components/adaptive-modal/adaptive-modal';
import useHydration from '@/shared/libs/hooks/useHydration';

const ReservationModal = ({
  price,
  activityId,
}: {
  price: number | undefined;
  activityId: number;
}) => {
  const hydrated = useHydration();

  if (!hydrated) return null;
  return (
    <>
      {/* AdaptiveModal 사용 */}
      <AdaptiveModal
        extraClassName="h-fit p-0"
        translateY={'translate-y-[calc(100%-132px)]'}
      >
        <ReservationForm price={price} activityId={activityId} />
      </AdaptiveModal>
    </>
  );
};
export default ReservationModal;
