import React, { createContext, useState, useEffect, useContext, useRef } from 'react';

// Create AudioContext
const AudioContext = createContext();

// Custom hook to access audio context
export const useAudio = () => {
  return useContext(AudioContext);
};

// AudioProvider component to manage the audio globally
export const AudioProvider = ({ children }) => {
  const songs = [
    { name: "Track 1", url: '/audio/Luke Bergs & Waesto - Take Off (freetouse.com).mp3' },
    { name: "Track 2", url: '/audio/Epic Spectrum - Wayfarer (freetouse.com).mp3' },
    { name: "Track 3", url: '/audio/Lukrembo - Marshmallow (freetouse.com).mp3' }
  ];

  const audioRef = useRef(new Audio(songs[0].url)); // Initially set to the first song
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0); // Index to track current song

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;

    // Ensure the audio starts playing if it's not already playing
    if (isPlaying) {
      audio.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
    }

    // Cleanup: stop audio when the app is closed or navigated away
    return () => {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    };
  }, [isPlaying]);

  // Function to start playing the current audio
  const startAudio = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
      setIsPlaying(true);
    }
  };

  // Function to stop (pause) the audio
  const stopAudio = () => {
    const audio = audioRef.current;
    audio.pause();
    setIsPlaying(false);
  };

  // Function to toggle play/pause
  const togglePlayPause = () => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause(); // Pause the audio if it's currently playing
      setIsPlaying(false); // Update the state to reflect the pause
    } else {
      audio.play().catch((error) => {
        console.error('Error playing audio:', error); // Log any errors if audio can't be played
      });
      setIsPlaying(true); // Update the state to reflect the play
    }
  };

  // Function to skip to the next song
  const skipNext = () => {
    let nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    audioRef.current.src = songs[nextIndex].url; // Change the audio source to the next song
    if (isPlaying) {
      audioRef.current.play(); // Play the new song if it's already playing
    }
  };

  // Function to go to the previous song
  const skipPrevious = () => {
    let prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevIndex);
    audioRef.current.src = songs[prevIndex].url; // Change the audio source to the previous song
    if (isPlaying) {
      audioRef.current.play(); // Play the new song if it's already playing
    }
  };

  return (
    <AudioContext.Provider value={{
      audioRef, 
      isPlaying, 
      setIsPlaying, 
      startAudio, 
      stopAudio, 
      togglePlayPause,
      skipNext, 
      skipPrevious, 
      currentSongIndex, 
      songs
    }}>
      {children}
    </AudioContext.Provider>
  );
};
