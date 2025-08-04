// 'use client';

// import 'dayjs/locale/ko';

// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';
// import { Trash2, X } from 'lucide-react';
// import React, { useRef } from 'react';

// import { useDeleteNotification } from '@/features/activities/libs/hooks/useDeleteNotification';
// import { useNotifications } from '@/features/activities/libs/hooks/useNotifications';
// import { useInfiniteScroll } from '@/shared/libs/hooks/infiniteScroll/useInfiniteScroll';
// import { useModalStore } from '@/shared/libs/stores/useModalStore';

// dayjs.extend(relativeTime);
// dayjs.locale('ko');

// const formatRelativeTime = (date: string) => {
//   return dayjs(date).fromNow();
// };

// function renderContent(content: string) {
//   const regex = /(승인|거절)/g;
//   const parts = content.split(')');

//   return parts.flatMap((part, index) => {
//     const subParts = part.split(regex);

//     const coloredPart = (
//       <React.Fragment key={`part-${index}`}>
//         {subParts.map((text, idx) =>
//           text === '승인' ? (
//             <span key={idx} className="text-main font-semibold">
//               {text}
//             </span>
//           ) : text === '거절' ? (
//             <span key={idx} className="font-semibold text-red-500">
//               {text}
//             </span>
//           ) : (
//             text
//           ),
//         )}
//       </React.Fragment>
//     );

//     if (index === parts.length - 1) {
//       return [coloredPart];
//     } else if (index === 0) {
//       return [coloredPart, ')', <br key={`br-${index}`} />];
//     } else {
//       return [coloredPart, <br key={`br-${index}`} />];
//     }
//   });
// }

// const NotificationModal = () => {
//   const { closeNotification, isNotificationOpen } = useModalStore();

//   const { data, isLoading, hasNextPage, fetchNextPage } = useNotifications();
//   const deleteNotification = useDeleteNotification();
//   const loadMoreRef = useRef<HTMLDivElement | null>(null);

//   useInfiniteScroll(loadMoreRef, isLoading, !!hasNextPage, fetchNextPage, 100);

//   if (!isNotificationOpen) return null;

//   const notifications = data?.pages.flatMap((page) => page.notifications) ?? [];

//   return (
//     <div className="absolute top-[4.8rem] left-1/2 z-10 h-[32.6rem] w-[30rem] max-w-[90vw] -translate-x-1/2 overflow-y-auto rounded-lg border bg-white shadow-md md:right-0 md:left-auto md:w-[32.7rem] md:translate-x-0 lg:w-[40rem]">
//       <div className="relative flex h-[4.8rem] items-center justify-between px-[2.3rem]">
//         <div className="txt-16-bold text-gray-950">
//           알림 <span className="text-gray-950">{notifications.length}개</span>
//         </div>
//         <button onClick={closeNotification}>
//           <X className="size-[1.5rem]" />
//         </button>
//       </div>

//       {notifications.length === 0 && (
//         <div className="p-30 text-center text-[1.2rem] text-gray-500">
//           아직 알림이 없습니다.
//         </div>
//       )}

//       <ul className="divide-y">
//         {notifications.map((notification) => {
//           const handleClick = () => {
//             deleteNotification.mutate(String(notification.id));
//           };
//           const isApproved = notification.content.includes('승인');
//           const isRejected = notification.content.includes('거절');
//           const typeLabel = isApproved
//             ? '예약 승인'
//             : isRejected
//               ? '예약 거절'
//               : '';
//           return (
//             <li
//               key={notification.id}
//               className={`relative h-[13.2rem] px-4 py-3 text-[1.4rem] text-gray-800 ${
//                 isApproved ? 'bg-sub' : isRejected ? 'bg-white' : ''
//               }`}
//             >
//               <div className="txt-12-medium mb-3 flex items-center justify-between px-3 text-gray-400">
//                 {typeLabel && (
//                   <span className="txt-14-bold py-2 text-gray-950">
//                     {typeLabel}
//                   </span>
//                 )}
//                 <span>{formatRelativeTime(notification.createdAt)}</span>
//               </div>

//               <div className="txt-14-medium px-3 whitespace-pre-line">
//                 {renderContent(notification.content)}
//               </div>

//               <button
//                 onClick={handleClick}
//                 className="absolute right-3 bottom-3 text-gray-400 hover:text-red-500"
//                 aria-label="알림 삭제"
//                 type="button"
//               >
//                 <Trash2 size={18} />
//               </button>
//             </li>
//           );
//         })}
//       </ul>

//       <div ref={loadMoreRef} className="h-1" />
//     </div>
//   );
// };

// export default NotificationModal;
