
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStudentId, setSemester, setSubjects, setSGPA, setTotalCredits, clearData, } from '../store/sgpaSlice';
import { addToHistory } from '../store/historySlice';
import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, Typography, Paper, Grow, Snackbar, } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import { IconButton } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { motion } from 'framer-motion';

const SGPACalculator = () => {
  const dispatch = useDispatch();
  const sgpaState = useSelector((state) => state.sgpa);
  const { studentId, semester, subjects, sgpa } = sgpaState;

  const [emptyInputs, setEmptyInputs] = useState(Array(subjects.length).fill(false));
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedCgpa, setDisplayedCgpa] = useState(0.0);

  useEffect(() => {
    if (isAnimating) {
      const step = 0.1;
      let currentCgpa = 0.0;

      const interval = setInterval(() => {
        currentCgpa += step;
        setDisplayedCgpa(currentCgpa.toFixed(2));

        if (currentCgpa >= sgpa) {
          clearInterval(interval);
          setIsAnimating(false);
        }
      }, 1);

      return () => clearInterval(interval);
    }
  }, [isAnimating, sgpa]);

  useEffect(() => {
    const storedSubjects = JSON.parse(localStorage.getItem(studentId)) || {};
    const semesterData = storedSubjects[semester] || [];
    dispatch(setSubjects(semesterData));

    const storedSGPA = JSON.parse(localStorage.getItem(`${studentId}-${semester}-SGPA`)) || 0;
    const storedTotalCredits = JSON.parse(localStorage.getItem(`${studentId}-${semester}-totalCredits`)) || 0;
    dispatch(setSGPA(storedSGPA));
    dispatch(setTotalCredits(storedTotalCredits));

    const initialEmptyInputs = semesterData.map(() => false);
    setEmptyInputs(initialEmptyInputs);
  }, [studentId, semester, dispatch]);

  const addSubject = () => {
    dispatch(setSubjects([...subjects, { name: '', grade: '', credits: '' }]));
    setEmptyInputs([...emptyInputs, false]);
  };

  const calculateSGPA = () => {
    if (!studentId || subjects.some(subject => !subject.name || isNaN(subject.grade) || isNaN(subject.credits))) {
      setSnackbarMessage('Enter required values');
      setSnackbarOpen(true);
      return;
    }

    let totalCredits = 0;
    let totalPoints = 0;

    const newEmptyInputs = [];
    subjects.forEach((subject, index) => {
      totalCredits += parseInt(subject.credits || 0, 10);
      totalPoints +=
        parseInt(subject.grade || 0, 10) * parseInt(subject.credits || 0, 10);

      const isEmpty =
        subject.name === '' || isNaN(subject.grade) || isNaN(subject.credits);
      newEmptyInputs.push(isEmpty);
    });

    setEmptyInputs(newEmptyInputs);

    const calculatedSGPA = totalPoints / totalCredits;
    dispatch(setSGPA(calculatedSGPA));
    dispatch(setTotalCredits(totalCredits));
    dispatch(addToHistory({ studentId, type: semester, grade: calculatedSGPA.toFixed(2) }));

    localStorage.setItem(
      `${studentId}-${semester}-SGPA`,
      JSON.stringify(calculatedSGPA)
    );
    localStorage.setItem(
      `${studentId}-${semester}-totalCredits`,
      JSON.stringify(totalCredits)
    );

    // Start the animation
    setIsAnimating(true);
  };

  const handleSetSubjects = (value, subject, index, setKey) => {
    dispatch(
      setSubjects([
        ...subjects.slice(0, index),
        { ...subject, [setKey]: value },
        ...subjects.slice(index + 1),
      ])
    );

    const isEmpty = value === '' || (setKey === 'grade' && isNaN(value));
    setEmptyInputs((prevEmptyInputs) => [
      ...prevEmptyInputs.slice(0, index),
      isEmpty,
      ...prevEmptyInputs.slice(index + 1),
    ]);
  };

  const handleClearData = () => {
    dispatch(clearData());
  };

  const saveSubjectsToLocalStorage = () => {
    if (!studentId || subjects.some(subject => !subject.name || isNaN(subject.grade) || isNaN(subject.credits))) {
      setSnackbarMessage('Enter required values');
      setSnackbarOpen(true);
      return;
    }

    const storedSubjects = JSON.parse(localStorage.getItem(studentId)) || {};
    storedSubjects[semester] = subjects;
    localStorage.setItem(studentId, JSON.stringify(storedSubjects));
    setSnackbarMessage('Subjects saved successfully');
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
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
        // sx={{ overflowY: 'auto', maxHeight: '80vh' }} // Add this for vertical scrolling
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
          required
          onChange={(e) => {
            dispatch(setStudentId(e.target.value));
          }}
        />

        <FormControl fullWidth variant="outlined" margin="normal" required>
          <InputLabel>Semester</InputLabel>
          <Select
            value={semester}
            label="Semester"
            onChange={(e) => {
              dispatch(setSemester(e.target.value));
            }}
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
              width={800}
              p={2}
              elevation={3}
              borderRadius={8}
              style={{
                border: emptyInputs[index] ? '1px solid red' : '',
                transition: 'border 0.3s ease-out',
              }}
            >
              <TextField
                label="Subject Name"
                variant="outlined"
                value={subject.name}
                fullWidth
                margin="normal"
                sx={{ margin: 2 }}
                required
                onChange={(e) =>
                  handleSetSubjects(e.target.value, subject, index, 'name')
                }
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
                onChange={(e) =>
                  handleSetSubjects(e.target.value, subject, index, 'grade')
                }
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
                onChange={(e) =>
                  handleSetSubjects(e.target.value, subject, index, 'credits')
                }
              />
            </Box>
          </Grow>
        ))}

        <IconButton
          color="primary"
          onClick={addSubject}
          style={{ marginTop: '16px' }}
          sx={{ marginTop: 2 }}
        >
          <AddIcon sx={{ fontSize: '2.5rem' }} />
        </IconButton>
        <Button
          variant="contained"
          color="primary"
          onClick={calculateSGPA}
          mt={2}
          style={{ marginTop: '16px' }}
        >
          <EqualizerIcon />
          Calculate SGPA
        </Button>
        <Box mt={2}>
          {isAnimating ? (
            <motion.strong
              style={{ fontSize: '20px' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              Overall CGPA: {displayedCgpa}
            </motion.strong>
          ) : (
            <strong style={{ fontSize: '20px' }}> Overall CGPA: {sgpa.toFixed(2)}</strong>
          )}
        </Box>
        <Box mt={2} display="flex" justifyContent="space-between" width="100%">
          <Button
            variant="contained"
            color="primary"
            onClick={saveSubjectsToLocalStorage}
            sx={{ marginTop: '16px', }}
          >
            Save Subjects
          </Button>

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={2000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          >
            <MuiAlert
              elevation={2}
              variant="filled"
              onClose={handleCloseSnackbar}
              severity={snackbarMessage.includes('successfully') ? 'success' : 'error'}
            >
              {snackbarMessage}
            </MuiAlert>
          </Snackbar>

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



// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {setStudentId, setSemester, setSubjects, setSGPA, setTotalCredits, clearData,} from '../store/sgpaSlice';
// import { addToHistory } from '../store/historySlice';
// import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, Typography, Paper, Grow, Snackbar,} from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
// import EqualizerIcon from '@mui/icons-material/Equalizer';
// import { IconButton } from '@mui/material';
// import MuiAlert from '@mui/material/Alert';

// const SGPACalculator = () => {
//   const dispatch = useDispatch();
//   const sgpaState = useSelector((state) => state.sgpa);
//   const { studentId, semester, subjects, sgpa } = sgpaState;

//   const [emptyInputs, setEmptyInputs] = useState(Array(subjects.length).fill(false));
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');

//   useEffect(() => {
//     const storedSubjects = JSON.parse(localStorage.getItem(studentId)) || {};
//     const semesterData = storedSubjects[semester] || [];
//     dispatch(setSubjects(semesterData));

//     const storedSGPA = JSON.parse(localStorage.getItem(`${studentId}-${semester}-SGPA`)) || 0;
//     const storedTotalCredits = JSON.parse(localStorage.getItem(`${studentId}-${semester}-totalCredits`)) || 0;
//     dispatch(setSGPA(storedSGPA));
//     dispatch(setTotalCredits(storedTotalCredits));

//     const initialEmptyInputs = semesterData.map(() => false);
//     setEmptyInputs(initialEmptyInputs);
//   }, [studentId, semester, dispatch]);

//   const addSubject = () => {
//     dispatch(setSubjects([...subjects, { name: '', grade: '', credits: '' }]));
//     setEmptyInputs([...emptyInputs, false]);
//   };

//   const calculateSGPA = () => {
//     if (!studentId || subjects.some(subject => !subject.name || isNaN(subject.grade) || isNaN(subject.credits))) {
//       setSnackbarMessage('Enter required values');
//       setSnackbarOpen(true);
//       return;
//     }

//     let totalCredits = 0;
//     let totalPoints = 0;

//     const newEmptyInputs = [];
//     subjects.forEach((subject, index) => {
//       totalCredits += parseInt(subject.credits || 0, 10);
//       totalPoints +=
//         parseInt(subject.grade || 0, 10) * parseInt(subject.credits || 0, 10);

//       const isEmpty =
//         subject.name === '' || isNaN(subject.grade) || isNaN(subject.credits);
//       newEmptyInputs.push(isEmpty);
//     });

//     setEmptyInputs(newEmptyInputs);

//     const calculatedSGPA = totalPoints / totalCredits;
//     dispatch(setSGPA(calculatedSGPA));
//     dispatch(setTotalCredits(totalCredits));
//     dispatch(addToHistory({ studentId, type: semester, grade: calculatedSGPA.toFixed(2) }));

//     localStorage.setItem(
//       `${studentId}-${semester}-SGPA`,
//       JSON.stringify(calculatedSGPA)
//     );
//     localStorage.setItem(
//       `${studentId}-${semester}-totalCredits`,
//       JSON.stringify(totalCredits)
//     );
//     // saveSubjectsToLocalStorage()
//   };

//   const handleSetSubjects = (value, subject, index, setKey) => {
//     dispatch(
//       setSubjects([
//         ...subjects.slice(0, index),
//         { ...subject, [setKey]: value },
//         ...subjects.slice(index + 1),
//       ])
//     );

//     const isEmpty = value === '' || (setKey === 'grade' && isNaN(value));
//     setEmptyInputs((prevEmptyInputs) => [
//       ...prevEmptyInputs.slice(0, index),
//       isEmpty,
//       ...prevEmptyInputs.slice(index + 1),
//     ]);
//   };

//   const handleClearData = () => {
//     dispatch(clearData());
//   };

//   const saveSubjectsToLocalStorage = () => {
//     if (!studentId || subjects.some(subject => !subject.name || isNaN(subject.grade) || isNaN(subject.credits))) {
//       setSnackbarMessage('Enter required values');
//       setSnackbarOpen(true);
//       return;
//     }

//     const storedSubjects = JSON.parse(localStorage.getItem(studentId)) || {};
//     storedSubjects[semester] = subjects;
//     localStorage.setItem(studentId, JSON.stringify(storedSubjects));
//     setSnackbarMessage('Subjects saved successfully');
//     setSnackbarOpen(true);
//   };

//   const handleCloseSnackbar = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setSnackbarOpen(false);
//   };

//   return (
//     <Grow in={true} timeout={1000}>
//       <Box component={Paper} p={4} display="flex" flexDirection="column" alignItems="center" justifyContent="center"
//         boxShadow={5} 
//         borderRadius={8}
//         bgcolor="white"
//         width="90%"
//         mx="auto"
//         my={5}
//       >
//         <Typography variant="h4" gutterBottom color="primary">
//           <EqualizerIcon sx={{ fontSize: 36, marginRight: 1 }} />
//           SGPA Calculator
//         </Typography>

//         <TextField label="Student ID" variant="outlined" value={studentId} fullWidth margin="normal" required
//           onChange={(e) => {
//             dispatch(setStudentId(e.target.value));
//           }}
//         />

//         <FormControl fullWidth variant="outlined" margin="normal" required>
//           <InputLabel>Semester</InputLabel>
//           <Select
//             value={semester}
//             label="Semester"
//             onChange={(e) => {
//               dispatch(setSemester(e.target.value));
//             }}
//           >
//             <MenuItem value="semester-1">Semester 1</MenuItem>
//             <MenuItem value="semester-2">Semester 2</MenuItem>
//             <MenuItem value="semester-3">Semester 3</MenuItem>
//             <MenuItem value="semester-4">Semester 4</MenuItem>
//           </Select>
//         </FormControl>

//         {subjects.map((subject, index) => (
//           <Grow key={index} in={true} timeout={500 + index * 100}>
//             <Box display="flex" alignItems="center" justifyContent="center" mt={2} key={index} component={Paper} width={800} p={2}
//             elevation={3}
//             borderRadius={8}
//             style={{
//               border: emptyInputs[index] ? '1px solid red' : '',
//               transition: 'border 0.3s ease-out',
//             }}
//             >
//               <TextField
//                 label="Subject Name"
//                 variant="outlined"
//                 value={subject.name}
//                 fullWidth
//                 margin="normal"
//                 sx={{ margin: 2 }}
//                 required
//                 onChange={(e) =>
//                   handleSetSubjects(e.target.value, subject, index, 'name')
//                 }
//               />

//               <TextField
//                 label="Grade"
//                 variant="outlined"
//                 value={subject.grade}
//                 fullWidth
//                 margin="normal"
//                 sx={{ margin: 2 }}
//                 required
//                 inputProps={{ type: 'number', min: 4, max: 10 }}
//                 onChange={(e) =>
//                   handleSetSubjects(e.target.value, subject, index, 'grade')
//                 }
//               />

//               <TextField
//                 label="Credits"
//                 variant="outlined"
//                 value={subject.credits}
//                 fullWidth
//                 margin="normal"
//                 sx={{ margin: 2 }}
//                 required
//                 inputProps={{ type: 'number', min: 0, max: 4 }}
//                 onChange={(e) =>
//                   handleSetSubjects(e.target.value, subject, index, 'credits')
//                 }
//               />
//             </Box>
//           </Grow>
//         ))}

//         <IconButton
//           color="primary"
//           onClick={addSubject}
//           style={{ marginTop: '16px'}}
//           sx={{ marginTop: 2 }}
//         >
//           <AddIcon sx={{ fontSize: '2.5rem' }} />    
//         </IconButton>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={calculateSGPA}
//           mt={2}
//           style={{ marginTop: '16px' }}
//         >
//           <EqualizerIcon />
//           Calculate SGPA
//         </Button>
//         <Box mt={2} >
//           <strong style={{ fontSize: '1.5rem' }}>Overall SGPA: {sgpa.toFixed(2)}</strong>
//           <br />
//         </Box>
//         <Box mt={2} display="flex" justifyContent="space-between" width="100%">
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={saveSubjectsToLocalStorage}
//             sx={{marginTop: '16px',}}
//           >
//             Save Subjects
//           </Button>

//           <Snackbar
//             open={snackbarOpen}
//             autoHideDuration={2000}
//             onClose={handleCloseSnackbar}
//             anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
//           >
//             <MuiAlert
//               elevation={2}
//               variant="filled"
//               onClose={handleCloseSnackbar}
//               severity={snackbarMessage.includes('successfully') ? 'success' : 'error'}
//             >
//               {snackbarMessage}
//             </MuiAlert>
//           </Snackbar>

//           <Button
//             variant="outlined"
//             startIcon={<DeleteIcon />}
//             style={{ borderColor: 'red', color: 'red', marginTop: '16px' }}
//             onClick={handleClearData}
//           >
//             Clear All Data
//           </Button>
//         </Box>
//       </Box>
//     </Grow>
//   );
// };

// export default SGPACalculator;

