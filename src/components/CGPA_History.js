import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStudentId, setSemesterData, setCGPA, setErrorMessage, clearCGPAData,} from '../store/cgpaSlice';
import { TextField, Button, Box, Typography, Paper, Grow, Divider,} from '@mui/material';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import {addToHistory} from '../store/historySlice';

const CGPAHistory = () => {
  const dispatch = useDispatch();
  const { studentId, cgpa, semesterData, errorMessage } = useSelector((state) => state.cgpa);

  const calculateCGPA = () => {
    setErrorMessage('');
    const storedKeys = Object.keys(localStorage);

    const semesterData = storedKeys.reduce((acc, key) => {
      if (key.includes(`${studentId}-semester-`) && key.includes('-SGPA')) {
        const semesterNumber = key.split('-')[2];
        acc[semesterNumber] = acc[semesterNumber] || {};
        acc[semesterNumber].sgpa = JSON.parse(localStorage.getItem(key));
      }

      if (key.includes(`${studentId}-semester-`) && key.includes('-totalCredits')) {
        const semesterNumber = key.split('-')[2];
        acc[semesterNumber] = acc[semesterNumber] || {};
        acc[semesterNumber].totalCredits = JSON.parse(localStorage.getItem(key));
      }

      return acc;
    }, {});

    const semesters = Object.keys(semesterData);
    if (semesters.length === 0) {
      dispatch(setErrorMessage('No SGPA data found for the given student ID.'));
      dispatch(setSemesterData([]));
      dispatch(setCGPA(0));
      return;
    }

    dispatch(setSemesterData(semesters.map((semester) => ({ semester, sgpa: semesterData[semester].sgpa }))));

    let totalCredits = 0;
    let totalWeightedSGPA = 0;

    semesters.forEach((semester) => {
      const semesterDataEntry = semesterData[semester];
      totalWeightedSGPA += semesterDataEntry.sgpa * semesterDataEntry.totalCredits;
      totalCredits += semesterDataEntry.totalCredits;
    });

    const calculatedCGPA = totalWeightedSGPA / totalCredits;
    dispatch(setCGPA(calculatedCGPA.toFixed(2)));
    dispatch(addToHistory({ studentId, type: 'CGPA', grade: calculatedCGPA.toFixed(2) }));
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
        width="90%"
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
          onChange={(e) => {
            dispatch(clearCGPAData());
            dispatch(setStudentId(e.target.value));
            dispatch(setSemesterData([]));
            dispatch(setCGPA(0));
          }}
          required
        />

        {errorMessage && (<Typography color="error" mt={2}>{errorMessage} </Typography>)}

        <Button
          variant="contained"
          color="primary"
          onClick={calculateCGPA}
          mt={2}
          style={{ marginTop: '16px'}}
        >
          Calculate CGPA
        </Button>

        {semesterData.length > 0 && (
          <>
            <Divider mt={4} mb={2} />
            <Typography variant="h6" mt={2} mb={2}>
              Semester-wise SGPA:
            </Typography>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-around"
              flexWrap="wrap"
            >
              {semesterData.map(({ semester, sgpa }) => (
                <Grow key={semester} in={true} timeout={1500}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    p={2}
                    borderRadius={8}
                    width="150px"
                    m={1}
                    color={'white'}
                    bgcolor="#1976D2"
                  >
                    <Typography>{`Semester ${semester}`}</Typography>
                    <Typography>{sgpa.toFixed(2)}</Typography>
                  </Box>
                </Grow>
              ))}
            </Box>
            <Divider mt={4} mb={2} />
            <Typography>
              <strong>Calculated CGPA: {cgpa}</strong>
            </Typography>
          </>
        )}
      </Box>
    </Grow>
  );
};

export default CGPAHistory;

