import React, { useState } from 'react';
import {Avatar, IconButton, Badge, Popover, List, ListItem, ListItemAvatar, ListItemButton, ListItemText,} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { notifications } from '../data';
import EnglishFlag from '../avatars/english.png';
import UserAvatar from '../avatars/avatar_25.jpg';

export default function NotificationDialog() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const unreadCount = notifications.filter((notification) => !notification.isRead).length;

  return (
    <div style={{ position: 'relative' }}>
      <IconButton sx={{ marginRight: '10px' }}>
        <img src={EnglishFlag} alt="avatar" style={{ width: '40px', marginLeft: '15px' }} />
      </IconButton>
      
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={unreadCount} color="secondary">
          <NotificationsIcon sx={{ color: 'gray', fontSize: '2rem' }} />
        </Badge>
      </IconButton>

      <IconButton color="inherit" sx={{ marginRight: '10px' }}>
        <Avatar alt="user-avatar" src={UserAvatar} style={{ borderRadius: '50%', width: '40px', marginLeft: '15px' }} />
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <List sx={{ minWidth: 300, maxWidth: 400 }}>
          <ListItem sx={{ textAlign: 'left', fontSize: '1.3rem' }}>
            <NotificationsIcon  sx={{ color: 'grey', fontSize: '2rem' }} />Notifications 
          </ListItem>
          <ListItem sx={{ textAlign: 'left', borderBottom: '0.5px solid #ddd', paddingBottom: '10px', marginBottom: '10px', fontSize: '1rem', color: 'gray' }}>
            You have {unreadCount} unread messages
          </ListItem>
          {notifications.map((notification) => (
            <ListItem
              key={notification.id}
              sx={{
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <ListItemButton onClick={handleClose}>
                <ListItemAvatar>
                  <Avatar src={notification.avatar || ''} />
                </ListItemAvatar>
                <ListItemText
                  primary={notification.sender}
                  secondary={
                    <React.Fragment>
                      {notification.message}
                      <br />
                      <span style={{ color: 'gray', fontSize: '0.8rem' }}>{notification.timestamp}</span>
                    </React.Fragment>
                  }
                />
                {notification.isRead ? (
                  <DoneAllIcon sx={{ color: 'blue', marginLeft: 'auto', marginTop: '50px', fontSize: 'medium' }} />
                ) : (
                  <DoneIcon sx={{ color: 'gray', marginLeft: 'auto', marginTop: '50px', fontSize: 'medium' }} />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Popover>
      
    </div>
  );
}
