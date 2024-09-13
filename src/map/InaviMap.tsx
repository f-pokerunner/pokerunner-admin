import React, { useEffect, useRef } from 'react';

declare global {
    interface Window {
        initMap: () => void;
    }
}

interface INaviMapProps {
    posx: string;
    posy: string;
    imageUrl: string | null;
    isWebSocketData: boolean;
}

const INaviMap: React.FC<INaviMapProps> = ({ posx, posy, imageUrl, isWebSocketData }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any>(null);
    const markerRef = useRef<any>(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://kr1-maps.api.nhncloudservice.com/maps/v3.0/appkeys/SBTMTnsUOz5CKYSQ/maps?callback=initMap";
        script.async = true;
        document.body.appendChild(script);

        window.initMap = () => {
            if (mapRef.current && !mapInstanceRef.current) {
                mapInstanceRef.current = new (window as any).inavi.maps.Map({
                    center: [parseFloat(posx), parseFloat(posy)],
                    container: mapRef.current,
                    zoom: 13
                });

                markerRef.current = new (window as any).inavi.maps.Marker({
                    position: [parseFloat(posx), parseFloat(posy)],
                    map: mapInstanceRef.current,
                    icon: imageUrl ? imageUrl : '/marker.png',  // 초기 마커 아이콘
                });
            }
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        if (mapInstanceRef.current) {
            mapInstanceRef.current.setCenter([parseFloat(posx), parseFloat(posy)]);
            if (markerRef.current) {
                markerRef.current.setPosition([parseFloat(posx), parseFloat(posy)]);

                if (isWebSocketData) {
                    // 웹 소켓 데이터로 업데이트 되는 경우 초기 마커로 설정
                    markerRef.current.setIcon('/marker.png');
                } else if (imageUrl && !isWebSocketData) {
                    // 사용자가 설정한 이미지로 마커 변경
                    markerRef.current.setIcon(imageUrl);
                } else {
                    // 이 외의 경우도 초기 마커를 설정하는 안전 장치
                    markerRef.current.setIcon('/marker.png');
                }
            }
        }
    }, [posx, posy, imageUrl, isWebSocketData]);

    return (
        <div>
            <div ref={mapRef} style={{ width: '100%', height: '500px' }}></div>
        </div>
    );
};

export default INaviMap;