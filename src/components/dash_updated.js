import * as React from 'react';
import {CssBaseline, Container, Toolbar, List, Typography, Divider, IconButton, Badge, Box } from '@mui/material';
import {Menu as MenuIcon, ChevronLeft as ChevronLeftIcon, Notifications as NotificationsIcon} from '@mui/icons-material';

import MainListItems from './listitems';
import { AppBar, Drawer} from './appbar_drawer';
import SearchBox from './SearchBox';
import NotificationDialog from './NotificationDialog';
import Calculator from './Calculator';

export default function Dash() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>

                    <Toolbar sx={{pr: '24px'}}>
                        <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }} 
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Dashboard
                        </Typography>

                        {/* search */}
                        <SearchBox />

                        {/* Notifications */}
                        <NotificationDialog/>
                    </Toolbar>
                </AppBar>

                
                <Drawer variant="permanent" open={open}>
                    <Toolbar sx={{display:'flex', alignItems:'center', justifyContent:'flex-end', px:[1]}} >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>

                    <Divider />
                    <List component="nav">
                        {MainListItems()}
                        <Divider sx={{ my: 1 }} />
                    </List>
                </Drawer>
                
                <Box component="main"
                    sx={{   
                        backgroundColor: (theme) => theme.palette.grey[200],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container>
                        <Typography variant="h6">Render components here!</Typography>
                        <Calculator/>
                    </Container>
                </Box>
            </Box>
            
    );
}