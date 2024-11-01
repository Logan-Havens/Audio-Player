import React, { useRef, useState, useEffect } from "react";

const AudioPlayer = ({ songs, selectedSongIndex }) => {
    const audioRef = useRef(null);
    const [currentSongIndex, setCurrentSongIndex] = useState(selectedSongIndex || 0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isRepeat, setIsRepeat] = useState(false);

    useEffect(() => {
        if (songs.length > 0) {
            audioRef.current.src = songs[currentSongIndex]?.url;
        }
    }, [currentSongIndex, songs]);

    const playSong = () => {
        audioRef.current.play();
    };

    const pauseSong = () => {
        audioRef.current.pause();
    };

    const nextSong = () => {
        setCurrentSongIndex((currentSongIndex + 1) % songs.length);
        playSong();
    };

    const previousSong = () => {
        setCurrentSongIndex((currentSongIndex - 1 + songs.length) % songs.length);
        playSong();
    };

    const increaseVolume = () => {
        audioRef.current.volume = Math.min(1, audioRef.current.volume + 0.1);
    };

    const decreaseVolume = () => {
        audioRef.current.volume = Math.max(0, audioRef.current.volume - 0.1);
    };

    const toggleRepeat = () => {
        setIsRepeat(!isRepeat);
    };

    useEffect(() => {
        audioRef.current.loop = isRepeat;
    }, [isRepeat]);

    const shuffleSongs = () => {
        const randomIndex = Math.floor(Math.random() * songs.length);
        setCurrentSongIndex(randomIndex);
        playSong();
    };

    useEffect(() => {
        const updateProgress = () => {
            setCurrentTime(audioRef.current.currentTime);
        };

        if (audioRef.current) {
            audioRef.current.addEventListener('timeupdate', updateProgress);
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('timeupdate', updateProgress);
            }
        };
    }, []);

    const seek = (event) => {
        audioRef.current.currentTime = event.target.value;
        setCurrentTime(event.target.value);
    };

    return (
        <div>
            <audio ref={audioRef} />
            <button onClick={playSong}>Play</button>
            <button onClick={pauseSong}>Pause</button>
            <button onClick={nextSong}>Next</button>
            <button onClick={previousSong}>Previous</button>
            <button onClick={increaseVolume}>Volume Up</button>
            <button onClick={decreaseVolume}>Volume Down</button>
            <button onClick={toggleRepeat}>{isRepeat ? "Disable Repeat" : "Enable Repeat"}</button>
            <button onClick={shuffleSongs}>Shuffle</button>
            <input
                type="range"
                min="0"
                max={audioRef.current?.duration || 0}
                value={currentTime}
                onChange={seek}
            />
        </div>
    );
};

export default AudioPlayer;


