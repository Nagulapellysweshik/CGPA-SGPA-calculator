import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  studentId: '',
  cgpa: 0,
  semesterData: [],
  errorMessage: '',
};

export const cgpaSlice = createSlice({
  name: 'cgpa',
  initialState,
  reducers: {
    setStudentId: (state, action) => {
      state.studentId = action.payload;
    },
    setSemesterData: (state, action) => {
      state.semesterData = action.payload;
    },
    setCGPA: (state, action) => {
      state.cgpa = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    clearCGPAData: (state) => {
      state.studentId = '';
      state.cgpa = 0;
      state.semesterData = [];
      state.errorMessage = '';
    },
  },
});

export const {
  setStudentId,
  setSemesterData,
  setCGPA,
  setErrorMessage,
  clearCGPAData,
} = cgpaSlice.actions;

export default cgpaSlice;
