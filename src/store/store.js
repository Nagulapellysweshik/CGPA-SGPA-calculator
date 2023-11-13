import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import sgpaSlice from './sgpaSlice';
import cgpaSlice from "./cgpaSlice";
import historySlice from "./historySlice";
const store = configureStore({
    reducer: {
        login: loginSlice.reducer,
        sgpa: sgpaSlice.reducer,
        cgpa: cgpaSlice.reducer,
        history: historySlice.reducer,
    }
});


export default store;