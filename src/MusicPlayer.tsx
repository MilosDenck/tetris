import { useRef, useState } from "react";

export const useMusicPlayer = () => {
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handlePlay = () => {
        if (!audioRef.current) {
        const audio = new Audio('/theme.mp3');
        audio.loop = true;
        audio.volume = 0.5;
        audioRef.current = audio;
        }

        audioRef.current.play()
        .then(() => setIsMusicPlaying(true))
        .catch(err => console.error('Autoplay failed:', err));
    };

    const handleStop = () => {
        if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsMusicPlaying(false);
        }
    };

    return { isMusicPlaying, handlePlay, handleStop }
}