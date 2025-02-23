import React, { createContext, useState, useEffect, useContext, useRef } from 'react';

// Create AudioContext
const AudioContext = createContext();

// Custom hook to access audio context
export const useAudio = () => {
  return useContext(AudioContext);
};

// AudioProvider component to manage the audio globally
export const AudioProvider = ({ children }) => {
  const audioRef = useRef(new Audio('audio/Luke Bergs & Waesto - Take Off (freetouse.com).mp3'));
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Ensure audio is looped
    const audio = audioRef.current;
    audio.loop = true;

    // Cleanup: stop audio when the app is closed or navigated away
    return () => {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    };
  }, []);

  // Function to play the audio on user interaction
  const startAudio = () => {
    const audio = audioRef.current;

    if (audio.paused) {
      audio.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
      setIsPlaying(true);
    }
  };

  return (
    <AudioContext.Provider value={{ audioRef, isPlaying, setIsPlaying, startAudio }}>
      {children}
    </AudioContext.Provider>
  );
};