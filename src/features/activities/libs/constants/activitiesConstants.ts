import {
  Binoculars,
  BusFront,
  Leaf,
  Music,
  Soup,
  Volleyball,
} from 'lucide-react';

export const CATEGORIES = [
  { name: '문화 · 예술', icon: Music },
  { name: '식음료', icon: Soup },
  { name: '스포츠', icon: Volleyball },
  { name: '투어', icon: Binoculars },
  { name: '관광', icon: BusFront },
  { name: '웰빙', icon: Leaf },
];

export const SORT_OPTIONS = [
  { label: '최신순', value: 'latest' },
  { label: '낮은 가격순', value: 'price_asc' },
  { label: '높은 가격순', value: 'price_desc' },
];
