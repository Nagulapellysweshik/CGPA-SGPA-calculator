import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import PowerSettingsNewRoundedIcon from '@mui/icons-material/PowerSettingsNewRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import CalculateRoundedIcon from '@mui/icons-material/CalculateRounded';
import { loginActions } from "../store/loginSlice";
import { useDispatch } from "react-redux";


export default function MainListItems() {
    
    const dispatch = useDispatch();
            
    const handleHomeClick = () => {
        console.log(handleHomeClick)
    };
    
    const handleStudentsClick = () => {
        console.log(handleStudentsClick)
    };
    
    const handleCalculatorClick = () => {
        console.log(handleCalculatorClick)
    };
    
    const handleCalendarClick = () => {
        console.log(handleCalendarClick)
    };

    const handleHistoryClick = () => {
        console.log(handleHistoryClick)
    };

    const handleLogoutClick = () => {
        dispatch(loginActions.logout())
        console.log(handleLogoutClick)
    };
    return (
        <React.Fragment>
            <ListItemButton onClick={handleHomeClick}>
                <ListItemIcon>
                    <HomeRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItemButton>

            <ListItemButton onClick={handleStudentsClick}> 
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Students" />
            </ListItemButton>

            <ListItemButton onClick={handleCalculatorClick}>
                <ListItemIcon>
                    < CalculateRoundedIcon/>
                </ListItemIcon>
                <ListItemText primary="Calculater" />
            </ListItemButton>

            <ListItemButton onClick={handleCalendarClick}>
                <ListItemIcon>
                    <CalendarMonthRoundedIcon/>
                </ListItemIcon>
                <ListItemText primary="Calendar" />
            </ListItemButton>

            <ListItemButton onClick={handleHistoryClick}>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="History" />
            </ListItemButton>
            
            <ListItemButton onClick={handleLogoutClick}>
                <ListItemIcon>
                    <PowerSettingsNewRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItemButton>
        </React.Fragment>
    );
}
