import React, {useState} from 'react';

import './App.css';
import InaviMap from "./map/InaviMap";
import InputBox from "./map/InputBox";

function App() {
    const [coordinates, setCoordinates] = useState<{ posx: string; posy: string } | null>(null);

    const handleCoordinatesChange = (posx: string, posy: string) => {
        setCoordinates({posx, posy});
    };

    return (
        <div className="App">
            <h1>포켓몬 위치 놓기</h1>
            {coordinates ? (
                <InaviMap posx={coordinates.posx} posy={coordinates.posy}/>
            ) : (
                <p>좌표를 입력하세요.</p>
            )}
            <InputBox onCoordinatesChange={handleCoordinatesChange}/>
        </div>
    );
}

export default App;
