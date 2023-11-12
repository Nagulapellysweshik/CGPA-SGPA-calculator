import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('historyData');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('historyData', serializedState);
  } catch {
    console.log("Error in historySlice line 39");
  }
};

const historySlice = createSlice({
  name: 'history',
  initialState: {
    historyData: loadState() || [], // Load historyData from localStorage
  },
  reducers: {
    addToHistory: (state, action) => {
      state.historyData.unshift(action.payload);
      saveState(state.historyData); // Save historyData to localStorage
    },
    removeFromHistory: (state, action) => {
      const indexToBeRemoved  = action.payload;
      state.historyData.splice(indexToBeRemoved, 1);
      saveState(state.historyData);
    },
  },
});

export const { addToHistory, removeFromHistory } = historySlice.actions;

export default historySlice;
