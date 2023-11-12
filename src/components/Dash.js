import * as React from 'react';
import {CssBaseline, alpha, Container, Toolbar, List, Typography, Divider, IconButton, Badge, Box } from '@mui/material';
import {Menu as MenuIcon, ChevronLeft as ChevronLeftIcon, Notifications as NotificationsIcon} from '@mui/icons-material';

import MainListItems from './listitems';
import { AppBar, Drawer} from './appbar_drawer';
import SearchBox from './SearchBox';
import NotificationDialog from './NotificationDialog';
import SGPA_Calculator from './SGPA_Calculator';
import CGPACalculator from './CGPA_Calculator';
import { Outlet } from 'react-router-dom';
import avatar25 from "../avatars/avatar_25.jpg"
import Avatar from '@mui/material/Avatar';

export default function Dash() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (<Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open} sx={{backgroundColor: "#eff0f6"}}>

                    <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }} 
                        >
                            <MenuIcon />
                        </IconButton>

                        <SearchBox />
                        <NotificationDialog/>
                    </Toolbar>
                </AppBar>

                
                <Drawer variant="permanent" open={open}>
                    <Toolbar sx={{display:'flex', alignItems:'center', justifyContent:'flex-end', px:[1]}} >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    {open && <Box
                        sx={{my: 1, mx: 1.5, py: 2, px: 2.5, display: 'flex', borderRadius: 1.5, alignItems: 'center',
                            bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
                        }}>
                        <Avatar src={avatar25} alt="photoURL" />

                        <Box sx={{ ml: 2 }}>
                            <Typography variant="subtitle2">Admin</Typography>
                        </Box>
                    </Box>}
                    <List component="nav">
                        {MainListItems()}
                    </List>
                </Drawer>
                
                <Box component="main"
                    sx={{ backgroundColor: (theme) => theme.palette.grey[100], flexGrow: 1, height: '100vh', overflow: 'auto', }}
                >
                    <Toolbar />
                    <Container>
                        <Outlet></Outlet>
                    </Container>
                </Box>
            </Box>
            
    );
}