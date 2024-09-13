import React, { useState } from 'react';
import './App.css';
import InaviMap from "./map/InaviMap";
import InputPokemon from "./map/InputPokemon";

function App() {
    const [coordinates, setCoordinates] = useState<{ lat: string; lng: string } | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleCoordinatesChange = (lat: string, lng: string, imageUrl: string) => {
        setCoordinates({ lat, lng });
        setImageUrl(imageUrl);
    };

    return (
        <div className="App">
            <h1>포켓몬 위치 놓기</h1>
            {coordinates ? (
                <InaviMap posx={coordinates.lng} posy={coordinates.lat} imageUrl={imageUrl} />
            ) : (
                <p>좌표를 입력하세요.</p>
            )}
            <InputPokemon onCoordinatesChange={handleCoordinatesChange} />
        </div>
    );
}

export default App;