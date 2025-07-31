// 페이지 단위, count = 3
export const mockReviewData = {
  averageRating: 0,
  totalCount: 7,
  reviews: [
    {
      id: 1,
      user: {
        profileImageUrl: '/public/images/icons/facebook.svg',
        nickname: 'TravelLover',
        id: 101,
      },
      activityId: 0,
      rating: 5,
      content: '정말 즐거운 시간이었어요! 다음에도 꼭 참여하고 싶어요.',
      createdAt: '2025-07-20T10:15:00.000Z',
      updatedAt: '2025-07-20T10:15:00.000Z',
    },
    {
      id: 2,
      user: {
        profileImageUrl: '/public/images/icons/facebook.svg',
        nickname: 'Sunshine99',
        id: 102,
      },
      activityId: 0,
      rating: 4,
      content: '친절하고 알찬 구성의 체험이었어요. 추천합니다 :)',
      createdAt: '2025-07-21T14:30:00.000Z',
      updatedAt: '2025-07-21T14:30:00.000Z',
    },
    {
      id: 3,
      user: {
        profileImageUrl: '/public/images/icons/facebook.svg',
        nickname: 'nomad_lee',
        id: 103,
      },
      activityId: 0,
      rating: 3,
      content: '재밌긴 했는데 조금 짧은 느낌이 있었어요.',
      createdAt: '2025-07-22T09:05:00.000Z',
      updatedAt: '2025-07-22T09:05:00.000Z',
    },
    {
      id: 4,
      user: {
        profileImageUrl: '/public/images/icons/facebook.svg',
        nickname: 'quietwalker',
        id: 104,
      },
      activityId: 0,
      rating: 5,
      content: '힐링되는 경험이었어요. 감사합니다 :)',
      createdAt: '2025-07-23T18:45:00.000Z',
      updatedAt: '2025-07-23T18:45:00.000Z',
    },
    {
      id: 5,
      user: {
        profileImageUrl: '/public/images/icons/facebook.svg',
        nickname: '소풍가는날',
        id: 105,
      },
      activityId: 0,
      rating: 4,
      content: '사진 찍기 좋은 장소가 많아서 만족했어요!',
      createdAt: '2025-07-24T11:20:00.000Z',
      updatedAt: '2025-07-24T11:20:00.000Z',
    },
    {
      id: 6,
      user: {
        profileImageUrl: '/public/images/icons/facebook.svg',
        nickname: 'moonbaker',
        id: 106,
      },
      activityId: 0,
      rating: 2,
      content: '기대보다는 덜했지만, 괜찮았어요.',
      createdAt: '2025-07-25T15:00:00.000Z',
      updatedAt: '2025-07-25T15:00:00.000Z',
    },
    {
      id: 7,
      user: {
        profileImageUrl: '/public/images/icons/facebook.svg',
        nickname: 'JinnyK',
        id: 107,
      },
      activityId: 0,
      rating: 5,
      content: '정성이 느껴지는 체험이었어요. 강추!',
      createdAt: '2025-07-26T08:10:00.000Z',
      updatedAt: '2025-07-26T08:10:00.000Z',
    },
  ],
};
// averageRating, totalCount는 여기데이터 사용해도 될것같기도.. - 아예 후기 파트 전체를 따로 빼고, 거기서 이거 호출해서, 이 데이터 사용(기존 페이지 데이터를 넘겨받지도 말고), staletiem은 30분?, 그리고 SSR로 할만할듯?
// <reviews>
// user nickname
// createdAt
// rating
// content
// <pagination>
