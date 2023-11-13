import React, { useState } from 'react';
import Grow from '@mui/material/Grow';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import {addToHistory} from '../store/historySlice';
import { useDispatch } from 'react-redux';

const CGPAManual = () => {
  const dispatch = useDispatch();
  const [studentId, setStudentId] = useState('');
  const [semesters, setSemesters] = useState([
    { id: 1, semester: 'semester-1', sgpa: 0, creditsAwarded: 0, totalCredits: 0, },
  ]);
  const [calculatedCGPA, setCalculatedCGPA] = useState('0.00');

  const addSemester = () => {
    const newSemester = {
      id: semesters.length + 1,
      semester: `semester-${semesters.length + 1}`,
      sgpa: 0,
      creditsAwarded: 0,
      totalCredits: 0,
    };
    setSemesters([...semesters, newSemester]);
  };

  const calculateCGPA = () => {
    let totalGradeCredits = 0;
    let totalCredits = 0;

    for (let i = 0; i < semesters.length; i++) {
      totalGradeCredits += semesters[i].sgpa * semesters[i].creditsAwarded;
      totalCredits += parseInt(semesters[i].totalCredits);
    }
    setCalculatedCGPA((totalGradeCredits / totalCredits).toFixed(2));
    dispatch(addToHistory({ studentId, type: 'CGPA', grade: (totalGradeCredits / totalCredits).toFixed(2)}));
  };

  const handleSetSemester = (value, semester, setKey) => {
    setSemesters((prevSemesters) =>
      prevSemesters.map((sem) =>
        sem.id === semester.id ? { ...sem, [setKey]: value } : sem
      )
    );
  };

  const deleteLastSemester = () => {
    setSemesters((prevSemesters) => prevSemesters.slice(0, prevSemesters.length - 1));
  };

  return (
    <Grow in={true} timeout={1000}>
      <Box
        component={Paper}
        p={4}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        boxShadow={5}
        borderRadius={8}
        bgcolor="white"
        width="80%"
        mx="auto"
        my={5}
      >
        <Typography variant="h4" gutterBottom color="primary">
          <EqualizerIcon sx={{ fontSize: 36, marginRight: 1 }} />
          CGPA Calculator
        </Typography>

        <TextField
          label="Student ID"
          variant="outlined"
          value={studentId}
          fullWidth
          margin="normal"
          onChange={(e) => setStudentId(e.target.value)}
          required
        />

        {semesters.map((semester, index) => (
          <Grow key={index} in={true} timeout={500 + index * 100}>
          <Box key={semester.id} display="flex" width="100%" mt={2}>
            <Typography sx={{ mx: 5, marginTop: 4 }}>
              <strong>Semester{semester.id}</strong>
            </Typography>

            <TextField
              label="SGPA"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              sx={{ mx: 2}}
              inputProps={{ type: 'number', min: 0, max: 10 }}
              onChange={(e) => handleSetSemester(e.target.value, semester, 'sgpa')}
            />

            <TextField
              label="Credits Awarded"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              sx={{ marginRight: 2}}
              inputProps={{ type: 'number', min: 0 }}
              onChange={(e) => handleSetSemester(e.target.value, semester, 'creditsAwarded')}
            />

            <TextField
              label="Total Credits"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              inputProps={{ type: 'number', min: 0 }}
              onChange={(e) => handleSetSemester(e.target.value, semester, 'totalCredits')}
            />

            {semester.id === semesters.length && (
              <Button
                variant="contained"
                color="secondary"
                onClick={deleteLastSemester}
                style={{ marginLeft: '10px', height: '56px', backgroundColor: '#ef5350' }}
                sx={{marginTop: 2}}
              >
                <DeleteIcon />
              </Button>
            )}
          </Box>
          </Grow>
        ))}

        <Button
          variant="contained"
          color="primary"
          onClick={addSemester}
          mt={2}
          style={{ marginTop: '16px', backgroundColor: '#4caf50' }}
        >
          <AddIcon />
          Add Semester
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={calculateCGPA}
          mt={2}
          style={{ marginTop: '16px', backgroundColor: '#2196f3' }}
        >
          <EqualizerIcon />
          Calculate CGPA
        </Button>

        {semesters.length > 0 && (
          <Typography sx={{ my: 3,}}><strong>CGPA: {calculatedCGPA}</strong></Typography>
        )}
      </Box>
    </Grow>
  );
};

export default CGPAManual;
