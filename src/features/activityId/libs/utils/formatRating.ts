export const formatRating = (
  rating: number | undefined,
  totalCount: number | undefined,
) => {
  if (totalCount === 0) {
    return '아직 작성된 후기가 없습니다';
  }
  if (rating) {
    const text =
      rating >= 4
        ? '매우 만족'
        : rating >= 3
          ? '만족'
          : rating >= 2
            ? '보통'
            : rating >= 1
              ? '불만족'
              : '매우 불만족';
    return text;
  }
};
