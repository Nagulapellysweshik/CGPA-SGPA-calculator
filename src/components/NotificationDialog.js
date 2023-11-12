import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { IconButton, Badge } from '@mui/material';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import { blue } from '@mui/material/colors';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import avatar25 from "../avatars/avatar_25.jpg"

const notifications = ['Sweshik Rao', 'Srujan Kumar', 'Sri Surya', 'Srikar Reddy'];

export default function NotificationDialog() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div style={{ position: 'relative' }}>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={4} color="secondary">
          <NotificationsIcon color='primary'/>
        </Badge>
      </IconButton>
      <IconButton color="inherit">
        <img src={avatar25} style={{borderRadius:'50%', width: '40px', marginLeft:"15px"}}/>
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right',}}
        transformOrigin={{vertical: 'top', horizontal: 'right',}}
      >
        <List>
          {notifications.map((email) => (
            <ListItem disableGutters key={email}>
              <ListItemButton onClick={handleClose}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={email} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Popover>
    </div>
  );
}

