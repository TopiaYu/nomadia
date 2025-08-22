import { motion } from 'framer-motion';
import { useState } from 'react';

interface StarRatingProps {
  onRatingChange?: (rating: number) => void;
}

/**
 * 별점 평가 컴포넌트
 * @description 별점 평가 컴포넌트
 * @author 김영현
 * @param onRatingChange 별점 변경 시 콜백
 */
const StarRating = ({ onRatingChange }: StarRatingProps) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);

  const handleRatingClick = (starIndex: number) => {
    setRating(starIndex);
    onRatingChange?.(starIndex);
  };

  return (
    <div className="flex gap-4">
      {Array.from({ length: 5 }, (_, i) => {
        const starIndex = i + 1;
        const isActive = starIndex <= (hovered || rating);

        return (
          <motion.svg
            key={i}
            width="42"
            height="42"
            viewBox="0 0 24 24"
            className="cursor-pointer focus:ring-0 focus:outline-none"
            role="button"
            tabIndex={0}
            aria-label={`${starIndex} 점`}
            onClick={() => handleRatingClick(starIndex)}
            onMouseEnter={() => setHovered(starIndex)}
            onMouseLeave={() => setHovered(0)}
            onKeyDown={(e: React.KeyboardEvent<SVGSVGElement>) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleRatingClick(starIndex);
              }
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              fill: isActive ? '#FFD700' : '#E5E5E5',
            }}
            transition={{ duration: 0.15 }}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </motion.svg>
        );
      })}
    </div>
  );
};

export default StarRating;
