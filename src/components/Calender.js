import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Box, IconButton, Typography } from '@mui/material';
import calenderList from "@fullcalendar/list";
import DeleteIcon from '@mui/icons-material/Delete';

const Calendar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const eventTitleRef = useRef();
  const calendarCategoryRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const fullCalendarRef = useRef(null);
  const [events, setEvents] = useState(getStoredEvents() || []); // Initialize with stored events

  const handleAddEventClick = (data) => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const handleEventAdd = () => {
    const newEvent = {
      id: new Date().toISOString(),
      title: eventTitleRef.current.value,
      category: calendarCategoryRef.current.value,
      start: startDateRef.current.value,
      end: endDateRef.current.value,
    };

    setEvents((prevEvents) => [...prevEvents, newEvent]);
    saveEventsToStorage([...events, newEvent]);
    setDrawerOpen(false);
  };

  const handleReset = () => {
    eventTitleRef.current.value = '';
    calendarCategoryRef.current.value = 'Business';
    startDateRef.current.value = '';
    endDateRef.current.value = '';
  };

  const handleEventDelete = (event) => {
    setEvents((prevEvents) => prevEvents.filter((e) => e.id !== event.id));
    saveEventsToStorage(events.filter((e) => e.id !== event.id));
  };

  const eventContent = (arg) => {
    const categoryColors = {
      Business: 'lightblue',
      Family: 'lightgreen',
      Personal: 'lightcoral',
      Holiday: 'lightyellow',
      Other: 'lightgrey',
    };

    return (
      <>
        <div style={{ backgroundColor: categoryColors[arg.event.extendedProps.category], borderRadius: '5px', padding: '2px', cursor: 'pointer' }}>
          {arg.timeText} {arg.event.title}
          <IconButton style={{ fontSize: '14px', padding: '2px', marginLeft: '5px' }} onClick={() => handleEventDelete(arg.event)}>
            <DeleteIcon />
          </IconButton>
        </div>
      </>
    );
  };

  useEffect(() => {
    if (fullCalendarRef.current) {
      fullCalendarRef.current.getApi().refetchEvents();
    }
  }, [events]);

  function saveEventsToStorage(updatedEvents) {
    localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
  }

  function getStoredEvents() {
    const storedEvents = localStorage.getItem('calendarEvents');
    return storedEvents ? JSON.parse(storedEvents) : null;
  }

  return (
    <>
      <Card style={{ width: '1000px', marginTop: '30px', borderRadius: '20px' }}>
        <CardContent>
          <FullCalendar
            ref={fullCalendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, calenderList]}
            views={['dayGridMonth', 'dayGridWeek', 'dayGridDay']}
            headerToolbar={{
              start: 'prev,next',
              center: 'title',
              end: 'dayGridMonth,timeGridWeek,timeGridDay,calenderList',
            }}
            initialView="dayGridMonth"
            selectable={true}
            editable
            dateClick={handleAddEventClick}
            events={events}
            eventContent={eventContent}
            height="90vh"
          />
        </CardContent>
      </Card>

      <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer}>
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 5, marginTop: 5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
            <Typography variant="h6">Add Event</Typography>
            <IconButton onClick={handleCloseDrawer} variant="text" color="primary">&#x2715;</IconButton>
          </Box>
          <TextField label="Event Title" inputRef={eventTitleRef} sx={{ marginBottom: 2, width: '300px' }} />
          <TextField
            select
            label="Calendar Category"
            defaultValue="Business"
            inputRef={calendarCategoryRef}
            sx={{ marginBottom: 2 }}
          >
            <MenuItem defaultValue value="Business">Business</MenuItem>
            <MenuItem value="Personal">Personal</MenuItem>
            <MenuItem value="Family">Family</MenuItem>
            <MenuItem value="Holiday">Holiday</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
          <TextField
            label="Start Date"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            inputRef={startDateRef}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="End Date"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            inputRef={endDateRef}
            sx={{ marginBottom: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: 2 }}>
            <Button onClick={handleEventAdd} variant="contained">
              Add Event
            </Button>
            <Button type="reset" onClick={handleReset} variant="outlined" sx={{ marginRight: 1 }}>
              Reset
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Calendar;
