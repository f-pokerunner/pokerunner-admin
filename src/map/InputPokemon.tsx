import React, { useState } from 'react';

interface InputPokemonProps {
    onCoordinatesChange: (lat: string, lng: string, imageUrl: string) => void;
}

interface ApiResponse {
    lat: string;
    lng: string;
    address: string;
    pokemonName: string;
    imageUrl: string;
}

const InputPokemon: React.FC<InputPokemonProps> = ({ onCoordinatesChange }) => {
    const [query, setQuery] = useState<string>('');
    const [pokemonName, setPokemonName] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        // Preventing default form submission behavior
        event.preventDefault();

        const url = 'http://133.186.215.243:8080/pokemon-spot/place-admin';
        const body = JSON.stringify({
            address: query,
            name: pokemonName,
        });

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body,
            });
            const data: ApiResponse = await res.json();

            if (data.lat && data.lng) {
                onCoordinatesChange(data.lat, data.lng, data.imageUrl);
            } else {
                console.error('Failed to get coordinates');
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
                    placeholder="주소를 입력하세요"
                    onChange={(e) => setQuery(e.target.value)}
                />
                <input
                    type="text"
                    value={pokemonName}
                    placeholder="포켓몬 이름을 입력하세요"
                    onChange={(e) => setPokemonName(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default InputPokemon;