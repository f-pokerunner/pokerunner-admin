import React, { useState } from 'react';

interface InputBoxProps {
    onCoordinatesChange: (posx: string, posy: string) => void;
}

interface Adm {
    type: number;
    posx: string;
    posy: string;
    admcode: string;
    address: string;
    jibun: string;
    roadname: string;
    roadjibun: string;
    accuracy: number;
    distance: number;
}

interface ApiResponse {
    address: {
        result: boolean;
        totalcount: number;
        admtotalcount: number;
        admcount: number;
        recommnededCost: number;
        res_type: string;
        adm: Adm[];
    };
    header: {
        isSuccessful: boolean;
        resultCode: number;
        resultMessage: string;
    };
}

const InputBox: React.FC<InputBoxProps> = ({ onCoordinatesChange }) => {
    const [query, setQuery] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        // Preventing default form submission behavior
        event.preventDefault();

        const url = `https://kr1-maps.api.nhncloudservice.com/maps/v3.0/appkeys/SBTMTnsUOz5CKYSQ/coordinates?query=${query}`;

        try {
            const res = await fetch(url);
            const data: ApiResponse = await res.json();

            if (data.address && data.address.adm && data.address.adm.length > 0) {
                const { posx, posy } = data.address.adm[0];
                onCoordinatesChange(posx, posy);
            } else {
                console.error('No coordinates found');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default InputBox;