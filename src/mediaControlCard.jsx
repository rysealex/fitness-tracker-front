import React from 'react';
import { Icon, IconButton } from '@mui/material';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PauseIcon from '@mui/icons-material/Pause';

const MediaControlCard = ({ isPlaying, currentTrack, togglePlayPause, skipNext, skipPrevious }) => {
  return (
    <div>
      <h3>{currentTrack}</h3>
      <IconButton onClick={skipPrevious}>Prev</IconButton>
			<IconButton onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</IconButton>
      <IconButton onClick={skipNext}>Next</IconButton>
    </div>
  );
};

export default MediaControlCard;