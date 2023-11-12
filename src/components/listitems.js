import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
// import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import PowerSettingsNewRoundedIcon from '@mui/icons-material/PowerSettingsNewRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import CalculateRoundedIcon from '@mui/icons-material/CalculateRounded';
// import { loginActions } from "../store/loginSlice";
// import { useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';

export default function MainListItems() {
    return (
        <React.Fragment>
            <NavLink to="/Dashboard" style={{textDecoration: 'none', color:'black'}}> 
                <ListItemButton>
                    <ListItemIcon>
                        <HomeRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
            </NavLink>

            <NavLink to="SGPA-calculator" style={{textDecoration: 'none', color:'black'}}>
                <ListItemButton >
                    <ListItemIcon>
                        < CalculateRoundedIcon/>
                    </ListItemIcon>
                    <ListItemText primary="SGPA Calculator" />
                </ListItemButton>
            </NavLink>

            <NavLink to="CGPA-calculator" style={{textDecoration: 'none', color:'black'}}>
                <ListItemButton>
                    <ListItemIcon>
                        < CalculateRoundedIcon/>
                    </ListItemIcon>
                    <ListItemText primary="CGPA Calculator" />
                </ListItemButton>
            </NavLink>

            <NavLink to="Calendar" style={{textDecoration: 'none', color:'black'}}>
                <ListItemButton>
                    <ListItemIcon>
                        <CalendarMonthRoundedIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Calendar" />
                </ListItemButton>
            </NavLink>

            <NavLink to="History" style={{textDecoration: 'none', color:'black'}}>
                <ListItemButton >
                    <ListItemIcon>
                        <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="History" />
                </ListItemButton>
            </NavLink>
            
            <NavLink to="/" style={{textDecoration: 'none', color:'black'}}>
                <ListItemButton>
                    <ListItemIcon>
                        <PowerSettingsNewRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </NavLink>
        </React.Fragment>
    );
}
