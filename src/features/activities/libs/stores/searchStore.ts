import { create } from 'zustand';

interface SearchState {
  keyword: string;
  region: string;
  category: string;
  setKeyword: (value: string) => void;
  setRegion: (value: string) => void;
  setCategory: (value: string) => void;
  reset: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  keyword: '',
  region: '',
  category: '',
  setKeyword: (value) => set({ keyword: value }),
  setRegion: (value) => set({ region: value }),
  setCategory: (value) => set({ category: value }),
  reset: () => set({ keyword: '', region: '', category: '' }),
}));
