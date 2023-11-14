import React, { useState } from 'react';
import { Button, Box, IconButton } from '@mui/material';
import { SwapVert as SwapVertIcon } from '@mui/icons-material';
import CGPAManual from './CGPA_Manual';
import CGPAHistory from './CGPA_History';

const CGPACalculator = () => {
  const [showManual, setShowManual] = useState(true);

  const toggleView = () => {
    setShowManual((prevShowManual) => !prevShowManual);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">

      {showManual ? (<CGPAManual />) : (<CGPAHistory />)}

      <div style={{ marginTop: '16px' }}>
        <IconButton color="inherit" onClick={toggleView} style={{ marginRight: '8px' }}>
          <SwapVertIcon />
        </IconButton>
        <Button
          variant="contained"
          color="primary"
          onClick={toggleView}
          style={{ color: 'white' }}
        >
          {showManual ? 'Switch to CGPA History' : 'Switch to Manual Entry'}
        </Button>
      </div>
    </Box>
  );
};

export default CGPACalculator;
