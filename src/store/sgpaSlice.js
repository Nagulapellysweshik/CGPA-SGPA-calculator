// sgpaSlice.js
import { createSlice } from '@reduxjs/toolkit';

const sgpaSlice = createSlice({
  name: 'sgpa',
  initialState: {
    studentId: '',
    semester: '',
    subjects: [],
    sgpa: 0,
    totalCredits: 0,
  },
  reducers: {
    setStudentId: (state, action) => {
      state.studentId = action.payload;
    },
    setSemester: (state, action) => {
      state.semester = action.payload;
    },
    setSubjects: (state, action) => {
      state.subjects = action.payload;
    },
    setSGPA: (state, action) => {
      state.sgpa = action.payload;
    },
    setTotalCredits: (state, action) => {
      state.totalCredits = action.payload;
    },
    clearData: (state) => {
      state.studentId = '';
      state.semester = '';
      state.subjects = [];
      state.sgpa = 0;
      state.totalCredits = 0;
    },
  },
});

export const {
  setStudentId,
  setSemester,
  setSubjects,
  setSGPA,
  setTotalCredits,
  clearData,
} = sgpaSlice.actions;

export default sgpaSlice;
