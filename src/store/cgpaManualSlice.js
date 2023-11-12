// CGPASlice.js

import { createSlice } from '@reduxjs/toolkit';

export const cgpaManualSlice = createSlice({
  name: 'cgpa',
  initialState: {
    studentId: '',
    semester: 'semester-1',
    subjects: [],
    cgpa: 0,
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
    setCGPA: (state, action) => {
      state.cgpa = action.payload;
    },
    setTotalCredits: (state, action) => {
      state.totalCredits = action.payload;
    },
    clearData: (state) => {
      state.studentId = '';
      state.semester = 'semester-1';
      state.subjects = [];
      state.cgpa = 0;
      state.totalCredits = 0;
    },
  },
});

export const {
  setStudentId,
  setSemester,
  setSubjects,
  setCGPA,
  setTotalCredits,
  clearData,
} = cgpaManualSlice.actions;

export default cgpaManualSlice;
