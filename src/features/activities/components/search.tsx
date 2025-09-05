'use client';

import { Search as SearchIcon, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { getActListApi } from '@/features/activities/libs/api/getActListApi';
import { useSearchStore } from '@/features/activities/libs/stores/searchStore';
import Dropdown from '@/shared/components/dropdown/dropdown';
import { Button } from '@/shared/components/modal/components/modal-button';
import { searchVariant } from '@/shared/libs/constants/searchVariant';

interface SearchProps {
  placeholder?: string;
}

const Search: React.FC<SearchProps> = ({
  placeholder = '내가 원하는 체험은',
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { keyword, setKeyword, region, setRegion, category, setCategory } =
    useSearchStore();

  const [isFocused, setIsFocused] = useState(false);
  const [regionOptions, setRegionOptions] = useState<string[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { activities } = await getActListApi();

        // 지역
        const addresses = activities
          .map((act) => act.address?.split(' ')[0])
          .filter((addr): addr is string => Boolean(addr));
        setRegionOptions([...new Set(addresses)]);

        // 카테고리
        const categories = activities
          .map((act) => act.category)
          .filter((cat): cat is string => Boolean(cat));
        setCategoryOptions([...new Set(categories)]);
      } catch (err) {
        console.error('데이터 불러오기 실패:', err);
      }
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    const k = keyword.trim();
    const r = region.trim();
    const c = category.trim();

    [
      ['keyword', k],
      ['region', r],
      ['category', c],
    ].forEach(([key, value]) =>
      value ? params.set(key, value) : params.delete(key),
    );

    params.set('page', '1');
    router.push(`/activities?${params.toString()}`);
  };

  const style = searchVariant.main;

  const dropdownBtnClass =
    'flex lg:w-[20rem] md:w-[6rem] items-center justify-between rounded txt-14-medium text-gray-700 bg-transparent hover:bg-gray-50 cursor-pointer';

  const dropdownMenuClass =
    'mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 p-2 space-y-2 txt-14-medium';

  const optionBtnClass =
    'w-full px-4 py-3 rounded-lg text-left txt-12-medium bg-white hover:bg-sub cursor-pointer transition-all duration-200';

  return (
    <div className={style.wrapper}>
      <p className={style.title}>무엇을 체험하고 싶으신가요?</p>
      <div className={style.inputBox + 'flex gap-2'}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isFocused ? '' : placeholder}
          className={` ${style.input} `}
        />

        <div className="mr-5 h-12 border-r border-gray-300"></div>

        {/* PC/Tablet 전용 */}
        <div className="hidden gap-4 md:flex">
          {/* 지역 */}
          <div className="flex min-w-[8rem] items-center">
            <Dropdown
              trigger={
                <button type="button" className={dropdownBtnClass}>
                  <span>{region || '지역'}</span>
                </button>
              }
              dropdownClassName={dropdownMenuClass}
            >
              {(close) =>
                regionOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={optionBtnClass}
                    onClick={() => {
                      setRegion(option);
                      close();
                    }}
                  >
                    {option}
                  </button>
                ))
              }
            </Dropdown>
            {region && (
              <button
                type="button"
                onClick={() => setRegion('')}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="size-6" />
              </button>
            )}
          </div>

          <div className="mr-5 h-12 border-r border-gray-300"></div>

          {/* 카테고리 */}
          <div className="flex min-w-[8rem] items-center">
            <Dropdown
              trigger={
                <button type="button" className={dropdownBtnClass}>
                  <span>{category || '카테고리'}</span>
                </button>
              }
              dropdownClassName={dropdownMenuClass}
            >
              {(close) =>
                categoryOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={optionBtnClass}
                    onClick={() => {
                      setCategory(option);
                      close();
                    }}
                  >
                    {option}
                  </button>
                ))
              }
            </Dropdown>
            {category && (
              <button
                type="button"
                onClick={() => setCategory('')}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="size-6" />
              </button>
            )}
          </div>

          <div className="h-12 border-r border-gray-300"></div>
        </div>

        {/* Mobile 전용 */}
        <div className="flex md:hidden">
          <Dropdown
            trigger={
              <button
                className={`${dropdownBtnClass} flex max-w-[20rem] items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap`}
              >
                {/* 지역 */}
                <span className="flex items-center gap-1">
                  {region || '지역'}
                  {region && (
                    <X
                      className="size-4 text-gray-400 hover:text-gray-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        setRegion('');
                      }}
                    />
                  )}
                </span>
                <span>/</span>
                {/* 카테고리 */}
                <span className="flex items-center gap-1">
                  {category || '카테고리'}
                  {category && (
                    <X
                      className="size-4 text-gray-400 hover:text-gray-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCategory('');
                      }}
                    />
                  )}
                </span>
              </button>
            }
            dropdownClassName="fixed top-[38rem] right-[4rem] mt-2 w-[30rem] bg-white rounded-xl shadow-lg border border-gray-100 p-4 grid grid-cols-2 gap-4 txt-14-medium"
          >
            {(close) => (
              <>
                <div>
                  <p className="txt-14-medium px-1 py-2 text-gray-600">지역</p>
                  <div className="flex flex-col space-y-1">
                    {regionOptions.map((option) => (
                      <button
                        key={option}
                        className={optionBtnClass}
                        onClick={() => {
                          setRegion(option);
                          close();
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="txt-14-medium px-1 py-2 text-gray-600">
                    카테고리
                  </p>
                  <div className="flex flex-col space-y-1">
                    {categoryOptions.map((option) => (
                      <button
                        key={option}
                        className={optionBtnClass}
                        onClick={() => {
                          setCategory(option);
                          close();
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </Dropdown>
        </div>

        <Button
          color="blue"
          ariaLabel="검색하기"
          onClick={handleSearch}
          extraClassName={`${style.button} mx-7 flex items-center justify-center !w-[3rem] !h-[3rem] md:!w-[5rem] md:!h-[5rem] rounded-full`}
        >
          <SearchIcon className="h-8 w-8" />
        </Button>
      </div>
    </div>
  );
};

export default Search;
