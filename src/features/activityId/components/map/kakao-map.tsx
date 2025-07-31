'use client';

import { useEffect, useState } from 'react';
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk';

import { ErrorMessage } from '@/shared/components/error-message/error-message';
import LoadingSpinner from '@/shared/components/loading-spinner/loading-spinner';

//현재 로컬에 대한 키를 발급 받은거라, 머지할때는 배포 주소로 다시 받아야 함
const KakaoMap = ({ address }: { address: string | undefined }) => {
  const [coordinates, setCoordinates] = useState({
    lat: 37.4993126534,
    lng: 127.03604683616,
  });
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO!, // 발급 받은 APPKEY
  });

  useEffect(() => {
    if (!address || loading || error) return;

    if (!window.kakao || !window.kakao.maps) {
      console.error('Kakao 지도 객체가 아직 로드되지 않았습니다.');
      return;
    }
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const { x, y } = result[0];
        setCoordinates({ lat: parseFloat(y), lng: parseFloat(x) });
      } else {
        console.error(address);
      }
    });
  }, [address, error, loading]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage />;
  return (
    <Map
      level={3}
      center={coordinates}
      style={{ width: '100%', height: '100%' }}
    >
      <MapMarker position={coordinates}>
        <div style={{ color: '#000' }}>Hello World!</div>
      </MapMarker>
    </Map>
  );
};
export default KakaoMap;
