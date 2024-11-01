import React, { useState } from "react";
import AudioPlayer from "./js/component/AudioPlayer";
import SongList from "./js/component/SongList";

const App = () => {
    const [songs, setSongs] = useState([]);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);

    const handleSongSelect = (index) => {
        setCurrentSongIndex(index);
    };

    return (
        <div>
            <h1>Music Player</h1>
            <SongList onSongSelect={handleSongSelect} setSongs={setSongs} />
            <AudioPlayer songs={songs} selectedSongIndex={currentSongIndex} />
        </div>
    );
};

export default App;

