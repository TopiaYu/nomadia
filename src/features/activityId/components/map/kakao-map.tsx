'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { CustomOverlayMap, Map, useKakaoLoader } from 'react-kakao-maps-sdk';

import { ErrorMessage } from '@/shared/components/error-message/error-message';
import { DetailKakaoMapSkeleton } from '@/shared/components/skeleton/skeleton';

//현재 로컬에 대한 키를 발급 받은거라, 머지할때는 배포 주소로 다시 받아야 함
const KakaoMap = ({ address }: { address: string | undefined }) => {
  const [placeName, setPlaceName] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  }>();

  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO!,
    libraries: ['services'], // 요거 추가
  });

  useEffect(() => {
    if (!address || loading || error) return;

    let retryCount = 0;
    const maxRetries = 10;

    const tryGeocode = () => {
      if (
        typeof window.kakao === 'undefined' ||
        typeof window.kakao.maps === 'undefined' ||
        typeof window.kakao.maps.services === 'undefined'
      ) {
        if (retryCount < maxRetries) {
          retryCount += 1;
          setTimeout(tryGeocode, 300); // 300ms 후 재시도
        } else {
          throw new Error('kakao.maps.services 로딩 실패: 최대 재시도 초과');
        }
        return;
      }

      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const { x, y, road_address, address_name } = result[0];
          setCoordinates({ lat: parseFloat(y), lng: parseFloat(x) });

          // 건물 이름 우선, 없으면 전체 주소 사용
          if (road_address?.building_name) {
            setPlaceName(road_address.building_name);
          } else {
            setPlaceName(address_name);
          }
        }
      });
    };

    tryGeocode();
  }, [loading, error, address]);

  if (loading) return <DetailKakaoMapSkeleton />;
  if (error) return <ErrorMessage className="h-full" />;
  if (coordinates) {
    return (
      <>
        <Map
          level={3}
          center={coordinates}
          style={{ width: '100%', height: '100%' }}
        >
          <CustomOverlayMap position={coordinates}>
            <div className="border-sub-300 flex-center relative gap-[0.6rem] rounded-full border-2 bg-white p-3 text-[1.4rem] font-semibold text-gray-950 shadow-lg">
              <Image
                src={'/images/icons/profile-default.svg'}
                alt="map-icon"
                width={30}
                height={30}
                className="shrink-0"
              />
              <p className="shrink-0 pr-[0.2rem]">{placeName}</p>
            </div>
          </CustomOverlayMap>
        </Map>
      </>
    );
  } else {
    return (
      <div className="flex-center size-full">
        <div className="text-[1.4rem] text-gray-500 md:text-[1.8rem]">
          지도를 찾고 있습니다.
        </div>
      </div>
    );
  }
};
export default KakaoMap;
