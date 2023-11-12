// CGPAManual.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setStudentId,
  setSemester,
  setSubjects,
  setCGPA,
  setTotalCredits,
  clearData,
} from '../store/cgpaManualSlice';
import { addToHistory } from '../store/historySlice';
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Paper,
  Grow,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EqualizerIcon from '@mui/icons-material/Equalizer';

const CGPAManual = () => {
  const dispatch = useDispatch();
  const cgpaState = useSelector((state) => state.cgpaManual);
  const { studentId, semester, subjects, cgpa, totalCredits } = cgpaState;
  const historyState = useSelector((state) => state.history);
  const { historyData } = historyState;

  useEffect(() => {
    dispatch(clearData());
  }, [studentId, dispatch]);

  const addSemester = () => {
    const semesterSGPA = cgpa * totalCredits;
    dispatch(addToHistory({ studentId, type: 'CGPA', grade: semesterSGPA.toFixed(2) }));
    dispatch(clearData());
  };


  const calculateCGPA = () => {
    let totalCredits = 0;
    let totalPoints = 0;

    subjects.forEach((subject) => {
      totalCredits += parseInt(subject.creditsAwarded || 0, 10);
      totalPoints += parseInt(subject.gradePoints || 0, 10) * parseInt(subject.creditsAwarded || 0, 10);
    });

    const calculatedCGPA = totalPoints / totalCredits || 0;
    dispatch(setCGPA(calculatedCGPA));
    dispatch(setTotalCredits(totalCredits));
  };


  const handleSetSubjects = (value, subject, index, setKey) => {
    dispatch(
      setSubjects([
        ...subjects.slice(0, index),
        { ...subject, [setKey]: value },
        ...subjects.slice(index + 1),
      ])
    );
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
          onChange={(e) => dispatch(setStudentId(e.target.value))}
          required
        />

        <FormControl fullWidth variant="outlined" margin="normal" required>
          <InputLabel>Semester</InputLabel>
          <Select
            value={semester}
            label="Semester"
            onChange={(e) => dispatch(setSemester(e.target.value))}
          >
            <MenuItem value="semester-1">Semester 1</MenuItem>
            <MenuItem value="semester-2">Semester 2</MenuItem>
            <MenuItem value="semester-3">Semester 3</MenuItem>
            <MenuItem value="semester-4">Semester 4</MenuItem>
          </Select>
        </FormControl>

        {subjects.map((subject, index) => (
          <Grow key={index} in={true} timeout={500 + index * 100}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              mt={2}
              key={index}
              component={Paper}
              elevation={3}
              p={2}
              borderRadius={8}
            >
              <TextField
                label="Subject Name"
                variant="outlined"
                value={subject.name}
                fullWidth
                margin="normal"
                sx={{ margin: 2 }}
                required
                onChange={(e) => dispatch(handleSetSubjects(e.target.value, subject, index, 'name'))}
              />

              <TextField
                label="Grade Points"
                variant="outlined"
                value={subject.gradePoints}
                fullWidth
                margin="normal"
                sx={{ margin: 2 }}
                required
                inputProps={{ type: 'number', min: 0, max: 10 }}
                onChange={(e) =>
                  dispatch(handleSetSubjects(parseInt(e.target.value, 10), subject, index, 'gradePoints'))
                }
              />

              <TextField
                label="Credits Awarded"
                variant="outlined"
                value={subject.creditsAwarded}
                fullWidth
                margin="normal"
                sx={{ margin: 2 }}
                required
                inputProps={{ type: 'number', min: 0 }}
                onChange={(e) =>
                  dispatch(handleSetSubjects(parseInt(e.target.value, 10), subject, index, 'creditsAwarded'))
                }
              />
            </Box>
          </Grow>
        ))}

        {/* <Button
          variant="contained"
          color="primary"
          onClick={addSubject}
          mt={2}
          style={{ marginTop: '16px' }}
        >
          Add Subject
        </Button> */}

        <Button
          variant="contained"
          color="primary"
          onClick={addSemester}
          mt={2}
          style={{ marginTop: '16px' }}
        >
          Add Semester
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={calculateCGPA}
          mt={2}
          style={{ marginTop: '16px' }}
        >
          Calculate CGPA
        </Button>

        <Box mt={2}>
          <strong>Overall CGPA: {cgpa.toFixed(2)}</strong>
        </Box>
      </Box>
    </Grow>
  );
};

export default CGPAManual;
