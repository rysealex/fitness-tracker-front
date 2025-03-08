import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import Tooltip from '@mui/material/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBacon, faPizzaSlice, faHamburger, faCookieBite } from '@fortawesome/free-solid-svg-icons';

// Define the actions with icons
const actions = [
  { name: 'Snacks', icon: <FontAwesomeIcon icon={faCookieBite}/> },
  { name: 'Dinner', icon: <FontAwesomeIcon icon={faHamburger}/> },
  { name: 'Lunch', icon: <FontAwesomeIcon icon={faPizzaSlice}/> },
  { name: 'Breakfast', icon: <FontAwesomeIcon icon={faBacon}/> },
];

export default function BasicSpeedDial() {
  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial with images"
        sx={{ 
          position: 'absolute', 
          bottom: 16, 
          right: 16
        }}
        icon={<SpeedDialIcon />} 
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={
              <Tooltip title={action.name}>
                {action.icon}
              </Tooltip>
            }
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}