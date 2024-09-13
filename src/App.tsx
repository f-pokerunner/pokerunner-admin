import React, { useState, useEffect } from 'react';
import './App.css';
import InaviMap from "./map/InaviMap";
import InputPokemon from "./map/InputPokemon";

function App() {
    const [coordinates, setCoordinates] = useState<{ lat: string; lng: string; isWebSocketData: boolean } | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        const socket = new WebSocket('ws://133.186.215.243:8080/location');

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data);

            setCoordinates({
                lat: data.lat.toString(),
                lng: data.lng.toString(),
                isWebSocketData: true
            });
            setImageUrl(null);  // 웹 소켓 데이터를 받을 때는 기본 마커로 설정
        };

        return () => {
            socket.close();
        };
    }, []);

    const handleCoordinatesChange = (lat: string, lng: string, imageUrl: string) => {
        setCoordinates({ lat, lng, isWebSocketData: false });
        setImageUrl(imageUrl);
    };

    return (
        <div className="App">
            <h1>포켓몬 위치 놓기 & 달리기 시뮬레이션</h1>
            {coordinates ? (
                <InaviMap
                    posx={coordinates.lng}
                    posy={coordinates.lat}
                    imageUrl={imageUrl}
                    isWebSocketData={coordinates.isWebSocketData} />
            ) : (
                <p>좌표를 입력하세요.</p>
            )}
            <InputPokemon onCoordinatesChange={handleCoordinatesChange} />
        </div>
    );
}

export default App;