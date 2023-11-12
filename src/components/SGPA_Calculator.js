  import React, { useEffect } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import {setStudentId, setSemester, setSubjects, setSGPA, setTotalCredits, clearData} from '../store/sgpaSlice';
  import {addToHistory} from '../store/historySlice';
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

  const SGPACalculator = () => {
    const dispatch = useDispatch();
    const sgpaState = useSelector((state) => state.sgpa);
    const { studentId, semester, subjects, sgpa } = sgpaState;
    // const historyState = useSelector((state) => state.history)
    // const { historyData} = historyState;
    
    useEffect(() => {
      const storedSubjects = JSON.parse(localStorage.getItem(studentId)) || {};
      const semesterData = storedSubjects[semester] || [];
      dispatch(setSubjects(semesterData));

      const storedSGPA = JSON.parse(localStorage.getItem(`${studentId}-${semester}-SGPA`)) || 0;
      const storedTotalCredits = JSON.parse(localStorage.getItem(`${studentId}-${semester}-totalCredits`)) || 0;
      dispatch(setSGPA(storedSGPA));
      dispatch(setTotalCredits(storedTotalCredits));
    }, [studentId, semester, dispatch]);

    const addSubject = () => {
      dispatch(setSubjects([...subjects, { name: '', grade: '', credits: '' }]));
    };

    const calculateSGPA = () => {
      let totalCredits = 0;
      let totalPoints = 0;

      subjects.forEach((subject) => {
        totalCredits += parseInt(subject.credits || 0, 10);
        totalPoints += parseInt(subject.grade || 0, 10) * parseInt(subject.credits || 0, 10);
      });

      const calculatedSGPA = totalPoints / totalCredits;
      dispatch(setSGPA(calculatedSGPA));
      dispatch(setTotalCredits(totalCredits));
      dispatch(addToHistory({ studentId, type: semester, grade: calculatedSGPA.toFixed(2) }));
      // console.log(historyData)

      localStorage.setItem(`${studentId}-${semester}-SGPA`, JSON.stringify(calculatedSGPA));
      localStorage.setItem(`${studentId}-${semester}-totalCredits`, JSON.stringify(totalCredits));
    };

    const handleClearData = () => {
      dispatch(clearData());
    };

    const saveSubjectsToLocalStorage = () => {
      const storedSubjects = JSON.parse(localStorage.getItem(studentId)) || {};
      storedSubjects[semester] = subjects;
      localStorage.setItem(studentId, JSON.stringify(storedSubjects));
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
            SGPA Calculator
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
                  onChange={(e) => handleSetSubjects(e.target.value, subject, index, 'name')}
                />

                <TextField
                  label="Grade"
                  variant="outlined"
                  value={subject.grade}
                  fullWidth
                  margin="normal"
                  sx={{ margin: 2 }}
                  required
                  inputProps={{ type: 'number', min: 4, max: 10 }}
                  onChange={(e) => handleSetSubjects(e.target.value, subject, index, 'grade')}
                />

                <TextField
                  label="Credits"
                  variant="outlined"
                  value={subject.credits}
                  fullWidth
                  margin="normal"
                  sx={{ margin: 2 }}
                  required
                  inputProps={{ type: 'number', min: 0, max: 4 }}
                  onChange={(e) => handleSetSubjects(e.target.value, subject, index, 'credits')}
                />
              </Box>
            </Grow>
          ))}

          <Button
            variant="contained"
            color="primary"
            onClick={addSubject}
            mt={2}
            style={{ marginTop: '16px' }}
          >
            Add Subject
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={calculateSGPA}
            mt={2}
            style={{ marginTop: '16px' }}
          >
            Calculate SGPA
          </Button>

          <Box mt={2}>
            <strong>Overall SGPA: {sgpa.toFixed(2)}</strong>
            <br />
          </Box>
          <Box mt={2} display="flex" justifyContent="space-between" width="100%">
            <Button
            variant="contained"
            color="primary"
            onClick={saveSubjectsToLocalStorage}
            sx={{
              marginTop: '16px',
              backgroundColor: '#4CAF50', // Green color
              '&:hover': {
                backgroundColor: '#46a049', // Darker green color on hover
              },
            }}
          >
            Save Subjects
          </Button>

            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              style={{ borderColor: 'red', color: 'red', marginTop: '16px' }}
              onClick={handleClearData}
            >
              Clear All Data
            </Button>
          </Box>
        </Box>
      </Grow>
    );
  };

  export default SGPACalculator;

