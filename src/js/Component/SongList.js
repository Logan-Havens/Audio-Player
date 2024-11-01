import React, { useEffect, useState } from "react";

const SongList = ({ onSongSelect, setSongs }) => {
    const [songs, setSongsState] = useState([]);

    useEffect(() => {
        fetch('https://playground.4geeks.com/sound/')
            .then(response => response.json())
            .then(data => {
                setSongs(data); // Pass to parent App component
                setSongsState(data); // Local state
            })
            .catch(error => console.error('Error fetching songs:', error));
    }, [setSongs]);

    return (
        <ul>
            {Array.isArray(songs) && songs.map((song, index) => (
                <li key={song.id} onClick={() => onSongSelect(index)}>
                    {song.name}
                </li>
            ))}
        </ul>
    );
};

export default SongList;

