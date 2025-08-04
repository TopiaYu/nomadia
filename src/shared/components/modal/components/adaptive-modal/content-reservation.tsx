// import React, { useState } from 'react';

// interface Reservation {
//   id: string;
//   startTime: string;
//   endTime: string;
//   peopleCount: number;
// }

// interface ContentReservationProps {
//   dateString: string; // ex) "23년 2월 10일"
//   reservations: Reservation[];
// }

// const mockTimeSlots = ['14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00'];

// const ContentReservation: React.FC<ContentReservationProps> = ({
//   dateString,
//   reservations,
// }) => {
//   const [selectedTime, setSelectedTime] = useState(mockTimeSlots[0]);
//   const [tab, setTab] = useState<'신청' | '승인' | '거절'>('신청');

//   return (
//     <div
//       style={{
//         width: 300,
//         borderRadius: 20,
//         padding: 20,
//         boxShadow: '0 0 15px rgba(0,0,0,0.05)',
//         fontFamily: 'Noto Sans KR, sans-serif',
//       }}
//     >
//       {/* 날짜 */}
//       <h3 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 15 }}>
//         {dateString}
//       </h3>

//       {/* 탭 */}
//       <div
//         style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}
//       >
//         {['신청', '승인', '거절'].map((t, i) => (
//           <div
//             key={t}
//             onClick={() => setTab(t as any)}
//             style={{
//               cursor: 'pointer',
//               fontWeight: tab === t ? 'bold' : 'normal',
//               color: tab === t ? '#2563EB' : '#777',
//               margin: '0 10px',
//               borderBottom:
//                 tab === t ? '2px solid #2563EB' : '2px solid transparent',
//               paddingBottom: 5,
//             }}
//           >
//             {t} {tab === t ? reservations.length : 0}
//           </div>
//         ))}
//       </div>

//       {/* 예약 시간 */}
//       <div style={{ marginBottom: 15 }}>
//         <div style={{ fontWeight: 'bold', marginBottom: 6 }}>예약 시간</div>
//         <select
//           value={selectedTime}
//           onChange={(e) => setSelectedTime(e.target.value)}
//           style={{
//             width: '100%',
//             padding: '8px 12px',
//             borderRadius: 8,
//             border: '1px solid #ccc',
//             fontSize: 14,
//           }}
//         >
//           {mockTimeSlots.map((slot) => (
//             <option key={slot} value={slot}>
//               {slot}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* 예약 내역 */}
//       <div>
//         <div style={{ fontWeight: 'bold', marginBottom: 6 }}>예약 내역</div>
//         <div
//           style={{
//             border: '1px solid #eee',
//             borderRadius: 12,
//             padding: 10,
//             maxHeight: 200,
//             overflowY: 'auto',
//           }}
//         >
//           {reservations.map(({ id, peopleCount }) => (
//             <div
//               key={id}
//               style={{
//                 backgroundColor: '#f9f9f9',
//                 padding: 10,
//                 borderRadius: 10,
//                 marginBottom: 10,
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 fontSize: 14,
//               }}
//             >
//               <div>
//                 <div>닉네임 {id}</div>
//                 <div>인원 {peopleCount}명</div>
//               </div>
//               <div>
//                 <button
//                   style={{
//                     marginRight: 8,
//                     backgroundColor: '#eee',
//                     borderRadius: 10,
//                     border: 'none',
//                     padding: '5px 10px',
//                     fontSize: 12,
//                     cursor: 'pointer',
//                   }}
//                 >
//                   승인하기
//                 </button>
//                 <button
//                   style={{
//                     backgroundColor: '#eee',
//                     borderRadius: 10,
//                     border: 'none',
//                     padding: '5px 10px',
//                     fontSize: 12,
//                     cursor: 'pointer',
//                   }}
//                 >
//                   거절하기
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // 예시 목데이터와 사용 예시
// const mockReservations = [
//   { id: '1', nickname: '정만철', peopleCount: 10 },
//   { id: '2', nickname: '정만철', peopleCount: 12 },
// ];

// export default function App() {
//   return (
//     <ContentReservation
//       dateString="23년 2월 10일"
//       reservations={mockReservations}
//     />
//   );
// }
