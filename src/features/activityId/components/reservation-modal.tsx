import ReservationForm from '@/features/activityId/components/reservation-form';
import AdaptiveModal from '@/shared/components/modal/components/adaptive-modal/adaptive-modal';

import { Schedules } from '../libs/types/activityInfo';

const ReservationModal = ({
  scheduleArray,
  price,
  activityId,
}: {
  scheduleArray: Schedules[] | undefined;
  price: number | undefined;
  activityId: number;
}) => {
  return (
    <>
      {/* AdaptiveModal 사용 */}
      <AdaptiveModal
        extraClassName="h-fit p-0"
        translateY={'translate-y-[calc(100%-124px)]'}
      >
        <ReservationForm
          scheduleArray={scheduleArray}
          price={price}
          activityId={activityId}
        />
      </AdaptiveModal>
    </>
  );
};
export default ReservationModal;
