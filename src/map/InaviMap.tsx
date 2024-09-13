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
}

const INaviMap: React.FC<INaviMapProps> = ({ posx, posy, imageUrl }) => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://kr1-maps.api.nhncloudservice.com/maps/v3.0/appkeys/SBTMTnsUOz5CKYSQ/maps?callback=initMap";
        script.async = true;
        document.body.appendChild(script);

        window.initMap = () => {
            if (mapRef.current) {
                const map = new (window as any).inavi.maps.Map({
                    center: [parseFloat(posx), parseFloat(posy)],
                    container: mapRef.current,
                    zoom: 13
                });

                new (window as any).inavi.maps.Marker({
                    position: [parseFloat(posx), parseFloat(posy)],
                    map: map,
                    icon: imageUrl ? imageUrl : '/marker.png',
                });
            }
        };

        return () => {
            document.body.removeChild(script);
        };
    }, [posx, posy, imageUrl]);

    return (
        <div>
            <div ref={mapRef} style={{ width: '100%', height: '500px' }}></div>
        </div>
    );
};

export default INaviMap;